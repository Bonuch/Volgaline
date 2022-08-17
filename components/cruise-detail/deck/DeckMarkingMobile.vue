<template>
    <div class='cruise-deck-scheme-marking cruise-deck-scheme-marking-mobile flex items-center'>
        <div class='cruise-deck-scheme-marking-title w-28 mr-7 text-lg leading-tight xl:text-base xl:leading-snug'>
            Маркировка кают
        </div>

        <div class="cruise-deck-scheme-marking-list flex items-center">
            <div class='cruise-deck-scheme-marking-item'>
                <div class='cruise-deck-scheme-marking-block bg-orange-500'></div>
                <div class='cruise-deck-scheme-marking-text'>1-местные</div>
            </div>

            <div class='cruise-deck-scheme-marking-item'>
                <div class='cruise-deck-scheme-marking-block bg-blue-700'></div>
                <div class='cruise-deck-scheme-marking-text'>2-местные</div>
            </div>

            <div class='cruise-deck-scheme-marking-item'>
                <div class='cruise-deck-scheme-marking-block bg-red-600'></div>
                <div class='cruise-deck-scheme-marking-text'>3-местные</div>
            </div>

            <div class='cruise-deck-scheme-marking-item'>
                <div class='cruise-deck-scheme-marking-block bg-black-300'></div>
                <div class='cruise-deck-scheme-marking-text'>4-местные</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DeckMarkingMobile',
    };
</script>

<style lang="scss" scoped>
    .cruise-deck-scheme-marking {
        &-item {
            display: flex;
            align-items: center;
            @apply mr-5 last:mr-0;
        }

        &-block {
            width: 24px;
            height: 24px;
            @apply mr-2 rounded-sm;
        }

        &-text {
            @apply text-gray-300 text-sm leading-none;
        }
    }
</style>
