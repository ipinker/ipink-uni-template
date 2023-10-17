
/**
 * @description  Button的种类
 */
export const buttonTypes = [
    "default",
    "primary",
    "success",
    "warning",
    "info",
    "danger",
    "text",
    "dashed",
    "text",
    "link",
    ""
] as const;
export type ButtonType = (typeof buttonTypes) [number];

/**
 * @description 按钮的功能类型, 可以是普通的按钮, 也可以是赋予特殊功能的按钮(uniapp)
 */
export const buttonNativeTypes: string[] = [ 'button', 'reset', 'submit', '' ];

/**
 * @description 按钮的动画效果, default == "ripple"
 */
export const animationTypes: string[] = [
    // 水波纹效果
    "", "default", "ripple",
    // 透明度效果
    "opacity",
    // 渐变
    "gradient",
    // 字体色颜色转换
    "color",
    // 背景色转换
    "background",
    // 边框颜色
    "borderColor",
    // 边框环绕
    "surround",
];

/**
 * @description Button的属性
 */
export const buttonProps = {
    /**
     * @description 尺寸: "width,height" | "small"
     */
    size: {
        type: String,
        default: "normal"
    },
    /**
     * @description 圆角
     */
    radius: {
        type: String,
        default: ""
    },
    /**
     * @description 按钮的类型 ButtonTypes
     */
    type: {
        type: String,
        default: "default"
    },
    primary: Boolean,
    success: Boolean,
    warning: Boolean,
    info: Boolean,
    danger: Boolean,
    block: Boolean,
    /**
     * @description 跳转能力
     */
    navigateType: {
        type: String,
        default: "default"
    },
    /**
     * @description 是否禁用
     */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * @description 图标按钮, 可以是iconfont.cn, 可以是 本地资源链接
     * 注意: 仅图标不要传入其他的节点文字等, 仅文字图标,此项亦不需要传入
     */
    icon: {
        type: String,
        default: ""
    },
    /**
     * @description 是否开启loading功能
     */
    loading: Boolean,
    loadingIcon: {
        type: String,
        default: ""
    },
    /**
     * @description it`s a dashed border button
     */
    dashed: Boolean,
    /**
     * @description it`s a plain button
     */
    plain: Boolean,
    /**
     * @description it`s a text button
     */
    text: Boolean,
    /**
     * @description it`s a link button
     */
    link: Boolean,
    /**
     * @description Button`s background color
     */
    bg: String,
    /**
     * @description Button`s font color
     */
    color: String,
    /**
     * @description it`s a round button
     */
    round: Boolean,
    /**
     * @description it`s a round button
     */
    animation: String,
    /**
     * @description 动画的辅助参数, 例如色彩值, 渐变值, 透明值等
     */
    animationAssist: String,
    /**
     * @description 按钮激活样式类
     */
    activeClass: String,

} as const;

export type ButtonPropsType = typeof buttonProps;