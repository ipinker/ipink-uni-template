import { useI18n } from 'vue-i18n'
import {computed} from "vue";

export const useLocale = () => {
    const { locale, t } = useI18n();

    const getLocale = computed(() => locale.value)

    const changeLocale = (lang: string) => {
        locale.value = locale.value == "en" ? "cn" : "en";
        // 做下关于语言的本地缓存持久化
        // to do something ...
    }

    return {
        changeLocale,
        getLocale,
        t
    };
}
