/**
 * @Description 管理用户
 */

import {defineStore} from "pinia";
import {User, UserStore} from "@/types/user";

export const useUserStore = defineStore("user", {
    state: (): UserStore => {
        return {
            user: null
        };
    },
    getters: {
        userId: (state): string => state.user?.userId || ""
    },
    actions: {
        INIT_User(user: User) {
            this.user = user;
        },
        SET_User(user: User) {
            this.user = {
                ... this.user,
                ... user
            }
        }
    }
});
