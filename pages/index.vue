<template>
  <div class="h-full flex flex-col relative">
    <h1 class="w-full text-center font-black sm:text-6xl text-4xl pt-10 text-gray-700">Willkommen</h1>
    <div class="flex justify-center items-center h-full">
      <div class="flex flex-col w-80 px-6">
        <NuxtLink v-if="!isLoggedIn" to="/auth">
          <button class="bg-blue-400 hover:bg-blue-300 py-6 w-full mb-4 rounded-3xl text-white">Sign In / Sign Up</button>
        </NuxtLink>
        <NuxtLink v-if="isLoggedIn" to="/users">
          <button class="bg-green-400 hover:bg-green-300 py-6 w-full rounded-3xl text-white">Users</button>
        </NuxtLink>
        <p v-if="isLoggedIn" class="text-center text-gray-700 hover:bg-gray-100 p-4 cursor-pointer border mt-4 rounded-3xl" @click="signOut">Sign Out</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    i: 0
  }),
  computed: {
    isLoggedIn () {
      this.i // eslint-disable-line
      return this.$supabase.auth.user()
    }
  },
  methods: {
    async signOut () {
      await this.$supabase.auth.signOut()
      this.i++
    }
  }
}
</script>
