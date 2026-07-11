from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "assets" / "laszlo-banner.png"
OUTPUT = ROOT / "profile" / "assets" / "laszlo-banner.jpg"
CANVAS_SIZE = (1200, 300)


def visible_bounds(image: Image.Image) -> tuple[int, int, int, int]:
    grayscale = image.convert("L")
    mask = grayscale.point(lambda value: 255 if value > 36 else 0)
    bounds = mask.getbbox()
    if bounds is None:
        raise ValueError("brand source does not contain a visible lockup")

    left, top, right, bottom = bounds
    padding_x = max(24, int((right - left) * 0.08))
    padding_y = max(18, int((bottom - top) * 0.18))
    return (
        max(0, left - padding_x),
        max(0, top - padding_y),
        min(image.width, right + padding_x),
        min(image.height, bottom + padding_y),
    )


def main() -> None:
    source = Image.open(SOURCE).convert("RGB")
    _, visible_top, _, visible_bottom = visible_bounds(source)
    crop_height = round(source.width * CANVAS_SIZE[1] / CANVAS_SIZE[0])
    center_y = (visible_top + visible_bottom) // 2
    crop_top = max(0, min(source.height - crop_height, center_y - crop_height // 2))
    crop = source.crop((0, crop_top, source.width, crop_top + crop_height))
    banner = crop.resize(CANVAS_SIZE, Image.Resampling.LANCZOS)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    banner.save(OUTPUT, format="JPEG", quality=88, optimize=True, progressive=True)
    print(f"{OUTPUT.relative_to(ROOT)} {banner.size} {OUTPUT.stat().st_size} bytes")


if __name__ == "__main__":
    main()
