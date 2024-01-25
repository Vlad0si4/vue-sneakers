<script setup>
import Card from './Card.vue'

defineProps({
  items: Array,
  isFavorites: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCardDrawer'])
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :imgUrl="item.imageUrl"
      :title="item.name"
      :price="item.price"
      :isAdded="item.isAdded"
      :isFavorite="item.isFavorites"
      :onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
      :onClickAdded="isFavorites ? null : () => emit('addToCardDrawer', item)"
    />
  </div>
</template>
