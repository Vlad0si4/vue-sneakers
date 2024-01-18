<script setup>
import Header from './components/Header.vue'

import CardList from './components/CardList.vue'
import SearchBar from './components/SearchBar.vue'
import { onMounted, ref } from 'vue'
import { fetchAllItems, fetchSortThunk, fetchSearchThunk } from './api/index'
// import Drawer from './components/Drawer.vue'

const items = ref([])
// const sortBy = ref('')
// const searchQuery = ref('')

onMounted(async () => {
  items.value = await fetchAllItems()
})
// fetchSearchThunk
const handleSelectChange = async (selectedValue) => {
  items.value = await fetchSortThunk(selectedValue)
}

const handleSearch = async (words) => {
  items.value = await fetchSearchThunk(words)
}
</script>

<template>
  <!-- <Drawer /> -->

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header />
    <main class="p-8">
      <SearchBar @select-change="handleSelectChange" @search-change="handleSearch" />
      <CardList :items="items" />
    </main>
  </div>
</template>
