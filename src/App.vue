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
import {useLoaderStore} from "./stores/loader.ts";
import {useAuthStore} from "./stores/auth.ts";
import {loaderMiddleware} from "webdevep-lib/dist/middleware/loaderMiddleware";

const accessToken = localStorage.getItem("accessToken")

const userStore = useAuthStore()
if (accessToken) {
  userStore.loadUser(accessToken);
}
const loaderStore = useLoaderStore()
loaderMiddleware(loaderStore)
</script>
