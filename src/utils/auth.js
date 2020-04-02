// 导入 Cookies
import Cookies from 'js-cookie'

// 设置 cookie name
const TokenKey = 'Admin-Token'

// 获取 Admin-Token 的 cookie
export function getToken() {
  return Cookies.get(TokenKey);
}

// setToken 
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

// 移除 token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
