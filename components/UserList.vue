<template>
  <div class="p-6 example">
    <LastChats v-if="!searchedUser.length"></LastChats>
    <!-- <div v-if="!searchedUser.length" class="w-full"><p class="w-full text-gray-700 text-center breake-normal">Suche nach einer Person mit der du chatten willst</p></div> -->
    <div v-if="!users.length && searchedUser.length" class="w-full"><p class="w-full text-gray-700 text-center breake-normal">Keine Suchergebnisse</p></div>
    <div v-if="searchedUser.length" class="example">
      <NuxtLink
        v-for="user in users"
        :key="user.id"
        :to="'/chat/' + user.id"
      >
        <ListItem :user="user" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchedUser: String
  },
  data: () => ({
    users: [],
    subscription: null,
    loading: false
  }),
  watch: {
    searchedUser () {
      if (this.searchedUser.length) {
        this.getUsers()
      } else {
        this.users = []
      }
    }
  },
  created () {
    setInterval(this.getUsers, 5000)
  },
  beforeDestroy () {
    this.$supabase.removeSubscription(this.subscription)
  },
  methods: {
    async getUsers () {
      if (!this.searchedUser.length) {
        return
      }
      this.loading = true
      const { data } = await this.$supabase
        .from('users')
        .select()
        .ilike('username', `%${this.searchedUser}%`)
        .not('id', 'eq', this.$supabase.auth.user().id)
      this.users = data
      this.loading = false
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
      this.users[index] = user
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
