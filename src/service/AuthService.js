export default{
    isLoggedIn(){
        return !!localStorage.getItem('accessToken')
    }
}