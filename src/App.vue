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
const items = ref([])
const isLoading = ref(false)
const drawerOpen = ref(false)
// https://65ae15e41dfbae409a73e85f.mockapi.io/orders

// const addToFavorite = async (item) => {
//   // item.isFavorites = !item.isFavorites
//   try {
//     if (!item.isFavorites) {
//       item.isFavorites = true
//       const { data } = await axios.post('https://65a83e3694c2c5762da88316.mockapi.io/favorites', {
//         productId: item.id,
//         item
//       })

//       item.productId = data.id
//     } else {
//       item.isFavorites = false
//       await axios.delete(`https://65a83e3694c2c5762da88316.mockapi.io/favorites/${item.productId}`)

//       item.productId = null
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }

const addToCardDrawer = (item) => {
  if (!item.isAdded) {
    onClickAdd(item)
  } else {
    onClickRemove(item)
  }
}

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

provide('cart', {
  cartDrawer,
  items,
  closeDrawer,
  openDrawer,

  addToCardDrawer,
  onClickAdd,
  onClickRemove
  // addToFavorite
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
    </main>
  </div>
</template>
