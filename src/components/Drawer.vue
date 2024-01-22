<script setup>
import DrawerHead from './DrawerHead.vue'
import CardDrawerList from './CardDrawerList.vue'
import OrderButton from './OrderButton.vue'
import InfoBlock from './infoBlock.vue'

defineProps({
  totalPrice: Number,
  isLoading: Boolean
})

const emit = defineEmits(['createOrder'])
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>

  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />
    <div v-if="!totalPrice" class="flex h-full items-center">
      <InfoBlock title="корзина пустая" description="добавте товар" imageUrl="/package-icon.png" />
    </div>
    <div v-else>
      <CardDrawerList />
      <OrderButton
        :total-price="totalPrice"
        @create-order="() => emit('createOrder')"
        :isLoading="isLoading"
      />
    </div>
  </div>
</template>
