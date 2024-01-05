import {defineStore} from 'pinia'
import {ref} from "vue";

export const useLoaderStore = defineStore('loader', () => {
    const isShowLoader = ref(false)
    const showLoader = () => isShowLoader.value = true
    const hideLoader = () => isShowLoader.value = false
    return {isShowLoader, showLoader, hideLoader}
})
