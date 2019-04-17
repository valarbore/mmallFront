'use strict'
require('./index.css')
require('page/common/navi/index.js')
require('page/common/header/index.js')
require('page/common/nav-side/index.js')
let _mm = require('util/mm.js')
let _user = require('service/user-service.js')
let navSide = require('page/common/nav-side/index.js')
let page = {
    init: function () {
        this.onLoad()
    },
    onLoad: function () {
        navSide.init({ name: 'user-pass-update' })
        this.bindEvent()
    },
    bindEvent: function () {
        let _this = this
        $(document).on('click', '.btn-submit', function () {
            let userInfo = {
                passwordOld: $.trim($('#passwordOld').val()),
                passwordNew: $.trim($('#passwordNew').val()),
                passwordConfirm: $.trim($('#passwordConfirm').val())
            }
            let validateResult = _this.validateForm(userInfo)
            if (validateResult.status) {
                _user.updatePassword({
                    passwordOld: userInfo.passwordOld,
                    passwordNew: userInfo.passwordNew
                }, function (res, msg) {
                    _mm.successTips(msg)
                    window.location.href = './user-center.html'
                }, function (errMsg) {
                    _mm.errorTips(errMsg)
                })
            } else {
                _mm.errorTips(validateResult.msg)
            }
        })
    },
    validateForm: function (formData) {
        let result = {
            status: false,
            msg: ''
        }
        if (!_mm.validate(formData.passwordOld, 'require')) {
            result.msg = "原密码不能为空"
            return result
        }
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            console.log(formData.passwordNew)
            console.log(formData.passwordNew.length)
            result.msg = "新密码不能少于6位"
            return result
        }
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = "两次输入的新密码不一致"
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

