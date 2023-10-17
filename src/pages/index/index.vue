<!--
 * @Author: error: git config user.name & please set dead value or install git
 * @Date: 2023-03-20 15:48:19
* @LastEditors: white_queen
* @LastEditTime: 2023-10-16 20:46:09
 * @FilePath: /Lib/src/pages/index/index.vue
 * @Description: 描述
-->
<template>
    <ipink-page>
        <ipink-navigation-bar :title="$t('name')" />

        <view v-for="(item,index) in Components" :key="index">
            <view class="i-title"> {{ $t(item.title) }} </view>
            <view class="i-card i-link" :style="[{background: bgColor}]">
                <view class="i-link-item ActiveGray"
                    v-for="(child, childIndex) in item.components" :key="'-' + childIndex"
                    @click="goDetail(child, item)"
                >
                    <view class="i-link-item-label" :style="[{color: fontColor}]">{{ $t(child.title) }}</view>
                    <view class="i-link-item-icon iconfont icon-xiangyou"></view>
                </view>
            </view>
        </view>
    </ipink-page>
</template>

<script setup lang="ts" scoped>
import {useThemeStore} from "@/store/theme"
import {computed, ref} from "vue";
import Components, {ComponentItem, ComponentsItem} from "../../common/config/components";

const useStore = useThemeStore();
const themeColor = computed(() => useStore.theme?.colorPrimary);
const bgColor = computed(() => useStore.theme?.colorBgBase);
const fontColor = computed(() => useStore.theme?.colorTextBase);
const goDetail = (child: ComponentItem, parent: ComponentsItem) => {
    const url = `${child.path}?title=${child.title}&parentTitle=${parent.title}`;
    console.log(url)
    uni.navigateTo({
        url
    })
}
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
