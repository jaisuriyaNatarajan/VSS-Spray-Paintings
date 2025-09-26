export const fmt = (n: number, currency: 'INR' = 'INR') =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(n);

export const lineTotal = (qty: number, rate: number) => qty * rate;

export const lineTax = (subtotal: number, taxPct: number) =>
  (subtotal * (taxPct || 0)) / 100;

export const sumItems = (items: { qty: number; rate: number; taxPct: number }[]) => {
  const subtotal = items.reduce((s, it) => s + lineTotal(it.qty || 0, it.rate || 0), 0);
  const tax = items.reduce(
    (s, it) => s + lineTax(lineTotal(it.qty || 0, it.rate || 0), it.taxPct || 0),
    0,
  );
  return { subtotal, tax, grand: subtotal + tax };
};
