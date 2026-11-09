#!/usr/bin/env python3
"""
Turns an animated .webp into a sprite sheet (all frames side by side in one PNG).

  pip install pillow
  python scripts/webp-to-sprite.py path/to/character.webp public/character/sprite.png

It prints the numbers to copy into content/character.ts.
"""
import sys
from PIL import Image, ImageSequence

if len(sys.argv) < 3:
    sys.exit("usage: python scripts/webp-to-sprite.py input.webp output.png")

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src)

frames, durations = [], []
for frame in ImageSequence.Iterator(im):
    frames.append(frame.convert("RGBA").copy())
    durations.append(frame.info.get("duration", 100))

w, h = frames[0].size
sheet = Image.new("RGBA", (w * len(frames), h), (0, 0, 0, 0))
for i, f in enumerate(frames):
    sheet.paste(f, (i * w, 0))
sheet.save(out)

print(f"saved {out}")
print("copy into content/character.ts:")
print(f"  frames: {len(frames)},")
print(f"  frameWidth: {w},")
print(f"  frameHeight: {h},")
print(f"  duration: {sum(durations)},")
if w * len(frames) > 16000:
    print(f"WARNING: the sheet is {w * len(frames)}px wide. Some browsers struggle above ~16000px.")
    print("         Shrink the frames (resize the webp first) or tell me and I will switch to a grid layout.")
