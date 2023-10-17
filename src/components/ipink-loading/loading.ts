import {PropType} from "vue";

/**
 * @description  Button的种类
 */
export const loadingTypes = [
    "default",
    ""
] as const;
export type LoadingType = (typeof loadingTypes) [number];


/**
 * @description Loading的属性
 */
export const loadingProps = {
    size: {
        type: [String, Number] as unknown as PropType<[string , number]>,
        default: ""
    },
    type: {
        type: String,
        default: "default"
    },
    color: {
        type: String,
        default: ""
    },
    duration: {
        type: [String, Number] as unknown as PropType<[string , number]>,
        default: 0.85
    }

} as const;

export type LoadingPropsType = typeof loadingProps;