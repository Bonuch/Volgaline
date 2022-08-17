# Frontend

## В коде имеются глобальные события, которые можно отлавливать для сторонних метрик

```
// Отправка формы авторизации
window.dispatchEvent(
    new CustomEvent('LoginFormSent', { name, phone, formTitle })
);

// Отправка формы обратного звонка
window.dispatchEvent(
    new CustomEvent('CallbackFormSent', { name, phone, formTitle })
);

// Отправка формы Хочу в круиз
window.dispatchEvent(
    new CustomEvent('IWantToCruiseFormSent', { name, phone, formTitle })
);

// Отправка формы быстрого заказа со страницы круиза
window.dispatchEvent(
    new CustomEvent('ModalFastBuyFormSent', { name, phone, cruiseID, formTitle })
);

// Отправка формы подписки
window.dispatchEvent(
    new CustomEvent('SubscribeLineFormSent', { email })
);

// Отправка формы отзыва
window.dispatchEvent(
    new CustomEvent('SentReview', { data })
);

// Сложно выбрать? Наш эксперт поможет Вам
window.dispatchEvent(
    new CustomEvent('ICannotChoose', { data })
);

// Отправка одной из вышеперечисленных форм
window.dispatchEvent(
    new CustomEvent('AnyFormSent', { detail: eventDetail })
);

// результаты поиска (круизы)
window.dispatchEvent(
    new CustomEvent('CruisesSearchResult', { detail: cruises })
);

// просмотр страницы круиза
window.dispatchEvent(
    new CustomEvent('CruiseDetailPage', { detail: cruiseDetails })
);

// начало оформления заказа 
window.dispatchEvent(
    new CustomEvent('OrderingPage', { detail: { order: [...cruises], price: TotalPrices } })
);

// заказ оформлен
window && window.dispatchEvent(
    new CustomEvent('OrderIsCreated', { detail: { order: [...cruises], price: TotalPrices, result: data } })
);
```

Чтобы поймать такое событие, нужно сделать так

```
window.addEventListener('OrderIsCreated', function(event) {
    console.log(event.detail);
}, false);
```


## Build Setup

```bash
# config
$ cp .env.example .env
$ nvm use 14

# install dependencies
$ yarn install

# build for production and launch server
$ yarn build
$ yarn start

# Start in Dev mode:
$ yarn dev
```

## Notes

```metadata
дефолтные значение метатегов указываются в env
```

```z-indexes
- slider 10
- search form 20
- header 30
- menu 100
- modals 100
```

