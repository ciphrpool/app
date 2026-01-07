export function format_time(
	minute: number | undefined,
	second: number | undefined
) {
	if (minute === undefined || second === undefined) return "00:00";
	const minutes = minute.toString().padStart(2, "0");
	const seconds = second.toString().padStart(2, "0");
	return `${minutes}:${seconds}`;
}
export function format_time_min(seconds: number) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}min${remainingSeconds}s`;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
	fn: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: number | undefined;
	return (...args: Parameters<T>) => {
		window.clearTimeout(timeout);
		timeout = window.setTimeout(() => fn(...args), wait);
	};
}
