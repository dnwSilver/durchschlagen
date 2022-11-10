# Durchschlagen

## OWASP

1. `A01:2021` Backend принимает запросы с любого origin
1. `A01:2021` Создание комментариев от других пользователей
1. `A01:2021` Чтение чужих сообщений
1. `А01:2021` Через почту можно отправлять сообщения от любого пользователя
1. `A02:2021` Пароли храним в открытом виде
1. `A02:2021` В JWT зашита чувствительная информация
1. `A02:2021` В local storage лежит чувствительная информация
1. `A03:2021` SQL инъекция
1. `A03:2021` RCE инъекция
1. `A03:2021` XSS инъекция
1. `A04:2021` В чеках используется идентификатор int
1. `A04:2021` Включена интроспекция в продуктовой среде
1. `A04:2021` Возможность выкачать все данные за один запрос
1. `A04:2021` Одна из страниц валится в 500 выплевываю инфу о стеке и пароль от бд
1. `A05:2021` База доступна из внешней сети по стандартному порту с sa без пароля
1. `A05:2021` Чувствительная информация в env на сервере
1. `A05:2021` Чувствительная информация в config файлах приложения
1. `A05:2021` Чувствительная информация в самих приложения (Kotlin/JavaScript)
1. `A06:2021` Загрязнение прототипа
1. `A07:2021` Endpoint доступен без Authorization Token
1. `A07:2021` Endpoint доступен с любым Authorization Token
1. `A07:2021` Endpoint позволяет смотреть данные других пользователей
1. `A08:2021` Небезопасная десериализация
1. `A09:2021` DDoS атака через большой объем данных на входе
1. `A09:2021` DoS атака через любой endpoint
1. `A09:2021` Brute Force сервера по SSH пароль от сервера root/root
1. `A10:2021` SSRF при загрузке изображения для создания карточки
1. `XSS` редирект через ссылку возврата при авторизации

## Endpoint

1. `POST`   `/signin`
1. `POST`   `/signup`
1. `DELETE` `/signin`
1. `PATCH`  `/comments/{comment_id}`
1. `GET`    `/auctions`
1. `POST`   `/auctions`
1. `GET`    `/auctions/{auction_id}`
1. `POST`   `/auctions/{auction_id}/comments`
1. `POST`   `/auctions/{auction_id}/bets`
1. `PATCH`  `/auctions/{auction_id}`
1. `GET`    `/lots`
1. `POST`   `/lots`
1. `PATCH`  `/lots/{lot_id}`
1. `DELETE` `/lots/{lot_id}`
1. `POST`   `/payments`

## Deployment

```sh
cd ./src/frontend/site &&
nvm use 19 &&
yarn &&
rm -rf build &&
yarn build &&
rsync -a --progress build/* root@193.108.114.36:/var/www/html &&
cd - &&
cd ./src/backend/api &&
./gradlew clean &&
./gradlew distTar &&
cd build &&
tar -xvf distributions/api-0.0.1.tar &&
rsync -a --progress api-0.0.1/* root@193.108.114.36:~/api
cd -
```
