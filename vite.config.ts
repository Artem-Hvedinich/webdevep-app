import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
        proxy: {'/api': 'https://usnc.dev-webdevep.ru/auth-back/'},
    },
    plugins: [vue()],
})
