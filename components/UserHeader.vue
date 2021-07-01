<template>
  <div class="sm:flex justify-between items-center p-6">
    <NuxtLink to="/">
      <h1 class="font-black text-6xl text-gray-700 flex-initial">USERS</h1>
    </NuxtLink>
    <div class="text-1xl w-auto bg-gray-200 rounded-3xl p-2 flex-1 sm:ml-6 flex items-center">
      <input type="text" class="text-1xl w-auto bg-gray-200 outline-none flex-1 px-2 min-w-0">
      <font-awesome-icon :icon="['fas', 'search']" class="text-gray-700 flex-initial mr-2 cursor-pointer" transform="grow-3"/>
    </div>
  </div>
</template>
