export function hashAndOrderItems(items, uniqueId) {
    let byId = {},
        allIds = [];

    items.reduce((acc, item) => {
        let id = item[uniqueId] || item.id;

        byId[id] = item;
        acc.push(id);

        return acc;
    }, allIds);

    return {
        byId,
        allIds
    };
}