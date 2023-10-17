<!--
 * @Author: error: git config user.name & please set dead value or install git
 * @Date: 2023-03-20 15:48:19
* @LastEditors: white_queen
* @LastEditTime: 2023-08-03 11:22:15
 * @FilePath: /Lib/src/pages/index/index.vue
 * @Description: 描述
-->
<template>
    <span ref="_ref" class="ILoading">
        <svg viewBox="0 0 1024 1024" focusable="false" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg>
    </span>
</template>

<script setup lang="ts" scoped>
import {computed, ref} from "vue";
import {loadingProps} from "./loading";
import {useTheme} from "@/common/hooks/useTheme";
const props = defineProps(loadingProps);

const {theme} = useTheme();

const size = computed(() => (props.size || 16) + 'px');
const color = computed(() => (props.color || theme.value?.colorText));
const type = computed(() => props.type);
const duration = computed(() => props.duration + 's');

const _ref = ref(null);

defineExpose({
    _ref: _ref
});
</script>

<style lang="scss" scoped>
.ILoading {
    display: inline-flex;
    align-items: center;
    color: inherit;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -.125em;
    text-rendering: optimizeLegibility;
    animation: defaultLoading v-bind(duration) linear infinite;
}

@keyframes defaultLoading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
