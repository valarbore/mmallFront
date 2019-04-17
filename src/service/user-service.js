let _mm =require('util/mm.js')
let _user = {
    // 用户登录
    login: function (userInfo, resolve, reject) {
        _mm.request({
            url: '/api/user/login.do',
            data: userInfo,
            method: "POST",
            success: resolve,
            error: reject
        })
    },
    // 检验用户名是否存在
    checkUsername(username,resolve,reject){
        _mm.request({
            url: '/api/user/check_valid.do',
            data: {
                str:username,
                type:'USERNAME'
            },
            method: "POST",
            success: resolve,
            error: reject
        })
    },
    // 检验邮箱是否存在
    checkEmail(username,resolve,reject){
        _mm.request({
            url: '/api/user/check_valid.do',
            data: {
                str:username,
                type:'EMAIL'
            },
            method: "POST",
            success: resolve,
            error: reject
        })
    },
    // 检验邮箱是否存在
    register(userInfo,resolve,reject){
        _mm.request({
            url: '/api/user/register.do',
            data: userInfo,
            method: "POST",
            success: resolve,
            error: reject
        })
    },
    // 检验邮箱是否存在
    getQuestion(username,resolve,reject){
        _mm.request({
            url: '/api/user/forget_get_question.do',
            data: {
                username:username
            },
            method: "POST",
            success: resolve,
            error: reject
        })
    },
    // 检验邮箱是否存在
    checkAnswer(data,resolve,reject){
        _mm.request({
            url: '/api/user/forget_check_answer.do',
            data: {
                username:data.username,
                question:data.question,
                answer:data.answer
            },
            method: "POST",
            success: resolve,
            error: reject
        })
    },
    // 找回密码设置新密码
    forgetResetPassword(data,resolve,reject){
        _mm.request({
            url: '/api/user/forget_reset_password.do',
            data: {
                username:data.username,
                password:data.password,
                forgetToken:data.token
            },
            method: "POST",
            success: resolve,
            error: reject
        })
    },
    // 登录状态下获取用户信息
    getUserInfo(resolve,reject){
        _mm.request({
            url: '/api/user/get_user_info.do',
            method: "POST",
            success: resolve,
            error: reject
        })

    },
    // 更新用户信息
    updateUserInfo(userInfo,resolve,reject){
        _mm.request({
            url: '/api/user/update_information.do',
            data: userInfo,
            method: "POST",
            success: resolve,
            error: reject
        })
    },
    updatePassword(data,resolve,reject){
        _mm.request({
            url: '/api/user/reset_password.do',
            data: data,
            method: "POST",
            success: resolve,
            error: reject
        })
    }


}
module.exports = _user
