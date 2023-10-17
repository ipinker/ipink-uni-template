import {ApiMap} from "@/types";


const commonApi: ApiMap = {
	// 获取配置列表
	"Config": {
		api: "/public/config/list",
		method: "GET"
	},
	// 登录
	"Login": {
		api: "/public/login",
		method: "POST"
	},
	// 注册用户
	"Register": {
		api: "/public/register",
		method: "POST"
	},
	// 发送邮箱验证码
	"SendMailCode": {
		api: "/code/sendMailCode",
		method: "POST"
	},
	// 获取图片验证码
	"GetImgCode": {
		api: "/code/getImgCode",
		method: "GET"
	},
	// 获取图片验证码
	"VerifyImgCode": {
		api: "/code/verifyImgCode",
		method: "GET"
	},
	// 获取应用版本信息
	"GetAPPVersion": {
		api: "/public/version",
		method: "GET"
	},
	// Demo
	// file type demo
	"DownloadExcel": {
		api: "/public/file/download",
		method: "GET",
		type: "FILE"
	}
} as const;

export type CommonApi = typeof commonApi;

export default commonApi;
