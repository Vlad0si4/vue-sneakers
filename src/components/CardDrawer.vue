<script setup>
const emit = defineEmits(['removeFromCard'])

defineProps({
  imgUrl: String,
  id: Number,
  title: String,
  price: Number
})
</script>

<template>
  <div class="flex items-center border border-slate-100 p-4 rounded-xl gap-6 mb-5">
    <img :src="imgUrl" :alt="title" class="w-16 h-16" />

    <div class="flex flex-col">
      <p class="">{{ title }}</p>

      <div class="flex items-center mt-3 gap-32">
        <p class="font-bold text-xl">{{ price }}$</p>
        <img
          src="/close.svg"
          alt="close"
          class="opacity-40 hover:opacity-100 cursor-pointer"
          @click="emit('removeFromCard')"
        />
      </div>
    </div>
  </div>
</template>
