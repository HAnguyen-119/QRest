export const formatCurrency = (amount: number) => {
    return amount ? `$${amount.toFixed(2)}` : '$0.00';
};