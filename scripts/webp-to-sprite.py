#!/usr/bin/env python3
"""
Turns an animated .webp into a sprite sheet (all frames side by side in one PNG).
It also crops the empty transparent margin around the character and shrinks the
frames, so the sheet stays small.

  pip install pillow
  python scripts/webp-to-sprite.py input.webp public/sprite2.png [frame-width]

frame-width is the width of ONE frame in the sheet (default 240). That is plenty
for a character shown about 90px wide, even on high-resolution screens.

It prints the numbers to copy into content/character.ts.
"""
import sys
from PIL import Image, ImageSequence

if len(sys.argv) < 3:
    sys.exit("usage: python scripts/webp-to-sprite.py input.webp output.png [frame-width]")

src, out = sys.argv[1], sys.argv[2]
target_w = int(sys.argv[3]) if len(sys.argv) > 3 else 240

im = Image.open(src)
frames, durations = [], []
for frame in ImageSequence.Iterator(im):
    frames.append(frame.convert("RGBA").copy())
    durations.append(frame.info.get("duration", 100))

# 1) crop: the smallest box that contains the character in ANY frame
box = None
for f in frames:
    b = f.getchannel("A").getbbox()  # area that is not fully transparent
    if b is None:
        continue
    box = b if box is None else (min(box[0], b[0]), min(box[1], b[1]), max(box[2], b[2]), max(box[3], b[3]))

full = frames[0].size
if box is None or box == (0, 0, *full):
    print("NOTE: nothing to crop. The webp may have an opaque background instead of a transparent one.")
    box = (0, 0, *full)
frames = [f.crop(box) for f in frames]

# 2) shrink to the target width
cw, ch = frames[0].size
if cw > target_w:
    w, h = target_w, round(ch * target_w / cw)
    frames = [f.resize((w, h), Image.LANCZOS) for f in frames]
else:
    w, h = cw, ch

# 3) lay the frames out in one row
sheet = Image.new("RGBA", (w * len(frames), h), (0, 0, 0, 0))
for i, f in enumerate(frames):
    sheet.paste(f, (i * w, 0))
sheet.save(out, optimize=True)

print(f"cropped {full[0]}x{full[1]} -> {cw}x{ch}, then shrunk to {w}x{h}")
print(f"saved {out} ({w * len(frames)}px wide)")
print("copy into content/character.ts:")
print(f"  frames: {len(frames)},")
print(f"  frameWidth: {w},")
print(f"  frameHeight: {h},")
print(f"  duration: {sum(durations)},")
if w * len(frames) > 16000:
    print("WARNING: the sheet is still very wide. Run again with a smaller frame-width, e.g. 160.")
