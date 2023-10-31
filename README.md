# Deployer

Скрипт для развертывания стандартных Ethereum смарт-контрактов Remix (https://remix.ethereum.org/).

Скрипт отслеживает стоимость газа и ждет, пока она не снизится до уровня, установленного вами.

## Оглавление
1. [Установка](#установка)
2. [Настройка](#настройка)
3. [Запуск](#запуск)
4. [Обратная связь](#обратная-связь)

## Установка <a name="установка"></a>

Перед использованием этого скрипта убедитесь, что у вас есть:

- Установленная на вашей системе среда Node.js.
- Необходимые модули Node.js, которые могут быть установлены с помощью:

```bash
npm install
```

## Настройка <a name="настройка"></a>

Для настройки скрипта вам потребуется предоставить информацию о сети EVM, список приватных ключей (хранящихся в файле с именем `keys.txt`) и информацию о байткоде контрактов в отдельном файле с именем `contracts.js`.

- Вы можете изменить EVM сеть, изменив константу RPC URL.
  
- Порог стоимости газа: Скрипт отслеживает стоимость газа, и вы можете настроить максимальную стоимость газа, изменив константу `MAX_GAS_GWEI`.

- Контракты: Определите ваши смарт-контракты в файле `contracts.js`.

## Запуск <a name="запуск"></a>

1. Убедитесь, что ваши приватные ключи хранятся в файле с именем `keys.txt`, каждый ключ на отдельной строке.

2. Запустите скрипт с помощью следующей команды:

```bash
npm start
```

3. Скрипт будет отслеживать стоимость газа и разворачивать контракты с использованием предоставленных ключей, когда стоимость газа удовлетворяет заданному порогу.

4. Результаты развертывания будут записаны в файл с именем `results.txt`.

## Обратная связь <a name="обратная-связь"></a>

**Донат 🍩**
FeedBacK ADDRESS (EVM): `0xe93081718a75818Be2eB1E1336c8c2AC930e44e0`

**Делятся секретами 💰:** [Telegram](https://t.me/MyKlondike)

**Чат 🗿:** [Telegram](https://t.me/Klondike_Talks)

