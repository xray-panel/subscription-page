import { Button, Container, Group, Text, Title } from '@mantine/core'
import { useNavigate } from 'react-router'

import { useCurrentLang } from '@entities/app-config-store'
import { getLocalizedText } from '@shared/utils/config-parser'

import { SERVER_ERROR_TRANSLATIONS } from './server-error.translations'
import classes from './ServerError.module.css'

export function ErrorPageComponent() {
    const navigate = useNavigate()
    const currentLang = useCurrentLang()

    const handleRefresh = () => {
        navigate(0)
    }

    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.label}>500</div>
                <Title className={classes.title}>
                    {getLocalizedText(SERVER_ERROR_TRANSLATIONS.title, currentLang)}
                </Title>
                <Text className={classes.description} size="lg" ta="center">
                    {getLocalizedText(SERVER_ERROR_TRANSLATIONS.description, currentLang)}
                </Text>
                <Group justify="center">
                    <Button
                        gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
                        onClick={handleRefresh}
                        radius="md"
                        size="md"
                        variant="gradient"
                    >
                        {getLocalizedText(SERVER_ERROR_TRANSLATIONS.refresh, currentLang)}
                    </Button>
                </Group>
            </Container>
        </div>
    )
}
