<script setup>
import { computed } from 'vue'

const props = defineProps({
  totalPrice: Number
})

const emit = defineEmits(['createOrder'])

const isDisabledButton = computed(() => props.totalPrice === 0)
</script>

<template>
  <div class="">
    <div class="flex my-8">
      <p class="font-medium text-lg">Total:</p>
      <span class="flex-1 border-b border-dashed"></span>
      <p class="font-bold text-xl">{{ totalPrice }}$</p>
    </div>
    <div class="">
      <button
        @click="() => emit('createOrder')"
        :disabled="isDisabledButton"
        type="submit"
        class="bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 transition cursor-pointer disabled:bg-slate-400"
      >
        Order
      </button>
    </div>
  </div>
</template>
