export class TokenModel {
    constructor(token: string, refreshToken: string, ipAddress: string) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.ipAddress = ipAddress;
    }

    token: string;
    refreshToken: string;
    ipAddress: string;
}