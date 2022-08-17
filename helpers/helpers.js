import { chain } from 'lodash/core';

export function groupCruiseExcursionsByDay(excursions)
{
    let exID = 0;

    return chain(excursions)
        .groupBy('day')
        .map((list, day) => {
            exID++;

            return {
                id: exID,
                list,
                day,
            };
        })
        .value();
}

export function removeEmptyFromObj(obj)
{
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => {
        return v != null && v !== '';
    }));
}


export function mapSettings(settings)
{
    const map = {};
    settings.forEach(setting => {
        map[setting.name] = { value: setting.value, value_2: setting.value_2 };
    });
    return map;
}

export function inArray(selected, option, field) {
    return selected && selected.length > 0 && selected.filter(item => item[field] === option[field]).length > 0;
}

export function sliceSelectedOptions(options, selected) {
    const ids = selected.map(item => item.id);
    const copy = Array.from(options);

    return copy.filter(option => {
        return ids.findIndex(item => item === option.id) === -1;
    });
}

export function hasSelectedItem(selected, item) {
    return selected.includes(item);
}

export function getObjectProp(obj, prop) {
    return obj && obj[prop] ? obj[prop] : null;
};
