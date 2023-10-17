<template>
	<pink-page class="page">
		<pink-navigation-bar title="登录" />

		<view class="login">
			<view class="active-light changeLoginMode" @click="mode='password'" v-if="mode != 'password'">
				<text class="iconfont icon-shujuzhuanhuan"></text>密码登录
			</view>
			<block v-if="mode == 'password'">
				<view class="login-item">
					<view class="login-item-label">账号</view>
					<input class="login-item-con" placeholder="请输入账号/手机号/邮箱" v-model="username"/>
				</view>
				<view class="login-item">
					<view class="login-item-label">密码</view>
					<input class="login-item-con" placeholder="请输入密码" password v-model="password" />
				</view>
				<view class="login-item">
					<view class="login-item-label">验证码 </view>
					<input class="login-item-con" placeholder="请输入验证码" v-model="imgCode" />
				    <view class="login-item-sign" @click="changeImgCode"> <img :src="codeImg" alt=""> </view>
				</view>
				<view class="rememberPassword">
					<pink-check v-model="rememberPassword" @change="rememberPasswordChange">记住密码</pink-check>
				</view>
			</block>
			<block v-if="mode == 'email'">
				<view class="login-item">
					<view class="login-item-label">邮箱</view>
					<input class="login-item-con" placeholder="请输入邮箱" v-model=" email"/>
				</view>
				<view class="login-item">
					<view class="login-item-label">验证码 </view>
					<input class="login-item-con" placeholder="请输入验证码"  v-model="code" />
				    <view class="login-item-sign smscode" :class="{'active-light': currentCodeSecond==0}" @click="sendEmailCode()">{{sendText}}</view>
				</view>
			</block>
			<block v-if="mode == 'sms'">
				<view class="login-item">
					<view class="login-item-label">手机号</view>
					<input class="login-item-con" placeholder="请输入手机号" v-model="phone"/>
				</view>
				<view class="login-item" >
					<view class="login-item-label">验证码 </view>
					<input class="login-item-con" placeholder="请输入验证码"  v-model="code" />
				    <view class="login-item-sign smscode" :class="{'active-light': currentCodeSecond==0}" @click="sendEmailCode('SendSMSCode')">{{sendText}}</view>
				</view>
			</block>
			<view class="agreeProcotol">
				<pink-check v-model="agree">
					我同意<text @click="goProtocol('privacy')">《隐私协议》</text
					>与<text @click="goProtocol('server')">《服务协议》</text>
				</pink-check>
			</view>

			<pink-space height="40"></pink-space>
			<pink-button @click="login" classes="big primary">登录</pink-button>
		</view>

		<view class="forget abs-bottom" @click="forgot">
			<text class="iconfont icon-xiangzuo1"></text>
			<text>忘记密码</text>
		</view>

		<view class="register abs-bottom" @click="register" >
			<text>前往注册</text>
			<text class="iconfont icon-xiangyou"></text>
		</view>

		<view class="login-other abs-bottom">
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
			<pink-button @click="loginForOther('onekey')" classes="primary big">一键登录</pink-button>
		</view>
	</pink-page>
</template>

<script>
	import {
		setUserForLogin,
		getAuthCode,
		checkCanUseOneKeyLogin ,
		appLogin,
		getPhoneByUniverify
	} from "@/common/js/config/index.js";
	import Ajax from "@/common/js/request/ajax.js";
	import { toast, transformTransparent, getIEMI_MAC, uuid, verifyString } from "@/common/helper/util.js";
	import { authLogin } from "@/common/js/helper/fingerPrint.js";
	export default {
		data() {
			return {
				// 密码登录
				imgCode: "", // 输入的图形验证码
				codeImg: "", // 图形验证码
				password: "",
				username: "",
				rememberPassword: true,
				uuid: "",// 密码登录图形验证码

				back: 0,

				// 登录协议
				agree: false,

				// uniapp  APP一键登录
				showOnekeyLogin: false,

				// IMEI 配合 指纹登录
				showFingerPrint: false,
				IMEI: "",
				userId: "",

				// 登录模式
				mode: "password",

				// 验证码登录
				email: "",
				phone: "",
				code: "", // 验证码有效期: 60 * 60 s
				isSend: 0, // 0: 未发送, 1: 已发送, 2: 发送失败, 3: 重新发送验证码,
				codeExpire: 999, // 验证码有效期
				currentCodeSecond: 0,
				timeId: null
			}
		},
		computed: {
			sendText() {
				let status = "发送验证码";
				if(this.isSend == 1) status = `（${this.currentCodeSecond}s）内有效`;
				if(this.isSend == 2) status = `重新发送`;
				if(this.isSend == 3) status = "重新发送";
				return status;
			}
		},
		async onLoad(options) {
			this.uuid = uuid();
			this.changeImgCode();
			uni.hideLoading();
			this.back = options.back;
			if(process.env.NODE_ENV === 'development') {
				this.password = "124284";
				this.username = "admin";
				this.email = "1242849166@qq.com";
				this.phone = "16639766677";
				this.agree = true;
			}
			this.userId = uni.getStorageSync("UserId");
			// #ifdef APP
			const dev = await getIEMI_MAC();
			this.IMEI = dev.IMEI || dev.deviceId;
			let canUse = await checkCanUseOneKeyLogin().catch(err => err);
			this.showOnekeyLogin = canUse;
			this.showFingerPrint = this.globalConfig.fingerPrint && this.IMEI && this.userId;
			// #endif
			this.rememberPassword = uni.getStorageSync("IsRememberPassword") || false;
			const account = uni.getStorageSync("MyAcountInfo");
			if(this.rememberPassword && account){
				this.password = account.password;
				this.username = account.username;
			}

		},

		methods: {
			startComputedSecond() {
				this.currentCodeSecond = this.codeExpire;
				this.timeId = setInterval(() => {
					this.currentCodeSecond --;
					if(this.currentCodeSecond <= 0){
						clearInterval(this.timeId);
						this.isSend = 3;
						this.currentCodeSecond = 0;
					}
				}, 1000)
			},
			async sendEmailCode(api = "SendMailCode") {
				if(this.currentCodeSecond > 0) return;
				const isPhone = api == "SendSMSCode";
				clearInterval(this.timeId);
				if(!isPhone && !verifyString(this.email,"email")) return toast("请输入正确的邮箱号码!");
				if(isPhone && !verifyString(this.phone,"phone")) return toast("请输入正确的手机号码!");
				const res = await this.$R[api](isPhone ? {phone: this.phone} : {email: this.email});
				if (!res.ok) this.isSend = 2;
				if(res.ok){
					this.isSend = 1;
					this.codeExpire = res.data || this.codeExpire;
					this.startComputedSecond();
					if(isPhone){
						count.count ++;
					}
				}
			},
			async changeImgCode() {
				const res = await this.$R["GetImgCode"]({userId: this.uuid});
				this.codeImg = res.data;
			},
			goProtocol(type) {
				// uni.navigateTo({
				// 	url: "/pages/user/server?type="+type
				// })
			},
			rememberPasswordChange(e) {
                uni.setStorageSync("RememberPasswordStatus", e || false);
			},
			async loginForOther(type) {
                switch (type) {
				    // 邮箱登录
                    case "email":
                        this.mode = "email"
                        break;
				    // 短信登录
                    case "sms":
                        this.mode = "sms";
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
                    case "qqh5":
                        // #ifdef H5
                        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9b244ffaa2d01031&redirect_uri=${encodeURIComponent("https://i.ipink.pink/#/pages/login/third")}&response_type=code&scope=snsapi_base&state=wx_h5_login#wechat_redirect`
                        // #endif
                        break;
                    // 支付宝APP
                    case "ali":
                    case "apple":
                    default:
                        toast("暂未开放!");
                        break;
                }
			},
			forgot() {
				uni.navigateTo({
					url: "/pages/login/forget"
				})
			},
			register() {
				uni.navigateTo({
					url: "/pages/login/register"
				})
			},
			async login() {
				if(!this.agree){
					return toast("请先阅读同意隐私协议!");
				}
				if(!this.password || !this.username){
					return toast("请输入账号或密码!");
				}
				if(!this.imgCode){
					return toast("请输入图形验证码!");
				}
			}
		}
	}
</script>

<style lang="scss">
.page {
	max-width: 750rpx;
	overflow: hidden;
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
	.rememberPassword {
		width: 100%;
		line-height: 60rpx;
	}
	.agreeProcotol {
		width: 100%;
		line-height: 60rpx;
		text {

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
		.icon-shujuzhuanhuan {
			margin-right: 10rpx;
		}
	}
	.login-item {
		width: 100%;
		height: 100rpx;
		@include center;
		margin-bottom: 20rpx;
		.login-item-label {
			width: 150rpx;
			height: 80rpx;
			line-height: 80rpx;
		}
		.login-item-con {
			flex: 1;
			margin-left: 20rpx;
			height: 80rpx;
			line-height: 80rpx;
			display: flex;
		}
		.login-item-sign {
            img {
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
.forget {
	position: fixed;
	left: 30rpx;
	bottom: 0;
	line-height: 100rpx;
}
.register {
	position: fixed;
	right: 30rpx;
	bottom: 0;
	line-height: 100rpx;
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
