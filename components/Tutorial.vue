<template>
  <div>
    <input @keydown.enter="sendMessage" v-model="inputString" class="border border-black" />
    <button @click="sendMessage">Send</button>
    <p class="text-blue-900 w-full text-center h-full">{{message}}</p>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    message: '',
    inputString: ''
  }),
  methods: {
    sendMessage () {
      this.message = this.inputString
    }
  }
}
</script>
