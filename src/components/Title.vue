<script setup lang="ts">
defineProps({
    generationTime: {
        type: Number,
        default: 0
    },
    checked: Boolean
});
defineEmits(['check', 'refresh']);

</script>

<template>
    <div class="flex flex-row justify-between mx-2 py-3">
        <div class="flex flex-row items-center">
            <div class="flex flex-row">
                <label for="checked">
                    <h2 class="text-lg font-bold">
                        Enable Web Workers:
                    </h2>
                </label>
                <input :checked="checked" @input="$emit('check', ($event.target as any)?.checked)" name="checked"
                    class="ml-3" type="checkbox" />
            </div>
            <div>
                <button @click="$emit('refresh')"
                    class="border-4 border-black rounded ml-8 py-1 px-3 bg-gray-100 hover:bg-gray-300 active:bg-gray-400">
                    Refresh
                </button>
            </div>
        </div>
        <div>
            <h1 class="text-2xl font-bold">
                Web Workers
            </h1>
            <div class="w-100 flex justify-center">
                <img class="rotating-image" src="/src/assets/vue.svg" />
            </div>
        </div>
        <div>
            <h2 class="text-lg font-bold">
                Generation Time: {{ generationTime }}s
            </h2>
        </div>
    </div>
</template>

<style>
.rotating-image {
    width: 30px;
    height: 30px;
    margin: 0;
    padding: 0;
    -webkit-animation: spin 4s linear infinite;
    -moz-animation: spin 4s linear infinite;
    animation: spin 4s linear infinite;
}

@-moz-keyframes spin {
    100% {
        -moz-transform: rotate(360deg);
    }
}

@-webkit-keyframes spin {
    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spin {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>