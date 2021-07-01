<template>
  <div class="h-screen overflow-hidden sm:p-10">
    <Container>
        <Nuxt />
    </Container>
  </div>
</template>

<script>
export default {
  created () {
    // setInterval(this.setStatus, 5000)
  },
  methods: {
    async setStatus () {
      if (this.$supabase.auth.user()) {
        await this.$supabase
          .from('users')
          .update({ last_online: new Date() })
          .match({ id: this.$supabase.auth.user().id })
      }
    }
  }
}
</script>

<style>
body {
  @apply bg-gray-700;
}
</style>
