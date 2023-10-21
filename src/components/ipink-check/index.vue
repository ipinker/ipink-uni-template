<template>
	<view class="pink-checked" @click="change">
		<view class="iconfont pink-checked-icon"
			:class="checked?'icon-duoxuan-xuanzhong':'icon-fangxingweixuanzhong'"
			:style="checked ? activeColor : ''"
		></view>
		<view class="pink-checked-label">
			<slot></slot>
		</view>
	</view>
</template>

<script setup lang="ts">

import {ref, watch, Ref, computed, onMounted} from "vue";
import { useTheme } from "@/common/hooks/useTheme";

const props = defineProps({
    check: {
        type: Boolean,
        default: false
    },
    value: {
        type: Boolean,
        default: false
    },
    activeColor: String
});

let checked = ref(false);
const { theme } = useTheme();
let primaryColor = computed(() => theme.value?.colorPrimaryText)

onMounted(() => {

});

const emits = defineEmits(['update:check', 'input', 'change']);


watch(() => props.check, (newVal) => {
    if(newVal !== void 0){
        checked.value = newVal;
    }
}, { immediate: true })
watch(() => props.value, (newVal) => {
    if(newVal !== void 0){
        checked.value = newVal;
    }
}, { immediate: true })

const change = () => {
    const result = !checked.value;
    emits("change", result);
    emits("input", result);
    emits("update:check", result);
}

</script>
<style lang="scss">
	.pink-checked {
		display: inline-flex;
		align-items: center;
		.pink-checked-icon {
			display: inline-block;
			margin-right: 10rpx;
			font-size: 32rpx;
			transition: all .3s;
            color: v-bind(primaryColor);
		}
		.pink-checked-label {
			display: inline-block;
			font-size: 28rpx;
			line-height: 32rpx;
		}
	}
</style>
