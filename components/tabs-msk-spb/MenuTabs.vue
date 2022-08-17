<template>
    <div class="wrapper-1410">
        <div class="cp-container pl-14 pr-14 md:pl-4 md:pr-4">
            <tabsSec class="border-decor mt-15 mb-20">
                <div class="">
                    <tabSec title="Из Москвы в Санкт-Петербург">
                        <div class="cruise-wrap md:flex-col flex justify-start" v-for="(list, indexID) in cruiseToSpb"
                             :key="indexID">
                            <div class="cruise-wrap__left flex lg:flex-col  md:items-center items-start">
                                <img :src="list.img" alt="#" class="cruise-wrap__left-img">
                                <div class="cruise-wrap__left-block">
                                    <div class="cruise-wrap__left-info flex items-center gap-2.5"
                                         v-for="(info, indexID) in list.info" :key="indexID">
                                        <img :src="info.icon" alt="" class="cruise-wrap__left-info__img">
                                        <div class="cruise-wrap__left-info__text">{{ info.text }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="cruise-wrap__right ">
                                <h4 class="cruise-wrap__right-title">План на день</h4>
                                <ol class="cruise-wrap__right-plane">
                                    <li class="cruise-wrap__right-list" v-for="(plan, indexID) in list.plan"
                                        :key="indexID">{{ plan.list }}
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </tabSec>
                </div>
                <div class="">
                    <tabSec title="Из Санкт-Петербурга в Москву">
                        <div class="cruise-wrap md:flex-col flex justify-start" v-for="(list, indexID) in cruiseToMsk"
                             :key="indexID">
                            <div class="cruise-wrap__left flex lg:flex-col  md:items-center items-start">
                                <img :src="list.img" alt="#" class="cruise-wrap__left-img">
                                <div class="cruise-wrap__left-block">
                                    <div class="cruise-wrap__left-info flex items-center gap-2.5"
                                         v-for="(info, indexID) in list.info" :key="indexID">
                                        <img :src="info.icon" alt="" class="cruise-wrap__left-info__img">
                                        <div class="cruise-wrap__left-info__text">{{ info.text }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="cruise-wrap__right ">
                                <h4 class="cruise-wrap__right-title">План на день</h4>
                                <ol class="cruise-wrap__right-plane">
                                    <li class="cruise-wrap__right-list" v-for="(plan, indexID) in list.plan"
                                        :key="indexID" v-html="plan.list">{{ plan.list }}
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </tabSec>
                </div>
            </tabsSec>
        </div>
    </div>
</template>

<script>
import tabSec from '~/components/tabs-msk-spb/tab'
import TabsSec from '~/components/tabs-msk-spb/tabs'

export default {
    components: {
        tabSec,
        TabsSec
    },
    data() {
        return {
            cruiseToSpb: [
                {
                    img: '/images/msk-spb/img20.jpg', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '1 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '12.06 '},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Москва'},
                    ],
                    plan: [
                        {list: 'По желанию  трансфер Аэропорт/Вокзал- Отель'},
                        {list: 'Заселение в выбранный отель'},
                        {list: 'Вечерняя автобусная обзорная экскурсия «Огни Москвы».'},
                        {list: 'По Москве просто необходимо прогуляться именно вечером. Вы попадёте в совершенно другой город! Вас ждут мириады огней во время прогулки от Пушкинской площади по знаменитой Тверской улице до Кремля, в Александровском саду и на Красной площади! Вы увидите "сталинские высотки", особенно величественные в вечерней подсветке, ГУМ, украшенный более 30 тысячами лампочек, Большой театр, Новый Арбат, величественные небоскребы Москва Сити, Пушкинский мост, проедете по Садовому кольцу.'},
                        {list: 'Проезд по Канатной дороге. Самые красивые виды Москвы.'},
                        {list: 'Трансфер в отель'},
                    ]
                },
                {
                    img: '/images/msk-spb/img20.jpg', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '2 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '13.06 '},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Москва'},
                    ],
                    plan: [
                        {list: ' Завтрак в отеле, встреча с гидом'},
                        {list: 'Экскурсия в парк Зарядье, аттракцион Полеты над Россией/Москвой.'},
                        {list: 'Кинозал на подвижной платформе с 13-метровым полусферическим экраном, генераторами ветра, водяных брызг и запахов. Медиакомплекс создан лучшими специалистами в области аудио- и визуальных эффектов — компаниями Dynamic Attractions (Канада) и KRAFTWERK (Австрия).'},
                        {list: 'Экскурсия панорамная Москва начнётся со смотровой плащадки детского мира, продолжится на  колокольне Высоко-Петровского монастыря, а закончится в музее Москва-Сити и смотровой площадки башни "Империя". Музей-смотровая Москва-Сити – единственный в Москве музей высотного строительства, где можно увидеть, как город рос вверх: от колокольни Ивана Великого до небоскребов Москва-Сити. Интерактивная экспозиция расположена на 56-м этаже башни «Империя», откуда открывается уникальная панорама Москвы. Загляните в окошки-глазки и узнайте о тайнах Сити, посмотрите на башни в разрезе, снимите телефонную трубку и послушайте историю о ностальгической Москве Андрея Макаревича, Геннадия Хазанова, Ингеборги Дапкунайте и других известных москвичей, посмотрите на утопические архитектурные проекты Москвы'},
                        {list: ' Место окончания программы: центр города – Москва-Сити'},
                        {list: 'Рекомендуем к посещению: Ресторан Birds - самый высокий ресторан и клуб в мире Панорамный ресторан 360'},





                    ]
                },
                {
                    img: '/images/msk-spb/img20.jpg', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '3 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '14.06 '},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Москва'},
                    ],
                    plan: [
                        {list: 'Завтрак в отеле, встреча с гидом, поездка в центр города на метро'},
                        {list: ' Пешеходная экскурсия «Новая география».'},
                        {list: 'Вы пройдете от Пушкинского музея к Храму Христа Спасителя, пройдете Патриарший мост, увидите новое выставочное пространство ГЭС-2, прогуляетесь по обновленным кварталам Красного Октября, набережной Парка Горького и закончите экскурсию в современном парке Музеон.'},
                        {list: 'Возвращение в отель'},
                        {list: 'Трансфер на Северный речной вокзал, экскурсия в которой вас ждут легенды и были самых секретных сооружений сталинской эпохи – Северного Речного вокзала и Канала им. Москвы.'},
                        {list: ' 14:30 отправление в круиз на теплоходе Мамин Сибиряк'},
                        {list: 'Названный в честь российского писателя и драматурга Дмитрия Мамина-Сибиряка теплоход рассчитан на 68 посадочных мест. Компактный и уютный, он идеально подходит для комфортного круиза по рекам России. Прошёл полную реновацию в 2022 году.'},
                        {list: 'Обед на борту'},
                        {list: 'Ужин на борту'},
                    ]
                },
                {
                    img: '/images/msk-spb/img3.png', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '4 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '15.06 '},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Угич'},
                    ],
                    plan: [
                        {list: 'Завтрак на борту'},
                        {list: 'Обед на борту'},
                        {list: '14:00 Прибытие в Углич'},
                        {list: '«Предание старины глубокой» - Пешеходная экскурсия по городу с посещением церкви « Царевича Дмитрия «на крови», Спасо-Преображенского собора и Богоявленского монастыря. (2 часа)'},
                        {list: '18:00 Отправление в круиз'},
                        {list: 'Ужин на борту'},
                    ]
                },
                {
                    img: '/images/msk-spb/img1.png', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '5 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '16.06 '},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Кузино'},
                    ],
                    plan: [
                        {list: 'Завтрак на борту'},
                        {list: 'Обед на борту'},
                        {list: '13:30 Прибытие в Кузино'},
                        {list: '"Пешеходная экскурсионная программа «Русь изначальная» Посещение историко-этнографического комплекса «Застава князей Белозёрских» с интерактивной программой"'},
                        {list: '(1.5 - 2 часа)'},
                        {list: '17:30 Отправление в круиз'},
                        {list: 'Ужин на борту'},
                    ]
                },
                {
                    img: '/images/msk-spb/img4.png', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '6 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '17.06 '},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'День на борту'},
                    ],
                    plan: [
                        {list: 'Завтрак на борту'},
                        {list: 'День на борту, вас ждут великолепные виды и развлекательная программа'},
                        {list: 'Обед на борту'},
                        {list: 'Ужин на борту'},
                    ]
                },
                {
                    img: '/images/msk-spb/img5.png', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '7 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '18.06 '},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Валаам'},
                    ],
                    plan: [
                        {list: 'Завтрак на борту'},
                        {list: 'Обед на борту'},
                        {list: '14:00 прибытие в Валаам'},
                        {list: 'Экскурсии по Валааму заказваются дополнительно на борту'},
                        {list: '20:00 Отправление в круиз'},
                        {list: 'Ужин на борту'},
                    ]
                },
                {
                    img: '/images/msk-spb/img6.png', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '8 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '19.06 '},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Санкт-Петербург'},
                    ],
                    plan: [
                        {list: 'Завтрак на борту'},
                        {list: '11:30 прибытие в Санкт-Петербург, освобождение каюты'},
                        {list: 'Встреча с гидом'},
                        {list: 'Обзорная  экскурсия  по городу'},
                        {list: 'Трансфер в Отель города'},
                    ]
                },
                {
                    img: '/images/msk-spb/img6.png', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '9 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '20.06 '},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Санкт-Петербург'},
                    ],
                    plan: [
                        {list: 'Завтрак'},
                        {list: ' Встреча с гидом'},
                        {list: 'Экскурсия в Петергоф, осмотр парка и фонтанов'},
                        {list: 'Возвращение в Отель города'},
                        {list: 'Опционально иммерсивное шоу  «Вернувшиеся»'},
                    ]
                },
                {
                    img: '/images/msk-spb/img6.png', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '10 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '21.06 '},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Санкт-Петербург'},
                    ],
                    plan: [
                        {list: 'Завтрак'},
                        {list: 'По желанию трансфер Отель-Аэропорт/Вокзал'},
                    ]
                },
            ],
            cruiseToMsk: [
                {
                    img: '/images/msk-spb/img6.png', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '1 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '18.06'},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Санкт-Петербург'},
                    ],
                    plan: [
                        {list: 'По желанию  трансфер Аэропорт/Вокзал/Отель – Речной вокзал'},
                        {list: '15:00 Встреча с гидом'},
                        {list: 'Экскурсия в Петергоф, осмотр парка и фонтанов'},
                        {list: 'Возвращение в Отель города'},

                    ]
                },
                {
                    img: '/images/msk-spb/img6.png', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '2 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '19.06'},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Санкт-Петербург'},
                    ],
                    plan: [
                        {list: 'завтрак в отеле, встреча с гидом'},
                        {list: 'Обзорная  экскурсия по городу с посещением Новой Голландии'},
                        {list: 'Место окончания программы: Новая Голландия'},
                    ]
                },
                {
                    img: '/images/msk-spb/img6.png', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '3 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '20.06'},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Санкт-Петербург'},
                    ],
                    plan: [
                        {list: 'Завтрак в отеле, встреча с гидом'},
                        {list: 'Посещение музея современного искусства Эрарта'},
                        {list: 'Трансфер на Речной вокзал'},
                        {list: '19:00 Отправление в круиз'},
                        {list: 'ужин на борту'},
                    ]
                },
                {
                    img: '/images/msk-spb/img11.png', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '4 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '21.06'},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Мандроги'},
                    ],
                    plan: [
                        {list: 'Завтрак на борту'},
                        {list: '12:30 прибытие в Мандроги'},
                        {list: 'Обед на борту'},
                        {list: 'Экскурсии по Мандрогам заказваются дополнительно на борту'},
                        {list: '17:00 Отправление в круиз'},
                        {list: 'Ужин на борту'},
                    ]
                },
                {
                    img: '/images/msk-spb/img10.png', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '5 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '22.06'},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Кижи'},
                    ],
                    plan: [
                        {list: 'Завтрак на борту'},
                        {list: '08:00 прибытие в Кижи'},
                        {list: 'Обед на борту'},
                        {list: 'Пешеходная обзорная экскурсия с посещением Кижского архитектурного ансамбля включенного в список обьектов всемирного наследия ЮНЕСКО «Шедевры острова Кижи» (ансамбль Кижского погоста, церковь Преображения Господня, мельница, дом рыбака…) (2 часа)'},
                        {list: '12:00 Отправление в круиз'},
                        {list: 'Обед на борту'},
                        {list: 'Ужин на борту'},
                    ]
                },
                {
                    img: '/images/msk-spb/img9.png', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '6 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '23.06'},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Горицы'},
                    ],
                    plan: [
                        {list: 'Завтрак на борту'},
                        {list: 'Обед на борту'},
                        {list: '15:00 прибытие в Горицы'},
                        {list: 'Обед на борту'},
                        {list: 'Экскурсии по Горицам заказваются дополнительно на борту'},
                        {list: '18:00 Отправление в круиз'},
                    ]
                },
                {
                    img: '/images/msk-spb/img8.png', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '7 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '24.06'},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Мышкин'},
                    ],
                    plan: [
                        {list: 'Завтрак на борту'},
                        {list: '11:30 прибытие в Мышкин'},
                        {list: '«Мышиное царство» - Пешеходная обзорная экскурсия по городу с посещением Успенского собора, туристического комплекса «Дворец Мыши»,музея «Русские валенки» и интерактивной, музыкальной программой «В гости к мельнику на блины» с угощением (2 -2,5 часа)'},
                        {list: 'Обед на борту'},
                        {list: '14:30 Отправление в круиз'},
                        {list: 'Ужин на борту'},
                    ]
                },
                {
                    img: '/images/msk-spb/img20.jpg', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '8 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '25.06'},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Москва'},
                    ],
                    plan: [
                        {list: 'Завтрак на борту'},
                        {list: 'Обед на борту'},
                        {list: '18:00 прибытие в Москву, освобождение каюты'},
                        {list: 'Трансфер в выбранный отель города'},
                        {list: 'Вечерняя автобусная обзорная экскурсия «Огни Москвы».'},
                        {list: 'По Москве просто необходимо прогуляться именно вечером. Вы попадёте в совершенно другой город! Вас ждут мириады огней во время прогулки от Пушкинской площади по знаменитой Тверской улице до Кремля, в Александровском саду и на Красной площади! Вы увидите "сталинские высотки", особенно величественные в вечерней подсветке, ГУМ, украшенный более 30 тысячами лампочек, Большой театр, Новый Арбат, величественные небоскребы Москва Сити, Пушкинский мост, проедете по Садовому кольцу.'},
                        {list: 'Проезд по Канатной дороге. Самые красивые виды Москвы.'},
                        {list: 'Трансфер в отель'},
                    ]
                },
                {
                    img: '/images/msk-spb/img20.jpg', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '9 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '26.06'},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Москва'},
                    ],
                    plan: [
                        {list: 'Завтрак в отеле, встреча с гидом, поездка в центр города на метро'},
                        {list: 'Экскурсия в парк Зарядье, аттракцион Полеты над Россией/Москвой. Кинозал на подвижной платформе с 13-метровым полусферическим экраном, генераторами ветра, водяных брызг и запахов. Медиакомплекс создан лучшими специалистами в области аудио- и визуальных эффектов — компаниями Dynamic Attractions (Канада) и KRAFTWERK (Австрия).'},
                        {list: ' Пешеходная экскурсия «Новая география». Вы пройдете от Пушкинского музея к Храму Христа Спасителя(с посещением смотровой площадки), пройдете Патриарший мост, увидите новое выставочное пространство ГЭС-2, прогуляетесь по обновленным кварталам Красного Октября, набережной Парка Горького и закончите экскурсию в современном парке Музеон.'},
                        {list: 'Место окончания программы: центр города'},
                    ]
                },
                {
                    img: '/images/msk-spb/img20.jpg', info: [
                        {icon: '/images/msk-spb/fi-rr-clock.svg', text: '10 день'},
                        {icon: '/images/msk-spb/fi-rr-calendar.svg', text: '27.06'},
                        {icon: '/images/msk-spb/fi-rr-map-marker-cross.svg', text: 'Москва'},
                    ],
                    plan: [
                        {list: 'Завтрак в отеле'},
                        {list: 'По желанию  трансфер Отель - Аэропорт/Вокзал'},
                    ]
                },
            ],
        }
    },

}
</script>

<style scoped lang="scss">
.wrapper-1410 {
    margin: 0 auto;
}

.border-decor {
    border-top: 1px solid #E5E5E5;
    border-bottom: 1px solid #E5E5E5;

}

.cruise-wrap {
    max-width: 1410px;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0 0 44px rgba(42, 42, 45, 0.15);
    border-radius: 4px;
    padding: 35px 50px 40px 50px;
    margin-bottom: 50px;
    gap: 102px;
    @media (max-width: 1199px) {
        gap: 50px;
    }
    @media (max-width: 767px) {
        padding: 25px 30px 20px 30px;

    }

    &__left {
        min-width: 35%;
        gap: 70px;
        @media (max-width: 1300px) {
            gap: 30px;
        }
        @media (max-width: 767px) {
            gap: 10px;
        }

        &-img {
            max-width: 170px;
            height: 170px;
            border-radius: 50%;
            object-fit: cover;
        }

        &-block {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        &-info {
            &__img {

            }

            &__text {
                font-style: normal;
                font-weight: 400;
                font-size: 20px;
                line-height: 40px;
                color: #1D1F20;
                white-space: nowrap;

            }
        }
    }

    &__right {
        max-width: 760px;
        &-title {
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 35px;
        }

        &-plane {
            list-style-type: decimal;
            padding-left: 18px;
        }

        &-list {
            margin-bottom: 0;
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;

        }
    }
}
</style>

