<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import ListItem from './components/ListItem.vue'
import Title from './components/Title.vue'
import { Item } from './models/item.model';
import { ITEMS_KEY } from './inject-keys';
import { Association } from './models/association.model';
import Panel from './components/Panel.vue';

import { createExapmleItems, addRandomAssosicationsToItems, getAssosications } from './helpers/mock-data-generator';
import { arrayToDict } from './helpers/array-to-dict';

import * as vueuse from '@vueuse/core';

if (!window.Worker) {
  alert("This browser doesn't support workers");
}


const numberOfItems = ref(500);
const assosicationPerItem = ref(5);
const enableWebWorkers = ref(true);
const generationTime = ref(0);


const items = ref([] as Item[]);
const assosications = ref([] as Association[]);
const itemsDict = ref({} as Record<string, Item>);


let worker = vueuse.useWebWorker('/worker.js');


function generationProcess(numberOfItems: number, assosicationPerItem: number) {
  items.value = addRandomAssosicationsToItems(createExapmleItems(numberOfItems), assosicationPerItem);
  itemsDict.value = arrayToDict(items.value);
  assosications.value = getAssosications(items.value, itemsDict.value);
}


async function updateItems(numberOfItems: number, assosicationPerItem: number) {
  const startTime = Date.now();

  if (!enableWebWorkers.value) {
    generationProcess(numberOfItems, assosicationPerItem);
  }
  else {
    worker.post(JSON.stringify({ numberOfItems, assosicationPerItem }));
  }
  generationTime.value = (Date.now() - startTime) / 1000;
}

provide(ITEMS_KEY, itemsDict);

function refresh() {
  updateItems(numberOfItems.value, assosicationPerItem.value);
}

watch([numberOfItems, assosicationPerItem], () => refresh(), { immediate: true });
watch(worker.data, (newData)=>{
  [items.value, itemsDict.value, assosications.value] = JSON.parse(newData);
});

</script>


<template>
  <div>
    <Title :checked="enableWebWorkers" @check="enableWebWorkers = $event" @refresh="refresh()"
      :generation-time="generationTime" />
    <div class="grid grid-cols-2 text-white bg-gray-900">
      <Panel title="Items" input-title="Number Of Items" v-model="numberOfItems">
        <div class="grid grid-cols-3 p-5 gap-3">
          <ListItem v-for="item in items" :title="item.title" :content="item.content"
            :number-of-views="item.numberOfViews" :related-item-ids="item.relatedItemIds" />
        </div>
      </Panel>
      <Panel title="Associations" input-title="Associations Per Item" v-model="assosicationPerItem">
        <div class="grid grid-cols-3 p-5 gap-3">
          <ListItem v-for="item in assosications" :title="item.title" />
        </div>
      </Panel>
    </div>
  </div>
</template>../public/worker