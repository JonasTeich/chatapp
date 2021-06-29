<template>
  <div>
    <UserHeader></UserHeader>
    <UserList></UserList>
    <!-- <NuxtLink to="/chat/">Zum Chat</NuxtLink> -->
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  layout: 'default'
}
</script>
