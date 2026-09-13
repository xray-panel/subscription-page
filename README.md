# XLADA Subscription Page

**XLADA** — самостоятельная панель управления Xray. Проект основан на
[Remnawave](https://github.com/remnawave) и является форком
[remnawave/subscription-page](https://github.com/remnawave/subscription-page).

| | |
|---|---|
| Организация | https://github.com/xray-panel |
| Версия | 8.0.0 |
| Лицензия | AGPL-3.0-only (см. `LICENCE`) |
| Апстрим | https://github.com/remnawave/subscription-page |

## Атрибуция

XLADA — производная работа от Remnawave. Исходный код Remnawave
распространяется под лицензией AGPL-3.0-only, и XLADA сохраняет ту же
лицензию. Все права на оригинальный код принадлежат авторам Remnawave.
Подробности — в файле `NOTICE`.

Названия «Remnawave», её логотипы и домены принадлежат авторам Remnawave и в
XLADA не используются.

---

## Что это

Страница подписки — это то, что видит конечный пользователь. Она показывает
оформленный список его подключений: устройства и ключи, ссылки на конфиги и
пошаговые инструкции по подключению для каждой платформы. Данные страница
получает из панели по API-токену; браузеру внутреннее устройство панели не
раскрывается.

Это отдельный монорепозиторий с собственной серверной частью и интерфейсом.
Корневого `package.json` нет — зависимости ставятся отдельно в `backend/` и
`frontend/`.

| Путь | Назначение |
|---|---|
| `backend/` | серверная часть на NestJS: модули `subscription`, `webpage`, `marzban`, общая конфигурация и утилиты в `src/common` |
| `frontend/` | интерфейс на React и Mantine, сборка через Vite: `src/pages/main`, `src/widgets/main`, `src/entities`, `src/shared`, `src/app` |
| `frontend/public/assets/app-config.json` | настройки вида и список приложений для подключения |
| `Dockerfile` | сборка единого образа: серверная часть и уже собранный интерфейс |
| `docker-compose.yml`, `docker-compose-prod.yml` | запуск контейнера страницы подписки |
| `.env.sample` | пример переменных окружения |
| `Makefile` | служебные команды разработки |
| `LICENCE` | текст лицензии AGPL-3.0-only |

Страница умеет работать с несколькими наборами настроек (`SUBPAGE_CONFIG_UUID`),
поддерживает собственный префикс пути (`CUSTOM_SUB_PREFIX`) и режим
совместимости со ссылками Marzban (`MARZBAN_LEGACY_LINK_ENABLED`).

---

## Чем отличается от апстрима

Форк ответвлён от апстрима после релиза `8.0.0`. Собственные коммиты форка:

- `55e7b06` «XLADA: ребрендинг» — изменён видимый бренд, ссылки на
  инфраструктуру вендора, имена образов, контейнеров и сетей Docker, а также
  поле `name` в `package.json`. Намеренно не менялись: миграции Prisma, файлы
  лицензии, `package-lock.json`, имена томов, заголовки `x-remnawave-*`, теги
  inbound Xray и зависимости `@remnawave/*`.
- `a68c8ed` «Исправить определение встроенного логотипа» — после ребрендинга
  стандартный адрес логотипа указывает на заглушку, а проверка «это встроенный
  логотип» осталась на старом домене вендора, из-за чего флаг `hasCustomLogo`
  оставался включённым и страница пыталась загрузить несуществующую картинку.
  Теперь проверка учитывает и заглушку, и домен вендора: в уже существующих
  конфигурациях показывается встроенный логотип, а не битое изображение.

Это единственные содержательные отличия в коде. Имена переменных
`REMNAWAVE_PANEL_URL` и `REMNAWAVE_API_TOKEN` сохранены для совместимости с
существующими конфигурациями.

---

## Установка страницы подписки

Страница отдаёт пользователю оформленный список его подключений. Она читает
данные из панели по API-токену и браузеру ничего о внутреннем устройстве не
рассказывает.

```bash
mkdir -p /opt/xpanel-subpage && cd /opt/xpanel-subpage
cat > .env <<'EOF'
APP_PORT=3010
REMNAWAVE_PANEL_URL=http://xpanel:3000
REMNAWAVE_API_TOKEN=<токен из панели>
TRUST_PROXY=1
EOF
```

Имена переменных `REMNAWAVE_*` сохранены для совместимости — так подписка
работает и со старой панелью.

```yaml
services:
  xpanel-subscription-page:
    image: ghcr.io/xray-panel/subscription-page:latest
    container_name: xpanel-subpage
    restart: unless-stopped
    env_file: .env
    ports:
      - 127.0.0.1:3010:3010
    networks:
      - xpanel-network

networks:
  xpanel-network:
    external: true
```

Снаружи — отдельный поддомен с HTTPS через nginx, по тому же образцу, что и для
панели. Обязательное условие: запрос должен приходить с
`X-Forwarded-Proto: https`, иначе контейнер разорвёт соединение.

---

## Настройка вида

Внешний вид и список приложений задаются в `frontend/public/assets/app-config.json`.
Файл состоит из двух частей: `config` — общие настройки страницы, `platforms` —
приложения по платформам.

Доступные параметры `config`:

| Параметр | Что задаёт |
|---|---|
| `additionalLocales` | дополнительные языки интерфейса; в поставке это `ru`, `zh`, `fa`, `fr` |
| `branding.name` | заголовок страницы; по умолчанию `Subscription` |
| `branding.logoUrl` | адрес логотипа |
| `branding.supportUrl` | ссылка поддержки в шапке страницы; по умолчанию ведёт на страницу организации XLADA на GitHub |

Поле `branding.logoUrl` в поставляемом файле содержит значение по умолчанию —
адрес-заглушку. Его нужно заменить на адрес своего логотипа. Если оставить
заглушку или пустое значение, страница покажет встроенный логотип. Проверка
встроенного логотипа срабатывает как на заглушку, так и на домен вендора из
старых конфигураций (см. коммит `a68c8ed`).

Пример собственных значений:

```json
{
    "config": {
        "additionalLocales": ["ru", "zh"],
        "branding": {
            "name": "My Subscription",
            "logoUrl": "https://example.com/logo.svg",
            "supportUrl": "https://example.com/support"
        }
    }
}
```

Раздел `platforms` — это словарь по платформам (`ios`, `android` и другие). Для
каждой платформы перечислены приложения: `id`, `name`, `isFeatured`,
`urlScheme` для автоматического добавления подписки, шаги установки и
подключения, кнопки со ссылками и локализованные тексты. Добавляя приложение,
сохраняйте структуру существующих записей.

---

## Разработка

Требуется Node.js 24 и npm. Зависимости ставятся отдельно в каждом каталоге —
в корне репозитория `package.json` нет.

```bash
make install   # npm install в backend/ и frontend/
make bdev      # backend в режиме разработки
make fdev      # frontend в режиме разработки
```

Скрипты `backend/package.json`:

| Скрипт | Действие |
|---|---|
| `npm run build` | сборка rspack |
| `npm run dev` | сборка в режиме watch |
| `npm start` | запуск собранного `dist/main.js` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint`, `npm run lint:fix` | `oxlint` |
| `npm run format`, `npm run format:check` | `oxfmt` |
| `npm run trace` | `node scripts/trace.mjs` |

Скрипты `frontend/package.json`:

| Скрипт | Действие |
|---|---|
| `npm run start:dev` | dev-сервер Vite |
| `npm run start:build` | production-сборка (`tsc && vite build`) |
| `npm run cb` | `vite build` |
| `npm run start:preview` | предпросмотр собранного интерфейса на порту 3334 |
| `npm run serve` | сборка и предпросмотр на порту 3334 |
| `npm run serve:dev` | то же с `DOMAIN_OVERRIDE=1` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint`, `npm run lint:fix` | `oxlint` |
| `npm run format`, `npm run format:check` | `oxfmt` |

Цели `Makefile`: `help`, `install`, `bdev`, `fdev`, `bump-patch`, `bump-minor`,
`bump-major`, `bump-and-install-patch`, `bump-and-install-minor`,
`bump-and-install-major`, `show-versions`, `tag-release`.

Docker-образ собирается из корня репозитория: `Dockerfile` копирует серверную
часть и уже собранный интерфейс из `frontend/dist/`, поэтому интерфейс нужно
собрать заранее:

```bash
cd frontend && npm ci && npm run start:build && cd ..
docker build -t subscription-page .
```

---

## Связанные репозитории

- [xray-panel/backend](https://github.com/xray-panel/backend) — панель
- [xray-panel/frontend](https://github.com/xray-panel/frontend) — интерфейс панели
- [xray-panel/node](https://github.com/xray-panel/node) — нода

---

## Лицензия

Проект распространяется под лицензией **AGPL-3.0-only**. Текст лицензии —
в файле `LICENCE`, уведомления об авторских правах и атрибуции — в `NOTICE`
(см. также `LICENCE` в формулировке лицензии выше).

AGPL-3.0 требует: если вы предоставляете доступ к XLADA по сети, пользователи
этой сети должны иметь возможность получить полный соответствующий исходный код
(раздел 13 лицензии).
