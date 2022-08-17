<template>
    <div
        class="chat-item rounded-sm overflow-hidden"
        :class="{'chat-item--mine': mesItem.customer}"
    >
        <div
            class="chat__heading flex items-center justify-between p-6 bg-blue-900 bg-opacity-75 text-white lg:flex-col lg:items-start sm:p-4 sm:text-sm"
        >
            <div class="chat__created">
                <span v-if="mesItem.created" class="mr-5">{{ formattedDate }}</span>
                <span v-if="mesItem.created" class="text-white" :class="{'text-gray-300': mesItem.customer}">
                    {{ formattedTime }}
                </span>
            </div>

            <div
                v-if="mesItem.customer"
                class="chat__author text-2xl leading-none font-medium lg:mb-2 sm:text-xl sm:leading-none"
            >
                {{ mesItem.customer.name || mesItem.customer.phone }}
            </div>

          <div
              v-if="mesItem.manager"
              class="chat__author text-2xl leading-none font-medium lg:mb-2 sm:text-xl sm:leading-none"
          >
            {{ mesItem.manager.name }}
          </div>
        </div>

        <div
            class="chat__content textarea py-3 px-7 border-4 border-t-0 rounded-r-none tablet:px-6 sm:px-4 mob:text-base"
        >
          <p>{{mesItem.message}}</p>

        </div>
      <div class="chat__files" v-if="mesItem.attachments">
        <BaseDropFiles
            :files="mesItem.attachments"
            v-on:on-download-file="downloadFile"
            download/>
<!--        <div class="file__item" v-for="item in mesItem.attachments">-->
<!--          <span>{{ item.path }}</span>-->
<!--          <a href="#" @click.prevent="downloadFile(item)">скачать</a>-->
<!--        </div>-->
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseDropFiles from "../base/BaseDropFiles";

export default {
    name: "ChatItem",
  components: {BaseDropFiles},
  props: {
        mesItem: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            text: "",
        };
    },
    mounted() {
        this.text = this.mesItem.desc;
    },
    computed: {
        formattedDate() {
          return this.$dayjs(this.mesItem.created).locale('ru').format('DD.MM.YYYY')
        },
        formattedTime() {
          return this.$dayjs(this.mesItem.created).locale('ru').format('HH:mm')
        },
        // files() {
        //   if (this.mesItem.attachments) {
        //     const res = [];
        //     for (const file of this.mesItem.attachments) {
        //       res.push({...file, name: file.path})
        //     }
        //     return res;
        //   }
        // },
    },
    methods: {
      downloadFile(file) {
        this.$emit('downloadFile', file)
      },
    }
};
</script>

<style lang="scss" scoped>
.chat-item {
    &--mine {
        .chat__heading {
            @apply bg-gray-50 text-black-400;
        }

        .chat__created {
            order: 2;
        }

        .chat__author {
            order: 1;
        }
    }
}
//
//.chat__files {
//    display: flex;
//    @apply bg-gray-50 text-black-400;
//}

@screen lg {
    .chat-item {
        .chat__author {
            order: 1 !important;
        }

        .chat__created {
            order: 2 !important;
        }
    }
}
</style>
