<script setup>
defineProps({
  imgUrl: String
})
</script>

<template>
  <div class="flex items-center border border-slate-100 p-4 rounded-xl gap-6 mb-5">
    <img src="/sneakers/sneakers-11.jpg" alt="sneaker" class="w-16 h-16" />

    <div class="flex flex-col">
      <p class="">Кросовки</p>

      <div class="flex items-center mt-3 gap-32">
        <p class="font-bold text-xl">100$</p>
        <img src="/close.svg" alt="close" class="opacity-40 hover:opacity-100 cursor-pointer" />
      </div>
    </div>
  </div>
</template>
