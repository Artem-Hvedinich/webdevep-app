import {defineStore} from "pinia";
import {computed, ComputedRef, ref, Ref} from "vue";
import {useRouter} from "vue-router";
import {logout, getUserInfo, UserType} from "webdevep-lib";


export type AuthStoreType = {
    loadUser: (accessToken: string) => Promise<void>
    isAuth: Ref<boolean>
    getUser: ComputedRef<UserType>
    logoutUser: () => Promise<void>
};
export const useAuthStore = defineStore("auth", () => {
    const isAuth: Ref<boolean> = ref(false);
    const user: Ref<UserType> = ref({} as UserType);
    const getUser: ComputedRef<UserType> = computed(() => user.value);
    const router = useRouter()
    const loadUser = async (accessToken: string) => {
        const res = await getUserInfo(accessToken)
        if (!res.data.ok) {
            isAuth.value = false;
            return;
        }
        await router.push({path: '/profile'})
        user.value = res.data;
        isAuth.value = true;
    };

    const logoutUser = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
            const data = await logout(refreshToken)
            if (data.ok) {
                isAuth.value = false;
                user.value = {} as UserType
                await router.push({path: '/',})
            }
        }
    }

    const result: AuthStoreType = {
        isAuth,
        loadUser,
        logoutUser,
        getUser,
    };
    return result;
});
