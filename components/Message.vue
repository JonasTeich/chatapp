<template>
  <div class="wrapper flex">
    <div v-if="user.id === $supabase.auth.user().id" class="flex-1"></div>
    <div
      class="message mt-6 bg-gray-100 p-3 rounded-2xl break-all flex-initial"
      :class="{
        'rounded-tr-none bg-blue-100': user.id === $supabase.auth.user().id,
        'rounded-tl-none': user.id === $route.params.userid
      }"
    >
      <p class="text-blue-500 text-left mb-2">
        {{ user.username }}
      </p>
      <p class="text-gray-700">
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
