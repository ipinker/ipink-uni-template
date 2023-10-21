<template>
    <view class="PageContainer">
        <slot name="default"/>
        <view class="i-theme-change iconfont" :class="currentThemeName" @click="changeTheme"/>
        <view class="i-theme-change i-lang-change " @click="changeLocale">{{ currentLocaleName }}</view>
    </view>
</template>

<script lang="ts" setup>

import { computed } from "vue";
import { useLocale } from "@/common/hooks/useLocale";
import { useTheme } from "@/common/hooks/useTheme";

const { changeLocale, getLocale } = useLocale();
const { changeTheme, theme } = useTheme();

const currentLocaleName = computed(() => getLocale.value === "en" ? "English" : "中文简体");
const currentThemeName = computed(() => theme.value?.id === "dark" ? "icon-moon-fill" : "icon-taiyang");

const bgColor = computed(() => theme.value?.colorBgLayout);
const primaryBgColor = computed(() => theme.value?.colorPrimaryText);
const whiteColor = computed(() => theme.value?.colorTextBase);
const primaryShadowColor = computed(() => theme.value?.colorPrimaryShadow)

</script>

<style lang="scss">
@import "../../uni.scss";
page,
.PageContainer {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    background-color: v-bind(bgColor);
}

.i-theme-change {
    position: fixed;
    right: 50rpx;
    bottom: 50rpx;
    z-index: 999;
    background-color:v-bind(primaryBgColor);
    color: v-bind(whiteColor);
    width: 80rpx;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    border-radius: 50%;
    font-size: 26rpx;
    box-shadow: 0 4rpx 16rpx 0 v-bind(primaryShadowColor);
    transition: all .3s;
}

.i-lang-change {
    bottom: 150rpx;
    padding: 0 20rpx;
    word-break: break-all;
    overflow: hidden;
    &:hover,
    &:active {
        width: 160rpx;
        border-radius: 10rpx;
    }
}
</style>
