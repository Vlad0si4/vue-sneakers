<script setup>
import { inject } from 'vue'

const { closeDrawer } = inject('cart')
</script>

<template>
  <div class="flex gap-10 items-center pb-6">
    <img
      @click="closeDrawer"
      src="/arrow-right.svg"
      alt="arrow"
      width="15"
      height="15"
      class="rotate-180 cursor-pointer opacity-30 hover:opacity-100 hover:-translate-x-1 hover:-rotate-0 transition"
    />
    <h2 class="text-2xl font-bold">Cart</h2>
  </div>
</template>
