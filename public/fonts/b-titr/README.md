# B Titr Font Files

Place the following font files in this directory. The CSS is already configured to load them automatically when the language is set to Persian (Dari) or Pashto.

## Required files

| File | Weight | Description |
|------|--------|-------------|
| `b-titr.woff2` | 400 / Regular | B Titr regular — used for body text |
| `b-titr.woff` | 400 / Regular | WOFF fallback for older browsers |
| `b-titr.ttf` | 400 / Regular | TTF fallback |
| `b-titr-bold.woff2` | 700 / Bold | B Titr bold — used for headings |
| `b-titr-bold.woff` | 700 / Bold | WOFF fallback |
| `b-titr-bold.ttf` | 700 / Bold | TTF fallback |

## How to get the font

B Titr is a widely distributed Persian display font. You can download it from:
- https://www.p30download.com (search "B Titr")
- https://www.fontiran.com
- Various Persian font pack archives

After downloading, convert to WOFF2/WOFF using https://cloudconvert.com/ttf-to-woff2
and rename the files to match the names above.

## Notes

- If only a single-weight file is available, rename it to both `b-titr.woff2` AND `b-titr-bold.woff2`
- The CSS fallback chain is: "B Titr" → "Vazirmatn" → system Persian fonts
- If `b-titr.woff2` is missing, Vazirmatn (already loaded from Google Fonts) will be used automatically
