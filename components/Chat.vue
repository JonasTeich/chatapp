<template>
  <div class="w-full px-6 flex justify-end flex-col">
    <div v-if="isReady" class="w-full overflow-y-auto example">
      <Message
        v-for="message in messages"
        :key="message.id"
        :user="getUserByUserId(message.user_id)"
        :message="message"
        :class="{
          'ml-auto mr-0': message.user_id === $supabase.auth.user().id
        }"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    message: '',
    messages: [],
    user: null,
    me: null
  }),
  computed: {
    isReady () {
      return this.user && this.me
    }
  },
  watch: {
    isReady () {
      if (this.isReady) {
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      }
    }
  },
  created () {
    this.getUser()
    this.getMe()
    this.getMessages()
    this.$supabase
      .from('messages')
      .on('*', (payload) => {
        if (payload.new.receiver_id === this.$route.params.userid || payload.new.user_id === this.$route.params.userid) {
          this.messages.push(payload.new)
          this.scrollToBottom()
        }
      })
      .subscribe()
  },
  methods: {
    beforeDestroy () {
      if (this.$supabase.removeSubscribtion) {
        this.$supabase.removeSubscribtion(this.subscription)
      }
    },
    async getUser () {
      const { data } = await this.$supabase
        .from('users')
        .select()
        .filter('id', 'eq', this.$route.params.userid)
      this.user = data[0]
    },
    async getMe () {
      const { data } = await this.$supabase
        .from('users')
        .select()
        .filter('id', 'eq', this.$supabase.auth.user().id)
      this.me = data[0]
    },
    async getMessages () {
      const { data } = await this.$supabase
        .from('messages')
        .select()
        .or(`and(receiver_id.eq.${this.$supabase.auth.user().id},user_id.eq.${this.$route.params.userid}),and(receiver_id.eq.${this.$route.params.userid},user_id.eq.${this.$supabase.auth.user().id})`)
      this.messages = data
    },
    getUserByUserId (userid) {
      if (userid === this.$route.params.userid) {
        return this.user
      } else {
        return this.me
      }
    },
    scrollToBottom () {
      this.$nextTick(() => {
        this.$el.children[0].scrollTop = this.$el.children[0].scrollHeight
      })
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
