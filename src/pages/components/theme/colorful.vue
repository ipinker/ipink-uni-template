<template>
    <ipink-page class="page">
        <ipink-navigation-bar :title="$t('component.theme.colorful')" />
        <view class="i-card">
            <view class="func-theme-container">
                <view class="func-theme" v-for="(item,index) in funcColors" :key="index" :id="item.default">
                    <view class="i-title">{{ item.label }}</view>
                    <view class="func-theme-grid">
                        <view class="func-theme-item" :class="'r' + infoIndex"
                            v-for="(info,infoIndex) in item.colors" :key="info.label"
                            :style="genBgStyle(info.color as Color)"
                            @click="copyColor(info.color as Color)"
                        >
                            <view>{{getLocale == "en" ? info.color : info.label}}</view>
                            <view>{{ theme[info.color] }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="i-card">
            <view class="func-theme-container">
                <view class="func-theme" v-for="(item,index) in otherColor" :key="index" :id="item.default">
                    <view class="i-title">{{ item.label }}</view>
                    <view class="func-theme-grid">
                        <view class="func-theme-item" :class="'r' + infoIndex"
                            v-for="(info,infoIndex) in item.colors" :key="info.label"
                            :style="genBgStyle(info.color as Color)"
                            @click="copyColor(info.color as Color)"
                        >
                            <view>{{getLocale == "en" ? info.color : info.label}}</view>
                            <view>{{ theme[info.color] }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="i-card">
            <view class="i-title">预设色彩</view>
            <view class="func-theme flex">
                <view class="func-theme-preset" :id="preset.default"
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
                        <view class="color-value">{{ theme[color] }}</view>
                    </view>
                </view>
            </view>
        </view>
    </ipink-page>
</template>

<script lang="ts" setup>
import {computed, ComputedRef} from "vue";
import { ColorToken} from "ipink-theme"
import {
    presetColors,
    funcColors,
    otherColor
} from "@/common/config/theme";
import {useTheme} from "@/common/hooks/useTheme";
import {useLocale} from "@/common/hooks/useLocale";

type Color = keyof ColorToken;

const { getLocale } = useLocale();
const { theme } = useTheme();

const containerBgColor = computed(() => theme.value?.colorBgContainer);
const textColor = computed(() => theme.value?.colorText);
const textHoverColor = computed(() => theme.value?.colorPrimaryTextHover);

const themeInfo: ComputedRef<ColorToken> = computed(() => (theme.value || {}) as ColorToken);
const primary = computed(() => theme.value?.colorPrimary );
const genBgStyle = (color : Color ): string => `background-color: ${themeInfo.value[color]}`;
const genFontStyle = (color : Color ): string => `color: ${themeInfo.value[color]}`;
const copyColor = (color : Color): void => {
    uni.setClipboardData({ data: color });
};
</script>

<style lang="scss">
.page {
    padding-top: 1rpx;
    font-size: 28rpx;
}

.i-card {
    width: calc(100vw - 40rpx);
    background-color: v-bind(containerBgColor);
}
.flex {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.func-theme {
    width: calc(100vw - 40rpx);
    padding: 0 30rpx 30rpx;
    font-size: 24rpx;
    word-break: break-all;

    .func-theme-item {
        color: v-bind(textColor);
        display: flex;
        justify-content: space-between;
        padding: 10rpx 20rpx;
        &:hover {
            color: v-bind(textHoverColor);
        }
    }
    .func-theme-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 30px);
        .r4,
        .r6 {
            grid-column-start: 2;
            grid-column-end: 4;
        }
        .r10 {
            grid-column-start: 1;
            grid-column-end: 4;
        }

    }
    .func-theme-preset {
        width: 160px;
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
.func-theme-container {
    width: calc(100vw - 40rpx);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .func-theme {
        width: 49.5vw !important;
    }
}

@media (max-width: 1300px) {
    .func-theme-container {
        display: flex;
        flex-direction: column;
        .func-theme {
            width: 100% !important;
            .func-theme-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(3, 30px);
                font-size: 14px;
            }
        }
    }
}

@media (min-width: 550px) and (max-width: 1000px) {
    .func-theme-container {
        display: flex;
        flex-direction: column;
        .func-theme {
            width: 100% !important;
            font-size: 14px;
            .func-theme-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(3, 60rpx);
            }
        }
    }
    .func-theme-preset {
        width: 160px;
        font-size: 14px;
        .func-theme-preset-color {
            color: #fff;
            padding: 10rpx !important;
        }
    }
}
@media (max-width: 550px) {
    .func-theme-container {
        display: flex;
        flex-direction: column;
        .func-theme {
            width: 100% !important;
            font-size: 20rpx;
            .func-theme-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: repeat(3, 70rpx);
                .r0 {
                    grid-column-start: 1;
                    grid-column-end: 3;

                }
                .r4,
                .r6 {
                    grid-column-start: 2;
                    grid-column-end: 3;
                }
                .r7,
                .r10 {
                    grid-column-start: 1;
                    grid-column-end: 3;
                }
            }
        }
    }
}
</style>
