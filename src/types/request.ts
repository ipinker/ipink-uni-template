export type Method = "POST" | "GET" | "DELETE" | "PUT";

export interface ApiExt {
    useLoading?: boolean, // 使用 Loading
    useToast?: boolean,   // 异常状态是否弹出错误信息
    loadingText?: string,
    errMsg?: string,
    header?: any
}

export interface Api extends ApiExt{
    api: string,
    method: Method,
    description?: string,
    type?: string
}

export interface ApiMap {
    [key : string] : Api
}

export interface RequestParam {
    [key: string] : any;
}
// Response 响应
export type FileXhrResponse =  ArrayBuffer;
export interface PlanXhrResponse {
    code: number,
    data: any,
    msg?: string | null
}
export type XhrResponse = FileXhrResponse | PlanXhrResponse;
export type Response = { ok: boolean } & RequestParam;