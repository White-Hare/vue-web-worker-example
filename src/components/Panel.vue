<script setup lang="ts">
defineProps({ modelValue: Number, title: String, inputTitle: String });
defineEmits(['update:modelValue']);


</script>

<template>
    <div class="overflow-y-auto h-screen scroll-m-1">
        <h2 class="text-xl font-bold underline p-3 text-center">
            {{ title }}
        </h2>
        <div class="px-5 flex flex-col">
            <label for="modelValue">{{ inputTitle }}</label>
            <input :value="modelValue" @input="$emit('update:modelValue', ($event.target as any)?.value)"
                name="modelValue" class="text-black w-1/3" type="number" />
        </div>
        <div>
            <slot />
        </div>
    </div>
</template>