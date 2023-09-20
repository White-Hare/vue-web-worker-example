<script setup lang="ts">
defineProps({
    generationTime: {
        type: Number,
        default: 0
    },
    enableWebWorkers: Boolean
});
defineEmits(['update:enableWebWorkers', 'refresh']);

</script>

<template>
    <div class="flex flex-row justify-between mx-2 py-3">
        <div class="flex flex-row items-center">
            <div class="flex flex-row">
                <label for="enableWebWorkers">
                    <h2 class="text-lg font-bold">
                        Enable Web Workers:
                    </h2>
                </label>
                <input :value="enableWebWorkers" @input="$emit('update:enableWebWorkers', ($event.target as any)?.value)"
                    name="enableWebWorkers" class="ml-3" type="checkbox" />
            </div>
            <div>
                <button @click="$emit('refresh')" class="border-4 border-black rounded ml-8 py-1 px-3 hover:bg-gray-300 active:bg-gray-400">
                    Refresh
                </button>
            </div>
        </div>
        <div>
            <h1 class="text-2xl font-bold">
                Web Workers
            </h1>
        </div>
        <div>
            <h2 class="text-lg font-bold">
                Generation Time: {{ generationTime }}s
            </h2>
        </div>
    </div>
</template>