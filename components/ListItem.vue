<template>
  <div class="flex bg-gray-100 mx-6 h-20 items-center rounded-3xl p-4 mb-4 cursor-pointer justify-between">
    <div class="flex items-center">
      <div class="rounded-full bg-blue-300 h-12 w-12 flex items-center justify-center text-white mr-4">{{ user.username.charAt(0).toUpperCase() }}</div>
      <p>{{ user.username }}</p>
      {{ user.last_online.value }}
    </div>
    <div
      class="h-3 w-3 rounded-full"
      :class="{
        'bg-green-400':  isOnline,
        'bg-gray-400':  !isOnline
      }"
    >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    lastOnline: String
  },
  computed: {
    isOnline () {
      console.log(new Date().getTime() - new Date(this.user.last_online).getTime())
      return new Date().getTime() - new Date(this.user.last_online).getTime() <= 7000
    }
  },
  watch: {
    'user.last_online' () {
      console.log('text')
    }
  }
}
</script>
