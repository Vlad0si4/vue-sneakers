<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import CardDrawer from '@/components/CardDrawer.vue'

const order = ref([])

const fetchOrders = async () => {
  try {
    const { data } = await axios.get('https://65ae15e41dfbae409a73e85f.mockapi.io/orders')

    order.value = data.flatMap((el) => el.items)
    console.log(order.value)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchOrders()
})
</script>

<template>
  <div v-auto-animate>
    <CardDrawer
      v-for="item in order"
      :key="item.id"
      :title="item.name"
      :price="item.price"
      :img-url="item.imageUrl"
      is-Added
    />
  </div>
</template>
