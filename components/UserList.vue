<template>
  <div>
    <NuxtLink
      v-for="user in filteredUsers"
      :key="user.id"
      :to="'/chat/' + user.id"
    >
      <ListItem :user="user" :lastOnline="user.last_online" />
    </NuxtLink>
  </div>
</template>

<script>
export default {
  data: () => ({
    users: [],
    subscription: null
  }),
  computed: {
    filteredUsers () {
      return this.users.filter(user => user.id !== this.$supabase.auth.user().id)
    }
  },
  created () {
    this.getUsers()
    this.subscribeToUsers()
  },
  beforeDestroy () {
    if (this.$supabase.removeSubscribtion) {
      this.$supabase.removeSubscribtion(this.subscription)
    }
  },
  methods: {
    async getUsers () {
      const { data } = await this.$supabase
        .from('users')
        .select()
      this.users = data
      console.log(this.users)
    },
    subscribeToUsers () {
      this.subscription = this.$supabase
        .from('users')
        .on('UPDATE', (payload) => {
          console.log('Change received!', payload)
          this.updateStatus(payload.new)
        })
        .subscribe()
    },
    updateStatus (user) {
      const index = this.users.findIndex(element => element.id === user.id)
      console.log(index)
      this.users[index] = user
      this.setTimeout(this.$forceUpdate)
    }
  }
}
</script>
