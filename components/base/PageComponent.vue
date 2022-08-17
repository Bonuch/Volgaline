<template>
    <div class="page-inner" :class="{'pt-6': !hasImage}">
        <template v-if="!title">
            <div class="wrapper">
                <p>Контент отсутствует</p>
            </div>
        </template>

        <template v-else>
            <TopBanner
                v-if="showBanner"
                :title="title"
                :breadcrumbs="breadcrumbs"
                :top-banner-content="getBannerContent"
                class="mb-20 lg:mb-16"
            />

            <div
                v-else-if="hasImage"
                class="page-inner__heading page-inner-bg-gradient"
                :style="`backgroundImage: url(${content.image})`"
            >
                <div class="wrapper page-inner-bg-gradient-content">
                    <Breadcrumbs
                        v-if="breadcrumbs"
                        :breadcrumbs="breadcrumbs"
                        class="page-inner__breadcrumbs--small-offset"
                    />

                    <h1 v-if="title" class="page-inner-h1">{{ title }}</h1>

                    <div
                        v-if="content && content.intro_text"
                        class="wrapper-1220"
                        v-html="content.intro_text"></div>
                </div>
            </div>

            <div v-else class="wrapper">
                <Breadcrumbs v-if="breadcrumbs" :breadcrumbs="breadcrumbs" class="page-inner__breadcrumbs--small-offset"/>

                <h1 v-if="title" class="page-inner-h1 page-inner-h1--offset mb-10">
                    <wbr>{{ title }}<wbr>
                </h1>
            </div>

            <div class="page-inner__content">
                <slot name="beforeContent"></slot>
                <div v-if="content && content.full_text" class="wrapper" v-html="content.full_text"></div>
                <slot name="afterContent"></slot>
            </div>
        </template>
    </div>
</template>

<script>
import Breadcrumbs from '@/components/base/Breadcrumbs';
import WantForm from '@/components/front/WantForm';
import TopBanner from '@/components/inner/TopBanner';

export default {
    name: 'PageComponent',
    components: { TopBanner, WantForm, Breadcrumbs },
    props: {
        breadcrumbs: { type: Array },
        content: { type: Object },
        showBanner: { type: Boolean },
        title: { type: null },
    },
    computed: {
        hasImage() {
            return this.content && this.content.image;
        },
        getBannerContent() {
            return {
                title: this.content.title,
                content: this.content.intro_text,
                image: this.content.image,
            }
        },
    },
};
</script>

<style></style>
