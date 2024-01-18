<template>
  <div class="flex flex-col items-center justify-between pb-10 md:flex-row">
    <h2 class="text-3xl font-bold pb-5 md:pb-0">All sneakers</h2>
    <div class="flex gap-4">
      <select class="py-2 px-3 border rounded outline-none">
        <option value="">Name</option>
        <option value="">Price(cheap)</option>
        <option value="">Price(expansive)</option>
      </select>

      <div class="relative">
        <img class="absolute top-3.5 left-3" src="/search.svg" alt="search" />
        <input
          class="border rounded-md py-2 pl-8 pr-4 outline-none focus:border-gray-400"
          placeholder="search"
        />
      </div>
    </div>
  </div>
</template>
