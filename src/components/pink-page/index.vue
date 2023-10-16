<template>
    <view class="PageContainer">
        <slot />
        {{currentLang}}
        <view class="i-theme-change" @click="changeTheme"/>
        <view class="i-theme-change i-lang-change" @click="changeLocale"/>
    </view>
</template>

<script lang="ts" setup>

import { useThemeStore } from "@/store/theme";
import { computed } from "vue";
import { useI18n } from 'vue-i18n'
const { locale } = useI18n();

const useStore = useThemeStore();

const pageColor = computed(() => useStore.theme?.colorBgLayout);

const themeMaskColor = computed(() => useStore.theme?.colorTextSecondary);
console.log(useStore.themeList)
const changeLocale = (lang: string) => {
    locale.value = locale.value == "en" ? "cn" : "en";
    // 做下关于语言的本地缓存持久化
    // to do something ...
}

const changeTheme = () => {
    const id = useStore.id;
    useStore.change(id === "dark" ? "light" : "dark");

    console.log({...useStore.theme});
}
</script>

<style lang="scss">
@import "../../uni.scss";
page,
.PageContainer {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    background-color: v-bind(pageColor);
}

.i-theme-change {
    position: fixed;
    right: 50rpx;
    bottom: 50rpx;
    z-index: 999;
    background-color:v-bind(themeMaskColor);
    color: $colorPrimary;
    width: 80rpx;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    border-radius: 50%;
    font-size: 26rpx;

    &::before {
        content: "切换";
    }
}

.i-lang-change {
    bottom: 150rpx;
}
</style>
