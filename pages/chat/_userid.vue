<template>
  <div class="w-full h-full flex flex-col">
    <ChatHeader class="flex-initial" />
    <Chat class="overflow-auto flex-1" ref="chat" />
    <ChatInput class="flex-initial " @focus="onInputFocus" />
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  methods: {
    onInputFocus () {
      this.$nextTick(this.$refs.chat.scrollToBottom())
    }
  }
}
</script>
