<template>
    <view class="pink-navigation_relative"  ref="_ref"
		:style="[{height: navHeight + 'px'}]"
	>
        <view class="pink-navigation" :style="[{ height: navHeight+'px' }]">
            <view class="pink-statusbar"
				:style="[{height: statusBarHeight+'px'}, {background: statusColor}]"
			></view>

            <view class="pink-navigation_c"
				:style="[{height: contentHeight + 'px'}]"
				v-if="type == 'custom'"
			>
                <slot name="nav"></slot>
            </view>
            <view class="pink-navigation_c"
				:style="navigateBodyStyle"
				v-else
			>
				<block v-if="type == 'image'">
					<image class="pink-navigation_c_c_img" :src="bgImg"/>
				</block>
				<block v-else>
					<view class="pink-navigation_c_c_c">
						<view class="pink-nav_c_box">
						    <view class="pink-nav_back active-light" v-if="useBack" @click="handleBack">
						        <text class="pink-nav_back_icon iconfont" :class="backIcon" v-if="backIcon"></text>
						        <image class="pink-nav_back_icon" :src="backImage" v-if="!backIcon"/>
								{{backTxt}}
						    </view>
							<view class="pink-nav_left">
								<slot name="left"></slot>
							</view>
						    <view class="pink-nav_content"
						      :style="[{
						        justifyContent: titleAlign === 'center' ? titleAlign : 'flex-'+titleAlign,
						      }]">
								<block v-if="title">
								    {{title}}
								</block>
								<block v-else>
									<slot name="content"></slot>
								</block>
						    </view>
						    <view class="pink-nav_btn" :style="{paddingRight: paddingRight}">
						        <slot name="right"></slot>
						    </view>
						</view>
					</view>
				</block>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
    export default {
        name: "pink-navigation-bar"
    }
</script>


<script setup lang="ts">
    import {onMounted, Ref, ref, getCurrentInstance, computed} from "vue";
    import { useTheme } from "@/common/hooks/useTheme";

    const { theme } = useTheme();
    const navigateBgColor = computed(() => theme.value?.colorBgContainer);
    const navigateColor = computed(() => theme.value?.colorTextBase);
    const shadowColor = computed(() => theme.value?.colorShadowBase);
    const props = defineProps({
        type: { // color  image  custom
            type: String,
            default: "color"
        },
        height: {  // 高度
            type: [Number , String],
            default: 100
        },
        title: {
            type: String,
            default: ""
        },
        titleAlign: { // 标题方向 center | start | end
            type: String,
            default: "center"
        },
        color: { // 字色 rgb #H ColorName
            type: String,
            default: ""
        },
        bgColor: {   // 背景色
            type: String,
            default: ""
        },
        statusColor: { // 状态条背景色, 传一个颜色值或渐变属性值 color | linear-gradient()
            type: String,
            default: ""
        },
        bgImage: {   // 背景图
            type: String,
            default: ""
        },
        gradientType: { // 渐变类型 linear | radial
            type: String,
            default: ""
        },
        gradientValue: { // 渐变值内容
            type: String,
            default: ""
        },
        useBack: {
            type: Boolean,
            default: false
        },
        backTxt: {
            type: String,
            default: ""
        },
        // 优先使用
        backIcon: {       // 返回 按钮路径
            type: String,
            default: "icon-xiangzuo1"
        },
        backImage: {
            type: String,
            default: ""
        }
    });



    const _ref: Ref = ref(null);
    let statusBarHeight: number = 0,
    navHeight: number = 50,
    contentHeight: number = uni.upx2px(+ props.height),
    bgImg: string = props.bgImage,    // 背景图
    showImage: boolean = false,
    paddingRight: string = "0px",
    canBack: boolean = true;
    const instance = getCurrentInstance()?.proxy;

    const navigateBodyStyle = [
        {  height: contentHeight + 'px' },
        { background: props.gradientType ? props.gradientType+'-gradient('+props.gradientValue+')' : props.bgColor },
        { color: props.color }
    ];

    onMounted(() => {
        try {
            statusBarHeight = instance?.$system?.statusBarHeight;
            contentHeight = uni.upx2px(+ props.height);
            navHeight = contentHeight + statusBarHeight;
            // #ifdef MP
            const _info =  wx.getMenuButtonBoundingClientRect() || {};
            paddingRight = "" + (instance?.$system?.safeArea.width - _info.left);
            // #endif
            paddingRight = paddingRight + 10 + 'px';
        } catch (e) {
            console.log(e)
        }
    });

    const handleBack = () => {
        if(canBack){
            canBack = false;
            uni.navigateBack();
            setTimeout(() => {
                canBack = true;
            }, 300);
        }
    }

    defineExpose({
        _ref: _ref
    });
</script>

<style lang="scss" scpoed>
.pink-navigation_relative {
    width: 1rpx;
    .pink-navigation {
        position: fixed;
        top: 0; left: 0; z-index: 300;
        width: 100vw;
		box-sizing: border-box;
        .pink-statusbar {
			width: 100%;
		}
        .pink-navigation_c  {
            position: relative;
            height: 100%; width: 100%;
			max-height: 100%;
			box-sizing: border-box;
            box-shadow: 0 2rpx 8rpx 0 v-bind(shadowColor);
            background-color: v-bind(navigateBgColor);
            color: v-bind(navigateColor);
            &_c_img {
                width: 100%; height: 100%;
            }
            &_c_c {
                position: absolute;
                left: 0;right:0;bottom: 0;top:0;
                width: 100%; height: 100%;
				    box-sizing: border-box;
				.pink-nav_c_box {
				    position: relative;
				    box-sizing: border-box;
				    width: 100%;  height: 100%;
				    display: flex;
				    align-items: center;
				    justify-content: space-between;
					font-size: 36rpx;
				    .pink-nav_back {
				        height: 100%;
						padding-left: 20rpx;
						padding-right: 10rpx;
				        @include vercenter;
				        .pink-nav_back_icon {
				            width: 45rpx; height: 45rpx;
							@include center;
							font-size: 32rpx;
				        }
				    }
					.pink-nav_left {
						flex: 1;
						@include vercenter;
					}
				    .pink-nav_content {
						@include abscenter;
				        display: flex;
				        align-items: center;
				        box-sizing: border-box;
						padding: 0 10rpx;
						box-sizing: border-box;
						@include ellipsis(2);
				    }
				    .pink-nav_btn {
				        height: 100%;
				        @include vercenter;
						justify-content: flex-end;
						box-sizing: border-box;
				    }
				}
            }
        }
    }
}
</style>
