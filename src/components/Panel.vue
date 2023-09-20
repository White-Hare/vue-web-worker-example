<script setup lang="ts">
import { ref } from 'vue';

defineProps({ modelValue: Number, title: String, inputTitle: String });
defineEmits(['update:modelValue']);

const renderItems = ref(true)

</script>

<template>
    <div class="overflow-y-auto h-screen scroll-m-1">
        <h2 class="text-xl font-bold underline p-3 text-center">
            {{ title }}
        </h2>
        <div class="px-5 flex flex-row">
            <div class="flex flex-col">
                <label for="modelValue">{{ inputTitle }}</label>
                <input :value="modelValue" @input="$emit('update:modelValue', ($event.target as any)?.value)"
                    name="modelValue" class="text-black w-2/3" type="number" />
            </div>
            <div class="flex flex-col">
                <label for="renderItems">Render Items</label>
                <input v-model="renderItems" class="w-fit" name="renderItems" type="checkbox" />
            </div>
        </div>
        <div>
            <div v-if="renderItems">
                <slot/>
            </div>
        </div>
    </div>
</template>