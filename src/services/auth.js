export const TOKEN_KEY = "app-token";
export const isAuthenticated = () => localStorage.getItem('app-token') !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setTokenRegister = token => {
    try {
        localStorage.setItem(TOKEN_KEY, token)
        return true
    } catch(e) {
        return false
    }
}
export const setTokenLogin = token => {
    try {
        localStorage.setItem(TOKEN_KEY, token);
        return true
    } catch(e) {
        return false
    }
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};