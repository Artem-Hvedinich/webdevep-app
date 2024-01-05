<template>
  <h1>Profile Page</h1>
  <div v-if="Object.keys(getUser).length">{{ getUser }}</div>
</template>
<script setup lang="ts">
import {useAuthStore} from "../stores/auth.ts";
import {storeToRefs} from "pinia";

const userStore = useAuthStore()
const {getUser} = storeToRefs(userStore);
</script>
