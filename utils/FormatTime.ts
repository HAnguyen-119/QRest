export const getDate = (time: Date) => {
    return time.toString().split('T')[0]
}

export const getTime = (time: Date) => {
    return time.toString().split('T')[1]
}