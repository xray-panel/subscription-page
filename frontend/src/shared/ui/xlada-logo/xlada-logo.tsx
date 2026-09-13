import { Box, BoxProps, ElementProps } from '@mantine/core'
import { useId } from 'react'

interface XladaLogoProps
    extends ElementProps<'svg', keyof BoxProps>, Omit<BoxProps, 'children' | 'ref'> {
    size?: number | string
}

/**
 * XLADA brand mark: an «X» monogram drawn with two rounded strokes
 * and a violet → turquoise gradient. Distinct from the vendor's wave mark.
 */
export function XladaLogo({ size = 32, style, ...props }: XladaLogoProps) {
    const gradientId = `xlada-logo-${useId().replace(/:/g, '')}`

    return (
        <Box
            component="svg"
            fill="none"
            style={{ width: size, height: size, ...style }}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <defs>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id={gradientId}
                    x1="4"
                    x2="20"
                    y1="4"
                    y2="20"
                >
                    <stop stopColor="#8b6bf7" />
                    <stop offset="1" stopColor="#2dd4c8" />
                </linearGradient>
            </defs>
            <path
                d="M6 6l12 12"
                stroke={`url(#${gradientId})`}
                strokeLinecap="round"
                strokeWidth={3.4}
            />
            <path
                d="M18 6L6 18"
                stroke={`url(#${gradientId})`}
                strokeLinecap="round"
                strokeWidth={3.4}
            />
        </Box>
    )
}
