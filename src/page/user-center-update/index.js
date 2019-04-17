'use strict'
require('./index.css')
require('page/common/navi/index.js')
require('page/common/header/index.js')
require('page/common/nav-side/index.js')
let _mm = require('util/mm.js')
let _user = require('service/user-service.js')
let navSide = require('page/common/nav-side/index.js')
let templateIndex = require('./index.string')
let page = {
    init: function () {
        this.onLoad()
    },
    onLoad: function () {
        navSide.init({ name: 'user-center' })
        this.loadUserInfo()
        this.bindEvent()
    },
    bindEvent: function () {
        let _this = this
        $(document).on('click', '.btn-submit', function () {
            let userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            }
            let validateResult = _this.validateForm(userInfo)
            if (validateResult.status) {
                _user.updateUserInfo(userInfo, function (res,msg) {
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
        if (!_mm.validate(formData.phone, 'phone')) {
            result.msg = "手机号格式不正确"
            return result
        }
        if (!_mm.validate(formData.email, 'email')) {
            result.msg = "邮箱格式不正确"
            return result
        }
        if (!_mm.validate(formData.question, 'require')) {
            result.msg = "密码提示问题不能为空"
            return result
        }
        if (!_mm.validate(formData.answer, 'require')) {
            result.msg = "密码提示问题答案不能为空"
            return result
        }
        // 通过验证，返回正确提示
        result.status = true
        result.msg = "验证通过"
        return result
    },
    loadUserInfo: function () {
        let userHtml = ''
        _user.getUserInfo(function (res) {
            userHtml = _mm.renderHtml(templateIndex, res)
            $('.panel-body').html(userHtml)
        }, function (errMsg) {
            _mm.errorTips(errMsg)
            window.location.href = './login.html'
        })
    }
}
$(function () {
    page.init()
})

