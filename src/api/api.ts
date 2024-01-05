import axios from "axios";

export const instance = axios.create({
    baseURL: "/api/v2/",
    headers: {
        "content-type": "application/json",
        Accept: "application/json",
    },
});

type RegisterDataType = {
    email?: string,
    emailConfirmCode?: number,
    phone?: string,
    phoneConfirmCode?: number,
    inn?: string,
    password: string,
    usernfo: {},
    recapthcaToken?: string,
    roles?: string
}
type LoginResponseType = {
    data: {
        accessToken?: string,
        ok: boolean,
        refreshToken?: string,
        msg?: string,
        code?: number
    }
}
type RegisterResponseType = {
    data: {
        "ok": true,
        "uid": "string"
    }
}
export type UserType = {
    ok: boolean,
    roles: Array<string>,
    email: string,
    emailIsConfirmed: boolean,
    phone: string,
    phoneIsConfirmed: boolean,
    inn: string,
    is_online: boolean,
    userinfo: any
}
export const API = {
    login(credential: string, password: string): Promise<LoginResponseType> {
        return instance.post("login", {credential, password})
    },
    register(
        emailOrPhone: {
            email?: string,
            emailConfirmCode?: number,
            phone?: string,
            phoneConfirmCode?: number,
        },
        password: string,
        usernfo: {},
        inn?: string,
        recapthcaToken?: string,
        roles?: string
    ): Promise<RegisterResponseType> {
        let data: RegisterDataType = {...emailOrPhone, password, usernfo}
        if (inn) data["inn"] = inn
        if (recapthcaToken) data["recapthcaToken"] = recapthcaToken
        if (roles) data["roles"] = roles
        return instance.post(`register`, data);
    },
    sendConfirmCode(use_call: boolean, emailOrPhone: { email?: string, phone?: string }) {
        return instance.post(`sendConfirmCode`, {use_call, ...emailOrPhone});
    },
    logout(refreshToken: string): Promise<{ data: { ok: boolean } }> {
        return instance.post(`logout`, {refreshToken})
    },
    getUserInfo(accessToken: string): Promise<{ data: UserType }> {
        return instance.post(`getUserInfo`, {accessToken})
    }
};

