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
            <i-button class="flexItem" type="default">default</i-button>
            <i-button class="flexItem" type="primary">primary</i-button>
            <i-button class="flexItem" type="success">success</i-button>
            <i-button class="flexItem" type="danger">danger</i-button>
            <i-button class="flexItem" type="warning">warning</i-button>
            <i-button class="flexItem" type="info">info</i-button>
        </view>
        <view class="type plain flex" data-label="Button`s plain">
            <i-button class="flexItem" type="default" plain>default</i-button>
            <i-button class="flexItem" type="primary" plain>primary</i-button>
            <i-button class="flexItem" type="success" plain>success</i-button>
            <i-button class="flexItem" type="danger" plain>danger</i-button>
            <i-button class="flexItem" type="warning" plain>warning</i-button>
            <i-button class="flexItem" type="info" plain>info</i-button>
        </view>
        <view class="disabled flex" data-label="Button`s disabled">
            <i-button class="flexItem" type="disabled">disabled</i-button>
            <i-button class="flexItem" type="text" disabled>disabled</i-button>
        </view>
        <view class="size flex" data-label="Button`s size">
            <i-button class="flexItem" size="small">small</i-button>
            <i-button class="flexItem" size="normal">normal</i-button>
            <i-button class="flexItem" size="big">big</i-button>
            <i-button class="flexItem" size="120,50">120,50</i-button>
            <i-button class="flexItem" size="500,80">500,80-自定义size会自动化隐藏</i-button>
        </view>
        <view class="round flex" data-label="Button`s round">
            <i-button class="flexItem" icon="icon-sousuo" round></i-button>
            <i-button class="flexItem" type="primary" icon="icon-sousuo" round></i-button>
            <i-button class="flexItem" type="primary" plain icon="icon-sousuo" round></i-button>
            <i-button class="flexItem" type="success" size="60" round>2</i-button>
        </view>
        <view class="icon flex" data-label="Button`s icon">
            <i-button class="flexItem" type="primary" icon="icon-sousuo">搜索</i-button>
            <i-button class="flexItem" type="primary" plain icon="icon-sousuo">搜索</i-button>
            <i-button class="flexItem" type="primary" icon="icon-shenghuojiaofei">缴费</i-button>
            <i-button class="flexItem" type="primary" plain icon="icon-shenghuojiaofei">缴费</i-button>
        </view>
        <view class="func flex" data-label="Button`s text">
            <i-button class="flexItem" type="text">普通文本</i-button>
            <i-button class="flexItem" type="link">链接文本</i-button>
            <i-button class="flexItem" type="text" icon="icon-sousuo">普通文本</i-button>
            <i-button class="flexItem" type="link" plain icon="icon-sousuo">链接文本</i-button>
        </view>

        <view class="color flex" data-label="Button`s color">
            <i-button class="flexItem" color="red">Red Text</i-button>
            <i-button class="flexItem" bg="red">Red Bg</i-button>
            <i-button class="flexItem" bg="red" color="white">Red Bg White Text</i-button>
            <i-button class="flexItem" bg="red" plain>Red Bg And Plain</i-button>
        </view>

        <view class="radius flex" data-label="Button`s radius">
            <i-button class="flexItem" color="red" radius="default">Radius</i-button>
            <i-button class="flexItem" color="red" radius="xs">Radius-XS</i-button>
            <i-button class="flexItem" color="red" radius="sm">Radius-SM</i-button>
            <i-button class="flexItem" color="red" radius="lg">Radius-LG</i-button>
            <i-button class="flexItem" color="red" radius="20">Radius-20</i-button>
        </view>
        <view class="block flex" data-label="Button`s block">
            <i-button class="flexItem" block>Block - 宽度撑满父元素</i-button>
        </view>
        <view class="loading flex" data-label="Button`s loading">
            <i-button class="flexItem" loading>Loading</i-button>
            <i-button class="flexItem" type="primary" :loading="loading" @click="getLoadingClick">Loading</i-button>
            <i-button class="flexItem" type="primary" :loading="loading" @click="getLoadingClick" icon="icon-sousuo">Loading</i-button>
            <i-button class="flexItem" type="primary" @click="loading=!loading">{{loading ? "停止" : "开始"}}</i-button>
        </view>
        <view class="animation flex" data-label="Button`s Animation">
            <i-button class="flexItem" primary size="300,160" animation="ripple">Ripple - 水波纹 (开发中...)</i-button>
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

    .flexItem:nth-child(n) {
        margin: 10rpx 20rpx;
    }

}

</style>
