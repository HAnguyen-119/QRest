export const getDate = (time: Date) => {
    return time.toString().split('T')[0]
}

export const getTime = (time: Date) => {
    return time.toString().split('T')[1]
}

export const formatDateString = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
};