

export function format_time(minute:number|undefined,second:number|undefined) {
    if (minute === undefined || second === undefined) return "00:00"
    const minutes = minute.toString().padStart(2, '0');
    const seconds = second.toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}