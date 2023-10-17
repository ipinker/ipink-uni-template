import { createSSRApp } from "vue";
import App from "./App.vue";
import "./static/icon/iconfont.css";
import store, { Pinia } from "./store";
import I18n from "@/common/locale/index"
import {addInterceptorForRequest} from "@/common/request";
export function createApp() {
    const app = createSSRApp(App);
    app.use(store);
    app.mixin({

    })
    app.use(I18n);
	// 防止其他.start
    try {
        app.config.globalProperties.$t = I18n.global.t;
        app.config.globalProperties.$system = uni.getSystemInfoSync();
    } catch (e) {
        console.log("uni.getSystemInfoSyn.error : " + e);
    }
    addInterceptorForRequest();
	// to do something...


	// end
    return {
        app,
        Pinia // 此处必须将 Pinia 返回
    };
}
