<script setup>
import { defineEmits, reactive } from 'vue'

const filter = reactive({
  onSelectChange: 'name',
  onSearchChange: ''
})

const emit = defineEmits(['select-change', 'search-change'])

const handleSelectChange = () => {
  emit('select-change', filter.onSelectChange)
}
const handleSearch = () => {
  emit('search-change', filter.onSearchChange)
}
</script>

<template>
  <div class="flex flex-col items-center justify-between pb-10 md:flex-row">
    <h2 class="text-3xl font-bold pb-5 md:pb-0">All sneakers</h2>
    <div class="flex gap-4">
      <select
        v-model="filter.onSelectChange"
        @change="handleSelectChange"
        class="py-2 px-3 border rounded outline-none"
      >
        <option value="name">Name</option>
        <option value="price">Price(-)</option>
        <option value="-price">Price(+)</option>
      </select>

      <div class="relative">
        <img class="absolute top-3.5 left-3" src="/search.svg" alt="search" />
        <input
          class="border rounded-md py-2 pl-8 pr-4 outline-none focus:border-gray-400"
          placeholder="search"
          v-model="filter.onSearchChange"
          @keyup="handleSearch"
        />
      </div>
    </div>
  </div>
</template>

<!-- const isDisabledButton = computed(() => (props.isLoading ? true : props.totalPrice ? false : true)) -->

<!-- filters,
  async () => {
    await fetchItems()

    items.value = items.value.map((el) => ({
      ...el,
      isAdded: cartDrawer.value.some((cartItem) => cartItem.id === el.id)
    }))
  },
  {
    deep: true
  } -->
