/*
 * @Author: error: git config user.name & please set dead value or install git
 * @Date: 2023-03-20 15:48:19
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-12 00:12:40
 * @FilePath: /test1/vite.config.ts
 * @Description: 描述
 */
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from "path";
const pathResolve = (dir: string) => path.resolve(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
      // 导入scss预编译程序
      scss: {
        additionalData: '@import "@/static/css/variable.scss";'
      },
    },
    },
    resolve: {
        "alias": {
            "@": pathResolve('src')
        }
    },
    plugins: [
        uni(),
        vueJsx({
            // options are passed on to @vue/babel-plugin-jsx
        }),
    ],
});
