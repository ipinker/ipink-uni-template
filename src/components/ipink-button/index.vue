<template>
    <button class="IButton" :class="IButtonClass" :style="IButtonStyle" ref="_ref" 
		@mousedown="onMouseEvent" @mouseup="onMouseEvent"
		@touchstart="onMouseEvent" @touchend="onMouseEvent"
		@click="handlerClick"
	>
        <template v-if="isLoading">
            <ILoading :class="defaultSlot ? 'IButtonIconMR8' : ''"/>
            <span class="IButtonLoadingMask"></span>
        </template>
        <template v-else>
            <span class="iconfont" :class="[props.icon, defaultSlot ? 'IButtonIconMR8' : '']" v-if="props.icon"></span>
            <slot name="icon" :class="[iconSlot&&defaultSlot ? 'IButtonIconMR8' : '']" v-else></slot>
        </template>
        <slot></slot>
    </button>
</template>
<script lang="ts">
export default {
    name: "IButton"
}
</script>
<script lang="ts" setup>
import {ref, computed, useSlots, Ref} from "vue";
import { buttonProps } from "./button";
import "./style";
import ILoading from "@/components/ipink-loading/index";
import { useTheme } from "@/common/hooks/useTheme";
import {
    genButtonAnimationClass,
    genButtonLoadingClass,
    genButtonRadiusClass,
    genButtonSizeClass,
    genButtonTypeClass,

    genButtonSizeStyle,
    genButtonRadiusStyle,
    genColorStyle
} from "./style/genStyle"
import {TinyColor} from "@ctrl/tinycolor";
import {
    useButtonTouch,
    useButtonMouse, TouchPoint
} from "./useButton"
import { isMobile } from "@/common/utils/is";

const { theme } = useTheme();
const props = defineProps(buttonProps);

const emits = defineEmits(["click"]);
const _ref: Ref<HTMLElement | null> = ref(null);

// 获取插槽集合
const slots = useSlots();
// 这里获取到的是默认插槽的vnode
const defaultSlot = slots.default && slots.default()[0];
// 这里获取到的是图标插槽的vnode
const iconSlot = slots.icon && slots.icon()[0];

// 生成button的class部分
const IButtonClass = computed(() => {
    return [
        ...genButtonAnimationClass(props),
        ...genButtonLoadingClass(props),
        ...genButtonRadiusClass(props.radius),
        ...genButtonSizeClass(props),
        ...genButtonTypeClass(props)
    ];
});


const whiteColor = computed(() => theme.value?.colorWhite);
const fontColor = computed(() => theme.value?.colorText);
const borderColor = computed(() => theme.value?.colorBorder);
const shadowColor = computed(() => theme.value?.colorShadowBase);
const boxShadowWidth = computed(() => theme.value?.boxShadowWidth + "px");

const primaryColor = computed(() => theme.value?.colorPrimary);
const primaryTextColor = computed(() => theme.value?.colorPrimaryText);
const primaryShadowColor = computed(() => theme.value?.colorPrimaryShadow);

const successColor = computed(() => theme.value?.colorSuccess);
const successTextColor = computed(() => theme.value?.colorSuccessText);
const successShadowColor = computed(() => theme.value?.colorSuccessShadow);

const dangerColor = computed(() => theme.value?.colorError);
const dangerTextColor = computed(() => theme.value?.colorErrorText);
const dangerShadowColor = computed(() => theme.value?.colorErrorShadow);
const warningColor = computed(() => theme.value?.colorWarning);
const warningTextColor = computed(() => theme.value?.colorWarningText);
const warningShadowColor = computed(() => theme.value?.colorWarningShadow);
const infoColor = computed(() => theme.value?.colorInfo);
const infoTextColor = computed(() => theme.value?.colorInfoText);
const infoShadowColor = computed(() => theme.value?.colorInfoShadow);

const disabledColor = computed(() => theme.value?.colorFillQuaternary);
const disabledTextColor = computed(() => theme.value?.colorTextQuaternary);
const disabledShadowColor = computed(() => theme.value?.colorFillQuaternary);

const radiusDefault = computed(() => theme.value?.borderRadius + 'px');
const radiusLS = computed(() => theme.value?.borderRadiusXS + 'px');
const radiusSM = computed(() => theme.value?.borderRadiusSM + 'px');
const radiusLG = computed(() => theme.value?.borderRadiusLG + 'px');

// 生成button的style部分
const IButtonStyle = computed(() => {
    return [
        ...genButtonSizeStyle(props),
        ...genButtonRadiusStyle(props.radius),
        ...genColorStyle(props),
        props.bg ? {
           "box-shadow" : `0 ${boxShadowWidth.value} 0 ${new TinyColor(props.bg).setAlpha(0.1).toRgbString()}`
        } : {}
    ];
});

const isLoading = computed(() => props.loading);

/* Mouse Event Block */ 

const handlerClick = (e: Event) => {
    if ( props.disabled || props.loading) return false;
    emits("click", e);
};

/* Animation Block */
let xPos = ref("0");
let yPos = ref("0");
const onMouseEvent = (event : MouseEvent | TouchEvent) => {
    const isPcWeb = window && window.navigator && !isMobile();
    const { type } = event;
    let point: TouchPoint = { left: 0, top: 0};
    // 仅在pc上触发鼠标事件
    if(["mouseup", "mousedown"].includes(type) && isPcWeb){
        point = useButtonMouse(event as MouseEvent, _ref, 1);
        xPos.value = point.left + "px";
        yPos.value = point.top + "px";
    }
    // 其他端仅触发touch事件
    if(["touchstart", "touchend"].includes(type) && !isPcWeb){
        point = useButtonTouch(event as TouchEvent, _ref, 1);
        xPos.value = point.left + "px";
        yPos.value = point.top + "px";
    }
}

defineExpose({
    _ref: _ref,
    handlerClick,
});

</script>

<style lang="scss" scoped>
    @mixin ButtonShadow ($color: v-bind(shadowColor)) {
        box-shadow: 0 v-bind(boxShadowWidth) 0 if($color, $color, v-bind(shadowColor));
    }
    // Button 对 button 的一些处理
    .IButton {
        position: relative;
        border: none;
        @include ButtonShadow;
        text-align: center;
        font-size: 14px;
        color: v-bind(whiteColor);

        .iconfont {
            font-size: 14px;
            margin: 0 !important;
        }
        // 默认样式
        &.button-type-,
        &.button-type-default,
        &.button-type-dashed {
            color: v-bind(fontColor);
            border: 1px solid v-bind(borderColor);
        }
        // 默认情况下的 plain
        &.button-type--plain {
            border: 1px solid v-bind(borderColor);
        }

        &.button-type-primary {
            background-color: v-bind(primaryColor);
            color: v-bind(whiteColor);
            @include ButtonShadow(v-bind(primaryShadowColor));
            &.button-type--plain {
                color: v-bind(primaryColor);
                border: 1px solid v-bind(primaryColor);
            }
        }
        &.button-type-success {
            background-color: v-bind(successColor);
            color: v-bind(whiteColor);
            @include ButtonShadow(v-bind(successShadowColor));
            &.button-type--plain {
                color: v-bind(successTextColor);
                border: 1px solid v-bind(successColor);
            }
        }
        &.button-type-warning {
            background-color: v-bind(warningColor);
            color: v-bind(whiteColor);
            @include ButtonShadow(v-bind(warningShadowColor));
            &.button-type--plain {
                color: v-bind(warningTextColor);
                border: 1px solid v-bind(warningColor);
            }
        }
        &.button-type-danger {
            background-color: v-bind(dangerColor);
            color: v-bind(whiteColor);
            @include ButtonShadow(v-bind(dangerShadowColor));
            &.button-type--plain {
                color: v-bind(dangerTextColor);
                border: 1px solid v-bind(dangerColor);
            }
        }
        &.button-type-info {
            background-color: v-bind(infoColor);
            color: v-bind(whiteColor);
            @include ButtonShadow(v-bind(infoShadowColor));
            &.button-type--plain {
                color: v-bind(infoTextColor);
                border: 1px solid v-bind(infoColor);
            }
        }
        &.button-type--plain {
            background-color: transparent;
        }
        &.button-type-dashed {
            border-style: dashed;
        }
        &.button-size-small {
            height: 24px;
            padding: 0 7px;
            line-height: 24px;
            .iconfont {
                font-size: 12px;
            }
        }
        &,
        &.button-size-,
        &.button-size-normal {
            height: 32px;
            padding: 0 15px;
            line-height: 32px;
        }
        &.button-size-big {
            height: 40px;
            padding: 0 15px;
            line-height: 40px;
            &,
            .iconfont {
                font-size: 16px;
            }
        }
        &.button-type-round {
            border-radius: 50% !important;
            overflow: hidden;
            padding: 0;
            &.button-size-small {
                width: 24px;
                height: 24px;
            }
            &.button-size-normal {
                width: 32px;
                height: 32px;
            }
            &.button-size-big {
                width: 40px;
                height: 40px;
            }
        }

        &.button-type-link,
        // 文字按钮, 禁止各种花里胡哨
        &.button-type-text {
            background-color: transparent !important;
            border: none !important;
            padding: 0 !important;
            color: v-bind(fontColor);
            box-shadow: none !important;
        }
        &.button-type-link {
            color: v-bind(primaryTextColor);
        }

        // 权重最高
        &.button-type-disabled {
            color: v-bind(disabledTextColor);
            background-color: v-bind(disabledColor);
            border: 1px solid v-bind(borderColor);
            @include ButtonShadow(v-bind(disabledShadowColor));
        }
        // 边框特殊line-height
        &.button-type-,
        &.button-type-default,
        &.button-type-dashed,
        &.button-type--plain,
        &.button-type-disabled {
            &.button-size-small {
                line-height: 22px;
            }
            &.button-size-normal {
                line-height: 30px;
            }
            &.button-size-big {
                line-height: 38px;
            }
        }

        & > .IButtonIconMR8 {
            margin-right: 6px !important;
        }
        &,
        &.button-radius-,
        &.button-radius-default {
            border-radius: v-bind(radiusDefault);
        }
        &.button-radius-xs {
            border-radius: v-bind(radiusLS);
        }
        &.button-radius-sm {
            border-radius: v-bind(radiusSM);
        }
        &.button-radius-lg {
            border-radius: v-bind(radiusLG);
        }
        &.button-ele-block {
            display: block;
            width: 100%;
        }

        &.button-func-loading {
            opacity: 0.65;
        }
		
		&.button-animation-ripple {
			overflow: hidden;
			&::before {
				content: "";
				pointer-events: none;
				position: absolute;
				left: v-bind(xPos);
				top: v-bind(yPos);
				transform: translate(-50%, -50%);
				width: 0;
				height: 0;
				background-color: rgba(10, 10, 10);
				border-radius: 50%;
				transition: width 0.45s ease-in-out, height 0.45s ease-in-out;
				transform-origin: center;
				opacity: 0;
				z-index: 2;
			}
			&:active {
				&::before {
					width: 100vh;
					height: 100vh;
					opacity: 0.35;
				}
			}
		}
		&.button-animation-,
		&.button-animation-opacity,
		&.button-animation-default {
			&:active {
				opacity: 0.65;
			}
		}

    }
</style>