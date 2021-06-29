<template>
  <div>
    <div>
      <input type="email" v-model="emailSignUp">
      <input type="password" v-model="passwordSignUp">
      <button @click="signUp">Sign Up</button>
    </div>
    <div>
      <input type="email" v-model="emailSignIn">
      <input type="password" v-model="passwordSignIn">
      <button @click="signIn">Sign In</button>
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
    passwordSignIn: ''
  }),
  methods: {
    async signUp () {
      await this.$supabase.auth.signUp({
        email: this.emailSignUp,
        password: this.passwordSignUp
      })
    },
    async signIn () {
      const { user } = await this.$supabase.auth.signIn({
        email: this.emailSignIn,
        password: this.passwordSignIn
      })
      if (user) {
        this.$router.push('/users')
      }
    }
  }
}
</script>
