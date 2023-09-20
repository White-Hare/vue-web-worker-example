import { Association } from "../models/association.model";
import { Item } from "../models/item.model";

const exampleItem = {
    id: "",
    title: "Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    numberOfViews: 5
  } as Item;
  
  export function createExapmleItems(exampleItemsSize: number) {
    const items = [] as Item[];
    for (let i = 0; i < exampleItemsSize; i++) {
      const item = {
        ...exampleItem,
        id: crypto.randomUUID(),
        title: exampleItem.title + ' ' + (i + 1),
        numberOfViews: Math.ceil(Math.random() * 1000)
      } as Item;
  
      items.push(item);
    }
    return items;
  }
  
  
  function getRandomItems(items: Item[], numberOfItems: number) {
    const r = [] as Item[];
    for (let i = 0; i < numberOfItems; i++) {
      const index = Math.floor(Math.random() * items.length)
      r.push(items[index]);
    }
    return r;
  }
  
  
  export function addRandomAssosicationsToItems(items: Item[], numberOfAssosications: number) {
    return items.map(item => {
      const relatedItemIds = getRandomItems(items, numberOfAssosications).map(item => item.id);
      return { ...item, relatedItemIds };
    })
  }
  
  export function getAssosications(items: Item[], itemsDict: Record<string, Item>): Association[] {
    return items.map(item => item.relatedItemIds.reduce(
      (acc, id) => {
        const otherItem = itemsDict[id];
        const ass = {
          title: item.title + ' - ' + otherItem.title,
          sourceId: item.id,
          targetId: id
        } as Association;
  
        return [...acc, ass];
      }, [] as Association[]
    )).reduce((acc, items) => [...acc, ...items], [] as Association[]);
  }
  