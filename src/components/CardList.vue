<script setup>
import Card from './Card.vue'

defineProps({
  items: Array
})

const onClickChange = () => {
  alert(123)
}
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
    <Card
      v-for="item in items"
      :key="item.id"
      :imgUrl="item.imageUrl"
      :title="item.name"
      :price="item.price"
      :isAdded="true"
      :isFavorite="false"
      :onClickFavorite="onClickChange"
    />
  </div>
</template>
