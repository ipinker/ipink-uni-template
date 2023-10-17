import {ApiMap} from "@/types";


const commonApi: ApiMap = {
	// 获取配置列表
	"Config": {
		api: "/public/config/list",
		method: "GET"
	},

	"DownloadExcel": {
		api: "/public/file/download",
		method: "GET",
		type: "FILE"
	}
} as const;

export type CommonApi = typeof commonApi;

export default commonApi;