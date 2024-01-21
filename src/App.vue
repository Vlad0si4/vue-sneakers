<script setup>
import { onMounted, provide, reactive, ref, watch } from 'vue'
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
import CardList from './components/CardList.vue'
// import SearchBar from './components/SearchBar.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])
const cartDrawer = ref([])

const drawerOpen = ref(false)

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}
const addToCardDrawer = (item) => {
  if (!item.isAdded) {
    cartDrawer.value.push(item)
    item.isAdded = true
  } else {
    cartDrawer.value.splice(cartDrawer.value.indexOf(item), -1)
    item.isAdded = false
  }

  console.log(cartDrawer)
}

const filters = reactive({
  sortBy: 'name',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}
const onChangeSearch = (event) => {
  filters.searchQuery = event.target.value
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    if (filters.searchQuery) {
      params.search = `${filters.searchQuery}`
    }

    const { data } = await axios.get('https://65a83e3694c2c5762da88316.mockapi.io/items', {
      params
    })

    items.value = data.map((obj) => ({
      ...obj,
      isFavorites: false,
      productId: null,
      isAdded: false
    }))
  } catch (error) {
    console.error(error)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(
      'https://65a83e3694c2c5762da88316.mockapi.io/favorites'
    )

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.productId === item.id)

      if (!favorite) {
        return item
      }
      return {
        ...item,
        isFavorites: true,

        productId: favorite.id
      }
    })
  } catch (error) {
    console.error(error)
  }
}

const addToFavorite = async (item) => {
  // item.isFavorites = !item.isFavorites
  try {
    if (!item.isFavorites) {
      item.isFavorites = true
      const { data } = await axios.post('https://65a83e3694c2c5762da88316.mockapi.io/favorites', {
        productId: item.id
      })

      item.productId = data.id
      console.log(data)
    } else {
      item.isFavorites = false
      await axios.delete(`https://65a83e3694c2c5762da88316.mockapi.io/favorites/${item.productId}`)

      item.productId = null
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
})

watch(filters, fetchItems)

// const addToFavorite = async (item) => {
//   if (!item.isFavorite) {
//     item.isFavorite = true
//     const data = await AddFavoritesThunk(item.id)
//     item.productId = data.id
//   } else {
//     item.isFavorite = false
//     const deleteData = await DeleteFavoritesThunk(item.productId)
//     item.productId = null
//     return deleteData
//   }
// }

// const fetchItems = async () => {
//   const data = await fetchAllItems()

//   items.value = data.map((obj) => ({
//     ...obj,
//     isFavorite: false,
//     productId: null,
//     isAdded: false
//   }))
// }
// fetchItems()
// const fetchAllFavorites = async () => {
//   const { data: favorites } = await fetchFavorites()

//   items.value = items.value.map((item) => {
//     const favoriteArray = Array.isArray(favorites) ? favorites : []
//     const favorite = favoriteArray.find((favorite) => favorite.productId === item.id)

//     if (!favorite) {
//       return item
//     }

//     return {
//       ...item,
//       isFavorite: true,
//       productId: favorite.id
//     }
//   })
// }

// const handleSelectChange = async (selectedValue) => {
//   items.value = await fetchSortThunk(selectedValue)
// }

// const handleSearch = async (words) => {
//   items.value = await fetchSearchThunk(words)
// }

// watch(items, async () => {
//   fetchAllFavorites()
// })

provide('toggleDrawer', toggleDrawer)
</script>

<template>
  <Drawer v-if="drawerOpen" />

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header @toggle-drawer="toggleDrawer" />
    <main class="p-8">
      <!-- <SearchBar @select-change="handleSelectChange" @search-change="handleSearch" /> -->

      <div class="flex flex-col items-center justify-between pb-10 md:flex-row">
        <h2 class="text-3xl font-bold pb-5 md:pb-0">All sneakers</h2>
        <div class="flex gap-4">
          <select @change="onChangeSelect" class="py-2 px-3 border rounded outline-none">
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>

          <div class="relative">
            <img class="absolute top-3.5 left-3" src="/search.svg" alt="search" />
            <input
              class="border rounded-md py-2 pl-8 pr-4 outline-none focus:border-gray-400"
              placeholder="search"
              @change="onChangeSearch"
            />
          </div>
        </div>
      </div>
      <CardList
        :items="items"
        @add-to-favorite="addToFavorite"
        @add-to-card-drawer="addToCardDrawer"
      />
    </main>
  </div>
</template>
