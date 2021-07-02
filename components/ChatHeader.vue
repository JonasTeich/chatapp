<template>
  <div v-if="isReady" class="flex items-center p-6 bg-gray-100">
    <NuxtLink to="/users"><font-awesome-icon :icon="['fas', 'arrow-left']" class="text-gray-700 text-3xl flex-initial cursor-pointer"/></NuxtLink>
    <div class="rounded-full bg-blue-300 h-12 w-12 flex items-center justify-center text-white mx-4">{{user.username.charAt(0).toUpperCase()}}</div>
    <p class="truncate flex-1">{{user.username}}</p>
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
  data: () => ({
    user: null
  }),
  created () {
    this.getUser()
  },
  computed: {
    isReady () {
      return this.user
    }
  },
  methods: {
    async getUser () {
      const { data } = await this.$supabase
        .from('users')
        .select()
        .filter('id', 'eq', this.$route.params.userid)
      this.user = data[0]
    }
  }
}
</script>
