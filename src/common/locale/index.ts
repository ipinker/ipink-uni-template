import {App} from "vue";
import { createI18n } from 'vue-i18n'

import cn from "./lang/cn.json";
import en from "./lang/en.json";

const messages = {
    en,
    cn
};

// 使用选项创建i18n实例
const i18n = createI18n({
    locale: 'cn', // 当前语言
    fallbackLocale: 'en', // 回退语言
    messages,
    legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
    globalInjection: true, // 全局注册$t方法
    // 如果需要指定其他选项，可以设置其他选项
    // ...
});

export default i18n;
