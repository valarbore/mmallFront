require('./index.css')
require('page/common/navi-simple/index.js')
let _mm = require('util/mm.js')
let _user = require('service/user-service.js')

// 表单错误提示
let formError = {
    show:function (errMsg) {
        $('.error-item').show().find('.err-message').text(errMsg)
    },
    hide:function () {
        $('.error-item').hide().find('.err-message').text('')
    }
}
//page 逻辑部分
let page = {
    init: function () {
        this.bindEvent()
    },
    // 绑定事件
    bindEvent: function () {
        let _this = this
        // 点击登录
        $('#submit').click(function () {
            _this.submit()
        })
        // 回车提交
        $('.user-con').keyup(function (e) {
            if (e.which === 13) {
                _this.submit()
            }
        })
    },
    // 提交表单
    submit: function () {
        let formData = {
                username: $.trim($('#username').val()),
                password: $.trim($('#password').val())
            },
            // 表单验证结果返回值
            validateResult = this.formValidate(formData)
        // 验证成功
        if (validateResult.status) {
            _user.login(formData, function (res) {
                window.location.href = _mm.getUrlParam('redirect') || './index.html'
            }, function (errMsg) {
                formError.show(errMsg)
            })
        }
        // 验证失败
        else {
            formError.show(validateResult.msg)
        }
    },
    // 表单字段验证
    formValidate: function (formData) {
        let result = {
            status: false,
            msg: ''
        }
        if (!_mm.validate(formData.username, 'require')) {
            result.msg = "用户名不能为空"
            return result
        }
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = "密码不能为空"
            return result
        }
        // 通过验证，返回正确提示
        result.status = true
        result.msg = "验证通过"
        return result
    }
}
$(function () {
    page.init()
})
