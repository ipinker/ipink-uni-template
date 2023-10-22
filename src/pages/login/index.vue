<template>
	<i-page class="page">
		<i-navigation-bar title="登录" />

		<view class="login">
			<view class="active-light changeLoginMode" @click="mode='password'" v-if="mode != 'password'">
				<text class="iconfont icon-shujuzhuanhuan"></text>密码登录
			</view>
			<block v-if="mode == 'password'">
				<view class="login-item">
					<view class="login-item-label">账号</view>
					<input class="login-item-con" :placeholder-style="placeholderStyle" placeholder="请输入账号/手机号/邮箱" v-model="username"/>
				</view>
				<view class="login-item">
					<view class="login-item-label">密码</view>
					<input class="login-item-con" :placeholder-style="placeholderStyle" placeholder="请输入密码" password v-model="password" />
				</view>
				<view class="login-item">
					<view class="login-item-label">验证码 </view>
					<input class="login-item-con" :placeholder-style="placeholderStyle" placeholder="请输入验证码" v-model="imgCode" />
				    <view class="login-item-sign" @click="changeImgCode"> <image :src="codeImg" alt=""/> </view>
				</view>
				<view class="rememberPassword">
					<i-check v-model="rememberPassword" @change="rememberPasswordChange">记住密码</i-check>
				</view>
			</block>
			<block v-if="mode == 'email'">
				<view class="login-item">
					<view class="login-item-label">邮箱</view>
					<input class="login-item-con" :placeholder-style="placeholderStyle" placeholder="请输入邮箱" v-model="email"/>
				</view>
				<view class="login-item">
					<view class="login-item-label">验证码 </view>
					<input class="login-item-con" :placeholder-style="placeholderStyle" placeholder="请输入验证码"  v-model="code" />
				    <view class="login-item-sign smscode" :class="[{'active-light': currentCodeSecond==0}]" @click="sendEmailCode()">{{sendText}}</view>
				</view>
			</block>
			<block v-if="mode == 'sms'">
				<view class="login-item">
					<view class="login-item-label">手机号</view>
					<input class="login-item-con" :placeholder-style="placeholderStyle" placeholder="请输入手机号" v-model="phone"/>
				</view>
				<view class="login-item" >
					<view class="login-item-label">验证码 </view>
					<input class="login-item-con" :placeholder-style="placeholderStyle" placeholder="请输入验证码"  v-model="code" />
				    <view class="login-item-sign smscode" :class="{'active-light': currentCodeSecond==0}" @click="sendEmailCode('SendSMSCode')">{{sendText}}</view>
				</view>
			</block>
			<view class="agreeProcotol">
				<i-check v-model="agree">
					我同意<text @click="goProtocol('privacy')">《隐私协议》</text
					>与<text @click="goProtocol('server')">《服务协议》</text>
				</i-check>
			</view>

			<i-space height="40"/>
			<i-button @click="login" size="big" type="primary">登录</i-button>
		</view>

		<view class="forget abs-bottom forget_register_pub" @click="forgot">
			<text class="iconfont icon-xiangzuo1"></text>
			<text>忘记密码</text>
		</view>

		<view class="register abs-bottom forget_register_pub" @click="register" >
			<text>前往注册</text>
			<text class="iconfont icon-xiangyou"></text>
		</view>

		<view class="login-other abs-bottom ">
			<!-- #ifdef APP -->
			<image @click="loginForOther('qq')" src="../../static/img/QQ.png" />
			<image @click="loginForOther('sms')" src="../../static/img/sms.png" />
			<image @click="loginForOther('email')" src="../../static/img/email.png" />
			<image @click="loginForOther('wx')" src="../../static/img/wx.png" />
			<view class="iconfont icon-zhiwenjiesuo" @click="loginForOther('print')" v-if="showFingerPrint"></view>
			<!-- <image @click="loginForOther('ali')" src="../../static/img/ali.png" /> -->
			<!-- <image @click="loginForOther('apple')" src="../../static/img/apple.png" /> -->
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<image @click="loginForOther('mini')" src="../../static/img/wx.png" />
			<!-- #endif -->
			<!-- #ifdef MP -->
			<image @click="loginForOther('sms')" src="../../static/img/sms.png" />
			<image @click="loginForOther('email')" src="../../static/img/email.png" />
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<!-- <image @click="loginForOther('wxh5')" src="../../static/img/wx.png" /> -->
			<!-- <image @click="loginForOther('qqh5')" src="../../static/img/QQ.png" /> -->
			<image @click="loginForOther('sms')" src="../../static/img/sms.png" />
			<image @click="loginForOther('email')" src="../../static/img/email.png" />
			<!-- #endif -->
		</view>
		<view class="login-one-key abs-bottom" v-if="showOnekeyLogin">
<!--			<i-button @click="loginForOther('onekey')" classes="primary big">一键登录</i-button>-->
		</view>
	</i-page>
</template>

<script setup lang="ts" >
import {computed, ComputedRef, ref, Ref} from "vue";
import {
    checkCanUseOneKeyLogin
} from "@/common/utils/login";
import R from "@/common/request";
import { genUuid } from "@/common/utils/gen"

import {isEmail, isPhone} from "@/common/utils/isUtil"
// #ifdef APP
import { getIMEI_MAC } from "@/common/utils/get"
// #endif
import { toast } from "@/common/utils/toast";
import { useUserStore } from "@/store/user";
import { useTheme } from "@/common/hooks/useTheme";
import {onLoad} from "@dcloudio/uni-app";
import {IMEIType} from "@/types";

const userStore = useUserStore();
const { theme } = useTheme();
console.log(theme)
const containerBg = computed(() => theme.value?.colorBgContainer);
const linkColor = computed(() => theme.value?.colorLink);
const borderColor = computed(() => theme.value?.colorBorderSecondary);
const pageBg = computed(() => theme.value?.colorPrimaryBg);
const labelColor = computed(() => theme.value?.colorGrayText);
const contentColor = computed(() => theme.value?.colorText)
const placeholderColor = computed(() => theme.value?.colorPlaceholderText);
const placeholderStyle = computed(() => `color: ${placeholderColor.value}`);
const primaryColor = computed(() => theme.value.colorPrimaryText)

let test = ref('0')
let userId: ComputedRef<string> = computed(() => userStore.userId);
let uuid: string  = genUuid();
let password: Ref<string> = ref("");
let username: Ref<string> = ref("");
let imgCode: Ref<string> = ref("");
let codeImg: Ref<string> = ref("");
let back: Ref<number> = ref(0);

let rememberPassword: Ref<boolean> = ref(true);
let agree: Ref<boolean> = ref(false); // 必须为false, 不然上架会被驳回
let showOnekeyLogin: Ref<boolean> = ref(false); // 显示 uniapp  APP 一键登录
let showFingerPrint: Ref<boolean> = ref(false); // 显示指纹登录
let IMEI: Ref<string> = ref(""); // 用来指纹登录的设备ID
// 登录模式
let mode: Ref<string> = ref("password");

// 验证码登录
let email:Ref<string> = ref("");
let phone:Ref<string> = ref("");
let code:Ref<string> = ref(""); // 验证码有效期: 60 * 60 s
let codeExpire: Ref<number> = ref( 1000 * 60 * 30);
let isSend: Ref<number> = ref(0); // 0: 未发送, 1: 已发送, 2: 发送失败, 3: 重新发送验证码,
let currentCodeSecond: Ref<number> = ref(0);
let timeId: Ref<any> = ref(null);

const sendText = computed(() => {
    let status = "发送验证码";
    if(isSend.value == 1) status = `（${currentCodeSecond.value}s）内有效`;
    if(isSend.value == 2) status = `重新发送`;
    if(isSend.value == 3) status = "重新发送";
    return status;
})
const startComputedSecond = () => {
    currentCodeSecond.value = codeExpire.value;
    timeId.value = setInterval(() => {
        currentCodeSecond.value --;
        if(currentCodeSecond.value <= 0){
            clearInterval(timeId.value);
            isSend.value = 3;
            currentCodeSecond.value = 0;
        }
    }, 1000)
};
const sendEmailCode = async (api = "SendMailCode") => {
    if(currentCodeSecond.value > 0) return;
    const isSms = api == "SendSMSCode";
    clearInterval(timeId.value);
    if(!isSms && !isEmail(email.value)) return toast("请输入正确的邮箱号码!");
    if(isSms && !isPhone(phone.value)) return toast("请输入正确的手机号码!");
    const res = await R[api](isSms ? {phone: phone.value} : {email: email.value});
    if (!res.ok) isSend.value = 2;
    if(res.ok){
        isSend.value = 1;
        codeExpire.value = res.data || codeExpire.value;
        startComputedSecond();
    }
}

const changeImgCode = async () => {
    const res = await R["GetImgCode"]({userId: uuid});
    console.log(res)
    codeImg.value = res.data;
}
const rememberPasswordChange = (e: boolean) => uni.setStorageSync("RememberPasswordStatus", e || false)

function loginForOther(type: string) {
    switch (type) {
        // 邮箱登录
        case "email":
            mode.value = "email"
            break;
        // 短信登录
        case "sms":
            mode.value = "sms";
            break;
        case "qqh5":
            // #ifdef H5
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9b244ffaa2d01031&redirect_uri=${encodeURIComponent("https://i.ipink.pink/#/pages/login/third")}&response_type=code&scope=snsapi_base&state=wx_h5_login#wechat_redirect`
            // #endif
            break;
        // 指纹登录
        case "print":
        // 一键登录
        case "onekey":
        // 微信小程序登录
        case "mini":
        // 微信APP登录
        case "wx":
        // 微信H5
        case "wxh5":
        // QQAPP登录
        case "qq":
        // 支付宝APP
        case "ali":
        case "apple":
        default:
            toast("暂未开放!");
            break;
    }
}
function forgot() {
    uni.navigateTo({
        url: "/pages/login/forget"
    })
}
function register () {
    uni.navigateTo({
        url: "/pages/login/register"
    })
}

function goProtocol (type: string) {
    // uni.navigateTo({
    // 	url: "/pages/user/server?type="+type
    // })
}

function login() {
    if(!agree.value){
        return toast("请先阅读同意隐私协议!");
    }
    if(!password.value || !username.value){
        return toast("请输入账号或密码!");
    }
    if(!imgCode.value){
        return toast("请输入图形验证码!");
    }
}

onLoad(async (options: any) => {
    console.log(options)
    changeImgCode();
    uni.hideLoading();
    back.value = options.back;
    // #ifdef APP
    const dev: IMEIType = await getIMEI_MAC();
    IMEI.value = dev.IMEI || dev.deviceId;
    let canUse = await checkCanUseOneKeyLogin();
    showOnekeyLogin.value = canUse;
    showFingerPrint.value = IMEI.value && userId.value ? true : false;
    // #endif
    rememberPassword.value = uni.getStorageSync("IsRememberPassword") || false;
    const account = uni.getStorageSync("MyAccountInfo");
    if(rememberPassword.value && account){
        password.value = account.password;
        username.value = account.username;
    }
})
</script>

<style lang="scss">
.page {
	max-width: 750rpx;
	overflow: hidden;
    background-color: v-bind(pageBg);

}
.login {
	position:absolute;
	z-index: 100;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 670rpx;
	min-height: 470rpx;
	border-radius: 20rpx;
	padding: 30rpx;
	box-sizing: border-box;
	@include center(column);
    background-color: v-bind(containerBg);
	.rememberPassword {
		width: 100%;
		line-height: 60rpx;
	}
	.agreeProcotol {
		width: 100%;
		line-height: 60rpx;
		text {
            color: v-bind(linkColor);
		}
	}
	.changeLoginMode {
		width: 200rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		margin-bottom: 20rpx;
		border-radius: 12rpx;
		margin-left: calc(100% - 200rpx);
        color: v-bind(primaryColor);
		.icon-shujuzhuanhuan {
			margin-right: 10rpx;
		}
	}
	.login-item {
		width: 100%;
		height: 100rpx;
		@include center;
		margin-bottom: 20rpx;
        border-bottom: 1px solid v-bind(borderColor);
		.login-item-label {
			width: 150rpx;
			height: 80rpx;
			line-height: 80rpx;
            color: v-bind(labelColor);
		}
		.login-item-con {
			flex: 1;
			margin-left: 20rpx;
			height: 80rpx;
			line-height: 80rpx;
			display: flex;
            color: v-bind(contentColor);
		}
		.login-item-sign {
            color: v-bind(primaryColor);
            image {
                max-width: 220rpx;
                max-height: 80rpx;
            }
			&.smscode {
				width: 220rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
			}
		}
	}
}
.forget_register_pub {
	position: fixed;
	bottom: 0;
	line-height: 100rpx;
    color: v-bind(linkColor);
}
.forget {
	left: 30rpx;
}
.register {
	right: 30rpx;
}
.login-other {
	position: absolute;
	bottom: 130rpx;
	left: 0; right: 0;
	width: 100%;
	height: 90rpx;
	@include center;
	justify-content: space-around;
	image {
		width: 80rpx; height: 80rpx;
		margin: 0 30rpx
	}
	.icon-zhiwenjiesuo {
		width: 80rpx; height: 80rpx;
		font-size: 60rpx;
		margin: 0 30rpx;
		text-align: center;
		line-height: 80rpx;
		border-radius: 50%;
	}
}
.login-one-key {
	position: absolute;
	bottom: 240rpx;
	left: 0; right: 0;
	width: 100%;
	height: 100rpx;
	@include center;
	.primary {

	}
}

</style>
