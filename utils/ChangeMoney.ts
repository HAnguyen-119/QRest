const rates = 25973.0158

export const convertUSDtoVND = (amountUSD: number) => {
    return (amountUSD * rates).toFixed(2)
}
