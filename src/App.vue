<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import ListItem from './components/ListItem.vue'
import { Item } from './models/item.model';
import { ITEMS_KEY } from './inject-keys';
import { Association } from './models/association.model';
import Panel from './components/Panel.vue';
import { addRandomAssosicationsToItems, createExapmleItems, getAssosications } from './helpers/mock-data-generator';
import { arrayToDict } from './helpers/array-to-dict';



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
    <Panel title="Items" input-title="Number Of Items" v-model="numberOfItems">
      <div class="grid grid-cols-3 p-5 gap-3">
        <ListItem v-for="item in items" :title="item.title" :content="item.content" :number-of-views="item.numberOfViews"
          :related-item-ids="item.relatedItemIds" />
      </div>
    </Panel>
    <Panel title="Associations" input-title="Associations Per Item" v-model="assosicationPerItem">
      <div class="grid grid-cols-3 p-5 gap-3">
        <ListItem v-for="item in assosications" :title="item.title" />
      </div>
    </Panel>
  </div>
</template>