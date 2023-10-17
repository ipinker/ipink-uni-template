import {computed} from "vue";
import {useThemeStore} from "@/store/theme"

export const useTheme = () => {
    const useStore = useThemeStore();
    const theme = computed(() => useStore.theme);
    return {
        theme
    };
}
