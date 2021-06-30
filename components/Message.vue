<template>
  <div class="wrapper flex">
    <div v-if="user.id === $supabase.auth.user().id" class="flex-1"></div>
    <div class="message mb-10 bg-gray-500 p-3 rounded-2xl break-all flex-initial">
      <p class="text-blue-300 text-left mb-2">
        {{ user.username }}
      </p>
      <p class="text-white">
        {{ message.message }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    message: Object
  },
  created () {
    console.log(this.user)
  }
}
</script>

<style scoped>
.wrapper {
  max-width: 75%;
}

.message {
  display: inline-block;
}
</style>
