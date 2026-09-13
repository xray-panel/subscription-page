import {
    IconAlertCircle,
    IconArrowsUpDown,
    IconCalendar,
    IconCheck,
    IconX
} from '@tabler/icons-react'
import { Badge, Box, Group, Progress, Text, ThemeIcon } from '@mantine/core'
import clsx from 'clsx'

import { formatDate, getExpirationTextUtil } from '@shared/utils/config-parser'
import { useSubscription } from '@entities/subscription-info-store'
import { useTranslation } from '@shared/hooks'

import featuredClasses from './subscription-info-featured.module.css'
import classes from './subscription-info-cards.module.css'

export type TSubscriptionStatusColor = 'orange' | 'red' | 'teal'

export const useSubscriptionStatus = (
    iconSize = 14
): {
    color: TSubscriptionStatusColor
    icon: React.ReactNode
    isActive: boolean
} => {
    const { user } = useSubscription()

    const isActive = user.userStatus === 'ACTIVE'

    if (isActive && user.daysLeft > 3) {
        return { color: 'teal', icon: <IconCheck size={iconSize} />, isActive }
    }
    if (isActive && user.daysLeft > 0) {
        return { color: 'orange', icon: <IconAlertCircle size={iconSize} />, isActive }
    }
    return { color: 'red', icon: <IconX size={iconSize} />, isActive }
}

export const useTrafficProgress = (): { isUnlimited: boolean; percent: number } => {
    const { user } = useSubscription()

    const isUnlimited = user.trafficLimit === '0'
    const limitBytes = Number(user.trafficLimitBytes)
    const usedBytes = Number(user.trafficUsedBytes)

    const percent =
        !isUnlimited && Number.isFinite(limitBytes) && limitBytes > 0
            ? Math.min(100, Math.round((usedBytes / limitBytes) * 100))
            : 0

    return { isUnlimited, percent }
}

export const TrafficFeaturedBlock = () => {
    const { t, baseTranslations } = useTranslation()
    const { user } = useSubscription()
    const { isUnlimited, percent } = useTrafficProgress()

    return (
        <Box className={clsx(featuredClasses.featuredCard, featuredClasses.glowVioletRight)}>
            <Group gap="xs" justify="space-between" wrap="nowrap">
                <Group gap="xs" style={{ minWidth: 0 }} wrap="nowrap">
                    <ThemeIcon
                        className={classes.iconViolet}
                        color="violet"
                        radius="md"
                        size={36}
                        style={{ flexShrink: 0 }}
                        variant="light"
                    >
                        <IconArrowsUpDown size={18} />
                    </ThemeIcon>
                    <Text
                        c="dimmed"
                        className={featuredClasses.label}
                        fw={600}
                        size="xs"
                        tt="uppercase"
                    >
                        {t(baseTranslations.bandwidth)}
                    </Text>
                </Group>
                {isUnlimited && (
                    <Badge color="violet" size="lg" variant="light">
                        ∞
                    </Badge>
                )}
            </Group>

            <Group align="baseline" gap={6} mt="sm" wrap="nowrap">
                <Text className={featuredClasses.value}>{user.trafficUsed}</Text>
                <Text c="dimmed" fw={600} size="sm" style={{ whiteSpace: 'nowrap' }}>
                    / {isUnlimited ? '∞' : user.trafficLimit}
                </Text>
            </Group>

            {!isUnlimited && (
                <Progress
                    color="violet"
                    mt="sm"
                    radius="xl"
                    size="md"
                    value={percent}
                />
            )}
        </Box>
    )
}

export const ExpiresFeaturedBlock = () => {
    const { t, currentLang, baseTranslations } = useTranslation()
    const { user } = useSubscription()
    const status = useSubscriptionStatus()

    return (
        <Box className={clsx(featuredClasses.featuredCard, featuredClasses.glowViolet)}>
            <Group gap="xs" wrap="nowrap">
                <ThemeIcon
                    className={classes.iconViolet}
                    color="violet"
                    radius="md"
                    size={36}
                    style={{ flexShrink: 0 }}
                    variant="light"
                >
                    <IconCalendar size={18} />
                </ThemeIcon>
                <Text
                    c="dimmed"
                    className={featuredClasses.label}
                    fw={600}
                    size="xs"
                    tt="uppercase"
                >
                    {t(baseTranslations.expires)}
                </Text>
            </Group>

            <Text className={featuredClasses.value} mt="sm">
                {formatDate(user.expiresAt, currentLang, baseTranslations)}
            </Text>

            <Box mt="xs">
                <Badge
                    color={status.color}
                    leftSection={status.icon}
                    size="lg"
                    variant="light"
                >
                    {getExpirationTextUtil(user.expiresAt, currentLang, baseTranslations)}
                </Badge>
            </Box>
        </Box>
    )
}
