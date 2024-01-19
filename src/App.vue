<script setup>
import { onMounted, ref, watch } from 'vue'
import {
  fetchSortThunk,
  fetchSearchThunk,
  fetchAllItems,
  fetchFavorites,
  AddFavoritesThunk,
  DeleteFavoritesThunk
} from './api/index'

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import SearchBar from './components/SearchBar.vue'
// import Drawer from './components/Drawer.vue'

const items = ref([])

const addToFavorite = async (item) => {
  if (!item.isFavorite) {
    item.isFavorite = true
    const data = await AddFavoritesThunk(item.id)
    item.productId = data.id
  } else {
    item.isFavorite = false
    const deleteData = await DeleteFavoritesThunk(item.productId)
    item.productId = null
    return deleteData
  }
}

const fetchItems = async () => {
  const data = await fetchAllItems()

  items.value = data.map((obj) => ({
    ...obj,
    isFavorite: false,
    productId: null,
    isAdded: false
  }))
}

const fetchAllFavorites = async () => {
  const { data: favorites } = await fetchFavorites()

  items.value = items.value.map((item) => {
    const favoriteArray = Array.isArray(favorites) ? favorites : []
    const favorite = favoriteArray.find((favorite) => favorite.productId === item.id)

    if (!favorite) {
      return item
    }

    return {
      ...item,
      isFavorite: true,

      productId: favorite.id
    }
  })
}

// const fetchFavorites = async () => {
//   try {
//     const { data: favorites } = await axios.get(
//       'https://65a83e3694c2c5762da88316.mockapi.io/favorites'
//     )

//     items.value = items.value.map((item) => {
//       const favorite = favorites.find((favorite) => favorite.parentId === item.id)

//       if (!favorite) {
//         return item
//       }

//       return {
//         ...item,
//         isFavorite: true,
//         favoriteId: favorite.id
//       }
//     })

//     console.log(items.value)
//   } catch (error) {
//     console.log(error)
//   }
// }

const handleSelectChange = async (selectedValue) => {
  console.log(selectedValue)
  items.value = await fetchSortThunk(selectedValue)
}

const handleSearch = async (words) => {
  items.value = await fetchSearchThunk(words)
}

onMounted(async () => {
  await fetchItems()
  await fetchAllFavorites()
})
watch(items, fetchSortThunk, fetchSearchThunk)

// provide('addToFavorite', addToFavorite)
</script>

<template>
  <!-- <Drawer /> -->

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header />
    <main class="p-8">
      <SearchBar @select-change="handleSelectChange" @search-change="handleSearch" />
      <CardList :items="items" @addToFavorite="addToFavorite" />
    </main>
  </div>
</template>
