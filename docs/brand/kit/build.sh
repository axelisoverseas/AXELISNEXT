#!/bin/bash
# Build the Axelis document kit: every document in A4 portrait AND A4 landscape,
# each as PDF and DOCX.
#
# The four source files in this directory are orientation-agnostic. They link a
# placeholder stylesheet, assets/orient-ORIENT.css, which this script swaps for
# the real portrait or landscape sheet before rendering. That keeps one copy of
# the content rather than eight.
#
# Word cannot embed SVG without rsvg-convert, so the DOCX pass swaps the vector
# assets for the transparent PNGs beside them. The PDFs keep the vectors.
#
# Usage:  ./build.sh        (run from docs/brand/kit)

set -u
cd "$(dirname "$0")"
KIT="$PWD"
OUT="$KIT/out"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DOCS="01-letterhead 02-tax-invoice 03-engagement-letter 04-certificate"

[ -x "$CHROME" ] || { echo "Chrome not found at $CHROME"; exit 1; }
command -v pandoc >/dev/null || { echo "pandoc not on PATH"; exit 1; }

mkdir -p "$OUT"
rm -f "$OUT"/*.html "$OUT"/*.pdf "$OUT"/*.docx

for doc in $DOCS; do
  for orient in portrait landscape; do
    stem="$doc-$orient"

    # PDF build: real orientation stylesheet, vector assets.
    # Asset paths are rewritten absolute, because the build lands in out/ and a
    # relative assets/ would resolve to out/assets/ and silently 404 — which it
    # did, producing portrait and landscape files that were byte-identical
    # because no stylesheet loaded at all.
    sed -e "s|assets/orient-ORIENT.css|assets/orient-$orient.css|" \
        -e "s|href=\"assets/|href=\"$KIT/assets/|g" \
        -e "s|src=\"assets/|src=\"$KIT/assets/|g" "$doc.html" > "$OUT/$stem.html"
    "$CHROME" --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
      --print-to-pdf="$OUT/$stem.pdf" "file://$OUT/$stem.html" >/dev/null 2>&1

    # DOCX build: same, but rasterised assets Word can actually embed
    sed -e "s|axelis-lockup-navy.svg|axelis-lockup-navy.png|" \
        -e "s|axelis-lockup-h-navy.svg|axelis-lockup-h-navy.png|" \
        -e "s|axelis-seal-certificate.svg|axelis-seal-certificate.png|" \
        "$OUT/$stem.html" > "$OUT/.$stem.docx.html"
    pandoc "$OUT/.$stem.docx.html" -f html -t docx -o "$OUT/$stem.docx" \
      --resource-path="$KIT" 2>/dev/null
    rm -f "$OUT/.$stem.docx.html"

    pages=$(python3 -c "
import re,sys
try:
    d=open('$OUT/$stem.pdf','rb').read()
    print(len(re.findall(rb'/Type\s*/Page[^s]',d)))
except Exception: print('?')")
    printf "  %-34s %s page(s)  pdf %7s  docx %7s\n" "$stem" "$pages" \
      "$(stat -f %z "$OUT/$stem.pdf" 2>/dev/null || echo -)" \
      "$(stat -f %z "$OUT/$stem.docx" 2>/dev/null || echo -)"
  done
done

echo
echo "8 documents, 16 files, in $OUT"
