import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		container: {
			center: true,

			screens: {
				'2xl': '1440px'
			}
		},
		extend: {
			screens: {
				xs: '480px',

				'2xl-container': '1456px',
				'2xl': '1505px'
			},
			height: {
				carousel: 'calc((100vh - 40px) / 3)'
			},
			padding: {
				30: '120px',
				46: '184px'
			},
			flexBasis: {
				'1/7': '14.2857143%'
			},
			spacing: {
				'1/2dvh': '50dvh',
				'1/2-video': 'calc(50% + 80px)'
			},
			borderRadius: {
				container: '8px'
			},
			aspectRatio: {
				'3/4': '3 / 4',
				'4/3': '4 / 3'
			},

			fontFamily: {
				sans: ['soehne', ...fontFamily.sans]
			},

			fontSize: {
				'display-4xl': [
					'7rem',
					{
						lineHeight: '6.3rem',
						letterSpacing: '-0.02em'
					}
				],
				'display-3xl': [
					'5rem',
					{
						lineHeight: '5.25rem',
						letterSpacing: '-0.02em'
					}
				],
				'display-2xl': [
					'4.5rem',
					{
						lineHeight: '4.725rem',
						letterSpacing: '-0.02em'
					}
				],
				'display-xl': [
					'3.75rem',
					{
						lineHeight: '3.15rem',
						letterSpacing: '-0.02em'
					}
				],
				'display-lg': [
					'3rem',
					{
						lineHeight: '3.75rem',
						letterSpacing: '-0.02em'
					}
				],
				'display-md': [
					'2.25rem',
					{
						lineHeight: '2.75rem',
						letterSpacing: '-0.02em'
					}
				],
				'display-sm': [
					'1.875rem',
					{
						lineHeight: '2.375rem'
					}
				],
				'display-xs': [
					'1.5rem',
					{
						lineHeight: '2rem'
					}
				],
				xs: [
					'0.75rem',
					{
						lineHeight: '1.125rem'
					}
				]
			},

			textColor: {
				primary: 'var(--text-primary)',
				secondary: 'var(--text-secondary)',
				'secondary--hover': 'var(--text-secondary--hover)',
				tertiary: 'var(--text-tertiary)',
				'tertiary--hover': 'var(--text-tertiary--hover)',
				white: 'var(--text-white)',
				disabled: 'var(--text-disabled)',
				// placeholder: 'var(--text-placeholder)',
				// 'placeholder--subtle': 'var(--text-placeholder--subtle)',
				'brand-primary': 'var(--text-brand-primary)',
				'brand-secondary': 'var(--text-brand-secondary)',
				'brand-tertiary': 'var(--text-brand-tertiary)'
				// 'error-primary': 'var(--text-error-primary)',
				// 'warning-primary': 'var(--text-warning-primary)',
				// 'success-primary': 'var(--text-success-primary)'
			},
			borderColor: {
				primary: 'var(--border-primary)',
				secondary: 'var(--border-secondary)'
				// tertiary: 'var(--border-tertiary)',
				// disabled: 'var(--border-disabled)',
				// 'disabled--subtle': 'var(--border-disabled--subtle)',
				// brand: 'var(--border-brand)',
				// 'brand-solid': 'var(--border-brand-solid)',
				// error: 'var(--border-error)',
				// 'error-solid': 'var(--border-error-solid)'
			},
			backgroundColor: {
				primary: 'var(--bg-primary)',
				'primary--hover': 'var(--bg-primary--hover)',
				'primary-solid': 'var(--bg-primary-solid)',
				secondary: 'var(--bg-secondary)',
				'secondary--hover': 'var(--bg-secondary--hover)',
				'secondary--subtle': 'var(--bg-secondary--subtle)',
				'secondary-solid': 'var(--bg-secondary-solid)',
				tertiary: 'var(--bg-tertiary)',
				quaternary: 'var(--bg-quaternary)',
				active: 'var(--bg-active)',
				disabled: 'var(--bg-disabled)',
				'disabled--subtle': 'var(--bg-disabled--subtle)',
				overlay: 'var(--bg-overlay)',
				'brand-primary': 'var(--bg-brand-primary)',
				'brand-secondary': 'var(--bg-brand-secondary)',
				'brand-solid': 'var(--bg-brand-solid)',
				'brand-solid--hover': 'var(--bg-brand-solid--hover)',
				'brand-section': 'var(--bg-brand-section)',
				'brand-section--subtle': 'var(--bg-brand-section--subtle)'
				// 'error-primary': 'var(--bg-error-primary)',
				// 'error-secondary': 'var(--bg-error-secondary)',
				// 'error-solid': 'var(--bg-error-solid)',
				// 'warning-primary': 'var(--bg-warning-primary)',
				// 'warning-secondary': 'var(--bg-warning-secondary)',
				// 'warning-solid': 'var(--bg-warning-solid)',
				// 'success-primary': 'var(--bg-success-primary)',
				// 'success-secondary': 'var(--bg-success-secondary)',
				// 'success-solid': 'var(--bg-success-solid)'
			},

			colors: {
				foreground: {
					primary: 'var(--fg-primary)',
					secondary: 'var(--fg-secondary)',
					'secondary--hover': 'var(--fg-secondary--hover)',
					tertiary: 'var(--fg-tertiary)',
					'tertiary--hover': 'var(--fg-tertiary--hover)',
					quaternary: 'var(--fg-quaternary)',
					'quaternary--hover': 'var(--fg-quaternary--hover)',
					white: 'var(--fg-white)',
					disabled: 'var(--fg-disabled)',
					'disabled--subtle': 'var(--fg-disabled--subtle)',
					'brand-primary': 'var(--fg-brand-primary)',
					'brand-secondary': 'var(--fg-brand-secondary)'
					// 'error-primary': 'var(--fg-error-primary)',
					// 'error-secondary': 'var(--fg-error-secondary)',
					// 'warning-primary': 'var(--fg-warning-primary)',
					// 'warning-secondary': 'var(--fg-warning-secondary)',
					// 'success-primary': 'var(--fg-success-primary)',
					// 'success-secondary': 'var(--fg-success-secondary)'
				},
				// "bg-primary": "var(--bg-primary)",
				border: 'hsl(var(--border))',
				// input: 'hsl(var(--input))',
				// ring: 'hsl(var(--ring))',

				// prettier-ignore
				utility: {
					background: "rgb(from var(--utility-background) r g b / <alpha-value>)",
					"gray-50": "rgb(from var(--utility-gray-50) r g b / <alpha-value>)",
					"gray-100": "rgb(from var(--utility-gray-100) r g b / <alpha-value>)",
					"gray-200": "rgb(from var(--utility-gray-200) r g b / <alpha-value>)",
					"gray-200": "rgb(from var(--utility-gray-200) r g b / <alpha-value>)",
					"gray-300": "rgb(from var(--utility-gray-300) r g b / <alpha-value>)",
					"gray-400": "rgb(from var(--utility-gray-400) r g b / <alpha-value>)",
					"gray-500": "rgb(from var(--utility-gray-500) r g b / <alpha-value>)",
					"gray-600": "rgb(from var(--utility-gray-600) r g b / <alpha-value>)",
					"gray-700": "rgb(from var(--utility-gray-700) r g b / <alpha-value>)",
					"gray-800": "rgb(from var(--utility-gray-800) r g b / <alpha-value>)",
					"gray-900": "rgb(from var(--utility-gray-900) r g b / <alpha-value>)",

					"brand-50": "rgb(from var(--utility-brand-50) r g b / <alpha-value>)",
					"brand-100": "rgb(from var(--utility-brand-100) r g b / <alpha-value>)",
					"brand-200": "rgb(from var(--utility-brand-200) r g b / <alpha-value>)",
					"brand-200": "rgb(from var(--utility-brand-200) r g b / <alpha-value>)",
					"brand-300": "rgb(from var(--utility-brand-300) r g b / <alpha-value>)",
					"brand-400": "rgb(from var(--utility-brand-400) r g b / <alpha-value>)",
					"brand-500": "rgb(from var(--utility-brand-500) r g b / <alpha-value>)",
					"brand-600": "rgb(from var(--utility-brand-600) r g b / <alpha-value>)",
					"brand-700": "rgb(from var(--utility-brand-700) r g b / <alpha-value>)",
					"brand-800": "rgb(from var(--utility-brand-800) r g b / <alpha-value>)",
					"brand-900": "rgb(from var(--utility-brand-900) r g b / <alpha-value>)",
				},

				btn: {
					'primary-fg': 'var(--btn-primary-fg)',
					'primary-fg--hover': 'var(--btn-primary-fg--hover)',
					'primary-bg': 'var(--btn-primary-bg)',
					'primary-bg--hover': 'var(--btn-primary-bg--hover)',

					'secondary-fg': 'var(--btn-secondary-fg)',
					'secondary-fg--hover': 'var(--btn-secondary-fg--hover)',
					'secondary-bg': 'var(--btn-secondary-bg)',
					'secondary-bg--hover': 'var(--btn-secondary-bg--hover)',

					'secondary-color-fg': 'var(--btn-secondary-color-fg)',
					'secondary-color-fg--hover': 'var(--btn-secondary-color-fg--hover)',
					'secondary-color-bg': 'var(--btn-secondary-color-bg)',
					'secondary-color-bg--hover': 'var(--btn-secondary-color-bg--hover)',

					'tertiary-fg': 'var(--btn-tertiary-fg)',
					'tertiary-fg--hover': 'var(--btn-tertiary-fg--hover)',
					'tertiary-bg--hover': 'var(--btn-tertiary-bg--hover)'
					// 'tertiary-color-fg': 'var(--btn-tertiary-color-fg)'
				}
			},

			borderRadius: {
				// xxs: 'calc(var(--radius) - 8px)',
				// xs: 'calc(var(--radius) - 6px)',
				xs: 'calc(var(--radius) - 4px)',
				sm: 'calc(var(--radius) - 2px)',
				md: 'var(--radius)',
				lg: 'calc(var(--radius) + 2px)',
				xl: 'calc(var(--radius) + 4px)'
				// '2xl': 'calc(var(--radius) + 8px)',
				// '3xl': 'calc(var(--radius) + 12px)',
				// '3xl': 'calc(var(--radius) + 16px)'
			},

			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				}
			},
			animation: {
				fadeIn: 'fadeIn 0.3s ease-in-out'
			}
		}
	},
	plugins: [
		function ({ addComponents }) {
			addComponents({
				'.hero-container': {
					maxWidth: '1920px',
					marginLeft: 'auto',
					marginRight: 'auto',
					paddingTop: '120px',
					padding: '0px'
				},

				'.section-padding': {
					padding: '0px 16px 0px 16px',
					'@screen md': {
						padding: '0px 24px 0px 24px'
					}
				},
				'.mdx-padding': {
					padding: '0px 20px 0px 20px',
					'@screen md': {
						padding: '0px 24px 0px 24px'
					},
					'@screen 2xl': {
						padding: '0px 0px 0px 0px'
					}
				}
			})
		},
		require('tailwindcss-animate'),
		require('@tailwindcss/typography')
	]
}
