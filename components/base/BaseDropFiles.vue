<template>
    <div class='base-drop-file__list mb-5'>
        <div
            v-for='(fileItem, idx) in files'
            :key='idx'
            class='flex items-center justify-between p-3 mb-2 bg-gray-50 last:mb-0 rounded-sm overflow-hidden'
        >
            <span class='text-base mob:text-sm'>{{ idx + 1 }}. {{ fileItem.name }}</span>

            <button
                v-if='!download'
                type='button'
                class='custom-transition text-red-400 hover:text-blue-300'
                @click='onRemoveItemClick(idx)'
            >
                <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512.001 512.001'>
                    <path
                        class='fill-current'
                        d='M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
                            L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
                            c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
                            l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
                            L284.286,256.002z'
                    />
                </svg>
            </button>
            <button
                v-else
                type='button'
                title='скачать'
                class='custom-transition text-red-400 hover:text-blue-300'
                @click='downloadFile(fileItem)'
            >
                <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg'
                     xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'
                     viewBox='0 0 29.978 29.978' style='enable-background:new 0 0 29.978 29.978;' xml:space='preserve'>
                    <g>
	                    <path class='fill-current' d='M25.462,19.105v6.848H4.515v-6.848H0.489v8.861c0,1.111,0.9,2.012,2.016,2.012h24.967c1.115,0,2.016-0.9,2.016-2.012
		                    v-8.861H25.462z' />
                        <path class='fill-current' d='M14.62,18.426l-5.764-6.965c0,0-0.877-0.828,0.074-0.828s3.248,0,3.248,0s0-0.557,0-1.416c0-2.449,0-6.906,0-8.723
		                    c0,0-0.129-0.494,0.615-0.494c0.75,0,4.035,0,4.572,0c0.536,0,0.524,0.416,0.524,0.416c0,1.762,0,6.373,0,8.742
		                    c0,0.768,0,1.266,0,1.266s1.842,0,2.998,0c1.154,0,0.285,0.867,0.285,0.867s-4.904,6.51-5.588,7.193
		                    C15.092,18.979,14.62,18.426,14.62,18.426z' />
                    </g>
                </svg>

<!--                <svg width='20' height='20' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512.001 512.001'>-->
<!--                    <path-->
<!--                        class='fill-current'-->
<!--                        d='M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717-->
<!--                            L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859-->
<!--                            c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287-->
<!--                            l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285-->
<!--                            L284.286,256.002z'-->
<!--                    />-->
<!--                </svg>-->
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseDropFiles',
    props: {
        files: {
            type: Array,
            required: true,
        },
        download: Boolean,
    },
    methods: {
        onRemoveItemClick(idx) {
            this.$emit('on-remove-file-from-files', idx);
        },
        downloadFile(item) {
            this.$emit('on-download-file', item);
        },
    },
};
</script>

<style></style>
