export const state = () => ({
    excursions: null,
    selected: [],
});

export const getters = {
    getExcursions(state) {
        return state.excursions;
    },
    getSelected(state) {
        return state.selected;
    },
};

export const mutations = {
    setExcursions(state, payload) {
        state.excursions = payload;
    },
    setSelected(state, payload) {
        state.selected = payload;
    },
};

export const actions = {
    dispatchSelectedExcursions({commit}, payload) {
        commit("setSelected", payload);
    },
    addSelectedExcursion({ commit, getters }, { dayID, excursion }) {
        const newItem = {
            id: dayID,
            list: [excursion],
        };

        if (getters.getSelected && getters.getSelected.length > 0) {
            let copy = JSON.parse(JSON.stringify(getters.getSelected));
            const idx = copy.findIndex(item => item.id === dayID);

            if (idx !== -1) {
                const filteredList = copy[idx]["list"].filter(item => item.id !== excursion.id);

                if (filteredList && filteredList.length > 0) {
                    copy[idx]["list"] = [...filteredList, excursion];
                } else {
                    copy[idx]["list"] = [excursion];
                }
            } else {
                copy = [...copy, ...[newItem]];
            }

            commit("setSelected", copy);
        } else {
            commit("setSelected", [newItem]);
        }
    },
    removeSelectedExcursion({ commit, getters }, { dayID, itemID }) {
        if (getters.getSelected && getters.getSelected.length > 0) {
            let copy = JSON.parse(JSON.stringify(getters.getSelected));

            copy = copy.map(item => {
                if (item.id === dayID) {
                    item.list = item.list.filter(listItem => listItem.id !== itemID);
                }

                return item;
            });

            commit("setSelected", copy);
        }
    },
    removeSelectedGroup({ commit, getters }, dayID) {
        const copy = JSON.parse(JSON.stringify(getters.getSelected));

        if (copy && copy.length > 0) {
            const newArr = copy.filter(item => item.id !== dayID);
            commit("setSelected", newArr);
        }
    },
};
