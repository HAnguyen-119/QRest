import { StatisticType } from "@/constants/Types/statistic";

export const GetStatisticColor = (type: StatisticType) => {
    let lightColor = ''
    let darkColor = ''

    switch (type) {
        case 'food':
            lightColor = '#01befe'
            darkColor = '#797d62'
            break
        case 'combo':
            lightColor = '#ffdd00'
            darkColor = '#9b9b7a'
            break
        case 'order':
            lightColor = '#ff7d00'
            darkColor = '#f1dca7'
            break
        case 'table':
            lightColor = '#ff006d'
            darkColor = '#d08c60'
            break
        case 'payment':
            lightColor = '#adff02'
            darkColor = '#997b66'
            break
        case 'staff':
            lightColor = '#8f00ff'
            darkColor = '#b59e8a'
            break
    }

    return {light: lightColor, dark: darkColor}
}
