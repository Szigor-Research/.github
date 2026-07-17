#!/usr/bin/env python3
"""Validate the geometric identity and Proof Instruments production kit."""

from __future__ import annotations

import re
import struct
import xml.etree.ElementTree as ET
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "docs" / "brand" / "assets"

EXPECTED_PNG = {
    "family-proof-instruments-hero.png": (1821, 864),
    "family-geometric-system.png": (1600, 560),
    "brand-architecture-map.png": (1400, 980),
    "laszlo-technical-architecture.png": (1400, 820),
    "janos-technical-architecture.png": (1400, 820),
    "szigor-brand-sculpture.png": (1254, 1254),
    "laszlo-brand-sculpture.png": (1254, 1254),
    "janos-brand-sculpture.png": (1254, 1254),
}

EXPECTED_SVG = {
    "family-geometric-system.svg",
    "brand-architecture-map.svg",
    "laszlo-technical-architecture.svg",
    "janos-technical-architecture.svg",
}

for brand in ("szigor", "laszlo", "janos"):
    EXPECTED_PNG.update(
        {
            f"{brand}-geometric.png": (512, 512),
            f"{brand}-avatar.png": (512, 512),
            f"{brand}-mark.png": (512, 512),
            f"{brand}-favicon-16.png": (16, 16),
            f"{brand}-favicon-32.png": (32, 32),
            f"{brand}-lockup.png": (1200, 320),
            f"{brand}-banner.png": (1200, 340),
            f"{brand}-social-preview.png": (1280, 640),
        }
    )
    EXPECTED_SVG.update(
        {
            f"{brand}-geometric.svg",
            f"{brand}-geometric-mono.svg",
            f"{brand}-geometric-reverse.svg",
            f"{brand}-geometric-lockup.svg",
            f"{brand}-geometric-lockup-reverse.svg",
            f"{brand}-banner.svg",
            f"{brand}-social-preview.svg",
        }
    )

ACTIVE_DOCS = (
    ROOT / "README.md",
    ROOT / "profile" / "README.md",
    ROOT / "docs" / "brand" / "README.md",
    ROOT / "docs" / "brand" / "WITNESS_CUT.md",
    ROOT / "docs" / "brand" / "GEOMETRIC_LOGOS.md",
    ROOT / "docs" / "brand" / "visual-system.html",
)


def png_size(path: Path) -> tuple[int, int]:
    with path.open("rb") as stream:
        header = stream.read(24)
    if len(header) != 24 or header[:8] != b"\x89PNG\r\n\x1a\n":
        raise ValueError(f"{path} is not a valid PNG")
    return struct.unpack(">II", header[16:24])


def validate_dimensions() -> list[str]:
    errors: list[str] = []
    for name, expected in EXPECTED_PNG.items():
        path = ASSETS / name
        if not path.is_file():
            errors.append(f"missing PNG: {path.relative_to(ROOT)}")
            continue
        actual = png_size(path)
        if actual != expected:
            errors.append(
                f"wrong size: {path.relative_to(ROOT)} is {actual[0]}x{actual[1]}, "
                f"expected {expected[0]}x{expected[1]}"
            )

    root_social = ROOT / "social-preview.png"
    if not root_social.is_file() or png_size(root_social) != (1280, 640):
        errors.append("social-preview.png must exist at 1280x640")
    return errors


def validate_svg_sources() -> list[str]:
    errors: list[str] = []
    for name in sorted(EXPECTED_SVG):
        path = ASSETS / name
        if not path.is_file():
            errors.append(f"missing SVG: {path.relative_to(ROOT)}")
            continue
        try:
            root = ET.parse(path).getroot()
        except ET.ParseError as exc:
            errors.append(f"invalid SVG: {path.relative_to(ROOT)}: {exc}")
            continue
        if not root.tag.endswith("svg") or not root.get("viewBox"):
            errors.append(f"SVG lacks a root viewBox: {path.relative_to(ROOT)}")
    return errors


def validate_active_docs() -> list[str]:
    errors: list[str] = []
    forbidden = re.compile(
        r"szigor-proof-instrument\.png|janos-ledger-window\.png|"
        r"Szigor Oxide|JANOS Ledger|family-system-board|Confluence S",
        re.IGNORECASE,
    )
    html_asset = re.compile(r"(?:src|href)=[\"']([^\"']+)[\"']")
    markdown_asset = re.compile(r"!?(?:\[[^]]*\])\(([^)]+)\)")

    for doc in ACTIVE_DOCS:
        text = doc.read_text(encoding="utf-8")
        match = forbidden.search(text)
        if match:
            errors.append(
                f"superseded active reference in {doc.relative_to(ROOT)}: {match.group(0)}"
            )

        candidates = html_asset.findall(text) + markdown_asset.findall(text)
        for candidate in candidates:
            candidate = candidate.strip().split("#", 1)[0]
            if (
                not candidate
                or candidate.startswith(("http://", "https://", "mailto:", "#"))
                or "{" in candidate
            ):
                continue
            resolved = (doc.parent / candidate).resolve()
            if not resolved.exists():
                errors.append(
                    f"broken local reference in {doc.relative_to(ROOT)}: {candidate}"
                )

    profile = (ROOT / "profile" / "README.md").read_text(encoding="utf-8")
    signatures = (
        "Blue **Evidence Frame**",
        "Gold **Signal Gate**",
        "Black/red **Proof Engine**",
    )
    for signature in signatures:
        if signature not in profile:
            errors.append(f"profile is missing canonical mapping: {signature}")
    return errors


def main() -> int:
    errors = validate_dimensions() + validate_svg_sources() + validate_active_docs()
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1
    total = len(EXPECTED_PNG) + len(EXPECTED_SVG) + 1
    print(f"Validated {total} geometric, diagram, sculpture, and GitHub assets.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
