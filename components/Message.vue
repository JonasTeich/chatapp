<template>
  <div class="wrapper flex">
    <div v-if="user.id === $supabase.auth.user().id" class="flex-1"></div>
    <div
      class="message mt-6 bg-gray-100 p-3 rounded-2xl break-all flex-initial relative"
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
      <div
        class="absolute top-1/2 transform -translate-y-1/2 text-gray-400"
        :class="{
          '-left-32': user.id === $supabase.auth.user().id && isOlder,
          '-left-12': user.id === $supabase.auth.user().id,
          '-right-32': user.id === $route.params.userid && isOlder,
          '-right-12': user.id === $route.params.userid
        }"
      >
        {{ insertedAt }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    message: Object,
    time: String
  },
  data: () => ({
    isOlder: false
  }),
  computed: {
    insertedAt () {
      const date = new Date(this.message.inserted_at)
      const today = new Date()
      const options = {
        hour: '2-digit',
        minute: '2-digit'
      }
      if (
        date.getDate() !== today.getDate() ||
        date.getMonth() !== today.getMonth() ||
        date.getFullYear() !== today.getFullYear()
      ) {
        options.year = 'numeric'
        options.month = '2-digit'
        options.day = '2-digit'
        this.isOlder = true // eslint-disable-line
      } else {
        this.isOlder = false // eslint-disable-line
      }
      return new Intl.DateTimeFormat('de-DE', options).format(date)
    }
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
