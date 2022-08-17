import { setCase, formatCurrency } from "@/helpers/text";

export const parsePhoneMixin = {
    computed: {
        chParsePhone() {
            return (phone) => {
                return phone ? phone.replace(/[^+\d]+/g, "") : "";
            };
        },
        chFormatPhone() {
            return (phone) => {
                const cleaned = ('' + phone).replace(/\D/g, '');
                const match = cleaned.match(/^(7|)?(\d{3})(\d{3})(\d{2})(\d{2})$/);
                if (match) {
                    const intlCode = (match[1] ? '+7 ' : '');
                    return [intlCode, '(', match[2], ') ', match[3], '-', match[4], '-', match[5]].join('');
                }
            };
        },
    },
};

export const htmlHelper = {
    computed: {
        strippedContent() {
            let regex = /(<([^>]+)>)/ig;
            return (content) => content ? content.replace(regex, "") : "";
        },
    },
    methods: {
        isEmptyText(text) {
            if (!text)  return true;
            text = text.replace(/(<([^>]+)>)/gi, '');
            text = text.split(' ').join('');
            return (text === '');
        }
    },
};

export const seoHelper = {
    methods: {
        getPageTitle() {
            let title = this.title || this.seoTitle;  // TODO refactor
            if (this.content) {
                if (this.content.title) {
                    title = this.content.title;
                }
                const seoTitle = this.findSeoParam('title');
                if (!title && seoTitle) {
                    title = seoTitle;
                }
            }
            return title;
        },
        getSeoField(name, defaultVal = '') {
            const value = this.findSeoParam(name);
            return value ? value : defaultVal;
        },
        getSeoType(defaultType = 'website') {
            const type = this.findSeoParam('type');
            return type ? type : defaultType;
        },
        getOgImage(ogName = "image") {
            return this.content && this.content[ogName] ? this.content[ogName] : process.env.BASE_URL + "images/default-og-image.jpeg";
        },
        getSeoDatePublished(defaultVal = '') {
            return this.content && this.content.created_at ? this.$dayjs(this.content.created_at).format("YYYY-MM-DD") : defaultVal;
        },
        findSeoParam(param) {
            if (this.content && this.content.seo && Array.isArray(this.content.seo)) {
                for (const item of this.content.seo) {
                    if (item.code === param) {
                        return item.value;
                    }
                }
            }
            return null;
        }
    },
    computed: {
        getPageUrl() {
            const domain = process.env.BASE_URL;
            return `${domain}${this.$route.path}`;
        },
    },
    jsonld() {
        return {
            '@context': 'https://schema.org',
            '@type': this.getSeoType('WebPage'),
            "headline": this.getPageTitle(),
            "image": this.getOgImage(),
            "keywords": this.getSeoField('keywords'),
            "description": this.getSeoField('description'),
            "url": this.getPageUrl,
            "datePublished": this.getSeoDatePublished(),
        };
    },
};

export const dayjsHelpers = {
    computed: {
        getDaysFormatted() {
            return (length) => setCase(Number(length), ["день", "дня", "дней"], "<");
        },
        getDateFormatted() {
            return (dateStr) => this.$dayjs(dateStr).locale("ru").format("DD MMMM YYYY (dd)");
        },
        getMobileDateFormatted() {
            return (dateStr) => this.$dayjs(dateStr).format("DD.MM.YYYY (dd)");
        },
        getDayAndTimeFormatted() {
            return (dateStr) => this.$dayjs(dateStr).locale("ru").format("dddd H:mm");
        },
        dayjsGetDayFormatted() {
            return (dateStr) => this.$dayjs(dateStr).locale("ru").format("dddd");
        },
        dayjsGetTimeFormatted() {
            return (dateStr) => this.$dayjs(dateStr).locale("ru").format("H:mm");
        },
        dayjsGetMonth() {
            return (dateStr) => this.$dayjs(dateStr).locale("ru").format("MMMM");
        },
        dayjsGetYear() {
            return (dateStr) => this.$dayjs(dateStr).locale("ru").format("YYYY");
        },
        getDateFormattedWithDot() {
            return (dateStr) => this.$dayjs(dateStr).locale("ru").format("DD MMMM YYYY г.");
        },
        dayjsGetISO() {
            return (dateStr) => this.$dayjs(dateStr).format('YYYY-MM-DDT00:00:00.000[Z]');
        },
    },
};

export const fetchSearchResult = {
    data() {
        return {
            fsrLoading: false,
            fsrContent: [],
            fsrContentMeta: {},
        };
    },
    computed: {
        fsrShowMoreVisibility() {
            let res = false;

            if (this.fsrContentMeta) {
                if (this.fsrContentMeta.elastic) {
                    res = !!this.fsrContentMeta.sort_index;
                } else {
                    res = this.fsrContentMeta.current_page < this.fsrContentMeta.last_page;
                }
            }

            return res;
        },
    },
    methods: {
        async fsrOnSearchMoreClick(url, additionalParams = {}) {
            let query = { ...this.$route.query };

            if (additionalParams && Object.keys(additionalParams).length > 0) {
                query = Object.assign({}, query, additionalParams);
            }

            if (this.fsrContentMeta) {
                if (this.fsrContentMeta.elastic) {
                    // сорт индекс для эластика
                    const prepeared = this.fsrContentMeta.sort_index.join(','); // массив в строку

                    query = {
                        ...query,
                        sort_index: prepeared,
                    };
                } else if (this.fsrContentMeta.current_page < this.fsrContentMeta.last_page) {
                    // подкидываем следующую страницу без эластика
                    query = {
                        ...query,
                        ...{ page: Number(this.fsrContentMeta.current_page) + 1 },
                    };
                }
            }

            await this.fsrFetch(url, query);
        },
        async fsrFetch(url, params = null) {
            this.fsrLoading = true;

            try {
                const { data } = await this.$axios.get(url, { params });
                (this.fsrContent && this.fsrContent.length > 0) ? this.fsrSetData(data, true) : this.fsrSetData(data);
                this.fsrLoading = false;
            } catch (e) {
                this.fsrLoading = false;
                console.log(`cant fetch content ${e}`);
                this.$nuxt.error({ statusCode: 404, message: "cant fetch content" });
            }
        },
        async fsrSearch(url, params) {
            this.fsrLoading = true;

            try {
                const { data } = await this.$axios.get(url, { params });
                this.fsrSetData(data);
                this.fsrLoading = false;
            } catch (e) {
                this.fsrLoading = false;
                console.log(`cant find content ${e}`);
                this.$nuxt.error({ statusCode: 404, message: "cant fetch content" });
            }
        },
        fsrSetData(data, merge = false) {
            this.fsrContent = merge ? [...this.fsrContent, ...data.data] : data.data;
            this.fsrContentMeta = data.meta;
        },
    },
};

export const cruiseCabinsHelper = {
    computed: {
        getCabinsNumberText() {
            return this.item.free_cabins === 0 ? 'Свободных кают - нет.' : `Свободных кают: ${this.item.free_cabins}`;
        },
        cabinsEmpty() {
            return this.item.free_cabins <= 0;
        },
        getSlug() {
            return `/rechnye-kruizy/${ this.item.slug }`;
        },
        daysAndNights() {
            // 10 дней / 9 ночей
            const days = this.item.duration_days.days;
            const nights = this.item.duration_days.nights;

            const daysText = setCase(days, ["день", "дня", "дней"]);
            const daysFormatted = `${days} ${daysText}`;

            if (nights > 0) {
                const nightsText = setCase(nights, ["ночь", "ночи", "ночей"]);
                return `${daysFormatted} / ${nights} ${nightsText}`;
            }

            return daysFormatted;
        },
    },
    methods: {
        getFormatedPricePerPerson(price) {
            return `от ${formatCurrency(price)} /чел.`;
        },
        getCabinTextColor(cabinsNumber) {
            let color = 'text-red-500';

            if (cabinsNumber > 1) {
                color = 'text-green-600';
            }

            return color;
        },
    },
};
