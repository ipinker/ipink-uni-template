
type Num = number | string;

type ComparatorKeys = '<' | '<=' | '>' | ">=";
const comparator = {
    '<': (a: Num, b: Num): boolean => a < b,
    '<=': (a: Num, b: Num): boolean => a <= b,
    '>': (a: Num, b: Num): boolean => a > b,
    '>=': (a: Num, b: Num): boolean => a >= b
};
// 对比版本号是否一致
export const compareVersion = (version: Num, range: Num): boolean => {
	const string = range + '';
	const n: number = +(string.match(/\d+/) || NaN);
    const matchStr: Array<string> = string.match(/^[<>]=?|/) || [];
	const op : ComparatorKeys = matchStr[0] as ComparatorKeys;
	return comparator[op] ? comparator[op](version, n) : (version == n || n !== n);
}


type NavigatorType = {
	platform?: string,
	userAgent?: string,
	vendor?: string,
	onLine?: boolean
};

/* -------------------------------------------------------------------------- */
/* 全平台判断 [ 仅限 Uniapp 内使用 ] */
// 是否为 IOS 设备
export const isIos = (): boolean => {
	const SystemInfo = uni.getSystemInfoSync();
	if (SystemInfo.platform) return SystemInfo.platform.toLowerCase().indexOf("ios") > -1;
	if (SystemInfo.osName) return SystemInfo.osName.toLowerCase().indexOf("ios") > -1;
	if (SystemInfo.system) return SystemInfo.system.toLowerCase().indexOf("ios") > -1;
	return false;
};
// 是否为安卓设备
export const isAndroid = (): boolean => {
	const SystemInfo = uni.getSystemInfoSync();
	if (SystemInfo.platform) return SystemInfo.platform.toLowerCase().indexOf("android") > -1;
	if (SystemInfo.osName) return SystemInfo.osName.toLowerCase().indexOf("android") > -1;
	if (SystemInfo.system) return SystemInfo.system.toLowerCase().indexOf("android") > -1;
	return false;
};
//是否为小程序环境
export const isMini = (): boolean => {
	// #ifdef H5
	const navigator: NavigatorType = window.navigator;
	if (
		navigator && navigator.userAgent &&
		(navigator.userAgent.indexOf("Mini") > -1 || navigator.userAgent.indexOf('mini') > -1)
	) return true;
	else return false;
	// #endif
	// #ifdef MP
	return true
	// #endif
	// #ifndef MP
	return false;
	// #endif
}

/* -------------------------------------------------------------------------- */
/* H5 平台判断集合 */
// #ifdef H5
// 是否为 window 全局对象
export const isWindowObject = (value: object): boolean => value !== null && typeof value === 'object' && 'setInterval' in value;
const myself: Window = self || window;
const freeSelf: boolean = isWindowObject(myself);
const navigator: NavigatorType = freeSelf ? myself.navigator : {};
const platform: string = (navigator && navigator.platform || '').toLowerCase();
const userAgent: string = (navigator && navigator.userAgent || '').toLowerCase();
const vendor: string = (navigator && navigator.vendor || '').toLowerCase();
// Opera
export const isOpera = (range?: Num): boolean => {
	const match: Array<Num> = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/) as Array<Num>;
	return match !== null && (range ? compareVersion(match[1], range) : true);
};
// Opera Mini
export const isOperaMini = (range?: Num): boolean => {
	const match: Array<Num> = userAgent.match(/opera mini\/(\d+)/) as Array<Num>;
	return match !== null && (range ? compareVersion(match[1], range) : true);
};
// Chrome
export const isChrome = (range?: Num): boolean => {
	const match: Array<Num> = (/google inc/.test(vendor) ? userAgent.match(/(?:chrome|crios)\/(\d+)/) : []) as Array<Num>;
	return match !== null && (range ? compareVersion(match[1], range) : true);
};
// FireFox
export const isFirefox = (range?: Num): boolean => {
	const match: Array<Num> = userAgent.match(/(?:firefox|fxios)\/(\d+)/) as Array<Num>;
	return match !== null && (range ? compareVersion(match[1], range) : true);
};
// Edge
export const isEdge = (range?: Num): boolean => {
	const match: Array<Num> = userAgent.match(/edge\/(\d+)/) as Array<Num>;
	return match !== null && (range ? compareVersion(match[1], range) : true);
};
// IE
export const isIe = (range?: Num): boolean => {
	const match: Array<Num> = userAgent.match(/(?:msie |trident.+?; rv:)(\d+)/) as Array<Num>;
	return match !== null && (range ? compareVersion(match[1], range) : true);
};
// 苹果浏览器
export const isSafari = (range?: Num): boolean => {
	const match: Array<Num> = userAgent.match(/version\/(\d+).+?safari/) as Array<Num>;
	return match !== null && (range ? compareVersion(match[1], range) : true);
};
// ipad
export const isIpad = (range?: Num): boolean => {
	const match: Array<Num> = userAgent.match(/ipad.+?os (\d+)/) as Array<Num>;
	return match !== null && (range ? compareVersion(match[1], range) : true);
};
// iphone
export const isIphone = (range?: Num): boolean => {
	const match: Array<Num> = (isIpad() ? [] : userAgent.match(/iphone(?:.+?os (\d+))?/)) as Array<Num>;
	return match !== null && (range ? compareVersion(match[1], range) : true);
};
// ipod
export const isIpod = (range?: Num): boolean => {
	const match: Array<Num> = userAgent.match(/ipod.+?os (\d+)/) as Array<Num>;
	return match !== null && (range ? compareVersion(match[1], range) : true);
};
// windows 浏览器
export const isWindows = (): boolean => /win/.test(platform);
// mac 下的浏览器
export const isMac = (): boolean => /mac/.test(platform);
// linux 下的浏览器
export const isLinux = (): boolean => /linux/.test(platform) && !isAndroid();
// 是否为安卓下的 H5
export const isAndroidH5 = (): boolean => /android/.test(userAgent);
// windowsPhone 的 H5
export const isWindowsPhone = (): boolean => isWindows() && /phone/.test(userAgent);
// 是否为安卓 手机移动设备
export const isAndroidPhone = (): boolean => /android/.test(userAgent) && /mobile/.test(userAgent);
// 是否为黑莓手机
export const isBlackberry = (): boolean => /blackberry/.test(userAgent) || /bb10/.test(userAgent);
// 是否为安卓平板电脑
export const isAndroidTablet = (): boolean => /android/.test(userAgent) && !/mobile/.test(userAgent);
// 是否为 手机客户端, 不包括平板
export const isMobile = (): boolean => isIphone() || isIpod() || isAndroidPhone() || isBlackberry() || isWindowsPhone();
// 是都在线
export const isOnline = (): boolean => !navigator || navigator.onLine === true;
// 是否离线
export const isOffline = (): boolean => !(!navigator || navigator.onLine === true);
// #endif

/* -------------------------------------------------------------------------- */
/**** 数据类型判断 ****/
// 是否为字符串
export const isString = (str: unknown): boolean => typeof str === "string" || Object.prototype.toString.call(str) === "[object String]";
// 是否为数组
export const isArray = (arr: unknown): boolean => Object.prototype.toString.call(arr) === "[object Array]";
// 是否是一个普通对象
export const isObject = (obj: unknown): boolean => Object.prototype.toString.call(obj) === "[object Object]";
// 是否为 JSON 对象
export const isJson = (obj: unknown): boolean => isArray(obj) || isObject(obj);
// 是否为 Module
export const isModule = (obj: unknown): boolean => Object.prototype.toString.call(obj) === "[object Module]";
// 是否为函数
export const isFunc = (func: unknown): boolean => Object.prototype.toString.call(func) === "[object Function]" || typeof func === 'function';
// 是否为布尔值
export const isBoo = (boo: unknown): boolean => Object.prototype.toString.call(boo) === "[object Boolean]";
// 是否为 Char 类型
export const isChar = (char: unknown): boolean => typeof char === 'string' && char.length === 1;
// 是否为  Dom 对象
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const isDom = (dom: unknown): boolean => isObject(dom) && dom.nodeType > 0;
// 是否为 错误异常 对象
export const isError = (error: unknown): boolean => Object.prototype.toString.call(error) === "[object Error]";
// 是否为 NaN
export const isNaN = (value: unknown): boolean =>  Number.isNaN(value);
// 是否为 null
export const isNull = (value: unknown, checkString = false): boolean => (checkString ? value === "null" : false) || (value === null);
// 是都为 数字
export const isNumber = (num: unknown): boolean => typeof num === "number" ||  Number.isFinite(num);
// 是否为 undefined
export const isUndefined = (value: unknown, checkString = false) => (checkString ? value === "undefined" : false) || (value === void 0);
// 是否为偶数
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const isOdd = (num: unknown): boolean => isNumber(num) && (num % 2 === 1 || num % 2 === -1);
// 是否为正则对象
export const isRegexp = (error: unknown): boolean => Object.prototype.toString.call(error) === "[object RegExp]";
// 是否为 日期对象
export const isDate = (date: unknown): boolean => Object.prototype.toString.call(date) === "[object Date]";

/* -------------------------------------------------------------------------- */
/* 对象处理 */
export const isInArray = (value: unknown, array = []): boolean => {
	if (!isArray(array)) return false;
	let has = false;
	for (let i = 0; i < array.length; i++) {
		if (array[i] === value) {
			has = true;
			break;
		}
	}
	return has;
};

export const isInObject = (key: string, object: object): boolean => isObject(object) && Object.prototype.hasOwnProperty.call(object, key);

/* -------------------------------------------------------------------------- */
/* 日期处理 */
// 是否未来
export const isFuture = (date: Date): boolean => isDate(date) && date.getTime() > new Date().getTime();
// 是否今年
export const isYear = (date: Date, year: number): boolean => isDate(date) && isNumber(year) && year === date.getFullYear();
// 是否今月
export const isMonth = (date: Date,  month: number) => isDate(date) && isNumber(month) && month === date.getMonth() + 1;
// 是否周末
// 6: Saturday, 0: Sunday
export const isWeekend = (date: Date): boolean => isDate(date) && (date.getDay() === 6 || date.getDay() === 0);
// 是否明天
export const isTomorrow = (date: Date): boolean => {
	const now = new Date();
	const tomorrowString = new Date(now.setDate(now.getDate() + 1)).toDateString();
	return isDate(date) && date.toDateString() === tomorrowString;
};
// 是否今天
export const isToday = (date: Date): boolean => {
	const todayString = new Date().toDateString();
	return isDate(date) && date.toDateString() === todayString;
};
// 是否昨天
export const isYesterday = (date: Date): boolean => {
	const now = new Date();
	const yesterdayString = new Date(now.setDate(now.getDate() - 1)).toDateString();
	return isDate(date) && date.toDateString() === yesterdayString;
};
/* -------------------------------------------------------------------------- */
/* 逻辑空值处理 */

// 是否为空值
export const isEmpty = (obj: any, trim = false): boolean => {
	let empty = false;
	if(
		isNull(obj, true) ||
		isUndefined(obj, true) ||
		(isString(obj) && obj === "") ||
		(isString(obj) && trim && obj.trim() === "")
	) empty = true;
	else empty = false;
	return empty;
}

// 是否为空对象
export const isEmptyObject = (obj: any, trim = false, deep = false): boolean => {
	let empty = false;
	// 假值
	if (isEmpty(obj, trim)) empty = true;
	// 数组且没长度
	else if (isArray(obj) && !obj.length) empty = true;
	// 数组长度不为 0, 但内容全是假值
	else if (isArray(obj) && obj.length && !(obj.filter((item: any) => !isEmpty(item, trim)).length)) empty = true;
	// 对象且, 属性全部假值
	else if (isObject(obj)) {
		const result: any[] = Object.values(obj).filter((item: any) => {
			if(isObject(item) && deep){
				if(!isEmptyObject(item, trim, deep)) return item;
			}
			else if (isArray(item) && deep) {
				if (item.length) return item;
			}
			else if (!isEmpty(item, trim)) return item;
		});
		empty = !result.length;
	}
	else empty = false;
	return empty;
};


/* -------------------------------------------------------------------------- */
/* 字符串处理 */
// 是否是一个 json 字符串
export const isJsonString = (string: string) : boolean => {
	if (!string || !isString(string)) return false;
	try {
		return typeof JSON.parse(string as string) == 'object';
	} catch (e) {
		return false;
	}
}
// 是否小写
export const isLowerCase = (str: string) : boolean => isString(str) && str === str.toLowerCase();
// 是否大写
export const isUpperCase = (str: string) : boolean => isString(str) && str === str.toUpperCase();
// 是否为单词字符串
export const isWords = (str: string) : boolean => isString(str) && /^\w*$/.test(str);
// 是否为英文字符串
export const isLetters = (str: string) : boolean => isString(str) && /^[a-zA-Z]*$/.test(str);
// 是否为日期字符串
export const isDateString = (dateString: string) : boolean => isString(dateString) && /^(1[0-2]|0?[1-9])([\/-])(3[01]|[12][0-9]|0?[1-9])(?:\2)(?:[0-9]{2})?[0-9]{2}$/.test(dateString as string);
// 是否为时间字符串
export const isTimeString = (timeString: string) : boolean => isString(timeString) && /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/.test(timeString as string);
// 是否为座机
export const isTel = (tel: unknown, telType?: number) : boolean => {
	if(typeof tel === "string"){
		telType = (telType == 1 || telType == 2 || telType == 3 || telType == 4 || false) ? telType : 3;
		const T = telType == 1 ? /^\d{7,8}$/ :
			telType == 2 ? /^\d{7,8}-\d{1,6}$/ :
			/^\d{7,8}(-\d{1,6})?$/;
		const T2 = telType == 1 ? /^0\d{2,3}(-)?\d{7,8}$/ :
			telType == 2 ? /^0\d{2,3}(-)?\d{7,8}-\d{1,6}$/ :
			/^0\d{2,3}(-)?\d{7,8}(-\d{1,6})?$/;
		const P = /^1[3,4,5,6,7,8,9]\d{9}$/;
		return telType == 4 ? (T.test(tel) || T2.test(tel) || P.test(tel)) : (T2.test(tel) || T.test(tel));
	}
	return false;
};

// 是否为手机号
export const isPhone = (phone: string): boolean => isString(phone) && /^1[3,4,5,6,7,8,9]\d{9}$/.test(phone);
// 是否为邮箱
export const isEmail = (email: string) : boolean => {
	if (isEmpty(email) || !isString(email)) return false;
	const regStr = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
	return regStr.test(email);
}

// 是否是身份证
export const isIdCard = (code: string): boolean => {
	code = code.toString();
	const city = {
		11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
		21: "辽宁", 22: "吉林", 23: "黑龙江 ",
		31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
		41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南",
		50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ",
		61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆",
		71: "台湾",
		81: "香港", 82: "澳门",
		91: "国外"
	} as const;
	type CityType = keyof (typeof city);

	// 身份证号格式错误
	if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) return false;
	// 地址编码错误
	const cityCode: CityType = +code.substr(0, 2) as CityType;
	if (!city[cityCode]) return false;
	if (code.length == 18) {
		const sBirthday = code.substr(6, 4) + "-" + Number(code.substr(10, 2)) + "-" + Number(code.substr(12, 2));
		const d = new Date(sBirthday.replace(/-/g, "/"));
		// 非法生日
		if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return false;
	}
	//18位身份证需要验证最后一位校验位
	if (code.length == 18) {
		const codes: string[] = code.split('');
		//∑(ai×Wi)(mod 11)
		//加权因子
		const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
		//校验位
		const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
		let sum: Num = 0, ai: Num = 0, wi: Num = 0, i: Num = 0;
		for (; i < 17; i++) {
			ai = codes[i];
			wi = factor[i];
			sum += (+ai) * (+wi);
		}
		const last = parity[sum % 11];
		const cardLastChar = codes[17].toUpperCase();
		// 校验位错误
		if (last != cardLastChar)  return false;
	}
	return true;
};

// 是否为 IP
export const isIp = (ip: string): boolean => /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/.test(ip);
// 是否为 IPv6
export const isIpv6 = (ip: string): boolean => /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i.test(ip);
export const isUrl = (url: string): boolean => /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(url);
/* -------------------------------------------------------------------------- */

/* 判断版本是否大于目标版本 => 1.0.0 1.0.1 */
export const isMaxVersion = (current: string, old: string): boolean => {
	const v1Array: string[] = current.split('.');
	const v2Array: string[] = old.split('.');
	let update = false
	for (let index = 0; index < v2Array.length; index++) {
		const diff = (+v1Array[index]) - (+v2Array[index]);
		if (diff !== 0) {
			update = diff > 0;
			break;
		}
	}
	return update;
}
