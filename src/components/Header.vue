<template>
  <header class="header">
    <div class="wrapper">
      <RouterLink to="/login" class="header__link" active-class="header__link--active">Войти</RouterLink>
      <button @click="logout">Log out</button>
    </div>
  </header>
</template>
<script setup lang="ts">
import {useAuthStore} from "../stores/auth.ts";

const userStore = useAuthStore()
const logout = () => {
  userStore.logoutUser()
}
</script>
