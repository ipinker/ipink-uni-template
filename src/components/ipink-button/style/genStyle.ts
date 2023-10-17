import {
    Size, SIZES,
    Radius, RADIUS, Animation, ANIMATIONS
} from "@/common/utils/css/constant";
import type { ExtractPropTypes } from 'vue';
import type { ButtonPropsType } from "../button";
import {getRadius, RadiusStyle, getSize, SizeStyle} from "@/common/utils/css/style";
/**
 * @description 根据按钮的类型 <type> 生成指定的 class 集合
 */
export const genButtonTypeClass = (props: ExtractPropTypes<ButtonPropsType>): string[] => {
    return [
        `button-type-${ props.type }`,
        props.primary ? `button-type-primary` : "",
        props.success ? `button-type-success` : "",
        props.warning ? `button-type-warning` : "",
        props.info ? `button-type-info`: "",
        props.danger ? `button-type-danger`: "",
        props.link ? `button-type-link`: "",
        props.dashed ? "button-type-dashed" : "",
        props.plain ? "button-type--plain" : "",
        props.round ? `button-type-round`: "",
        props.text ? `button-type-text`: "",
        props.block ? `button-ele-block`: "",
        props.disabled ? `button-type-disabled`: "",
        props.loading ? `button-func-loading`: ""
    ];
};

/**
 * @description 根据按钮的尺寸 <size> 生成指定的 class 集合
 */
export const genButtonSizeClass = (props: ExtractPropTypes<ButtonPropsType>): string[] => {
    return [
        SIZES.includes(props.size as Size) ? `button-size-${ props.size }` : "",
    ];
};

export type ButtonSizeStyle = SizeStyle & { padding?: string | number, overflow?: 'hidden' | 'visible' };
export const genButtonSizeStyle = (props: ExtractPropTypes<ButtonPropsType>): (string | ButtonSizeStyle)[] => {
    const sizes: (string | ButtonSizeStyle)[] = [];
    const isFixedSize = SIZES.includes(props.size as Size);
    if(isFixedSize) return sizes;
    sizes.push({padding: 0, overflow: 'hidden'})
    sizes.push(getSize(props.size, props.round, true));
    return sizes;
};

/**
 * @description 根据按钮的圆角 <radius> 生成指定的 class 集合
 */
export const genButtonRadiusClass = (radius: string): string[] => {
    const _radius = (radius || "").toLowerCase();
    return [
        RADIUS.includes(_radius as Radius) ? `button-radius-${ _radius }` : "",
    ];
};

export const genButtonRadiusStyle = (radius: string | number): RadiusStyle[] => {
    const _radius = ("" + radius).toLowerCase();
    return [
        RADIUS.includes(_radius as Radius) || !_radius ? {} : getRadius(radius)
    ];
};

/**
 * @description 根据按钮的各种动画 <Animation> 生成指定的 class 集合
 */
export const genButtonAnimationClass = (props: ExtractPropTypes<ButtonPropsType>): string[] => {
	if (props.disabled || props.loading) return [];
    return [
		ANIMATIONS.includes(props.animation as Animation) ? `button-animation-${ props.animation }` : "",
    ];
};

/**
 * @description 根据按钮的加载相关 <Loading> 生成指定的 class 集合
 */
export const genButtonLoadingClass = (props: ExtractPropTypes<ButtonPropsType>): string[] => {

    return [
    ];
};

export type ColorStyle = {
    "background-color"?: string,
    "color"?: string,
    "border-color"?: string,
    "border"?: string
}
export const genColorStyle = (props: ExtractPropTypes<ButtonPropsType>): ColorStyle[] => {
    const style: ColorStyle = {};
    const { color, bg, plain } = props;
    if (bg) {
        style["background-color"] = bg;
        if (plain) {
            style["background-color"] = "transparent";
            style["border-color"] = bg;
            style["color"] = bg;
        }
        else style["border"] = "none";
    }
    if (color) style["color"] = color;
    return [
        style
    ];
}
