<template>
    <div class='app-layout'>

        <div class='global-wrapper '>

            <Nuxt />

        </div>

    </div>
</template>

<script>
export default {
    name: "clean",
    head() {
        const instructions = {
            link: [
                {
                    rel: 'canonical',
                    href: this.canonicalUrl,
                }
            ],
            meta: [ ]
        };
        const noIndex = this.metaNoIndex;
        if (noIndex) {
            // это необходимо, чтобы запретить индексацию яндексом всякого рекламного мусора с query параметрами, которые на нашем сайте даже не используются
            instructions.meta.push(noIndex);
        }
        return instructions;
    },
};
</script>

<style lang="scss" scoped>

</style>
