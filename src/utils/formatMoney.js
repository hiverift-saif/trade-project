const formatMoney = (n) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);

export { formatMoney };