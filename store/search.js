import orderBy from 'lodash/orderBy';

const initOptions = {
    duration: [
        {
            id: 1,
            title: '1-4 дня',
            value: [1, 2, 3, 4],
        },
        {
            id: 2,
            title: '5-7 дней',
            value: [5, 6, 7],
        },
        {
            id: 3,
            title: '8-11 дней',
            value: [8, 9, 10, 11],
        },
        {
            id: 4,
            title: '12-14 дней',
            value: [12, 13, 14],
        },
        {
            id: 5,
            title: '15+ дней',
            value: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        },
    ],
    numberOfSeats: [
        {
            id: 1,
            value: 1,
            title: 'Одно - местное',
        },
        {
            id: 2,
            value: 2,
            title: 'Двух - местное',
        },
        {
            id: 3,
            value: 3,
            title: 'Трех - местное',
        },
        {
            id: 4,
            value: 4,
            title: 'Четырех - местное',
        },
        {
            id: 5,
            value: 5,
            title: 'Пяти - местное',
        },
    ],
};

export const state = () => ({
    options: null,
    selectedOptions: null,
});

function compareArrayOfObjects(a, b) {
    if (a.disabled < b.disabled) {
        return -1;
    }
    if (a.disabled > b.disabled) {
        return 1;
    }
    return 0;
}

export const getters = {
    getOptions(state) {
        return state.options;
    },
    getSelectedOptions(state) {
        return state.selectedOptions;
    },
    getFilteredOptions(state) {
        let options = state.options;
        let selectedOptions = state.selectedOptions;
        const optionsCopy = JSON.parse(JSON.stringify(options));

        if (options && selectedOptions) {
            for (const [k, v] of Object.entries(optionsCopy)) {
                // фильтрация
                if (k === 'numberOfSeats' || k === 'duration') {
                    // опции которые не фильтруем
                } else {
                    optionsCopy[k].forEach(option => {
                        for (const selected of Object.values(selectedOptions[k])) {
                            if (option.id === selected) {
                                option.disabled = 0;
                                break;
                            } else {
                                option.disabled = 1;
                            }
                        }

                        // сортировка кораблей по приоритету
                        if (k === 'ships') {
                            optionsCopy[k] = orderBy(optionsCopy[k], ['disabled', 'show_priority'], ['asc', 'desc']);
                        } else {
                            optionsCopy[k] = orderBy(optionsCopy[k], ['disabled'], ['asc']);
                        }
                    });

                    options = optionsCopy;
                }
            }

            // --- фильтрация продолжительности
            let selectedDuration = selectedOptions.duration;
            if (selectedDuration && !Array.isArray(selectedDuration) && Object.keys(selectedDuration).length > 0) {
                // когда продолжительность отсутствует - приходит пустой массив, поэтому и проверка на !isArray
                selectedDuration = Object.values(selectedDuration);

                options.duration.forEach(item => {
                    const values = item.value;
                    let intersection = values.filter(x => selectedDuration.includes(x));
                    item.disabled = intersection.length < 1;
                });

                options.duration = orderBy(optionsCopy.duration, ['disabled'], ['asc']);
            }
            // --- фильтрация продолжительности
        } else if (options) {
            optionsCopy.ships = orderBy(optionsCopy.ships, ['show_priority'], ['desc']);
        }

        return optionsCopy;
    },
};

export const mutations = {
    setOptions(state, payload) {
        state.options = payload;
    },
    setSelectedOptions(state, payload) {
        state.selectedOptions = payload;
    },
};

export const actions = {
    async fetchAllOptions({ commit }) {
        try {
            const { data } = await this.$axios.get('/cruise/get-search-params');
            commit('setOptions', Object.assign({}, initOptions, data));
            commit('setSelectedOptions', null);
        } catch (ex) {
            console.log('cant fetch search options: ' + ex);
        }
    },
    async fetchSelectedOptions({ commit, getters }, params) {
        if (params && Object.keys(params).length > 0) {
            try {
                const { data } = await this.$axios.get('/cruise/search-params', { params });

                // заглушка для поиска при выбраном одном параметре и исключении его из фильтрации
                if (Object.keys(params).length === 1) {
                    const key = Object.keys(params)[0];
                    data[key] = {};
                }

                commit('setSelectedOptions', data);
            } catch (ex) {
                console.log('cant fetch search options: ' + ex);
            }
        }
    },
};
