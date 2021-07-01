<template>
  <div>
    <UserHeader></UserHeader>
    <UserList></UserList>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  layout: 'default'
}
</script>
