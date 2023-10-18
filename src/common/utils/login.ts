// UniApp 检测是否支持一键登录
import UniCloud = UniCloudNamespace.UniCloud;

export const checkCanUseOneKeyLogin = (): Promise<boolean> => {
	return new Promise((resolve) => {
		// #ifdef APP
		return uni.preLogin({
		    provider: 'univerify',
		    success(res){
				//预登录成功
				resolve(true);
		    },
		    fail(err){
				// 预登录失败
				resolve(false)
		    }
		});
		// #endif
		resolve(false);
	});
};
