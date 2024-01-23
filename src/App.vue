<script setup>
import { computed, provide, ref } from 'vue'
import axios from 'axios'

// import {
//   fetchSortThunk,
//   AddFavoritesThunk,
//   DeleteFavoritesThunk,
//   fetchAllItems,
//   fetchFavorites,
//   fetchSearchThunk
// } from './api/index' // fetchSortThunk,
// fetchSearchThunk,

import Header from './components/Header.vue'

// import SearchBar from './components/SearchBar.vue'
import Drawer from './components/Drawer.vue'

const cartDrawer = ref([])
const isLoading = ref(false)
const drawerOpen = ref(false)
// https://65ae15e41dfbae409a73e85f.mockapi.io/orders

const onClickAdd = (item) => {
  cartDrawer.value.push(item)
  item.isAdded = true
}

const onClickRemove = (item) => {
  cartDrawer.value.splice(cartDrawer.value.indexOf(item), 1)
  item.isAdded = false
}

const createOrder = async () => {
  try {
    isLoading.value = true
    const { data } = await axios.post('https://65ae15e41dfbae409a73e85f.mockapi.io/orders', {
      items: cartDrawer.value,
      totalPrice: totalPrice.value
    })
    cartDrawer.value = []
    return data
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const closeDrawer = () => {
  drawerOpen.value = false
}
const openDrawer = () => {
  drawerOpen.value = true
}

const totalPrice = computed(() => {
  if (cartDrawer.value.length === 0) {
    return 0
  }
  return cartDrawer.value.reduce((acc, el) => acc + el.price, 0)
})

// watch(filters, addToCardDrawer)

provide('cart', {
  cartDrawer,
  closeDrawer,
  openDrawer,
  onClickAdd,
  onClickRemove
})
</script>

<template>
  <Drawer
    v-if="drawerOpen"
    :total-price="totalPrice"
    @create-order="createOrder"
    :is-loading="isLoading"
  />

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />
    <main class="p-8 fle">
      <router-view></router-view>
      <!-- <Home /> -->
      <!-- <SearchBar @select-change="handleSelectChange" @search-change="handleSearch" /> -->
    </main>
  </div>
</template>
