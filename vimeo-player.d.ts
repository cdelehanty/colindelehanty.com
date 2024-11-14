declare module '@vimeo/player' {
	export default class Player {
		constructor(element: HTMLIFrameElement, options?: object)
		on(event: string, callback: () => void): void
		pause(): void
		play(): void
		getCurrentTime(): Promise<number>
		setCurrentTime(time: number): void
	}
}
