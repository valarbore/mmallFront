'use strict'
require('./index.css')
require('page/common/navi/index.js')
require('page/common/header/index.js')
require('page/common/nav-side/index.js')
let _mm = require('util/mm.js')
let _user =require('service/user-service.js')
let navSide = require('page/common/nav-side/index.js')
let templateIndex = require('./index.string')
let page = {
    init: function () {
        this.onLoad()
    },
    onLoad: function () {
        navSide.init({ name: 'user-center' })
        this.loadUserInfo()
    },
    loadUserInfo: function () {
        let userHtml=''
        _user.getUserInfo(function (res) {
            console.log(res)
            userHtml=_mm.renderHtml(templateIndex,res)
            $('.panel-body').html(userHtml)
        },function (errMsg) {
            _mm.errorTips(errMsg)
            window.location.href='./user-login.html'
        })
    }
}
$(function () {
    page.init()
})

