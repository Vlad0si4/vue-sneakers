<script setup>
// import { inject } from 'vue'
import Card from './Card.vue'

defineProps({
  items: Array
})

const emit = defineEmits(['addToFavorite', 'addToCardDrawer'])

//provider
// const addToFavorite = inject('addToFavorite')
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-8" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :imgUrl="item.imageUrl"
      :title="item.name"
      :price="item.price"
      :isAdded="item.isAdded"
      :isFavorite="item.isFavorites"
      :onClickFavorite="() => emit('addToFavorite', item)"
      :onClickAdded="() => emit('addToCardDrawer', item)"
    />
  </div>
</template>
