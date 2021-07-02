<template>
  <div class="h-full flex flex-col">
    <UserHeader v-model="query"></UserHeader>
    <UserList :searchedUser="query" class="overflow-auto flex-1"></UserList>
  </div>
</template>

<script>
export default {
  data: () => ({
    query: ''
  }),
  middleware: 'authenticated',
  layout: 'default'
}
</script>
