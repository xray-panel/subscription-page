import { TSubscriptionPageLocalizedText } from '@remnawave/subscription-page-types'

/**
 * XLADA: страница 500 — это fallback корневого ErrorBoundary. Она обязана
 * отрисоваться даже тогда, когда app-config ещё не загружен (или не смог
 * загрузиться), поэтому брать тексты из `baseTranslations` здесь нельзя.
 * Вместо этого используется встроенный набор локализованных текстов в том же
 * формате (`TSubscriptionPageLocalizedText`), который резолвится через общий
 * `getLocalizedText`. Покрыты все языки из LANGUAGE_CODES.
 */
export const SERVER_ERROR_TRANSLATIONS: {
    description: TSubscriptionPageLocalizedText
    refresh: TSubscriptionPageLocalizedText
    title: TSubscriptionPageLocalizedText
} = {
    title: {
        en: 'Something bad just happened...',
        ru: 'Что-то пошло не так...',
        zh: '出了点问题...',
        fa: 'مشکلی پیش آمد...',
        fr: 'Un problème est survenu...',
        uz: 'Nimadir xato ketdi...',
        de: 'Etwas ist schiefgelaufen...',
        hi: 'कुछ गड़बड़ हो गई...',
        tr: 'Bir şeyler ters gitti...',
        az: 'Nəsə xəta baş verdi...',
        es: 'Algo salió mal...',
        vi: 'Đã xảy ra sự cố...',
        ja: '問題が発生しました...',
        be: 'Нешта пайшло не так...',
        uk: 'Щось пішло не так...',
        pt: 'Algo deu errado...',
        pl: 'Coś poszło nie tak...',
        id: 'Terjadi kesalahan...',
        tk: 'Bir näsazlyk ýüze çykdy...',
        th: 'เกิดข้อผิดพลาดบางอย่าง...'
    },
    description: {
        en: 'Try to refresh the page.',
        ru: 'Попробуйте обновить страницу.',
        zh: '请尝试刷新页面。',
        fa: 'صفحه را دوباره بارگذاری کنید.',
        fr: "Essayez d'actualiser la page.",
        uz: 'Sahifani yangilashga harakat qiling.',
        de: 'Versuchen Sie, die Seite neu zu laden.',
        hi: 'पेज को रीफ़्रेश करने का प्रयास करें।',
        tr: 'Sayfayı yenilemeyi deneyin.',
        az: 'Səhifəni yeniləməyə çalışın.',
        es: 'Intenta actualizar la página.',
        vi: 'Hãy thử tải lại trang.',
        ja: 'ページを再読み込みしてください。',
        be: 'Паспрабуйце абнавіць старонку.',
        uk: 'Спробуйте оновити сторінку.',
        pt: 'Tente atualizar a página.',
        pl: 'Spróbuj odświeżyć stronę.',
        id: 'Coba muat ulang halaman.',
        tk: 'Sahypany täzelemäge synanyşyň.',
        th: 'ลองรีเฟรชหน้าใหม่'
    },
    refresh: {
        en: 'Refresh the page',
        ru: 'Обновить страницу',
        zh: '刷新页面',
        fa: 'بارگذاری مجدد صفحه',
        fr: 'Actualiser la page',
        uz: 'Sahifani yangilash',
        de: 'Seite neu laden',
        hi: 'पेज रीफ़्रेश करें',
        tr: 'Sayfayı yenile',
        az: 'Səhifəni yenilə',
        es: 'Actualizar la página',
        vi: 'Tải lại trang',
        ja: 'ページを再読み込み',
        be: 'Абнавіць старонку',
        uk: 'Оновити сторінку',
        pt: 'Atualizar a página',
        pl: 'Odśwież stronę',
        id: 'Muat ulang halaman',
        tk: 'Sahypany täzele',
        th: 'รีเฟรชหน้า'
    }
}
