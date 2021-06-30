<template>
  <div class="flex bg-gray-100 mx-6 h-20 items-center rounded-3xl p-4 mb-4 cursor-pointer justify-between">
    <div class="flex items-center">
      <div class="rounded-full bg-blue-300 h-12 w-12 flex items-center justify-center text-white mr-4">{{user.username.charAt(0).toUpperCase()}}</div>
      <p>{{user.username}}</p>
    </div>
    <div
      class="h-3 w-3 rounded-full"
      :class="{
        'bg-green-400': user.status === 'ONLINE',
        'bg-gray-400': user.status === 'OFFLINE'
      }"
    >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object
  }
}
</script>
