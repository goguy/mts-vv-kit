import VueCookies from 'vue-cookies'

const authHeaderKey = 'X-Authorization'
const reqSiteHeaderKey = 'X-SiteHeader'
const tokenType = 'Bearer '
const refreshTokenKey = 'refreshToken'
const accessTokenKey = 'accessToken'
const accessExpiredCode = 'ACCESS_EXPIRED'
const refreshExpiredCode = 'REFRESH_EXPIRED'
const wrongPasswordCode = 'WRONG_PASSWORD'
const skipApis = ['/api/auth/refresh']
const accessTokenTime = '1h'
const refreshTokenTime = '2h'

const token = {    
    getAccessToken: null,
    setAccessToken: null,
    removeAccessToken: null,
    getRefreshToken: null,
    setRefreshToken: null,
    removeRefreshToken: null,
    removeToken: null,
    getAccessExpiredCode: null,
    getRefreshExpiredCode: null,
    getWrongPasswordCode: null,
    getAuthHeaderKey: null,
    getTokenType: null,
    getSkipApis: null,
    getReqSiteHeaderKey: null,
    getReqSiteHeader: null,
    setReqSiteHeader: null,    
}

token.getAccessToken = ()=>{
    return VueCookies.get(accessTokenKey);
}
      
token.setAccessToken = (accessToken)=>{
    return VueCookies.set(accessTokenKey, tokenType + accessToken, accessTokenTime);
}

token.removeAccessToken = ()=>{
    return VueCookies.remove(accessTokenKey)
}

token.getRefreshToken = ()=>{
    return VueCookies.get(refreshTokenKey)
}
  
token.setRefreshToken = (refreshToken)=>{    
    return VueCookies.set(refreshTokenKey, tokenType + refreshToken, refreshTokenTime)
}

token.removeRefreshToken = ()=>{
    return VueCookies.remove(refreshTokenKey)
}

token.removeToken = ()=>{
    VueCookies.remove(accessTokenKey)
    VueCookies.remove(refreshTokenKey)
    VueCookies.remove(reqSiteHeaderKey)
}

token.getAccessExpiredCode = ()=>{
    return accessExpiredCode
}    

token.getRefreshExpiredCode = ()=>{
    return refreshExpiredCode
}    

token.getWrongPasswordCode = ()=>{
    return wrongPasswordCode
}    

token.getAuthHeaderKey = ()=>{
    return authHeaderKey;
}    
  
token.getTokenType = ()=>{
    return tokenType;
}    
  
token.getSkipApis = ()=>{
    return skipApis;
}    
  
token.getReqSiteHeaderKey = ()=>{
    return reqSiteHeaderKey;
}    

token.getReqSiteHeader = ()=>{
    if (VueCookies.get(reqSiteHeaderKey) === undefined || VueCookies.get(reqSiteHeaderKey) === null) {
        return '';
      }
      return VueCookies.get(reqSiteHeaderKey);  
}    

token.setReqSiteHeader = (siteNo)=>{
    return VueCookies.set(reqSiteHeaderKey, siteNo);
}    


export default token