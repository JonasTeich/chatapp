<template>
  <div class="flex bg-gray-100 mx-6 h-20 items-center rounded-3xl p-4 mb-4 cursor-pointer justify-between hover:bg-gray-200">
    <div class="rounded-full flex-initial bg-blue-300 h-12 w-12 flex items-center justify-center text-white mr-4">{{ user.username.charAt(0).toUpperCase() }}</div>
    <p class="truncate flex-1">{{ user.username }}</p>
    <div
      class="h-3 w-3 rounded-full flex-initial"
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
    user: Object,
    lastOnline: String
  },
  computed: {
    isOnline () {
      return new Date().getTime() - new Date(this.user.last_online).getTime() <= 7000
    }
  }
}
</script>
