<template>
    <section>
        <div v-for="(item, indexID) in AccommodationStar" :key="indexID">
            <div class="accommodation flex flex-col">
                <h2 class="accommodation__title">{{ item.title }}</h2>
                <div class="accommodation__wrapper flex">
                    <div class="accommodation__block" v-for="(list, indexID) in item.hostel" :key="indexID">
                        <img :src="list.img" alt="" class="accommodation__wrapper-img">
                        <p class="accommodation__wrapper-subtitle">{{ list.subtitle }}</p>
                        <p class="accommodation__wrapper-text">{{ list.name }}</p>
                    </div>
                </div>
                <ul class="accommodation__items mt-8">
                    <li class="accommodation__item" v-for="(list, indexID) in item.description" :key="indexID">
                        {{ list.info }}
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "AccommodationStar",
    props: ['AccommodationStar'],
}
</script>

<style scoped lang="scss">
.accommodation {
    &__title {
        font-style: normal;
        font-weight: 400;
        font-size: 35px;
        line-height: 45px;
        max-width: 500px;
    }

    &__wrapper {
        margin-top: 20px;
        gap: 50px;
        @media (max-width: 768px) {
            gap: 20px;
        }

        &-img {

        }

        &-subtitle {
            color: #0053C2;
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            line-height: 30px;
            margin-bottom: 0;
            margin-top: 20px;
        }

        &-text {
            font-size: 20px;
            line-height: 30px;
            font-style: normal;
            font-weight: 400;
        }
    }

    &__block {

    }

    &__items {
        list-style-type: disc;
        padding: 20px 25px 20px 50px;
        background: #FFFFFF;
        border: 1px solid #E6E6E6;
        border-radius: 4px;
    }

    &__item {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
    }
}
</style>
