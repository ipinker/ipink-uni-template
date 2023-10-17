import {ApiMap} from "@/types";


const billApi: ApiMap = {
	// 获取配置列表
	"BillList": {
		api: "/bill/list",
		method: "POST"
	}
} as const;

export type BillApi = typeof billApi;

export default billApi;