export const sfmQueryNames = ['departure_date_from', 'departure_date_to', 'departure_points', 'route_points', 'ships', 'price_from', 'price_to', 'duration', 'special_offers', 'number_seats', 'is_weekend'];

export function sfmPrepearFormData(formData, dayjs) {
    const res = {};

    for (let [key, value] of Object.entries(formData)) {
        if (!value || value === '') continue;

        if (key === 'departureDate') {
            res.departure_date_from = dayjs(formData.departureDate.start).format('DD.MM.YYYY');
            res.departure_date_to = dayjs(formData.departureDate.end).format('DD.MM.YYYY');
            continue;
        }

        if (key === 'priceRange') {
            res.price_from = formData.priceRange[0];
            res.price_to = formData.priceRange[1];
            continue;
        }

        if (Array.isArray(value)) {
            if (value.length > 0) {
                if (key === 'duration' || key === 'number_seats') {
                    value = value.map(item => item.value);
                } else {
                    value = value.map(item => item.id);
                }

                res[key] = value.join(',');
            }

            continue;
        }

        res[key] = value;
    }

    return res;
};

export function sfmQueryHasProp(query, paramsNameArr = sfmQueryNames) {
    let res = false;

    for (let i = 0; i < paramsNameArr.length; i++) {
        if (query.hasOwnProperty(paramsNameArr[i])) {
            res = true;
            break;
        }
    }

    return res;
}
