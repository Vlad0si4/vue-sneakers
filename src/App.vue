<script setup>
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
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
const isLoading = ref(false)

const filters = reactive({
  sortBy: 'name',
  searchQuery: ''
})

const drawerOpen = ref(false)
// https://65ae15e41dfbae409a73e85f.mockapi.io/orders

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

const totalPrice = computed(() => {
  if (cartDrawer.value.length === 0) {
    return 0
  }
  return cartDrawer.value.reduce((acc, el) => acc + el.price, 0)
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
  const localCart = localStorage.getItem('cart')
  cartDrawer.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cartDrawer.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(
  filters,
  async () => {
    await fetchItems()

    items.value = items.value.map((el) => ({
      ...el,
      isAdded: cartDrawer.value.some((cartItem) => cartItem.id === el.id)
    }))
  },
  {
    deep: true
  }
)

watch(cartDrawer, () => {
  items.value = items.value.map((el) => ({ ...el, isAdded: false }))
})

watch(
  cartDrawer,
  () => {
    localStorage.setItem('cart', JSON.stringify(cartDrawer.value))
  },
  { deep: true }
)

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
