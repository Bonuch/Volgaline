<template>
    <div class="flex-table">
        <div
            class="flex-table__row flex-table__head flex-table__heading"
            :class="[
                {'flex-table__row--centered': rowsCentered}
            ]"
        >
            <template v-for="(col) in heading">
                <div
                    v-for="(val, propName) in col"
                    class="flex-table__col"
                    :class="`flex-table__${propName}`"
                    :key="propName"
                >
                    {{ val }}
                </div>
            </template>
        </div>

        <div class="flex-table__body">
            <div
                class="flex-table__row"
                :class="[
                    {'flex-table__row--centered': rowsCentered}
                ]"
                v-for="(row, rowIdx) in content"
                :key="rowIdx"
                @click.prevent="onRowClick(row.id)"
            >
                <div
                    class="flex-table__col"
                    v-for="(col, propName) in row" :key="propName"
                    :class="[
                        {'hidden': isHiddenFields(propName)},
                        {'flex-table__col--title': isMobileTitle(propName)},
                        `flex-table__${propName}`,
                    ]"
                >
                    <div v-if="isHtmlFields(propName)" class="flex-table__joined" v-html="col"></div>
                    <template v-else>{{ col }}</template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex";

    export default {
        name: "TableComponent",
        props: {
            heading: {
                type: Array,
                required: true,
            },
            content: {
                type: Array,
                required: true,
            },
            hiddenFields: {
                type: Array,
                default: null,
            },
            htmlFields: {
                type: Array,
                default: null,
            },
            joinedFields: {
                type: Array,
                default: null,
            },
            rowsCentered: {
                type: Boolean,
                default: false,
            },
            clickable: {
                type: Boolean,
                default: false,
            },
            mobileTitle: {
                type: String,
                default: "",
            },
        },
        computed: {
            isHiddenFields() {
                return (propName) => {
                    if (this.hiddenFields) {
                        let filtered = this.hiddenFields.filter(item => item === propName);
                        return filtered.length;
                    } else {
                        return false;
                    }
                };
            },
            isHtmlFields() {
                return (propName) => {
                    if (this.htmlFields) {
                        let filtered = this.htmlFields.filter(item => item === propName);
                        return filtered.length;
                    } else {
                        return false;
                    }
                };
            },
            isJoinedField() {
                return (propName) => {
                    if (this.joinedFields) {
                        let filtered = this.joinedFields.filter(item => item === propName);
                        return filtered.length;
                    } else {
                        return false;
                    }
                };
            },
            isMobileTitle() {
                return (propName) => propName === this.mobileTitle;
            },
        },
        methods: {
            ...mapActions(["openProjectDetailModal", "fetchProjectDetailByID"]),
            onRowClick(id) {
                this.$router.push({
                    query: Object.assign({}, { projectID: id }, this.$route.query),
                });
                this.fetchProjectDetailByID(id);
                this.openProjectDetailModal();
            },
        },
    };
</script>

<style lang="scss" scoped>
    .flex-table {
        display: flex;
        flex-wrap: wrap;
        font-size: 12px;

        &__head,
        &__body {
            width: 100%;
        }

        &__body {
            .flex-table__row {
                cursor: pointer;
                transition: background-color .3s ease;

                &:nth-child(even) {
                    background-color: gray;
                }

                &:hover {
                    background-color: gray;
                }
            }
        }

        &__row {
            width: 100%;
            display: flex;

            &--centered {
                align-items: center;
            }
        }

        &__col {
            flex-grow: 1;
            padding: 20px 15px;
            overflow: hidden;
        }

        &__heading {
            background-color: gray;
            color: gray;
            font-weight: 700;
            font-size: 18px;
        }

        &__description {
            width: 40%;
        }

        &__region {
            width: 20%;
            text-align: center;
        }

        &__work {
            width: 40%;
        }

        &__joined {
            &::v-deep {
                & > * {
                    &:first-child {
                        color: gray;
                    }
                }
            }
        }

        .hidden {
            display: none !important;
        }
    }

    @media all and (max-width: 860px) {
        .flex-table {
            display: block;
            width: 100%;

            &__row {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                padding: 10px;
                margin-bottom: 2em;
                box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
            }

            &__col {
                width: 100% !important;
                display: flex;
                align-items: center;
                padding: 7px 10px;

                &--heading {
                    display: inline-block;
                    flex: 1;
                    max-width: 120px;
                    min-width: 120px;
                    background-color: gray;
                    color: blue;
                    font-weight: 700;
                    border-right: 1px solid #ccc;
                    margin-right: 1em;
                }
            }

            &__head {
                display: none;
            }
        }
    }
</style>
