import {
    IconBrandDiscord,
    IconBrandTelegram,
    IconBrandVk,
    IconCheck,
    IconCopy,
    IconLink,
    IconMessageChatbot
} from '@tabler/icons-react'
import { ActionIcon, Button, Group, Image, Stack, Text, Tooltip } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useClipboard } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { renderSVG } from 'uqr'

import { constructSubscriptionUrl } from '@shared/utils/construct-subscription-url'
import { useSubscription } from '@entities/subscription-info-store'
import { vibrate } from '@shared/utils/vibrate'
import { useTranslation } from '@shared/hooks'

import classes from './subscription-link.module.css'

interface IProps {
    hideGetLink: boolean
    supportUrl: string
}

export const SubscriptionLinkWidget = ({ supportUrl, hideGetLink }: IProps) => {
    const { t, baseTranslations } = useTranslation()
    const subscription = useSubscription()
    const clipboard = useClipboard({ timeout: 10000 })

    const subscriptionUrl = constructSubscriptionUrl(
        window.location.href,
        subscription.user.shortUuid
    )

    const handleCopy = () => {
        notifications.show({
            title: t(baseTranslations.linkCopied),
            message: t(baseTranslations.linkCopiedToClipboard),
            color: 'cyan'
        })
        clipboard.copy(subscriptionUrl)
    }

    const renderSupportLink = (supportUrl: string) => {
        const iconConfig = {
            't.me': { icon: IconBrandTelegram, color: '#0088cc' },
            'discord.com': { icon: IconBrandDiscord, color: '#5865F2' },
            'vk.com': { icon: IconBrandVk, color: '#0077FF' }
        }

        const matchedPlatform = Object.entries(iconConfig).find(([domain]) =>
            supportUrl.includes(domain)
        )

        const { icon: Icon, color } = matchedPlatform
            ? matchedPlatform[1]
            : { icon: IconMessageChatbot, color: 'violet' }

        return (
            <ActionIcon
                c={color}
                className={classes.supportActionIcon}
                component="a"
                href={supportUrl}
                radius="md"
                rel="noopener noreferrer"
                size="xl"
                target="_blank"
                variant="default"
            >
                <Icon />
            </ActionIcon>
        )
    }

    const handleGetLink = () => {
        vibrate('tap')

        const subscriptionQrCode = renderSVG(subscriptionUrl, {
            whiteColor: '#111427',
            blackColor: '#a78bfa'
        })

        modals.open({
            centered: true,
            title: t(baseTranslations.getLink),
            classNames: {
                content: classes.modalContent,
                header: classes.modalHeader,
                title: classes.modalTitle
            },
            children: (
                <Stack align="center">
                    <Image
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(subscriptionQrCode)}`}
                        style={{ borderRadius: 'var(--mantine-radius-md)' }}
                    />
                    <Text c="white" fw={700} size="lg" ta="center">
                        {t(baseTranslations.scanQrCode)}
                    </Text>
                    <Text c="dimmed" size="sm" ta="center">
                        {t(baseTranslations.scanQrCodeDescription)}
                    </Text>

                    <Button
                        color={clipboard.copied ? 'teal' : undefined}
                        fullWidth
                        gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
                        leftSection={clipboard.copied ? <IconCheck /> : <IconCopy />}
                        onClick={handleCopy}
                        radius="md"
                        size="md"
                        variant={clipboard.copied ? 'light' : 'gradient'}
                    >
                        {clipboard.copied
                            ? t(baseTranslations.linkCopied)
                            : t(baseTranslations.copyLink)}
                    </Button>
                </Stack>
            )
        })
    }

    return (
        <Group gap="xs" ml="auto" wrap="nowrap">
            {!hideGetLink && (
                <Tooltip label={t(baseTranslations.getLink)} position="bottom" withArrow>
                    <ActionIcon
                        className={classes.linkActionIcon}
                        onClick={handleGetLink}
                        radius="md"
                        size="xl"
                        variant="filled"
                    >
                        <IconLink />
                    </ActionIcon>
                </Tooltip>
            )}

            {supportUrl !== '' && renderSupportLink(supportUrl)}
        </Group>
    )
}
