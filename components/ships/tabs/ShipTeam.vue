<template>
    <div class="ship-cabins cruise-detail-tab-content">
        <div class="wrapper">
            <h3 class="cruise-detail-tab-content__title">Команда</h3>

            <div v-if="content && content.length > 0" class="flex flex-wrap -mx-5 xs:mx-0">
                <div
                    v-for="(item, idx) in content"
                    :key="`ship-team-${idx}`"
                    class="px-5 mb-10 w-1/4 xl:w-1/3 lg:w-1/2 sm:w-full xs:px-0 sm:last:mb-0"
                >
                    <PersonCard :person="item" class="h-full" />
                </div>
            </div>

            <p>Нет информации о команде</p>
        </div>
    </div>
</template>

<script>
    import PersonCard from "@/components/ships/PersonCard";

    export default {
        name: "ShipTeam",
        components: { PersonCard },
        props: {
            content: {
                type: null,
                required: true,
            },
        },
    };
</script>

<style scoped></style>


