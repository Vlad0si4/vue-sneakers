<script setup>
defineProps({
  totalPrice: Number
})
const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between border-b border-slate-300 px-5 py-8">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="header-logo" class="w-10" />
      <div>
        <h1 class="text-xl font-bold uppercase">Vue Sneakers</h1>
        <p class="text-slate-400">shop of the best sneakers</p>
      </div>
    </div>

    <ul class="flex items-center gap-5 cursor-pointer">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 text-gray-500 font-bold hover:text-black"
      >
        <img src="/cart.svg" alt="cart" />
        <p>{{ totalPrice }} $</p>
      </li>
      <li class="flex items-center gap-3 font-medium text-gray-500 hover:text-black">
        <img src="/heart.svg" alt="cart" />
        <p>Favorites</p>
      </li>
      <li class="flex items-center gap-3 font-medium text-gray-500 hover:text-black">
        <img src="/profile.svg" alt="cart" />
        <p>Profile</p>
      </li>
    </ul>
  </header>
</template>
