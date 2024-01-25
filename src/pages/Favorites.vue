<script setup>
import CardList from '@/components/CardList.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const favorites = ref([])

const fetchFavorites = async () => {
  try {
    const { data } = await axios.get('https://65a83e3694c2c5762da88316.mockapi.io/favorites')
    favorites.value = data.map((el) => el.item)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchFavorites()
})
</script>

<template>
  <CardList :items="favorites" is-favorites />
</template>
