export const ChangeMoneyUnit = (money: number) => {
    if (money < 1000) {
        return `$${money}`
    } else if (money < 1000000) {
        return `$${(money / 1000).toFixed(2)}k`
    } else if (money < 1000000000) {
        return `$${(money / 1000000).toFixed(2)}m`
    } else if (money < 1000000000000) {
        return `$${(money / 1000000000).toFixed(2)}b`
    } else if (money < 1000000000000000) {
        return `$${(money / 1000000000000).toFixed(2)}t`
    } else {
        return `lol bro, your db is wrong, u got too much money, didn't you?`
    }
}