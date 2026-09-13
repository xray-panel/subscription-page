// RGB values mirror the XLADA palette in `shared/constants/theme/theme.ts`
// (vivid 4-shade, teal/cyan on the turquoise success ramp) so config-driven
// gradients are built from the new ink/violet palette, not old Mantine shades.
const COLORS: Record<string, [number, number, number]> = {
    cyan: [45, 212, 200],
    teal: [20, 184, 174],
    green: [50, 209, 137],
    lime: [130, 201, 30],
    yellow: [236, 180, 36],
    orange: [245, 118, 42],
    red: [231, 53, 81],
    pink: [230, 73, 128],
    grape: [190, 75, 219],
    violet: [139, 107, 247],
    indigo: [92, 124, 250],
    blue: [59, 126, 240],
    gray: [143, 147, 179],
    dark: [93, 96, 137]
}

// Unknown/unnamed colors degrade to the primary accent (violet), not turquoise.
const DEFAULT_COLOR = COLORS.violet

const hexToRgb = (hex: string): [number, number, number] | null => {
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return match ? [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)] : null
}

const getRgb = (color: string): [number, number, number] =>
    COLORS[color] ?? hexToRgb(color) ?? DEFAULT_COLOR

export interface ColorGradientStyle {
    background: string
    border: string
    boxShadow?: string
}

export const getColorGradient = (color: string): ColorGradientStyle => {
    const [r, g, b] = getRgb(color)
    return {
        background: `linear-gradient(135deg, rgba(${r},${g},${b},0.15) 0%, rgba(${r},${g},${b},0.08) 100%)`,
        border: `1px solid rgba(${r},${g},${b},0.3)`
    }
}

export const getColorGradientSolid = (color: string): ColorGradientStyle => {
    const [r, g, b] = getRgb(color)
    // Ink base tones (theme dark-7/dark-8) instead of the old GitHub-dark base.
    const dark1 = [30 + r * 0.08, 32 + g * 0.08, 56 + b * 0.08].map(Math.floor)
    const dark2 = [17 + r * 0.05, 20 + g * 0.05, 39 + b * 0.05].map(Math.floor)

    return {
        background: `linear-gradient(135deg, rgb(${dark1}) 0%, rgb(${dark2}) 100%)`,
        border: `1px solid rgba(${r},${g},${b},0.4)`,
        boxShadow: `inset 0 0 20px rgba(${r},${g},${b},0.15)`
    }
}
