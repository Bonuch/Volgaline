<template>
    <div class="person-card flex flex-col border-2 border-gray-50 rounded-sm overflow-hidden">
        <img :src="person.url" alt="#" class="object-cover sm:w-full" width="440" height="440">

        <div class="person-card__content flex-1-1 flex flex-col p-10 md:p-8 sm:p-4">
            <h3 v-if="person.title" class="text-26 leading-1-1 mb-4 mob:text-2xl">{{ person.title }}</h3>
            <span v-if="person.post" class="mt-auto text-2xl text-gray-300 sm:text-xl mob:text-lg">
                {{ person.post }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "PersonCard",
    props: {
        person: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped></style>
