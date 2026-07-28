import os
from PIL import Image, ImageDraw, ImageFont

# Define brand colors
BRAND_PRIMARY = (23, 107, 91, 255)       # #176b5b
BRAND_DARK = (15, 64, 54, 255)          # #0f4036
BG_LIGHT = (248, 250, 249, 255)         # #f8faf9
WHITE = (255, 255, 255, 255)            # #ffffff
TEXT_DARK = (15, 23, 42, 255)           # #0f172a
TEXT_MUTED = (51, 65, 85, 255)          # #334155
PILL_BG = (230, 244, 241, 255)          # #e6f4f1
BORDER_COLOR = (226, 232, 240, 255)     # #e2e8f0

def draw_lightning_bolt(draw, bbox, fill=WHITE):
    """
    Draws the canonical Energy Bill Lab lightning bolt within the given bounding box (x0, y0, x1, y1).
    Canonical SVG path: M18 4L7 17h7l-2 11 11-13h-7l2-11z (in 32x32 viewbox)
    """
    x0, y0, x1, y1 = bbox
    w = x1 - x0
    h = y1 - y0

    # Normalized polygon points (from 32x32 viewbox)
    raw_points = [
        (18 / 32.0, 4 / 32.0),
        (7 / 32.0, 17 / 32.0),
        (14 / 32.0, 17 / 32.0),
        (12 / 32.0, 28 / 32.0),
        (23 / 32.0, 15 / 32.0),
        (16 / 32.0, 15 / 32.0),
    ]

    points = [(x0 + px * w, y0 + py * h) for px, py in raw_points]
    draw.polygon(points, fill=fill)

def generate_app_icon(size, corner_radius):
    """
    Generates a square brand icon with rounded corners and the white lightning bolt.
    """
    # Supersample 4x for anti-aliasing
    scale = 4
    s_size = size * scale
    s_radius = corner_radius * scale

    img = Image.new("RGBA", (s_size, s_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Draw rounded rectangle background
    draw.rounded_rectangle([(0, 0), (s_size, s_size)], radius=s_radius, fill=BRAND_PRIMARY)

    # Draw lightning bolt in center (~60% of size)
    margin = int(s_size * 0.20)
    draw_lightning_bolt(draw, (margin, margin, s_size - margin, s_size - margin), fill=WHITE)

    # Downsample back to target size
    img = img.resize((size, size), Image.Resampling.LANCZOS)
    return img

def generate_social_preview(width=1200, height=630):
    """
    Generates a 1200x630 Open Graph / Twitter preview image.
    """
    scale = 2
    sw, sh = width * scale, height * scale

    img = Image.new("RGBA", (sw, sh), BG_LIGHT)
    draw = ImageDraw.Draw(img)

    # 1. Top accent bar
    bar_h = 16 * scale
    draw.rectangle([(0, 0), (sw, bar_h)], fill=BRAND_PRIMARY)

    # 2. Main Card Container
    card_margin_x = 80 * scale
    card_margin_y = 60 * scale + bar_h
    card_w = sw - card_margin_x * 2
    card_h = sh - card_margin_y - 60 * scale

    card_box = [card_margin_x, card_margin_y, card_margin_x + card_w, card_margin_y + card_h]
    draw.rounded_rectangle(card_box, radius=24 * scale, fill=WHITE, outline=BORDER_COLOR, width=3 * scale)

    # 3. Brand Icon inside Card
    icon_size = 140 * scale
    icon_x = card_margin_x + 60 * scale
    icon_y = card_margin_y + (card_h - icon_size) // 2

    # Draw brand icon box
    icon_box = [icon_x, icon_y, icon_x + icon_size, icon_y + icon_size]
    draw.rounded_rectangle(icon_box, radius=32 * scale, fill=BRAND_PRIMARY)
    bolt_m = int(icon_size * 0.20)
    draw_lightning_bolt(draw, (icon_x + bolt_m, icon_y + bolt_m, icon_x + icon_size - bolt_m, icon_y + icon_size - bolt_m), fill=WHITE)

    # 4. Text Content (using default or truetype font)
    text_x = icon_x + icon_size + 50 * scale
    text_y_center = card_margin_y + card_h // 2

    try:
        title_font = ImageFont.truetype("arial.ttf", 64 * scale)
        subtitle_font = ImageFont.truetype("arial.ttf", 32 * scale)
        pill_font = ImageFont.truetype("arial.ttf", 22 * scale)
    except IOError:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        pill_font = ImageFont.load_default()

    # Draw Title
    title_text = "Energy Bill Lab"
    draw.text((text_x, text_y_center - 70 * scale), title_text, fill=BRAND_DARK, font=title_font)

    # Draw Subtitle
    sub_text = "U.S. Electricity Rates & Home Energy Calculators"
    draw.text((text_x, text_y_center + 10 * scale), sub_text, fill=TEXT_MUTED, font=subtitle_font)

    # Draw Feature Pills
    pills = ["50 State Rates", "10 Calculators", "Official EIA Data"]
    px = text_x
    py = text_y_center + 75 * scale

    for pill in pills:
        bbox = draw.textbbox((0, 0), pill, font=pill_font)
        pw = bbox[2] - bbox[0] + 32 * scale
        ph = bbox[3] - bbox[1] + 20 * scale

        pill_box = [px, py, px + pw, py + ph]
        draw.rounded_rectangle(pill_box, radius=12 * scale, fill=PILL_BG)
        draw.text((px + 16 * scale, py + 8 * scale), pill, fill=BRAND_PRIMARY, font=pill_font)
        px += pw + 16 * scale

    # Downsample to target size
    img = img.resize((width, height), Image.Resampling.LANCZOS)
    return img

def main():
    root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    app_dir = os.path.join(root, "apps", "web", "src", "app")
    public_dir = os.path.join(root, "apps", "web", "public")

    os.makedirs(app_dir, exist_ok=True)
    os.makedirs(public_dir, exist_ok=True)

    print("Generating 512x512 icon.png...")
    icon_512 = generate_app_icon(512, 96)
    icon_512.save(os.path.join(app_dir, "icon.png"), "PNG")
    icon_512.save(os.path.join(public_dir, "icon.png"), "PNG")

    print("Generating 180x180 apple-icon.png...")
    apple_180 = generate_app_icon(180, 36)
    apple_180.save(os.path.join(app_dir, "apple-icon.png"), "PNG")
    apple_180.save(os.path.join(public_dir, "apple-icon.png"), "PNG")

    print("Generating multi-resolution favicon.ico...")
    icon_16 = generate_app_icon(16, 3)
    icon_32 = generate_app_icon(32, 6)
    icon_48 = generate_app_icon(48, 9)

    ico_path_app = os.path.join(app_dir, "favicon.ico")
    ico_path_public = os.path.join(public_dir, "favicon.ico")
    icon_48.save(ico_path_app, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    icon_48.save(ico_path_public, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])

    print("Generating 1200x630 opengraph-image.png & twitter-image.png...")
    og_img = generate_social_preview(1200, 630)
    og_img.save(os.path.join(app_dir, "opengraph-image.png"), "PNG")
    og_img.save(os.path.join(public_dir, "opengraph-image.png"), "PNG")
    og_img.save(os.path.join(app_dir, "twitter-image.png"), "PNG")
    og_img.save(os.path.join(public_dir, "twitter-image.png"), "PNG")

    print("All branding assets generated successfully!")

if __name__ == "__main__":
    main()
