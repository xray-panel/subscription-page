import { createTheme } from '@mantine/core'

import components from './overrides'

export const theme = createTheme({
    components,
    cursorType: 'pointer',
    fontFamily:
        'Montserrat, Vazirmatn, Apple Color Emoji, Noto Sans SC, Twemoji Country Flags, sans-serif',
    fontFamilyMonospace: 'Fira Mono, monospace',
    breakpoints: {
        xs: '25em',
        sm: '30em',
        md: '48em',
        lg: '64em',
        xl: '80em',
        '2xl': '96em',
        '3xl': '120em',
        '4xl': '160em'
    },
    scale: 1,
    fontSmoothing: true,
    focusRing: 'never',
    white: '#ffffff',
    black: '#0b0d1a',
    colors: {
        // XLADA «ink» scale: deep blue-violet instead of neutral GitHub gray.
        // 0 — primary text, 6 — borders, 7 — filled/card surfaces,
        // 8–9 — page background depths.
        dark: [
            '#eceef8',
            '#c9cce3',
            '#a3a6c6',
            '#7e81aa',
            '#5d6089',
            '#464870',
            '#323455',
            '#1e2038',
            '#111427',
            '#0b0d1a'
        ],

        // Violet-gray neutrals, tuned to the ink background.
        gray: [
            '#f1f2f9',
            '#d8daea',
            '#b7bacf',
            '#8f93b3',
            '#6b6f94',
            '#545778',
            '#42445f',
            '#33344b',
            '#262737',
            '#1a1b26'
        ],

        // Primary XLADA accent, centered on #7c5cff.
        violet: [
            '#f0edff',
            '#ddd6fe',
            '#c3b5fd',
            '#a78bfa',
            '#8b6bf7',
            '#7c5cff',
            '#6a48f0',
            '#5839d6',
            '#462eb0',
            '#37248c'
        ],

        // Secondary turquoise accent (success highlights).
        cyan: [
            '#e0fbfa',
            '#bef5f1',
            '#8cebe6',
            '#56ded8',
            '#2dd4c8',
            '#14b8ae',
            '#0e938c',
            '#0d766f',
            '#0c5f5a',
            '#084845'
        ],

        // Semantic palettes — meanings unchanged (error / warning / etc.).
        red: [
            '#ffe9ec',
            '#ffcdd3',
            '#f59aa5',
            '#ef6478',
            '#e73551',
            '#d21f3f',
            '#b01535',
            '#8d112c',
            '#6b0e24',
            '#4f0b1c'
        ],
        blue: [
            '#e5f0ff',
            '#c2d9ff',
            '#8fbaff',
            '#5f9bfa',
            '#3b7ef0',
            '#2563eb',
            '#1d4fd0',
            '#173eab',
            '#142f85',
            '#102463'
        ],
        green: [
            '#e6fbf0',
            '#c3f5da',
            '#92ecc0',
            '#5ce0a4',
            '#32d189',
            '#1cb872',
            '#149e62',
            '#0f7e50',
            '#0d6543',
            '#0b4f35'
        ],
        yellow: [
            '#fdf6dd',
            '#fbebb0',
            '#f7dd7c',
            '#f2cb4e',
            '#ecb424',
            '#d99e0b',
            '#b88207',
            '#946706',
            '#755206',
            '#5c3f06'
        ],
        orange: [
            '#fff1e5',
            '#ffdcc2',
            '#ffb98a',
            '#fd9454',
            '#f5762a',
            '#e05f12',
            '#c04f0d',
            '#9d400c',
            '#7d330c',
            '#62270b'
        ]
    },
    primaryShade: {
        light: 6,
        dark: 5
    },
    primaryColor: 'violet',
    autoContrast: true,
    luminanceThreshold: 0.3,
    headings: {
        fontFamily: 'Montserrat, Vazirmatn, Apple Color Emoji, Noto Sans SC, sans-serif',
        fontWeight: '700',
        sizes: {
            h1: { fontSize: '2.5rem', lineHeight: '1.15' },
            h2: { fontSize: '2.05rem', lineHeight: '1.2' },
            h3: { fontSize: '1.7rem', lineHeight: '1.25' },
            h4: { fontSize: '1.4rem', lineHeight: '1.3' },
            h5: { fontSize: '1.15rem', lineHeight: '1.35' },
            h6: { fontSize: '1rem', lineHeight: '1.4' }
        }
    },
    // Larger rounding across the board: cards use `lg` (18px),
    // inputs and buttons use `md` (12px).
    radius: {
        xs: '6px',
        sm: '9px',
        md: '12px',
        lg: '18px',
        xl: '26px'
    },
    shadows: {
        xs: '0 1px 3px rgba(3, 4, 14, 0.4)',
        sm: '0 2px 8px rgba(3, 4, 14, 0.45)',
        md: '0 8px 24px rgba(3, 4, 14, 0.5), 0 0 0 1px rgba(139, 107, 247, 0.06)',
        lg: '0 16px 40px rgba(3, 4, 14, 0.55), 0 0 0 1px rgba(139, 107, 247, 0.08)',
        xl: '0 24px 64px rgba(3, 4, 14, 0.6), 0 0 32px rgba(124, 92, 255, 0.12)'
    },
    defaultRadius: 'md'
})
