<script setup>
import { inject } from 'vue'
import CardDrawer from './CardDrawer.vue'

const { cartDrawer, onClickRemove } = inject('cart')
</script>

<template>
  <div v-auto-animate>
    <CardDrawer
      v-for="item in cartDrawer"
      :key="item.id"
      :title="item.name"
      :price="item.price"
      :img-url="item.imageUrl"
      @remove-from-card="onClickRemove(item)"
    />
  </div>
</template>
