<template>
	<view class="PinkRadio" @click="change($parent)" ref="PinkRadio">
		<view class="iconfont pink-radio-icon"
			:class="radio?'icon-xuanzhong':'icon-weixuanzhong'"
		></view>
		<view class="pink-radio-label">
			<slot></slot>
		</view>
	</view>
</template>

<script lang="ts" setup>
import {ref, watch, Ref, ComponentPublicInstance, getCurrentInstance, computed, onMounted, nextTick} from "vue";
import {useTheme} from "@/common/hooks/useTheme";

const props = defineProps({
    label: {
        type: [Boolean,String,Number],
        require: true
    },
    modelValue: {
        type: [Boolean,String,Number, undefined],
        default: void 0
    }
});

const PinkRadio = ref(null);
let radio = ref(false);
let currentLabel: Ref<boolean | string | number> = ref(false);
const { theme } = useTheme()
const primaryColor = computed((() => theme.value?.colorPrimaryText))
watch(() => props.modelValue, (newVal) => {
    if(newVal !== void 0){
        radio.value = newVal === props.label;
    }
}, {immediate: true})

const setRadioValue = (e: boolean | string | number) => {
    currentLabel.value = e;
    radio.value = currentLabel.value === props.label;
}

const emits = defineEmits(['update:modelValue', 'change']);
const ctx = getCurrentInstance();
type ParentExpose = {
    props: { modelValue: boolean | string | number },
    radioBoxChange: Function
}
let parentModelValue: Ref<boolean | string | number> = ref(false);

// #ifdef H5
parentModelValue = computed(() => ctx?.proxy?.$parent?.$parent?.props.modelValue);
// #endif
// #ifndef H5
parentModelValue = computed(() => ctx?.proxy?.$parent?.props.modelValue);
// #endif

watch(parentModelValue, (val) => {
    radio.value = val === props.label;
}, {immediate:true})

const change = () => {
    if(props.modelValue !== void 0){
        emits("change", props.label);
        emits("update:modelValue", props.label);
    }
    else {
        try{
            if(ctx?.parent?.exposed?.radioBoxChange) ctx?.parent?.exposed?.radioBoxChange(props.label);
            else ctx?.parent?.parent?.exposed?.radioBoxChange(props.label);
        }catch(e){
            console.log("Radio change error: ", e)
        }
    }
}

defineExpose({
    _ref: PinkRadio,
    setRadioValue
})
</script>

<style lang="scss">
	.PinkRadio {
		display: inline-flex;
		align-items: center;

		.pink-radio-icon {
			display: inline-block;
			margin-right: 10rpx;
			font-size: 32rpx;
			transition: all .3s;
            &.icon-xuanzhong {
                color: v-bind(primaryColor)
            }
		}
		.pink-radio-label {
			display: inline-block;
			font-size: 28rpx;
			line-height: 32rpx;
		}
	}
</style>
