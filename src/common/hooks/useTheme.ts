import {computed} from "vue";
import {useThemeStore} from "@/store/theme"

export const useTheme = () => {
    const useStore = useThemeStore();
    const theme = computed(() => useStore.theme);
    const themeList = computed(() => useStore.themeList);
    const setTheme = useStore.update;
    const changeTheme = (id: string) => {
        if (id && typeof id === "string") useStore.change(id);
        else {
            const _id: string = theme.value?.id === "dark" ? "light" : "dark";
            useStore.change(_id);
        }
    };
    return {
        theme,
        themeList,
        setTheme,
        changeTheme
    };
}
