<template>
  <div class="example">
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
  props: {
    searchedUser: String
  },
  data: () => ({
    users: [],
    subscription: null
  }),
  computed: {
    filteredUsers () {
      return this.users
        .filter(user => user.id !== this.$supabase.auth.user().id)
        .filter(user => user.username.includes(this.searchedUser.toLowerCase()))
    }
  },
  created () {
    this.getUsers()
    this.subscribeToUsers()
  },
  beforeDestroy () {
    this.$supabase.removeSubscription(this.subscription)
  },
  methods: {
    async getUsers () {
      const { data } = await this.$supabase
        .from('users')
        .select()
      this.users = data
    },
    subscribeToUsers () {
      this.subscription = this.$supabase
        .from('users')
        .on('UPDATE', (payload) => {
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

<style scoped>
.example {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.example::-webkit-scrollbar {
  display: none;
}
</style>
