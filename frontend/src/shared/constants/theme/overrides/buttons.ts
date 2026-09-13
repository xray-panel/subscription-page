import { ActionIcon, Button } from '@mantine/core'

export default {
    ActionIcon: ActionIcon.extend({
        defaultProps: {
            radius: 'md',
            variant: 'outline'
        }
    }),
    Button: Button.extend({
        defaultProps: {
            radius: 'md',
            variant: 'outline'
        }
    })
}
