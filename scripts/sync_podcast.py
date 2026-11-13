#!/usr/bin/env python3
"""Sincroniza automáticamente data/podcast.json con el canal de YouTube Stemos Hablando.

Estrategia dual usando solo la biblioteca estándar de Python:
1. Intenta leer el feed Atom oficial de YouTube para el canal.
2. Si el feed devuelve error temporal (p. ej. HTTP 500), extrae ytInitialData desde /videos.
Preserva configuraciones manuales de episodios existentes (como start=525) y
filtra menciones antiguas de DataLab en descripciones sincronizadas.
"""

from __future__ import annotations

import json
import re
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

CHANNEL_ID = "UCdXzaSn8VZ5DjH3FlvcpUWA"
CHANNEL_URL = "https://www.youtube.com/@Stemos.Hablando"
FEED_URL = f"https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}"
VIDEOS_URL = f"{CHANNEL_URL}/videos"
DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "podcast.json"

USER_AGENT = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
)


def fetch_text(url: str, timeout: int = 20) -> str:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept-Language": "es-CL,es;q=0.9,en;q=0.8",
        },
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read().decode("utf-8", errors="replace")


def clean_description(raw: str) -> str:
    if not raw:
        return (
            "Nuevo episodio de Stemos Hablando: entrevistas y conversaciones cercanas "
            "sobre ciencia, tecnología e investigación."
        )
    kept_lines: list[str] = []
    for line in raw.splitlines():
        if re.search(r"datalab", line, flags=re.IGNORECASE):
            continue
        stripped = line.strip()
        if stripped:
            kept_lines.append(stripped)
    joined = " ".join(kept_lines).strip()
    if len(joined) > 320:
        joined = joined[:317].rsplit(" ", 1)[0] + "..."
    return joined or (
        "Nuevo episodio de Stemos Hablando: entrevistas y conversaciones cercanas "
        "sobre ciencia, tecnología e investigación."
    )


def parse_atom_feed(xml_text: str) -> list[dict[str, str]]:
    ns = {
        "atom": "http://www.w3.org/2005/Atom",
        "yt": "http://www.youtube.com/xml/schemas/2015",
        "media": "http://search.yahoo.com/mrss/",
    }
    root = ET.fromstring(xml_text)
    videos: list[dict[str, str]] = []
    for entry in root.findall("atom:entry", ns):
        vid_el = entry.find("yt:videoId", ns)
        title_el = entry.find("atom:title", ns)
        desc_el = entry.find("media:group/media:description", ns)
        if vid_el is None or not vid_el.text:
            continue
        video_id = vid_el.text.strip()
        title = (title_el.text or "").strip() if title_el is not None else "Nuevo Episodio"
        desc = (desc_el.text or "").strip() if desc_el is not None else ""
        videos.append({"videoId": video_id, "title": title, "description": desc})
    return videos


def extract_json_object(source: str, start_idx: int) -> str | None:
    depth = 0
    in_string = False
    escape = False
    for idx in range(start_idx, len(source)):
        ch = source[idx]
        if in_string:
            if escape:
                escape = False
            elif ch == "\\":
                escape = True
            elif ch == '"':
                in_string = False
        else:
            if ch == '"':
                in_string = True
            elif ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    return source[start_idx : idx + 1]
    return None


def iter_video_renderers(node: object):
    if isinstance(node, dict):
        if "videoRenderer" in node and isinstance(node["videoRenderer"], dict):
            yield ("videoRenderer", node["videoRenderer"])
        elif "lockupViewModel" in node and isinstance(node["lockupViewModel"], dict):
            yield ("lockupViewModel", node["lockupViewModel"])
        for value in node.values():
            yield from iter_video_renderers(value)
    elif isinstance(node, list):
        for item in node:
            yield from iter_video_renderers(item)


def fetch_watch_description(video_id: str) -> str:
    try:
        html_text = fetch_text(f"https://www.youtube.com/watch?v={video_id}")
        match = re.search(r'"shortDescription"\s*:\s*"((?:\\.|[^"\\])*)"', html_text)
        if match:
            return json.loads(f'"{match.group(1)}"')
    except Exception:
        pass
    return ""


def parse_videos_html(html_text: str) -> list[dict[str, str]]:
    marker = "var ytInitialData = "
    idx = html_text.find(marker)
    if idx == -1:
        marker = "ytInitialData ="
        idx = html_text.find(marker)
        if idx == -1:
            return []
    brace_idx = html_text.find("{", idx)
    if brace_idx == -1:
        return []
    blob = extract_json_object(html_text, brace_idx)
    if not blob:
        return []
    data = json.loads(blob)
    seen: set[str] = set()
    videos: list[dict[str, str]] = []
    for kind, item in iter_video_renderers(data):
        if kind == "videoRenderer":
            video_id = str(item.get("videoId", "")).strip()
            if not video_id or video_id in seen:
                continue
            seen.add(video_id)
            title_runs = item.get("title", {}).get("runs", [])
            title = "".join(r.get("text", "") for r in title_runs).strip() or "Nuevo Episodio"
            desc_runs = item.get("descriptionSnippet", {}).get("runs", [])
            desc = "".join(r.get("text", "") for r in desc_runs).strip()
            videos.append({"videoId": video_id, "title": title, "description": desc})
        elif kind == "lockupViewModel":
            if item.get("contentType") != "LOCKUP_CONTENT_TYPE_VIDEO":
                continue
            video_id = str(item.get("contentId", "")).strip()
            if not video_id or video_id in seen:
                continue
            seen.add(video_id)
            meta = item.get("metadata", {}).get("lockupMetadataViewModel", {})
            title = str(meta.get("title", {}).get("content", "")).strip() or "Nuevo Episodio"
            videos.append({"videoId": video_id, "title": title, "description": ""})
    return videos


def fetch_channel_videos() -> list[dict[str, str]]:
    try:
        xml_text = fetch_text(FEED_URL)
        videos = parse_atom_feed(xml_text)
        if videos:
            print(f"Atom feed OK: {len(videos)} video(s).")
            return videos
    except (urllib.error.URLError, ET.ParseError, TimeoutError) as exc:
        print(f"Atom feed unavailable ({exc}); falling back to /videos HTML...")

    html_text = fetch_text(VIDEOS_URL)
    videos = parse_videos_html(html_text)
    print(f"HTML fallback parsed {len(videos)} video(s).")
    return videos


def build_episode_entry(
    raw_video: dict[str, str], ep_num: int, is_latest: bool, allow_watch_fetch: bool = True
) -> dict[str, object]:
    video_id = raw_video["videoId"]
    raw_desc = raw_video.get("description", "")
    if not raw_desc and allow_watch_fetch:
        raw_desc = fetch_watch_description(video_id)
    ep_code = f"{ep_num:02d}"
    return {
        "label": f"Ep. {ep_code}",
        "windowTitle": f"Stemos Hablando · Ep. {ep_code}",
        "badgePrimary": "🎙️ Nuevo Episodio" if is_latest else f"🎙️ Episodio {ep_code}",
        "badgeSecondary": f"Episodio {ep_code} · Divulgación STEM",
        "title": raw_video["title"],
        "description": clean_description(raw_desc),
        "tags": [
            "Podcast STEM",
            "Divulgación Científica",
            "UTFSM",
            "@stemos.hablando",
        ],
        "embedUrl": f"https://www.youtube-nocookie.com/embed/{video_id}?rel=0",
        "watchUrl": f"https://www.youtube.com/watch?v={video_id}",
        "videoId": video_id,
    }


def extract_video_id(ep: dict[str, object]) -> str:
    if ep.get("videoId"):
        return str(ep["videoId"])
    watch = str(ep.get("watchUrl", ""))
    match = re.search(r"[?&]v=([A-Za-z0-9_-]{6,})", watch)
    return match.group(1) if match else ""


def sync(html_sample: Path | None = None) -> bool:
    if DATA_PATH.exists():
        current = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    else:
        current = {"channelId": CHANNEL_ID, "channelUrl": CHANNEL_URL, "episodes": []}

    existing_episodes: list[dict[str, object]] = list(current.get("episodes", []))
    by_id: dict[str, dict[str, object]] = {}
    for ep in existing_episodes:
        vid = extract_video_id(ep)
        if vid:
            ep.setdefault("videoId", vid)
            by_id[vid] = ep

    if html_sample is not None:
        fetched = parse_videos_html(html_sample.read_text(encoding="utf-8", errors="replace"))
    else:
        fetched = fetch_channel_videos()

    if not fetched:
        print("No videos found from YouTube; keeping existing podcast.json unchanged.")
        return False

    # YouTube devuelve los más recientes primero; asignamos numeración ascendente a los nuevos
    known_ids = set(by_id.keys())
    new_videos = [v for v in fetched if v["videoId"] not in known_ids]

    merged: list[dict[str, object]] = []
    total_count = len(existing_episodes) + len(new_videos)
    for idx, raw in enumerate(fetched):
        vid = raw["videoId"]
        if vid in by_id:
            merged.append(by_id[vid])
        else:
            # Estima el número de episodio contando de más reciente a más antiguo
            ep_num = max(1, total_count - idx)
            merged.append(
                build_episode_entry(
                    raw, ep_num, is_latest=(idx == 0), allow_watch_fetch=(html_sample is None)
                )
            )

    # Conserva episodios locales que ya no vinieran en el corte reciente del feed
    merged_ids = {extract_video_id(ep) for ep in merged}
    for ep in existing_episodes:
        vid = extract_video_id(ep)
        if vid and vid not in merged_ids:
            merged.append(ep)

    updated_payload = {
        "channelId": CHANNEL_ID,
        "channelUrl": CHANNEL_URL,
        "episodes": merged,
    }

    if updated_payload == current:
        print("podcast.json already up to date.")
        return False

    DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
    DATA_PATH.write_text(
        json.dumps(updated_payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Updated {DATA_PATH} with {len(merged)} episode(s).")
    return True


if __name__ == "__main__":
    sample_arg = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    sync(sample_arg)
