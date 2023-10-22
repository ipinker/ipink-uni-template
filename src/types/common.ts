import {ThemeType} from "ipink-theme/dist/theme";

export type Num = number | string;

// 根据主题配色方案生成的应用内置主题
export interface AppTheme extends ThemeType {
    colorStatusBar: string,
    colorNavigateBar: string,
    colorGray: string,
    colorPurple: string,
    colorBlue: string,
    colorLightgray: string,
    colorWhitegray: string,
    // colorWhite: string,
    // colorBlack: string,
    colorBorder: string,

    // colorBlackText: string,
    // colorWhiteText: string,
    colorGrayText: string,
    colorBlackgrayText: string,
    colorPlaceholderText: string,
    colorDisabledText: string,
    colorNavigateBarText: string
}
