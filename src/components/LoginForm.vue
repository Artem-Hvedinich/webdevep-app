<template>
  <form class="login__form" @submit.prevent="submit">
    <v-input :value="email" :error="error.credential" label="Email" name="email"
             @focus="error.credential=''"
             @update-value="({value})=>email=value"/>
    <p>или</p>
    <v-input :value="phone" :error="error.credential" label="Телефон" name="phone"
             @focus="error.credential=''"
             @update-value="({value})=>phone=value"/>
    <v-input :value="password" :error="error.password" label="Пароль" name="password" type="password"
             @focus="error.password=''"
             @update-value="({value})=>password=value"/>
    <button class="button button--main" type="submit">Отправить</button>
  </form>
  <p class="error">{{ errorMsg }}</p>
</template>

<script setup lang="ts">
import VInput from "./v-input.vue";
import {ref} from "vue";
import {useAuthStore} from "../stores/auth.ts";
import {loginOrRegister} from "webdevep-lib";

const userStore = useAuthStore()

const email = ref<string>("")
const phone = ref<string>("")
const password = ref<string>("")
const error = ref({credential: "", password: ""})
const errorMsg = ref("")
const isValidForm = () => {
  let isValid = true
  if (!(email.value.length > 3 || phone.value.length > 3)) {
    error.value.credential = "Email или Телефон обязателен для заполнения"
    isValid = false
  }
  if (!(password.value.length > 3)) {
    error.value.password = "Пароль обязателен для заполнения"
    isValid = false
  }
  return isValid
}
const submit = async () => {
  errorMsg.value = ""
  if (!isValidForm()) return
  const data = {
    email: email.value,
    phone: phone.value,
    emailConfirmCode: 111111,
    phoneConfirmCode: 111111,
    password: password.value
  }
  const res = await loginOrRegister(data)
  if (res.ok && res.accessToken) await userStore.loadUser(res.accessToken)
  else errorMsg.value = res.msg ?? ""

}
</script>

