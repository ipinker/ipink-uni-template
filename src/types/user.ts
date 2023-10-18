/**
 * @Description 用户相关接口
 */

// 用户模型
export interface User {
    userId: string;   // 用户的唯一ID, 主要用于接口请求
    username: string; // 登录的用户名
    nickname: string; // 昵称
    phone: string;    // 脱敏手机号用来前端展示
    phoneAes: string; // 加密手机号, 用来与后端交互
}

// 用户状态模型
export interface UserStore {
    user: User | null;
}
