// #ifdef APP
import {IMEIType} from "@/types";

export const getIMEI_MAC = (): Promise<IMEIType> => {
	return new Promise((resolve) => {
		let mac: string, mac2: string;
		const deviceId: string = uni.getDeviceInfo()?.deviceId;
		const IMEI: string = plus.device.imei || "";
		try{
			// 导入Java类。Networklnterface类表示一个由名称和分配给此接口的IP地址列表组成的网络接口
			const net: any = plus.android.importClass('java.net.NetworkInterface');
			// 搜索具有指定名称的网络接口
			const wlan0 = net.getByName('wlan0');
			// 获得网卡的硬件地址
			const macByte = wlan0.getHardwareAddress();
			//转换MAC地址的思路来自网上(https://blog.csdn.net/zhangzhen53377562/article/details/109183891)
			macByte.forEach((item: number): void => {
				// .toString(16)数字以十六进制值显示
				let temp: string = '';
				if (item < 0) temp = (256 + item).toString(16);
				else temp = item.toString(16);
				if (temp.length == 1) temp = `0${temp}`;
				mac += temp;
			});
			// @ts-ignore
            mac = mac.toUpperCase();
			mac2 = mac;
			for (let i = 2; i < mac2.length; i += 3) mac2 = mac2.slice(0, i) + ':' + mac2.slice(i);
		}catch(e){
		}

		plus.device.getInfo({
			success(e) {
				resolve({
					deviceId: deviceId,
					IMEI: e.imei || IMEI || e.uuid,
					MAC: mac,
					MAC2: mac2
				})
			},
			fail(e) {
				resolve({
					deviceId: deviceId,
					IMEI: IMEI,
					MAC: mac,
					MAC2: mac2
				})
			}
		});
	});
}
// #endif
