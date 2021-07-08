<template>
  <div class="flex p-6">
    <input
      type="text"
      class="w-auto rounded-3xl bg-gray-200 h-9 outline-none p-3 flex-1"
      v-model="message"
      ref="input"
      @keypress.enter="sendMessage"
      @focus="$emit('focus')"
    >
    <font-awesome-icon
      :icon="['fas', 'paper-plane']"
      class="text-gray-700 flex-initial m-2 ml-6 text-2xl cursor-pointer"
      @click="sendMessage"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    message: ''
  }),
  methods: {
    async sendMessage () {
      if (this.message.trim() === '') {
        return
      }
      const { error } = await this.$supabase
        .from('messages')
        .insert([
          {
            message: this.message.trim(),
            user_id: this.$supabase.auth.user().id,
            receiver_id: this.$route.params.userid
          }
        ])
      if (!error) {
        this.message = ''
      }
      this.$refs.input.focus()
    }
  }
}
</script>
