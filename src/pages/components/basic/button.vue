<!--
 * @Author: error: git config user.name & please set dead value or install git
 * @Date: 2023-03-20 15:48:19
* @LastEditors: white_queen
* @LastEditTime: 2023-08-03 11:22:15
 * @FilePath: /Lib/src/pages/index/index.vue
 * @Description: 描述
-->
<template>
    <c-page>
        <view class="type flex" data-label="Button`s type">
            <ipink-button type="default">default</ipink-button>
            <ipink-button type="primary">primary</ipink-button>
            <ipink-button type="success">success</ipink-button>
            <ipink-button type="danger">danger</ipink-button>
            <ipink-button type="warning">warning</ipink-button>
            <ipink-button type="info">info</ipink-button>
        </view>
        <view class="type plain flex" data-label="Button`s plain">
            <ipink-button type="default" plain>default</ipink-button>
            <ipink-button type="primary" plain>primary</ipink-button>
            <ipink-button type="success" plain>success</ipink-button>
            <ipink-button type="danger" plain>danger</ipink-button>
            <ipink-button type="warning" plain>warning</ipink-button>
            <ipink-button type="info" plain>info</ipink-button>
        </view>
        <view class="disabled flex" data-label="Button`s disabled">
            <ipink-button type="disabled">disabled</ipink-button>
            <ipink-button type="text" disabled>disabled</ipink-button>
        </view>
        <view class="size flex" data-label="Button`s size">
            <ipink-button size="small">small</ipink-button>
            <ipink-button size="normal">normal</ipink-button>
            <ipink-button size="big">big</ipink-button>
            <ipink-button size="120,50">120,50</ipink-button>
            <ipink-button size="500,80">500,80-自定义size会自动化隐藏</ipink-button>
        </view>
        <view class="round flex" data-label="Button`s round">
            <ipink-button icon="icon-sousuo" round></ipink-button>
            <ipink-button type="primary" icon="icon-sousuo" round></ipink-button>
            <ipink-button type="primary" plain icon="icon-sousuo" round></ipink-button>
            <ipink-button type="success" size="60" round>2</ipink-button>
        </view>
        <view class="icon flex" data-label="Button`s icon">
            <ipink-button type="primary" icon="icon-sousuo">搜索</ipink-button>
            <ipink-button type="primary" plain icon="icon-sousuo">搜索</ipink-button>
            <ipink-button type="primary" icon="icon-shenghuojiaofei">缴费</ipink-button>
            <ipink-button type="primary" plain icon="icon-shenghuojiaofei">缴费</ipink-button>
        </view>
        <view class="func flex" data-label="Button`s text">
            <ipink-button type="text">普通文本</ipink-button>
            <ipink-button type="link">链接文本</ipink-button>
            <ipink-button type="text" icon="icon-sousuo">普通文本</ipink-button>
            <ipink-button type="link" plain icon="icon-sousuo">链接文本</ipink-button>
        </view>

        <view class="color flex" data-label="Button`s color">
            <ipink-button color="red">Red Text</ipink-button>
            <ipink-button bg="red">Red Bg</ipink-button>
            <ipink-button bg="red" color="white">Red Bg White Text</ipink-button>
            <ipink-button bg="red" plain>Red Bg And Plain</ipink-button>
        </view>

        <view class="radius flex" data-label="Button`s radius">
            <ipink-button color="red" radius="default">Radius</ipink-button>
            <ipink-button color="red" radius="xs">Radius-XS</ipink-button>
            <ipink-button color="red" radius="sm">Radius-SM</ipink-button>
            <ipink-button color="red" radius="lg">Radius-LG</ipink-button>
            <ipink-button color="red" radius="20">Radius-20</ipink-button>
        </view>
        <view class="block flex" data-label="Button`s block">
            <ipink-button block>Block - 宽度撑满父元素</ipink-button>
        </view>
        <view class="loading flex" data-label="Button`s loading">
            <ipink-button loading>Loading</ipink-button>
            <ipink-button type="primary" :loading="loading" @click="getLoadingClick">Loading</ipink-button>
            <ipink-button type="primary" :loading="loading" @click="getLoadingClick" icon="icon-sousuo">Loading</ipink-button>
            <ipink-button type="primary" @click="loading=!loading">{{loading ? "停止" : "开始"}}</ipink-button>
        </view>
        <view class="animation flex" data-label="Button`s Animation">
            <ipink-button primary size="300,160" animation="ripple">Ripple - 水波纹</ipink-button>
        </view>
    </c-page>
</template>

<script setup lang="ts" scoped>
import {computed, ref} from "vue";
import {useTheme} from "@/common/hooks/useTheme";

const {theme} = useTheme();
let pageColor, themeColor;
pageColor = computed(() => theme.value?.colorBgLayout);
themeColor = computed(() => theme.value?.colorPrimary);
let loading = ref(false);
const getLoadingClick = console.log;
</script>

<style lang="scss" scoped>
.content {
    width: 100vw;
    min-height: 100vh;

    view.flex::before {
        width: 100%;
        content: attr(data-label);
        color: v-bind(themeColor);
        line-height: 80rpx;
        margin-top: 20rpx;
        border-top: 1px solid #eee;
    }
}

.flex {
    padding: 0 20rpx;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    & > :nth-child(n) {
        margin: 10rpx 20rpx;
    }

}

</style>
