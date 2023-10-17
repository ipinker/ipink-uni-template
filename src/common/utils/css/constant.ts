
export const SIZES = ["small", "normal", "big"] as const;
export type Size = (typeof SIZES)[number];

export const STATUS = ["success", "warning", "danger"] as const;
export type Status = (typeof STATUS)[number];

/**
 * @description 两个平台  pc 未使用uniapp的vue3 , uniapp环境
 */
export const PLATFORMS = [ "pc", "uniapp" ] as const;
export type Platform = (typeof PLATFORMS)[number];

export const RADIUS = [ "", "default", "xs", "sm", "lg" ] as const;
export type Radius = (typeof RADIUS)[number];

export const BORDER_DIR = ["", "top", "bottom", "left", "right"] as const ;
export type BorderDir = (typeof BORDER_DIR)[number];

export const ANIMATIONS = [ "", "opacity", "default", "ripple" ] as const;
export type Animation = (typeof ANIMATIONS)[number];
