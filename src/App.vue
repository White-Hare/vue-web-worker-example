<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import ListItem from './components/ListItem.vue'
import { Item } from './models/item.model';
import { ITEMS_KEY } from './inject-keys';
import { Association } from './models/association.model';



const exampleItem = {
  id: "",
  title: "Lorem Ipsum",
  content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  numberOfViews: 5
} as Item;

function createExapmleItems(exampleItemsSize: number) {
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


function addRandomAssosicationsToItems(items: Item[], numberOfAssosications: number) {
  return items.map(item => {
    const relatedItemIds = getRandomItems(items, numberOfAssosications).map(item => item.id);
    return { ...item, relatedItemIds };
  })
}

function arrayToDict<T extends { id: string }>(items: T[]) {
  return items.reduce((acc, item) => ({ ...acc, [item.id]: item }), {} as Record<string, T>);
}

function getAssosications(items: Item[], itemsDict: Record<string, Item>): Association[] {
  return items.map(item => item.relatedItemIds.reduce(
    (acc, id) => {
      const otherItem = itemsDict[id];
      const ass = {
        title: item.title + ' - ' + otherItem.title,
        sourceId: item.id,
        targetId: id
      } as Association

      return [...acc, ass];
    }, [] as Association[]
  )).reduce((acc, items) => [...acc, ...items], [] as Association[]);
}


const numberOfItems = ref(500);
const assosicationPerItem = ref(5);


const items = ref([] as Item[]);
const assosications = ref([] as Association[]);
const itemsDict = ref({} as Record<string, Item>);

function updateItems(numberOfItems: number, assosicationPerItem: number) {
  items.value = addRandomAssosicationsToItems(createExapmleItems(numberOfItems), assosicationPerItem);
  itemsDict.value = arrayToDict(items.value);
  assosications.value = getAssosications(items.value, itemsDict.value);
}

provide(ITEMS_KEY, itemsDict);


watch([numberOfItems, assosicationPerItem], () => updateItems(numberOfItems.value, assosicationPerItem.value), { immediate: true });
</script>


<template>
  <div class="grid grid-cols-2 text-white bg-gray-900">
    <div class="overflow-y-auto h-screen scroll-m-1">
      <h2 class="text-xl font-bold underline p-3 text-center">
        Items
      </h2>
      <div class="px-5 flex flex-col">
        <label for="numberOfItems">Number Of Items</label>
        <input v-model="numberOfItems" name="numberOfItems" class="text-black w-1/3" type="number" />
      </div>
      <div class="grid grid-cols-3 p-5 gap-3">
        <ListItem v-for="item in items" :title="item.title" :content="item.content" :number-of-views="item.numberOfViews"
          :related-item-ids="item.relatedItemIds" />
      </div>
    </div>
    <div class="overflow-y-auto h-screen">
      <h2 class="text-xl font-bold underline p-3 text-center">
        Associations
      </h2>
      <div class="px-5 flex flex-col">
        <label for="assosicationPerItem">Associations Per Item</label>
        <input v-model="assosicationPerItem" name="assosicationPerItem" class="text-black w-1/3" type="number" />
      </div>
      <div class="grid grid-cols-3 p-5 gap-3">
        <ListItem v-for="item in assosications" :title="item.title" />
      </div>
    </div>
  </div>
</template>