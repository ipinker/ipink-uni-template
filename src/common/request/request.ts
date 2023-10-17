/**
 * @description Http 请求, 仅适用于Uniapp, 其他平台自行分装
 */
import {Api, ApiExt, PlanXhrResponse, RequestParam, Response, XhrResponse} from "@/types";
import {toast} from "@/common/utils/toast";
import { REQUEST_URL } from "../config/index";
import {REQUEST_ERR_MSG, REQUEST_TIMEOUT} from "@/common/constant";
import GeneralCallbackResult = UniNamespace.GeneralCallbackResult;


let showModal: boolean = false;
export const ajax = (
    baseConfig: Api, params: RequestParam, superConfig: ApiExt={}
): Promise<Response> => {
	let config: Api = {
		...baseConfig,
		...superConfig,
		header: {
			... (baseConfig.header || {}),
			... (superConfig.header || {}),
		}
	}
	let {
		api,
		method,
		useLoading = false,
		loadingText,
		useToast = true,
		errMsg = "",
		header,
		type = ""
	} = config;
	if (!api) return Promise.resolve({ok: false});
	if (useLoading) {
		uni.showLoading({
			mask: true,
			title: loadingText || "加载中"
		})
	}
	return new Promise((reslove) => {
		const request = {
			url: REQUEST_URL + api,
			method: method || 'GET',
			timeout: REQUEST_TIMEOUT,
			data: params || {},
			header: header,
			success: (res: UniApp.RequestSuccessCallbackResult) => {
				let ok = false;
				let data: XhrResponse = res.data as XhrResponse;
				let _data: PlanXhrResponse = res?.data as PlanXhrResponse;
				if(res.statusCode !== 200){
					hanldeExceptionForResponse(res.statusCode, _data?.msg)
				}
				// Http 的请求响应 OK
				else if(res.statusCode === 200 && "FILE" === type){
					 ok = true;
				}
				else {
					// 如果有内部状态码, 且内部状态吗的值为约定的OK值
					ok = _data.code == 1;
					if (!ok && useToast) {
						setTimeout(() => {
							toast(_data?.msg || "参数错误");
						})
					}
				}
				let response: Response = { ok };
				if ("FILE" !== type) response = { ... response, ... _data };
				else response.data = data;
				reslove(response);
			},
			fail: (err: GeneralCallbackResult) => {
				if (useToast) toast(errMsg || err?.errMsg);
				reslove({
					ok: false,
					err
				});
			},
			complete: () => {
				if (useLoading) {
					setTimeout(() => {
						uni.hideLoading()
					}, 50)
				}
			}
		}
		uni.request(request);
	})
};

// 401 需在再次授权弹框
export const authModal = () => {
	if(!showModal){
		showModal = true;
		let confirmText: string = "前去登录";
		// #ifdef MP
		confirmText = "前去授权";
		// #endif
		uni.showModal({
			title: "温馨提示",
			content: "尊敬的用户, 您还没有登录噢!, 请先登录",
			cancelText: "我再看看",
			confirmText,
			success: (r) => {
				showModal = false;
				if(r.confirm){
					// #ifdef MP
					// 小程序的处理方式
					// #endif
					// 其他的前往登录页
					// #ifndef MP
					uni.redirectTo({
						url: "/pages/login/index"
					})
					// #endif
				}
			}
		})
	}
}

// 其他异常的自行处理, 或者根据自己的业务需求再次编写
export function hanldeExceptionForResponse (statusCode: number, msg?: string | null) {
	switch (statusCode) {
		case 401:
			authModal();
			// to do something ..
			break;
		case 403:
			authModal();
			// to do something ..
			// 或者你可能需要在403重新进行token授权, 可以再此编写
			break;
		default:
			toast(msg || REQUEST_ERR_MSG);
			break;
	}
}