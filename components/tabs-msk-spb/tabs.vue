<template lang="html">
    <div>
        <ul class="tabs__header pt-13 pb-13">
            <p class="pr-5 md:pr-0">Выберите направление маршрута</p>
            <li
                v-for="(tab, index) in tabsSec"
                :key="tab.title"
                @click="selectTab(index)"
                :class='{"tab__selected": (index == selectedIndex)}'>
                {{ tab.title }}
            </li>
        </ul>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        mode: {
            type: String,
        }
    },
    data() {
        return {
            selectedIndex: 0, // the index of the selected tab,
            tabsSec: []         // all of the tabs
        }
    },
    created() {
        this.tabsSec = this.$children
    },
    mounted() {
        this.selectTab(0)
    },
    methods: {
        selectTab(i) {
            this.selectedIndex = i

            // loop over all the tabs
            this.tabsSec.forEach((tab, index) => {
                tab.isActiveTab = (index === i)
            })
        }
    }
}
</script>

<style scoped lang="scss">

ul.tabs__header {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    font-size: 28px;
    font-weight: 600;
}

ul.tabs__header p {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 120%;
    margin-bottom: 0;
}

ul.tabs__header > li {
    padding: 8px 18px;
    opacity: 1;
    margin: 0;
    font-style: normal;
    background: #FFFFFF;
    border: 1px solid #CBD1D9;
    box-sizing: border-box;
    border-radius: 4px;
    font-weight: 500;
    font-size: 15px;
    line-height: 120%;
    display: inline-block;
    cursor: pointer;
    transition: .3s;
}

ul.tabs__header > li.tab__selected {
    opacity: 1;
    background: #0C73FE;
    color: #ffffff;
}

.tabs__light .tab {
    background-color: #fff;
}

.tabs__light li {
    background-color: #ddd;
    color: #aaa;
}

.tabs__light li.tab__selected {
    background-color: #fff;
    color: #83FFB3;
}
</style>
