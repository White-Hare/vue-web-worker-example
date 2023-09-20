function arrayToDict(items) {
    return items.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
}


const exampleItem = {
    id: "",
    title: "Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    numberOfViews: 5
};


function createExapmleItems(exampleItemsSize) {
    const items = [];
    for (let i = 0; i < exampleItemsSize; i++) {
        const item = {
            ...exampleItem,
            id: crypto.randomUUID(),
            title: exampleItem.title + ' ' + (i + 1),
            numberOfViews: Math.ceil(Math.random() * 1000)
        };

        items.push(item);
    }
    return items;
}


function getRandomItems(items, numberOfItems) {
    const r = [];
    for (let i = 0; i < numberOfItems; i++) {
        const index = Math.floor(Math.random() * items.length)
        r.push(items[index]);
    }
    return r;
}


function addRandomAssosicationsToItems(items, numberOfAssosications) {
    return items.map(item => {
        const relatedItemIds = getRandomItems(items, numberOfAssosications).map(item => item.id);
        return { ...item, relatedItemIds };
    })
}

function getAssosications(items, itemsDict) {
    return items.map(item => item.relatedItemIds.reduce(
        (acc, id) => {
            const otherItem = itemsDict[id];
            const ass = {
                title: item.title + ' - ' + otherItem.title,
                sourceId: item.id,
                targetId: id
            };

            return [...acc, ass];
        }, []
    )).reduce((acc, items) => [...acc, ...items], []);
}

function generationProcess(numberOfItems, assosicationPerItem) {
    const items = addRandomAssosicationsToItems(createExapmleItems(numberOfItems), assosicationPerItem);
    const itemsDict = arrayToDict(items);
    const assosications = getAssosications(items, itemsDict);

    return [items, itemsDict, assosications];
}


self.addEventListener("message", function (e) {
    const { numberOfItems, assosicationPerItem } = JSON.parse(e.data);
    postMessage(JSON.stringify(generationProcess(numberOfItems, assosicationPerItem)));
}, false);
