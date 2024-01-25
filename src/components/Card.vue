<script setup>
defineProps({
  imgUrl: String,
  id: Number,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdded: Function,
  onClickFavorite: Function
})
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-5 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition"
  >
    <img
      v-if="onClickFavorite"
      @click="onClickFavorite"
      :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
      alt="like"
      class="absolute top-5 left-5"
    />
    <img :src="imgUrl" alt="sneaker" class="w-auto" />
    <p class="mt-2">{{ title }}</p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Price:</span>
        <span class="font-bold">{{ price }} $</span>
      </div>
      <img
        v-if="onClickAdded"
        @click="onClickAdded"
        :src="isAdded ? '/checked.svg' : '/plus.svg'"
        alt="plus"
      />
    </div>
  </div>
</template>
