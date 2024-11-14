import { useRef, useState, useEffect, useCallback } from 'react'

export const useVideoControls = (delay: number = 2000) => {
	const videoRefs = useRef<HTMLVideoElement[]>([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isPaused, setIsPaused] = useState(false)

	const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

	const setVideoOpacity = (video: HTMLVideoElement, opacity: string) => {
		video.style.transition = 'opacity 1s' // Add transition for opacity
		video.style.opacity = opacity // Set opacity
	}

	const resetVideo = useCallback((index: number) => {
		// Clear previous timeouts to prevent issues when changing indexes quickly
		timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId))
		timeoutsRef.current = [] // Reset timeout array

		videoRefs.current.forEach((video, i) => {
			if (video) {
				if (i === index) {
					// Ensure the active video is visible
					setVideoOpacity(video, '0') // Set initial opacity to 0
					video.currentTime = 0
					video.pause() // Ensure the video is paused initially

					// Set a new timeout for the current video
					const timeoutId = setTimeout(() => {
						setVideoOpacity(video, '1') // Change opacity to 1
						video.play().catch((err) => console.error('Error playing video:', err))
					}, 5000) // Delay playback by 5 seconds

					// Store this timeout ID in the ref
					timeoutsRef.current.push(timeoutId)
				} else {
					// Hide other videos and pause them
					video.pause()
					video.currentTime = 0 // Reset time to 0 for non-current videos
					setVideoOpacity(video, '0') // Set opacity to 0 for non-current videos
				}
			}
		})
		setIsPaused(false)
	}, [])

	const handleVideoPlayback = useCallback(
		(index: number, initialLoadComplete: boolean) => {
			const videoElement = videoRefs.current[index]
			if (videoElement && initialLoadComplete) {
				// Add event listener for 'ended' event
				const handleVideoEnd = () => {
					setVideoOpacity(videoElement, '0')
				}
				videoElement.addEventListener('ended', handleVideoEnd)

				if (index === currentIndex) {
					setVideoOpacity(videoElement, '1') // Change opacity to 1
					videoElement.play().catch((error) => {
						console.log('Video play failed:', error)
					})
				}
			}
		},
		[currentIndex]
	)

	const togglePause = () => {
		const currentVideo = videoRefs.current[currentIndex]
		if (currentVideo) {
			if (isPaused) {
				currentVideo.play().catch((err) => console.error('Error playing video:', err))
			} else {
				currentVideo.pause()
			}
			setIsPaused(!isPaused)
		}
	}

	useEffect(() => {
		resetVideo(currentIndex)
	}, [currentIndex, resetVideo])

	useEffect(() => {
		const currentVideo = videoRefs.current[currentIndex]
		if (currentVideo) {
			const updatePausedState = () => setIsPaused(currentVideo.paused)

			currentVideo.addEventListener('play', updatePausedState)
			currentVideo.addEventListener('pause', updatePausedState)

			return () => {
				currentVideo.removeEventListener('play', updatePausedState)
				currentVideo.removeEventListener('pause', updatePausedState)
			}
		}
	}, [currentIndex])

	return {
		videoRefs,
		currentIndex,
		setCurrentIndex,
		isPaused,
		resetVideo,
		togglePause,
		handleVideoPlayback // Export the new function
	}
}
