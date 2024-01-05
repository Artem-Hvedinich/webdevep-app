<template>
  <loader v-if="loaderStore.isShowLoader"/>
  <Header></Header>
  <div class="wrapper">
    <RouterView/>
  </div>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import {RouterView} from 'vue-router'
import Loader from "./components/Loader.vue";
import {instance} from "./api/api.ts";
import {useLoaderStore} from "./stores/loader.ts";
import {useAuthStore} from "./stores/auth.ts";

const accessToken = localStorage.getItem("accessToken")

const userStore = useAuthStore()
if (accessToken) {
  userStore.loadUser(accessToken);
}
const loaderStore = useLoaderStore()

instance.interceptors.response.use(response => {
  loaderStore.hideLoader()
  return response
})
instance.interceptors.request.use(conf => {
  loaderStore.showLoader()
  return conf
})
</script>

