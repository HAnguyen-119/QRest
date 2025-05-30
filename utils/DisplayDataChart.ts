export const DisplayDataChart = (data: number[]) => {
    const maxIndex = data.reduce((maxIdx, val, idx, arr) => val > arr[maxIdx] ? idx : maxIdx, 0);

    const windowSize = 5;
    let start = Math.max(0, maxIndex - Math.floor(windowSize / 2));
    let end = start + windowSize;
    if (end > data.length) {
        end = data.length;
        start = Math.max(0, end - windowSize);
    }
    
    return data.slice(start, end);
}