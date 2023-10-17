export function toast (title: string, icon?: string , mask?: string, duration?: number): Promise<any> {
	return uni.showToast({
        title,
        icon: icon || "none",
        duration: duration,
        mask: mask || false
    } as UniApp.ShowToastOptions)
}
