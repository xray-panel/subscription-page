import { getBorderCharacters, table } from 'table';

export async function getStartMessage() {
    return table([['Docs → https://docs.CHANGE-ME.example\nCommunity → https://github.com/CHANGE-ME/xpanel']], {
        header: {
            content: `XPANEL Subscription Page v${__RW_SUBPAGE_VERSION__}`,
            alignment: 'center',
        },
        columnDefault: {
            width: 60,
        },
        columns: {
            0: { alignment: 'center' },
            1: { alignment: 'center' },
        },
        drawVerticalLine: () => false,
        border: getBorderCharacters('ramac'),
    });
}
