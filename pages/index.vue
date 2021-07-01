<template>
  <div class="h-full flex flex-col relative">
    <button class="absolute right-10 sm:top-10 top-6 px-3 py-2 rounded-3xl bg-gray-700 text-white" @click="signOut">Sign out</button>
    <h1 class="w-full text-center font-black sm:text-6xl text-4xl pt-10 text-gray-700">Willkommen</h1>
    <div class="flex justify-center items-center h-full">
      <div class="flex flex-col w-80 px-6">
        <NuxtLink to="/auth">
          <button class="bg-blue-400 py-6 w-full mb-4 rounded-3xl text-white">Sign In / Sign Up</button>
        </NuxtLink>
        <NuxtLink to="/users">
          <button class="bg-green-400 py-6 w-full rounded-3xl text-white">User</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async signOut () {
      await this.$supabase.auth.signOut()
    }
  }
}
</script>
