<!--
 * @Author: error: git config user.name & please set dead value or install git
 * @Date: 2023-03-20 15:48:19
* @LastEditors: white_queen
* @LastEditTime: 2023-08-03 11:22:15
 * @FilePath: /Lib/src/pages/index/index.vue
 * @Description: 描述
-->
<template>
    <i-page>
        <i-navigation-bar :title="$tr('component.basic.button') + ' (开发中...)'" useBack/>
        {{ "点击效果暂未开发" }}
        <view class="type flex" data-label="Button`s type">
            <i-button type="default">default</i-button>
            <i-button type="primary">primary</i-button>
            <i-button type="success">success</i-button>
            <i-button type="danger">danger</i-button>
            <i-button type="warning">warning</i-button>
            <i-button type="info">info</i-button>
        </view>
        <view class="type plain flex" data-label="Button`s plain">
            <i-button type="default" plain>default</i-button>
            <i-button type="primary" plain>primary</i-button>
            <i-button type="success" plain>success</i-button>
            <i-button type="danger" plain>danger</i-button>
            <i-button type="warning" plain>warning</i-button>
            <i-button type="info" plain>info</i-button>
        </view>
        <view class="disabled flex" data-label="Button`s disabled">
            <i-button type="disabled">disabled</i-button>
            <i-button type="text" disabled>disabled</i-button>
        </view>
        <view class="size flex" data-label="Button`s size">
            <i-button size="small">small</i-button>
            <i-button size="normal">normal</i-button>
            <i-button size="big">big</i-button>
            <i-button size="120,50">120,50</i-button>
            <i-button size="500,80">500,80-自定义size会自动化隐藏</i-button>
        </view>
        <view class="round flex" data-label="Button`s round">
            <i-button icon="icon-sousuo" round></i-button>
            <i-button type="primary" icon="icon-sousuo" round></i-button>
            <i-button type="primary" plain icon="icon-sousuo" round></i-button>
            <i-button type="success" size="60" round>2</i-button>
        </view>
        <view class="icon flex" data-label="Button`s icon">
            <i-button type="primary" icon="icon-sousuo">搜索</i-button>
            <i-button type="primary" plain icon="icon-sousuo">搜索</i-button>
            <i-button type="primary" icon="icon-shenghuojiaofei">缴费</i-button>
            <i-button type="primary" plain icon="icon-shenghuojiaofei">缴费</i-button>
        </view>
        <view class="func flex" data-label="Button`s text">
            <i-button type="text">普通文本</i-button>
            <i-button type="link">链接文本</i-button>
            <i-button type="text" icon="icon-sousuo">普通文本</i-button>
            <i-button type="link" plain icon="icon-sousuo">链接文本</i-button>
        </view>

        <view class="color flex" data-label="Button`s color">
            <i-button color="red">Red Text</i-button>
            <i-button bg="red">Red Bg</i-button>
            <i-button bg="red" color="white">Red Bg White Text</i-button>
            <i-button bg="red" plain>Red Bg And Plain</i-button>
        </view>

        <view class="radius flex" data-label="Button`s radius">
            <i-button color="red" radius="default">Radius</i-button>
            <i-button color="red" radius="xs">Radius-XS</i-button>
            <i-button color="red" radius="sm">Radius-SM</i-button>
            <i-button color="red" radius="lg">Radius-LG</i-button>
            <i-button color="red" radius="20">Radius-20</i-button>
        </view>
        <view class="block flex" data-label="Button`s block">
            <i-button block>Block - 宽度撑满父元素</i-button>
        </view>
        <view class="loading flex" data-label="Button`s loading">
            <i-button loading>Loading</i-button>
            <i-button type="primary" :loading="loading" @click="getLoadingClick">Loading</i-button>
            <i-button type="primary" :loading="loading" @click="getLoadingClick" icon="icon-sousuo">Loading</i-button>
            <i-button type="primary" @click="loading=!loading">{{loading ? "停止" : "开始"}}</i-button>
        </view>
        <view class="animation flex" data-label="Button`s Animation">
            <i-button primary size="300,160" animation="ripple">Ripple - 水波纹 (开发中...)</i-button>
        </view>
    </i-page>
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
