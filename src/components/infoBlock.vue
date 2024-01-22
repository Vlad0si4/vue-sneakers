<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String
})
</script>

<template>
  <div class="flex items-center flex-col text-center w-72 mx-auto">
    <img height="100" width="100" :src="imageUrl" alt="info image" />
    <h2 class="mt-4 text-xl font-medium">{{ title }}</h2>
    <p class="text-gray-400 mt-2">{{ description }}</p>
  </div>
</template>
