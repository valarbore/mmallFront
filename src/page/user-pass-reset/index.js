require('./index.css')
require('page/common/navi-simple/index.js')
let _mm = require('util/mm.js')
let _user = require('service/user-service.js')

// 表单错误提示
let formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.err-message').text(errMsg)
    },
    hide: function () {
        $('.error-item').hide().find('.err-message').text('')
    }
}
//page 逻辑部分
let page = {
    data: {
        username: '',
        question: '',
        answer: '',
        token: '',
        password:''
    },
    init: function () {
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function () {
        this.loadStepUsername()
    },
    // 绑定事件
    bindEvent: function () {
        let _this = this
        // 第一步 提交用户名
        $('#submit-username').click(function () {
            _this.submitUsername()
        })
        // 回车提交
        $('.step-username').keyup(function (e) {
            if (e.which === 13) {
                _this.submitUsername()
            }
        })
        // 第二步 提交问题答案
        $('#submit-question').click(function () {
            _this.submitQuestion()
        })
        // 回车提交
        $('.step-question').keyup(function (e) {
            if (e.which === 13) {
                _this.submitQuestion()
            }
        })
        // 第三步 提交新密码
        $('#submit-password').click(function () {
            _this.submitPassword()
        })
        // 回车提交
        $('.step-password').keyup(function (e) {
            if (e.which === 13) {
                _this.submitPassword()
            }
        })

    },
    // 提交用户名 获取密码保护问题
    submitUsername: function () {
        let _this = this
        _this.data.username = $.trim($('#username').val())
        // 用户名存在
        if (_this.data.username) {
            _user.getQuestion(this.data.username, function (res) {
                _this.data.question = res
                _this.loadStepQuestion()
            }, function (errMsg) {
                formError.show(errMsg)
            })
        } else {
            formError.show('请输入用户名')
        }
    },
    submitQuestion(){
        let _this = this;
        _this.data.answer=$.trim($('#answer').val())
        if(_this.data.answer){
            _user.checkAnswer(_this.data,function (res) {
                _this.data.token=res
                _this.loadStepPassword()
            },function (errMsg) {
                formError.show(errMsg)
            })
        }else {
            formError.show('请输入问题答案')
        }
    },
    submitPassword(){
        let _this = this;
        _this.data.password=$.trim($('#password').val())
        if(_this.data.password){
            if( _this.data.password.length<6){
                formError.show('密码不能少于6位')
                return
            }
            _user.forgetResetPassword(_this.data,function (res) {
                window.location.href='./result.html?type=pass-reset'
            },function (errMsg) {
                formError.show(errMsg)
            })
        }else {
            formError.show('请输入新密码')
        }
    },
    // 加载输入用户名的一步
    loadStepUsername: function () {
        $('.step-username').show()
    },
    // 加载输入密码保护问题答案的一步
    loadStepQuestion: function () {
        formError.hide()
        $('.step-username').hide()
        $('.step-question').show().find('.question').text(this.data.question)

    },
    // 加载输入新密码的一步
    loadStepPassword: function () {
        formError.hide()
        $('.step-question').hide()
        $('.step-password').show()
    }
}
$(function () {
    page.init()
})
