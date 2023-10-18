/**
 * Ajax 请求
 * @Author: Gavin New
 * @Create: 23/10/17 19:56:45
 */
import { Response } from "@/types"
import ApiMap, { ApiType } from "./api";
import { ajax } from "./request";
import {ApiExt, RequestParam} from "@/types";

export type RequestFunc = (params: RequestParam, config?: ApiExt) => Promise<Response>;

export type RequestMap = {
    [ key: keyof ApiType]: RequestFunc
}

const Request: RequestMap = {};
Object.keys(ApiMap).forEach(item => {
	Request[item] = (params: RequestParam, config?: ApiExt) => ajax(ApiMap[item], params, config);
});

// 请求拦截器
export const addInterceptorForRequest = () => {
	let token = uni.getStorageSync("AppToken");
	uni.addInterceptor('request', {
		invoke(args) {
			if(token) args.header && (args.header.Authorization = "Bearer " + token);
		}
	})
	// 设置上传文件请求头
	uni.addInterceptor('uploadFile', {
		invoke(args) {
			if(token) args.header && (args.header.Authorization = "Bearer " + token);
		}
	})
}
// 移除请求拦截器
export const removeInterceptorForRequest = () => {
	uni.removeInterceptor('request');
	uni.removeInterceptor('uploadFile');
}

export default Request;
