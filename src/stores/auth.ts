import {defineStore} from "pinia";
import {computed, ComputedRef, ref, Ref} from "vue";
import {API, UserType} from "../api/api.ts";
import {authentication, LoginResponseType} from "webdevep-lib";
import {useRouter} from "vue-router";

export type AuthStoreType = {
    loadUser: (accessToken: string) => Promise<void>
    isAuth: Ref<boolean>
    getUser: ComputedRef<UserType>
    logout: () => Promise<void>
    login: (credential: string, password: string) => Promise<LoginResponseType>
};
export const useAuthStore = defineStore("auth", () => {
    const isAuth: Ref<boolean> = ref(false);
    const user: Ref<UserType> = ref({} as UserType);
    const getUser: ComputedRef<UserType> = computed(() => user.value);
    const router = useRouter()
    const loadUser = async (accessToken: string) => {
        const res = await API.getUserInfo(accessToken)
        if (!res.data.ok) {
            isAuth.value = false;
            return;
        }
        user.value = res.data;
        isAuth.value = true;
    };

    const logout = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
            const res = await API.logout(refreshToken)
            console.log(res)
            if (res.data.ok) {
                isAuth.value = false;
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                user.value = {} as UserType
                await router.push({path: '/',})
            }
        }
    }
    const login = async (credential: string, password: string): Promise<LoginResponseType> => {
        const {data} = await authentication(credential, password)
        if (data.ok) {
            data.accessToken && localStorage.setItem("accessToken", data.accessToken)
            data.refreshToken && localStorage.setItem("refreshToken", data.refreshToken)
            await router.push({path: '/profile'})
        }
        return data
    }

    const result: AuthStoreType = {
        isAuth,
        loadUser,
        logout,
        getUser,
        login
    };
    return result;
});
