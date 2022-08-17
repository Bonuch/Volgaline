export const objectHelpers = {
    methods: {
        objectNotEmpty(obj) {
            return obj && Object.keys(obj).length !== 0 && obj.constructor === Object;
        }
    },
};
