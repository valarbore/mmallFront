let Hogan = require('hogan')
let _mm = {
    // 网络请求
    request: function (param) {
        var _this = this
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                // 请求成功
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                // 没有登录状态 需要强制登录
                else if (10 === res.status) {
                    _this.doLogin()
                }
                // 请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.status)
            }
        })
    },
    // 获取url参数
    getUrlParam: function (name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let result = window.location.search.substring(1).match(reg)
        return result ? decodeURIComponent(result[2]) : null
    },
    // 渲染html模板
    renderHtml: function (htmlTemplate, data) {
        let template = Hogan.compile(htmlTemplate)
        let result = template.render(data)
        return result
    },
    //成功提示
    successTips: function (msg) {
        alert(msg || '操作成功')
    },
    //错误提示
    errorTips: function (msg) {
        alert(msg || '操作失败')
    },
    // 字段校验 是否为空、手机、邮箱
    validate: function (value, type) {
        let v = $.trim(value)
        // 非空验证
        if('require'===type){
            return !!v
        }
        // 手机号验证
        if('phone'===type){
            return /^1\d{10}$/.test(v)
        }
        // 邮箱格式验证
        if('email'===type){
            return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(v)
        }
    },
    // 统一登录处理
    doLogin: function () {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href)
    },
    goHome:function () {
        window.location.href='./index.html'

    }
}

module.exports = _mm
