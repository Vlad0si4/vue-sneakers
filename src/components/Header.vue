<script setup>
defineProps({
  totalPrice: Number
})
const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex flex-col sm:flex-row sm:justify-between border-b border-slate-300 px-5 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4 justify-center sm:justify-between pb-6 sm:pb-0">
        <img src="/logo.png" alt="header-logo" class="w-10" />
        <div>
          <h1 class="text-xl font-bold uppercase">Vue Sneakers</h1>
          <p class="text-slate-400">shop of the best sneakers</p>
        </div>
      </div>
    </router-link>
    <div class="flex items-center justify-center">
      <ul class="flex items-center gap-5 cursor-pointer">
        <li
          @click="() => emit('openDrawer')"
          class="text-gray-500 font-bold hover:text-black flex flex-col gap-2 items-center"
        >
          <img src="/cart.svg" alt="cart" />
          <p>{{ totalPrice }} $</p>
        </li>
        <router-link to="/favorites"
          ><li class="font-medium text-gray-500 hover:text-black flex flex-col gap-2 items-center">
            <img src="/heart.svg" alt="cart" />
            <p>Favorites</p>
          </li></router-link
        >
        <router-link to="/profile"
          ><li class="font-medium text-gray-500 hover:text-black flex flex-col gap-2 items-center">
            <img src="/profile.svg" alt="cart" />
            <p>Profile</p>
          </li></router-link
        >
      </ul>
    </div>
  </header>
</template>
