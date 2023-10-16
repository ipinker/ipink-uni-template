<template>
    <pink-page class="page">
        <view class="i-card">
            <view class="func-theme">
                <view class="i-title">功能色</view>
                <view class="func-theme-item"
                    v-for="info in funcColors" :key="info.label"
                    :style="genBgStyle(info.color as Color)"
                    @click="copyColor(info.color as Color)"
                >
                    <view>{{info.label}}</view>
                    <view>{{theme[info.color]}}</view>
                </view>
            </view>
        </view>
        <view class="i-card">
            <view class="i-title">预设色彩</view>
            <view class="func-theme flex">
                <view class="func-theme-preset"
                    v-for="preset in presetColors" :key="preset.label"
                >
                    <view class="func-theme-preset-title"
                        :style="genFontStyle(preset.default as Color)"
                    >{{preset.label}}</view>
                    <view class="func-theme-preset-color"
                        :style="genBgStyle(color as Color)"
                        v-for="(color) in preset.colors" :key="color"
                        @click="copyColor(color as Color)"
                    >
                        <view class="color-label">{{color}}</view>
                        <view class="color-value">{{theme[color]}}</view>
                    </view>
                </view>
            </view>
        </view>
    </pink-page>
</template>

<script lang="ts" setup>
import {computed, ComputedRef} from "vue";
import { ColorToken} from "ipink-theme"
import { useThemeStore } from "@/store/theme";
import { presetColors, funcColors } from "../../../common/config/theme";

type Color = keyof ColorToken;

const useStore = useThemeStore();

console.log(presetColors, funcColors)
const theme: ComputedRef<ColorToken> = computed(() => (useStore.theme || {}) as ColorToken);
const primary = computed(() => useStore.theme?.colorPrimary)
const genBgStyle = (color : Color ): string => `background-color: ${theme.value[color]}`;
const genFontStyle = (color : Color ): string => `color: ${theme.value[color]}`;
const copyColor = (color : Color): void => console.log(theme.value[color]);
</script>

<style lang="scss">
.page {
    padding-top: 1rpx;
    font-size: 28rpx;
}

.func-theme {
    width: 100%;
    padding: 0 30rpx 30rpx;

    .func-theme-item {
        color: #fff;
        display: flex;
        justify-content: space-between;
        padding: 10rpx 20rpx;
    }

    &.flex {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    .func-theme-preset {
        width: 320rpx;
        .func-theme-preset-title {
            white-space: nowrap;
        }
        .func-theme-preset-color {
            color: #fff;
            display: flex;
            justify-content: space-between;
            padding: 10rpx 20rpx;
            .color-label {}
            .color-value {}
        }
    }
}
</style>
