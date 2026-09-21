# Axelis document kit

Four documents, each in **A4 portrait and A4 landscape**, each as **PDF and DOCX**.
Sixteen files, all in `out/`.

```
./build.sh
```

## How it is put together

The four source files here are **orientation-agnostic**. They link a placeholder
stylesheet, `assets/orient-ORIENT.css`, which `build.sh` swaps for the real
portrait or landscape sheet before rendering. One copy of the content, eight
documents out.

| File | Portrait | Landscape |
|---|---|---|
| `01-letterhead` | 1 page | 1 page |
| `02-tax-invoice` | 1 page | 1 page |
| `03-engagement-letter` | 2 pages | 2 pages |
| `04-certificate` | 1 page | 1 page |

## Why landscape sets prose in two columns

A single measure across a 265mm landscape page runs to about 110 characters. The
type scale allows 68. So `orient-landscape.css` puts `.prose` into two columns:
that is a correctness requirement, not a style choice. Tables, the header, the
signature block and the footer stay full width via `.full`.

## Assets

PDFs use the vector assets. **Word cannot embed SVG without `rsvg-convert`**, so
the DOCX pass swaps in the transparent PNGs beside them. Both are in `assets/`.

The header uses the **horizontal** lockup. The stacked lockup is square, so a
34mm header would also be 34mm tall and crowd the sheet.

## Before issuing anything

`03-engagement-letter` carries a visible note that **counsel has not reviewed it**.
That note stays until it has been checked, particularly clauses 3 and 5.
