<template>
    <section class="accommodation flex justify-between mt-20 wrapper-1410 p-14 gap-2.5 xl:flex-col md:p-4">
        <AccommodationStar :AccommodationStar ='AccommodationStar4'/>
        <AccommodationStar :AccommodationStar ='AccommodationStar3'/>
    </section>
</template>

<script>
import AccommodationStar from "~/components/accommodation/AccommodationStar";

export default {
    name: "Accommodation",
    components: {AccommodationStar},
    data() {
        return {
            AccommodationStar4: [
                {
                    title: 'Проживание в  гостиницах — 4 звезды', hostel: [
                        {img: '/images/msk-spb/hostel1.png',
                            subtitle: 'Москва',
                            name: 'Мэриотт Тверская 4*'},
                        {img: '/images/msk-spb/hostel2.png',
                            subtitle: 'Санкт-Петербург ',
                            name: 'Азимут 4*'},
                    ],
                    description: [
                        {info: 'Или любой другой аналогичный отель'},
                        {info: 'Количество проживающих 2 человека'},
                        {info: 'Стоимость за человека 91 310 рублей'},
                        {info: 'За одноместное размещение доплата по запросу'},
                        {info: 'Скидка на ребёнка до 16 лет 20%'},
                    ]
                }
            ],
            AccommodationStar3: [
                {
                    title: 'Проживание в  гостиницах — 3 звезды', hostel: [
                        {img: '/images/msk-spb/hostel3.png',
                            subtitle: 'Москва',
                            name: 'Космос 3*'},
                        {img: '/images/msk-spb/hostel4.png',
                            subtitle: 'Санкт-Петербург ',
                            name: 'Россия 3*'},
                    ],
                    description: [
                        {info: 'Или любой другой аналогичный отель'},
                        {info: 'Количество проживающих 2 человека'},
                        {info: 'Стоимость за человека 84 900 рублей'},
                        {info: 'За одноместное размещение доплата по запросу'},
                        {info: 'Скидка на ребёнка до 16 лет 20%'},
                    ]
                }

            ],

        }
    }
}
</script>

<style scoped lang="scss">
.accommodation {
    border-bottom: 1px solid #E5E5E5;
}
.wrapper-1410 {
    margin: 0 auto;
}
</style>
