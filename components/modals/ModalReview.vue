<template>
    <form
        method='post'
        class='modal-call'
        :class="{ 'relative overflow-hidden': loading }"
        @submit.prevent='onSubmit'
    >
        <p v-if='accepted'>Спасибо за ваш отзыв.</p>

        <template v-else>
            <template v-if='loading'>
                <div class='absolute z-1 left-0 top-8 w-full h-full flex justify-center'>
                    <Preloader />
                </div>
            </template>

            <div :class="{ 'disabled': loading }">
                <h3 class='modal-title'>Оставить отзыв</h3>

                <div class='modal-item'>
                    <label for='modal-name' class='label'>Ваше имя: <sup class=''>*</sup></label>
                    <input
                        type='text'
                        name='name'
                        id='modal-name'
                        class='input'
                        required
                        autocomplete='off'
                        placeholder="Введите имя"
                        v-model='form.name'
                    >
                </div>

                <div class='modal-item'>
                    <label for='modal-date' class='label'>Дата круиза:</label>
                    <input
                        type='date'
                        name='date'
                        id='modal-date'
                        class='input'
                        autocomplete='off'
                        v-model='form.cruise_date'
                    >
                </div>

                <div class='modal-item mb-8'>
                    <label for='modal-ship' class='label'>Теплоход</label>

                    <client-only>
                        <v-select
                            id='modal-ship'
                            class='custom-select custom-select-modal'
                            label='title'
                            :reduce='item => item.id'
                            :options='ships'
                            placeholder="Введите название теплохода"
                            @search="handleShipsSearch"
                            v-model='form.ship_id'
                        >
                            <template #open-indicator='{ attributes }'>
                               <span v-bind='attributes'>
                                   <svg
                                       width='18' height='19' viewBox='0 0 18 19' fill='none'
                                       xmlns='http://www.w3.org/2000/svg'
                                   >
                                       <path
                                           fill-rule='evenodd' clip-rule='evenodd'
                                           d='M3.91209 6.25562C4.73311 5.5167 5.99769 5.58326 6.73661 6.40428L9.28127 9.23168L11.8259 6.40428C12.5648 5.58326 13.8294 5.5167 14.6504 6.25562C15.4715 6.99453 15.538 8.25911 14.7991 9.08013L10.7679 13.5593C10.3886 13.9807 9.84824 14.2214 9.28127 14.2214C8.71429 14.2214 8.17396 13.9807 7.79468 13.5593L3.76343 9.08013C3.02451 8.25911 3.09107 6.99453 3.91209 6.25562Z'
                                           fill='#5A6472'
                                       />
                                   </svg>
                               </span>
                            </template>

                            <template #no-options="{ search, searching, loading }">
                                Теплоходы не найдены.
                            </template>
                        </v-select>
                    </client-only>
                </div>

                <div class='modal-item mb-8'>
                    <label for='modal-cruise' class='label'>Круиз:</label>
                    <input
                        id='modal-cruise'
                        type='text'
                        class='input'
                        autocomplete='off'
                        placeholder="Введите название круиза"
                        v-model='form.cruise_name'
                    >
                </div>

                <div class='modal-item mb-8'>
                    <p class='label modal-label'>Оценка в баллах <sup class=''>*</sup></p>

                    <div class='modal-sub'>
                        <p class='modal-label'>Комфорт</p>

                        <ReviewRating
                            idName='modal-comfort'
                            :custom-val='Number(this.form.comfort_in_points)'
                            @on-rating-change='(val) => this.form.comfort_in_points = val'
                        />
                    </div>

                    <div class='modal-sub'>
                        <p class='modal-label'>Питание</p>
                        <ReviewRating
                            idName='modal-food'
                            :custom-val='Number(this.form.food_in_points)'
                            @on-rating-change='(val) => this.form.food_in_points = val'
                        />
                    </div>

                    <div class='modal-sub'>
                        <p class='modal-label'>Персонал</p>
                        <ReviewRating
                            idName='modal-personal'
                            :custom-val='Number(this.form.personal_in_points)'
                            @on-rating-change='(val) => this.form.personal_in_points = val'
                        />
                    </div>

                    <div class='modal-sub mb-10'>
                        <p class='modal-label'>Цена</p>
                        <ReviewRating
                            idName='modal-price'
                            :custom-val='Number(this.form.price_in_points)'
                            @on-rating-change='(val) => this.form.price_in_points = val'
                        />
                    </div>

                    <p v-if='getTotalRating' class='m-0 flex items-center'>
                        <span class='font-bold mr-3'>Итоговая оценка</span>
                        <BadgeRating :count='getTotalRating' class='w-16 h-12' />
                    </p>
                </div>

                <div class='modal-item'>
                <textarea
                    name='modal-comment'
                    id='modal-comment'
                    class='textarea'
                    placeholder='Введите сообщение'
                    v-model='form.description'
                />
                </div>

                <div class='modal-item'>
                    <BaseCheckbox
                        id='modal-privacy'
                        name='privacy'
                        label="Я согласен с <a href='/privacy' target='_blank'>условиями обработки</a> персональных данных"
                        :labelSelectors="['pl-8 text-lg font-medium', {'text-red-400': !privacy}]"
                        :markSelectors="['w-6 h-6 text-gray-300 border border-gray-300', {'border-red-400': !privacy}]"
                        required
                        :custom-val='privacy'
                        v-model='privacy'
                    />
                </div>

                <div>
                    <BaseDropFiles
                        v-if='form.images'
                        :files='form.images'
                        @on-remove-file-from-files='onRemoveFileFromFiles'
                    />

                    <div class='flex xs:block'>
                        <BaseDropFile
                            id='modal-review-file'
                            :accept="'image/jpeg, image/png, image/gif, image/gif'"
                            class='xs:w-full xs:mb-3'
                            @on-file-change='onFileChange'
                        />

                        <button
                            type='submit'
                            :disabled='isLoading || !privacy'
                            class='button modal-submit text-xl bg-blue-300 border border-blue-300 hover:border-orange-400 xs:w-full mob:text-lg'
                            :class="{ 'disabled': isLoading || !privacy }"
                        >
                            Отправить
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </form>
</template>

<script>
import debounce from 'lodash/debounce';
import Preloader from '@/components/base/Preloader';
import BaseCheckbox from '@/components/base/BaseCheckbox';
import ReviewRating from '@/components/base/ReviewRating';
import BadgeRating from '@/components/base/BadgeRating';
import BaseDropFiles from '../base/BaseDropFiles';
import BaseDropFile from '../base/BaseDropFile';

export default {
    name: 'ModalReview',
    components: { BaseDropFile, BaseDropFiles, BadgeRating, ReviewRating, BaseCheckbox, Preloader },
    data() {
        return {
            form: {
                name: null,
                ship_id: null,
                cruise_date: null,
                cruise_name: null,
                score_in_points: 10,
                comfort_in_points: 10,
                food_in_points: 10,
                personal_in_points: 10,
                price_in_points: 10,
                description: null,
                images: [],
            },

            loading: false,
            privacy: true,
            ships: [],
            accepted: false,
        };
    },
    async fetch() {
        await this.fetchShips();
    },
    computed: {
        getTotalRating() {
            return ((Number(this.form.comfort_in_points) + Number(this.form.food_in_points) + Number(this.form.personal_in_points) + Number(this.form.price_in_points)) / 4);
        },
        isLoading() {
            return this.loading ? "disabled" : null;
        },
    },
    methods: {
        async onSubmit() {
            try {
                this.loading = true;
                this.form.score_in_points = this.getTotalRating;
                const formData = this.formPreparation();
                await this.$axios.post('/review-send', formData);

                // глобальный event для метрик
                const eventDetail = { ...formData, url: this.$route.path };
                window.dispatchEvent(
                    new CustomEvent('SentReview', { detail: eventDetail })
                );
                window.dispatchEvent(
                    new CustomEvent('AnyFormSent', { detail: eventDetail })
                );

                this.accepted = true;
                this.loading = false;
            } catch (ex) {
                this.loading = false;
                console.log('cant send data: ' + ex);
            }
        },
        async fetchShips() {
            this.loading = true;

            try {
                const { data } = await this.$axios.get('/review-ships');
                this.ships = data.data;
                this.loading = false;
            } catch (ex) {
                console.log('cant fetch ships' + ex);
                this.loading = false;
            }
        },
        async handleShipsSearch(search, loading) {
            if (search.length) {
                loading(true);
                this.search(loading, search, this);
            }
        },
        search: debounce((loading, search, vm) => {
            vm.$axios.get(`/review-ships?q=${search}`)
                .then(res => {
                    vm.ships = res.data.data;
                    loading(false);
                })
                .catch(ex => {
                    loading(false);
                    console.log('cant fetch ship options by query: ' + ex);
                });
        }, 350),
        onFileChange(files) {
            if (this.form.images && this.form.images.length > 0) {
                this.form.images = [...this.form.images, ...files];
            } else {
                this.form.images = files;
            }
        },
        onRemoveFileFromFiles(idx) {
            this.form.images.splice(idx, 1);
        },
        formPreparation() {
            const form = new FormData();

            for (const key in this.form ) {
                if (this.form[key] === null) continue;

                if (Array.isArray(this.form[key])) {
                    for (const itemKey in this.form[key]) {
                        if (this.form[key][itemKey].local_url) {
                            form.append(key+'[]', this.form[key][itemKey].file);
                            continue;
                        }
                        form.append(key+'[]', this.form[key][itemKey]);
                    }
                    continue;
                }

                if (typeof this.form[key] === 'boolean') {
                    form.append(key, this.form[key] ? 1 : 0);
                    continue;
                }

                form.append(key, this.form[key]);
            }

            return form;
        },
    },
};
</script>

<style lang='scss' scoped>
.modal {
    &-item {
        margin-bottom: 32px;

        &:last-of-type {
            margin-bottom: 0;
        }
    }

    .textarea {
        min-height: 370px;
    }

    &-call {
        &::v-deep {
            .vs__dropdown-option {
                @apply truncate;
            }
        }
    }
}

@screen xs {
    .modal {
        .textarea {
            min-height: 160px;
        }
    }
}
</style>
