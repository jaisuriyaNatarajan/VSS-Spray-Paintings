# Car Paint & Repair - Estimate → PDF (React + Vite + TS)

A minimal app to create a car paint/repair **Estimate** and generate a **PDF** that looks exactly like the on-screen styled preview.

## Tech

- React + Vite + TypeScript
- styled-components
- react-final-form + final-form-arrays
- html2canvas + jsPDF

## Run locally

```bash
# install
yarn

# dev
yarn dev

# build
yarn build
yarn preview
```

> You can use `npm` if you prefer: replace yarn commands with `npm install`, `npm run dev`, etc.

## Notes

- The **Generate PDF** button captures the styled preview using **html2canvas** and pipes it into **jsPDF** with A4 pagination.
- The totals are calculated with simple helpers in `src/utils/currency.ts`.
- You can add more pages (photos, signatures) by extending the `EstimatePreview` height; the PDF pagination will adapt automatically.
