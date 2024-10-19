import decode from 'jwt-decode'

class AuthService {
    getProfile() {
        return decode(this.getToken())
    }

    loggedIn() {
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired(token) {
        try{
            const decoded = decode(token)
            if(decoded.exp < Date.now() /1000) {
                return true
            }else{
                return false
            }
        }
        catch{
            return false
        }
    }

    getToken() {
        return localStorage.getItem('token')
    }

    login(token) {
        localStorage.setItem('token', token)
        window.location.assign('/')
    }

    logout() {
        localStorage.removeItem('token')
        window.location.assign('/login')
    }

}

export default new AuthService()