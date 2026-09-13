import { getBorderCharacters, table } from 'table';

export async function getStartMessage() {
    return table([['Docs → https://xlada.app\nCommunity → https://t.me/x_lada']], {
        header: {
            content: `XLADA Subscription Page v${__RW_SUBPAGE_VERSION__}`,
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
