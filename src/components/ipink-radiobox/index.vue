<template>
	<view class="PinkRadiobox" ref="pinkRadioBox">
		<slot></slot>
	</view>
</template>

<script setup lang="ts">
import {nextTick, watch, ref, onMounted, getCurrentInstance} from "vue";

const props = defineProps({
    modelValue: {
        type: [Boolean,String,Number],
        default: false
    }
});
const pinkRadioBox = ref(null);
const emits = defineEmits(["change", "update:modelValue"]);
const ctx = getCurrentInstance();
onMounted(async () => {
    await nextTick();
})

const radioBoxChange = (e: boolean | string | number): void =>  {
    emits("change", e);
    emits("update:modelValue", e);
}

defineExpose({
    radioBoxChange,
    props,
    _ref: pinkRadioBox
})

</script>

<style lang="scss">
	.PinkRadiobox {
		display: inline-flex;
		align-items: center;
        :deep(.iconfont) {
            margin-right: 10rpx !important;
        }
	}
    .PinkRadiobox :nth-child(n) {
        margin-right: 20rpx;
    }
    .PinkRadiobox :last-child {
        margin-right: 0;
    }
</style>
