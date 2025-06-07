export const CombineDateTime = (date: Date, time: Date) => {
    const local = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
        time.getMilliseconds()
    )

    const offsetMs = local.getTimezoneOffset() * 60 * 1000;
    return new Date(local.getTime() - offsetMs)
}