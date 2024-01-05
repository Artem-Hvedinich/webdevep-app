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
</template>

<script setup lang="ts">
import VInput from "./v-input.vue";
import {ref} from "vue";
import {API} from "../api/api.ts";
import {useAuthStore} from "../stores/auth.ts";
import {LoginResponseType} from "webdevep-lib";

const userStore = useAuthStore()

const email = ref<string>("")
const phone = ref<string>("")
const password = ref<string>("")
const error = ref({credential: "", password: ""})
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
  if (!isValidForm()) return
  const data = await login()
  if (!data.ok && data.msg === "Неверный пароль") error.value.password = data.msg
  if (!data.ok && data.msg === "Пользователь не найден") {
    let emailOrPhone: { email?: string, emailConfirmCode?: number, phone?: string, phoneConfirmCode: number } = {} as {
      email?: string,
      emailConfirmCode?: number,
      phone?: string,
      phoneConfirmCode: number
    }
    if (email.value) {
      emailOrPhone["email"] = email.value
      emailOrPhone["emailConfirmCode"] = 111111
    }
    if (phone.value) {
      emailOrPhone["phone"] = phone.value
      emailOrPhone["phoneConfirmCode"] = 111111
    }
    await API.sendConfirmCode(true, emailOrPhone)
    await API.register(emailOrPhone, password.value, {})
    await login()

  }
}
const login = async () => {
  let data = {} as LoginResponseType
  if (phone.value.length > 3) data = await userStore.login(phone.value, password.value)
  else data = await userStore.login(email.value, password.value)
  return data
}
</script>

