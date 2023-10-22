import {computed, ComputedRef} from "vue";
import {useThemeStore} from "@/store/theme"
import {ThemeType} from "ipink-theme/dist/theme";
import {AppTheme} from "@/types";

export const useTheme = () => {
    const useStore = useThemeStore();
    // 内置主题配色
    const theme:ComputedRef<AppTheme> = computed(() => {
        const _theme: AppTheme = useStore.theme as AppTheme;
        if(_theme){
            console.log(_theme.gray)
            _theme.colorStatusBar = _theme.colorPrimaryBg;
            _theme.colorNavigateBar = _theme.colorBgContainer;
            _theme.colorGray = _theme.gray9;
            _theme.colorPurple = _theme.purple;
            _theme.colorBlue = _theme.blue;
            _theme.colorLightgray = _theme.gray2;
            _theme.colorWhitegray = _theme.gray1;

            _theme.colorGrayText = _theme.gray5;
            _theme.colorBlackgrayText = _theme.gray8;
            _theme.colorPlaceholderText = _theme.gray1;
            _theme.colorDisabledText = _theme.gray1;
            _theme.colorNavigateBarText = _theme.colorText;
        }
        return _theme;
    });
    const themeList = computed(() => useStore.themeList);
    const setTheme = useStore.update;
    // 生成应用主题配色
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
