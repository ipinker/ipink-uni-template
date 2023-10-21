<template>
	<view :style="{
		width: width + 'rpx',
		height: height + 'rpx',
		backgroundColor: bgColor
	}"></view>
</template>

<script lang="ts" setup>

defineProps({
    expandStyle: {
        type: Object,
        default: () => ({})
    },
    width: {
        type: [String , Number],
        default: "100%"
    },
    height: {
        type: [String , Number],
        default: "0"
    },
    bgColor: {
        type: String,
        default: ""
    }
});
</script>
