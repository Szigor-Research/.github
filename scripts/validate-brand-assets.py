#!/usr/bin/env python3
"""Validate the image-led Proof Instruments production kit."""

from __future__ import annotations

import re
import struct
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "docs" / "brand" / "assets"

EXPECTED = {
    "family-proof-instruments-hero.png": (1821, 864),
    "szigor-proof-instrument.png": (1254, 1254),
    "laszlo-signal-gate.png": (1254, 1254),
    "janos-ledger-window.png": (1254, 1254),
}

for brand in ("szigor", "laszlo", "janos"):
    EXPECTED.update(
        {
            f"{brand}-avatar.png": (512, 512),
            f"{brand}-mark.png": (512, 512),
            f"{brand}-favicon-16.png": (16, 16),
            f"{brand}-favicon-32.png": (32, 32),
            f"{brand}-lockup.png": (1200, 320),
            f"{brand}-banner.png": (1200, 340),
            f"{brand}-social-preview.png": (1280, 640),
        }
    )

ACTIVE_DOCS = (
    ROOT / "README.md",
    ROOT / "profile" / "README.md",
    ROOT / "docs" / "brand" / "README.md",
    ROOT / "docs" / "brand" / "WITNESS_CUT.md",
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
    for name, expected in EXPECTED.items():
        path = ASSETS / name
        if not path.is_file():
            errors.append(f"missing asset: {path.relative_to(ROOT)}")
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


def validate_active_docs() -> list[str]:
    errors: list[str] = []
    forbidden = re.compile(
        r"\.svg\b|family-system-board|lockup-reverse|mark-reverse|wordmark\.svg",
        re.IGNORECASE,
    )
    html_asset = re.compile(r"(?:src|href)=[\"']([^\"']+)[\"']")
    markdown_asset = re.compile(r"!?(?:\[[^]]*\])\(([^)]+)\)")

    for doc in ACTIVE_DOCS:
        text = doc.read_text(encoding="utf-8")
        match = forbidden.search(text)
        if match:
            errors.append(
                f"retired active reference in {doc.relative_to(ROOT)}: {match.group(0)}"
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
    return errors


def main() -> int:
    errors = validate_dimensions() + validate_active_docs()
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1
    print(f"Validated {len(EXPECTED) + 1} image-led brand assets and active references.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
