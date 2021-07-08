<template>
  <div>
    <NuxtLink
        v-for="user in searchedUsers"
        :key="user.id"
        :to="'/chat/' + user.id"
      >
        <ListItem :user="user" :lastMessage="'Hi, wie gehts'" />
      </NuxtLink>
  </div>
</template>

<script>
export default {
  data: () => ({
    messages: [],
    userIds: [],
    searchedUsers: []
  }),
  created () {
    this.getMessages()
  },
  computed: {
    me () {
      return this.$supabase.auth.user()
    }
  },
  methods: {
    async getMessages () {
      const { data: messages } = await this.$supabase
        .from('messages')
        .select()
        .or(`receiver_id.eq.${this.me.id},user_id.eq.${this.me.id}`)
      const lastMessages = {}
      messages.map((message) => {
        if (message.user_id !== this.me.id) {
          lastMessages[message.user_id] = message
        }
        if (message.receiver_id !== this.me.id) {
          lastMessages[message.receiver_id] = message
        }
        return message
      })
      this.messages = lastMessages
      this.userIds = Object.keys(lastMessages)
      this.getUsers()
    },
    async getUsers () {
      const { data: users } = await this.$supabase
        .from('users')
        .select()
      const data = users.map((user) => {
        if (!this.userIds.includes(user.id)) {
          const index = users.indexOf(user.id)
          users.splice(index, 1)
          return null
        } else {
          return user
        }
      }).filter((user) => {
        return user !== null
      })
      this.searchedUsers = data
      // console.log(this.searchedUsers)
    }
  }
}
</script>
