# Not cottage cheese but cottage cheese team

## Inbox back

Бекенд для приложения которое является частью интерфейса почтового клиента vk.mail.ru/inbox — список писем.
Можно посмотреть демо по [ссылке](http://185.86.147.232:3005/)

### Что доступно?

1. При старте приложения письма заносятся в базу из файла large.json 
1. Доступна отдача письем с limit/offset и по категориям
1. Доступно обновление писем

### Как запустить локально?

##### back
```
    yarn start
```

### Как запустить докере?

##### docker
```
    docker-compose up --build -d
```

##### PS
Является submodule'ем [приложения](https://github.com/Not-cottage-cheese-but-cottage-cheese/final_web)