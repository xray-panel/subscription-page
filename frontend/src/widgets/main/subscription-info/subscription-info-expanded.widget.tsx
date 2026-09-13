import { IconCheck, IconUserScan, IconX } from '@tabler/icons-react'
import { Badge, Card, Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'

import { getColorGradientSolid, getExpirationTextUtil } from '@shared/utils/config-parser'
import { InfoBlockShared } from '@shared/ui/info-block/info-block.shared'
import { useSubscription } from '@entities/subscription-info-store'
import { useTranslation } from '@shared/hooks'

import {
    ExpiresFeaturedBlock,
    TrafficFeaturedBlock,
    useSubscriptionStatus
} from './subscription-info-featured-blocks'

interface IProps {
    isMobile: boolean
}

export const SubscriptionInfoExpandedWidget = ({ isMobile }: IProps) => {
    const { t, currentLang, baseTranslations } = useTranslation()
    const subscription = useSubscription()

    const { user } = subscription

    const status = useSubscriptionStatus(isMobile ? 18 : 22)
    const badgeStatus = useSubscriptionStatus(14)
    const gradientColor = getColorGradientSolid(status.color)

    const statusText = status.isActive
        ? t(baseTranslations.active)
        : t(baseTranslations.inactive)

    return (
        <Card p={{ base: 'sm', xs: 'md', sm: 'lg', md: 'xl' }} radius="lg">
            <Stack gap={isMobile ? 'sm' : 'md'}>
                <Group gap="sm" justify="space-between" wrap="nowrap">
                    <Group
                        gap={isMobile ? 'xs' : 'sm'}
                        style={{ minWidth: 0, flex: 1 }}
                        wrap="nowrap"
                    >
                        <ThemeIcon
                            color={status.color}
                            radius="xl"
                            size={isMobile ? 36 : 44}
                            style={{
                                background: gradientColor.background,
                                border: gradientColor.border,
                                boxShadow: gradientColor.boxShadow,
                                flexShrink: 0
                            }}
                            variant="light"
                        >
                            {status.icon}
                        </ThemeIcon>

                        <Stack gap={2} style={{ minWidth: 0, flex: 1 }}>
                            <Title
                                c="white"
                                fw={700}
                                order={4}
                                style={{
                                    letterSpacing: '-0.02em',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {user.username}
                            </Title>
                            <Text
                                c={user.daysLeft <= 0 ? 'red' : 'dimmed'}
                                fw={600}
                                size={isMobile ? 'xs' : 'sm'}
                            >
                                {getExpirationTextUtil(
                                    user.expiresAt,
                                    currentLang,
                                    baseTranslations
                                )}
                            </Text>
                        </Stack>
                    </Group>

                    {!isMobile && (
                        <Badge
                            color={badgeStatus.color}
                            leftSection={badgeStatus.icon}
                            size="xl"
                            style={{ flexShrink: 0 }}
                            variant="light"
                        >
                            {statusText}
                        </Badge>
                    )}
                </Group>

                {/* Primary tier: traffic and expiration, rendered large. */}
                <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="xs" verticalSpacing="xs">
                    <TrafficFeaturedBlock />
                    <ExpiresFeaturedBlock />
                </SimpleGrid>

                {/* Secondary tier: supporting details, smaller and muted. */}
                <SimpleGrid cols={{ base: 2, xs: 2, sm: 2 }} spacing="xs" verticalSpacing="xs">
                    <InfoBlockShared
                        color="blue"
                        icon={<IconUserScan size={16} />}
                        title={t(baseTranslations.name)}
                        value={user.username}
                    />

                    <InfoBlockShared
                        color={user.userStatus === 'ACTIVE' ? 'green' : 'red'}
                        icon={
                            user.userStatus === 'ACTIVE' ? (
                                <IconCheck size={16} />
                            ) : (
                                <IconX size={16} />
                            )
                        }
                        title={t(baseTranslations.status)}
                        value={statusText}
                    />
                </SimpleGrid>
            </Stack>
        </Card>
    )
}
