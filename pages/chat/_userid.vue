<template>
  <div class="w-full h-full flex flex-col">
    <ChatHeader class="flex-initial" />
    <Chat class="overflow-auto flex-1" />
    <ChatInput class="flex-initial "/>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated'
}
</script>
