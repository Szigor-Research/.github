from pathlib import Path
from PIL import Image

vault = Path(r"e:\Obsidian Vault\attachments\LASZLO")
out = Path(__file__).resolve().parents[1] / "profile" / "assets"
out.mkdir(parents=True, exist_ok=True)


def resize_keep_aspect(img: Image.Image, *, height: int | None = None, width: int | None = None) -> Image.Image:
    w, h = img.size
    if height is not None:
        return img.resize((int(w * height / h), height), Image.LANCZOS)
    if width is not None:
        return img.resize((width, int(h * width / w)), Image.LANCZOS)
    raise ValueError("pass height or width")


banner_src = vault / "LASZLO_Logo_横版_深色底.png"
mark_src = vault / "LASZLO_Logo_标章_256.png"
term_src = vault / "LASZLO_UI_Terminal_终端.png"

img = resize_keep_aspect(Image.open(banner_src).convert("RGB"), width=680)
banner = out / "laszlo-banner.jpg"
img.save(banner, format="JPEG", quality=80, optimize=True, progressive=True)

mark = resize_keep_aspect(Image.open(mark_src).convert("RGBA"), height=112)
mark_path = out / "laszlo-mark.png"
mark.save(mark_path, format="PNG", optimize=True)

term = resize_keep_aspect(Image.open(term_src).convert("RGB"), width=720)
term_path = out / "laszlo-terminal.jpg"
term.save(term_path, format="JPEG", quality=78, optimize=True, progressive=True)

for p in (banner, mark_path, term_path):
    im = Image.open(p)
    print(p.name, im.size, p.stat().st_size)
