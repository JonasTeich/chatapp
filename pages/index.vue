<template>
  <div class="h-full flex flex-col relative">
    <div v-if="isChangingUsername" class="h-full w-full absolute flex items-center justify-center bg-gray-700 bg-opacity-70">
      <div class="p-6 rounded-3xl bg-gray-100 flex flex-col justify-center items-center">
        <h2 class="font-black text-gray-700 text-3xl mb-6">{{user.username}}</h2>
        <p v-if="errorMessage" class="text-red-600 mb-2">{{errorMessage}}</p>
        <input @keypress.enter="saveUsername" class="p-2 rounded-3xl mb-6 outline-none" v-model="currentName" type="text">
        <div class="flex">
          <p @click="isChangingUsername = false" class="cursor-pointer text-gray-700 p-2">Abbrechen</p>
          <button @click="saveUsername" class="p-2 text-white rounded-3xl bg-green-400">Speichern</button>
        </div>
      </div>
    </div>
    <h1 class="w-full text-center font-black sm:text-6xl text-4xl pt-10 text-gray-700">Willkommen {{user.username}}</h1>
    <div class="flex justify-center items-center h-full">
      <div class="flex flex-col w-80 px-6">
        <NuxtLink v-if="!isLoggedIn" to="/auth">
          <button class="bg-blue-400 hover:bg-blue-300 py-6 w-full mb-4 rounded-3xl text-white">Sign In / Sign Up</button>
        </NuxtLink>
        <NuxtLink v-if="isLoggedIn" to="/users">
          <button class="bg-green-400 hover:bg-green-300 py-6 w-full rounded-3xl text-white">Users</button>
        </NuxtLink>
        <p v-if="isLoggedIn" class="text-center text-gray-700 hover:bg-gray-100 p-4 cursor-pointer border mt-4 rounded-3xl" @click="signOut">Sign Out</p>
        <p v-if="isLoggedIn" class="text-center text-gray-700 hover:bg-gray-100 p-4 cursor-pointer border mt-4 rounded-3xl" @click="changeUsername">Change Username</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    i: 0,
    user: {},
    isChangingUsername: false,
    currentName: '',
    errorMessage: ''
  }),
  watch: {
    currentName () {
      this.errorMessage = ''
    }
  },
  created () {
    this.getUser()
  },
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
    },
    async getUser () {
      const { data } = await this.$supabase
        .from('users')
        .select()
        .filter('id', 'eq', this.$supabase.auth.user().id)
      this.user = data[0]
    },
    changeUsername () {
      this.isChangingUsername = true
    },
    async saveUsername () {
      if (this.currentName.trim().length === 0) {
        this.errorMessage = 'Du kannst dich nicht so nennen'
        return
      }
      await this.$supabase
        .from('users')
        .update({ username: this.currentName })
        .match(this.user)
      this.isChangingUsername = false
      this.$forceUpdate()
    }
  }
}
</script>
