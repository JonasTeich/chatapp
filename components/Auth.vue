<template>
  <div class="h-full w-full flex justify-center items-center relative">
    <NuxtLink to="/" class="absolute left-10 sm:top-10 top-6"><font-awesome-icon :icon="['fas', 'arrow-left']" class="text-gray-700 text-3xl cursor-pointer"/></NuxtLink>
    <div class="sm:flex sm:w-min w-full sm:border sm:rounded-3xl p-10">
      <div class="flex flex-col sm:pr-10 sm:pb-0 pb-10 sm:border-b-0 border-b-2 sm:border-r-2">
        <h3 class="font-black text-3xl pb-4 text-gray-700 sm:ml-0 ml-10">Sign Up</h3>
        <label class="flex flex-col">
          E-mail
          <input
            type="email"
            v-model="emailSignUp"
            class="outline-none rounded-3xl p-2 bg-gray-100"
          >
        </label>
        <label class="flex flex-col">
          Benutzername
          <input
            type="text"
            v-model="usernameSignUp"
            class="outline-none rounded-3xl p-2 bg-gray-100"
          >
        </label>
        <label class="flex flex-col mb-5">
          Passwort
          <input
            type="password"
            v-model="passwordSignUp"
            class="outline-none rounded-3xl p-2 bg-gray-100"
          >
        </label>
        <button @click="signUp">Sign Up</button>
      </div>
      <form action="#" class="flex flex-col sm:pt-0 pt-10 sm:pl-10" @submit.prevent="signIn">
        <h3 class="font-black text-3xl pb-4 text-gray-700">Sign In</h3>
        <label class="flex flex-col">
          E-mail
          <input
            type="email"
            v-model="emailSignIn"
            class="outline-none rounded-3xl p-2 bg-gray-100"
          >
        </label>
        <label class="flex flex-col mb-5">
          Passwort
          <input
            type="password"
            v-model="passwordSignIn"
            class="outline-none rounded-3xl p-2 bg-gray-100"
          >
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    emailSignUp: '',
    passwordSignUp: '',
    emailSignIn: '',
    passwordSignIn: '',
    usernameSignUp: '',
    user: ''
  }),
  computed: {
    isLoggedIn () {
      return this.$supabase.auth.user()
    }
  },
  methods: {
    async signUp () {
      await this.$supabase.auth.signUp({
        email: this.emailSignUp,
        password: this.passwordSignUp
      })
      await this.getUser()
      await this.$supabase
        .from('users')
        .update({ username: this.usernameSignUp })
        .match(this.user)
      this.signIn(this.emailSignUp, this.passwordSignUp)
    },
    async signIn (email, password) {
      const { user } = await this.$supabase.auth.signIn({
        email: (typeof email === 'string') ? email : this.emailSignIn,
        password: password || this.passwordSignIn
      })
      if (user) {
        this.$router.push('/users')
      }
    },
    async signOut () {
      await this.$supabase.auth.signOut()
    },
    async getUser () {
      const { data } = await this.$supabase
        .from('users')
        .select()
        .filter('id', 'eq', this.$supabase.auth.user().id)
      this.user = data[0]
    }
  }
}
</script>
