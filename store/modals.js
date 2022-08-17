export const state = () => ({
    modalStatus: null, // видимость модалки
    modalName: null, // название компонента, который будем подтягивать нутри обертки
    modalSize: "medium", // размер модалки(смотреть в css)
    modalMessage: null, // сообщение
    modalContent: null, // данные для подгрузки в модалке (например список экскурсий и т.д.)
    modalCb: null, // действие, которое выполнится после закрытия модалки
    modalCustomClass: null, // klass dlya obertki
});

export const getters = {
    getModalName(state) {
        return state.modalName;
    },
    getModalStatus(state) {
        return state.modalStatus;
    },
    getModalSize(state) {
        return state.modalSize;
    },
    getModalMessage(state) {
        return state.modalMessage;
    },
    getModalContent(state) {
        return state.modalContent;
    },
    getModalCb(state) {
        return state.modalCb;
    },
    getModalCustomClass(state) {
        return state.modalCustomClass;
    },
};

export const mutations = {
    setModalName(state, name) {
        state.modalName = name;
    },
    setModalSize(state, payload) {
        state.modalSize = payload;
    },
    setModalStatus(state, status) {
        state.modalStatus = status;
    },
    setModalMessage(state, message) {
        state.modalMessage = message;
    },
    setModalContent(state, payload) {
        state.modalContent = payload;
    },
    setModalCb(state, payload) {
        state.modalCb = payload;
    },
    setModalCustomClass(state, payload) {
        state.modalCustomClass = payload;
    },
};

export const actions = {
    openModal({ commit }, options) {
        commit("setModalName", options.name);
        commit("setModalSize", options.size || "medium");
        commit("setModalCustomClass", options?.customClass);
        commit("setModalStatus", true);
        commit("setModalCb", options.cb || null);
        commit("setModalContent", options.content);
        commit("setModalMessage", options.message);
    },
    closeModal({ commit }) {
        commit("setModalName", null);
        commit("setModalSize", 'medium');
        commit("setModalStatus", null);
        commit("setModalCb", null);
        commit("setModalContent", null);
    },
    updateModalMessage({ commit }, payload) {
        commit("setModalMessage", payload);
    },
    updateModalCb({ commit }, payload) {
        commit("setModalCb", payload);
    },
};
