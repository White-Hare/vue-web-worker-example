<script setup lang="ts">
import { Ref, computed, inject } from 'vue';
import { Item } from '../models/item.model';
import { ITEMS_KEY } from '../inject-keys';

const props = defineProps({
    content: String,
    title: String,
    numberOfViews: Number,
    relatedItemIds: Array<string>
});


const items = inject(ITEMS_KEY) as Ref<Record<string, Item>>;
const otherItemsTitles = computed(() => props.relatedItemIds?.map(id => items.value[id].title) );

</script>

<template>
    <div class="w-full h-full border rounded bg-white text-black">
        <div class="mb-3 p-3">
            <h3 class="text-lg font-bold">{{ props.title }}</h3>
        </div>
        <div class="text-center mb-3" v-if="props.content">
            {{ props.content }}
        </div>
        <div class="bg-gray-900 text-white border border-white px-3 py-1" v-if="relatedItemIds">
           <h4 class="underline">Assosications</h4>
            <div v-for="title in otherItemsTitles">
                {{ title }}
            </div>
        </div>
        <div class="text-right font-bold" v-if="props.numberOfViews">
            Views: {{ props.numberOfViews }}
        </div>
    </div>
</template>