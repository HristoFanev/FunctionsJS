/**
 * Checking the type of the column
 * @param {*} c Giving the column
 * @param {*} item Giving the item in the column
 * @returns {*} Type of the given column
 */

export const colType = (c, item) => c.dynamicType?.(item) || c.type;

/**
 * Formating the given currency to string with $ sign
 * @param {*} value Currency that need to be formated to string
 * @returns {string} Currency with dollar sign
 */
export const formatCurrency = (value) => "$" + value.toString();

/**
 * Function that gives all the posible columns and types to use
 * @returns {*} The type of the called column
 */
export const COLUMN_TYPE = {
    TEXT: 'text',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    DATE: 'date',
    TIME: 'time',
    TIMESPAN: 'timespan',
    CHECKBOX: 'checkbox',
    STATUS: 'status',
    ENUM: 'enum',
    CURRENCY: 'currency'
};

/**
 * External Function that uses comparator function to sort the given array
 * @param {any[]} array Array that needs to be sorted
 * @param {string[]} keys variables so the array can be compared and sorted
 * @param {boolean} asc how to be sorted the array - ascending or descending
 * @param {Function} valueFormatter formates the type of the value
 * @param {Function} ifCallback for second usage
 * @returns {any[]} Array sorted by ascending
 */
export function sortBy(array, keys, asc = true, valueFormatter = undefined, ifCallback = undefined) {
    return array.slice().sort((a, b) => comparator(a, b, keys, asc, valueFormatter, ifCallback));
}

/**
 * External function that group diferent lists checking the criteria of their keys and using external function reduce
 * @param {any[]} list Diferent lists
 * @param {*} key The value that group diferent lists
 * @returns {any[]} Groups of diferent lists
 */
export function groupBy(list, key) {
    return list.reduce((res, x) => {
        (res[x[key]] = res[x[key]] || []).push(x);
        return res;
    }, {});
}


/**
 * External function that enumerates the data in the given array
 * @param {any[]} data Array that should be enumerated
 * @param {*} propertyName More information for the data in array
 * @returns {any[]} List that creates an unorder list(html) in which is stored the amount of clicks on one item
 */
export function enumerateData(data, propertyName) {

    if (!data || !Array.isArray(data))
        throw new Error("Data parameter should be array")

    const list = document.createElement('ul');

    for (let i = 0; i < data.length; i++) {
        const li = document.createElement('li');
        const clickEvent = new CustomEvent('item_selected', { item: data[i] })

        li.innerText = data[i][propertyName] || '';
        li.addEventListener('click', (e) => li.dispatchEvent(clickEvent))

        list.appendChild(li);
    }

    return list;
}