
export function isNew(date, dayjs) {
    return dayjs(date).year() > dayjs().year();
}

export function findSeoFieldByCode(seo, code) {
   return seo.find((el) => el.code === code);
}

/**
 * Обрабатываем search params из сео полей админки
 * @param seo
 */
export function findSearchParamsFromSeoFileds(seo) {
    let queries = {};
    let params = findSeoFieldByCode(seo, 'search_params');
    const qVal = params?.value;

    if (qVal) {
        let qFormatted = qVal.replace('?', '').split('&');

        qFormatted.forEach((el) => {
            let splitted = el.split('=');
            let key = splitted[0];
            queries[key] = splitted[1];
        });
    }

    return queries;
}
