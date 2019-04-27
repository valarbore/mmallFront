'use strict'
require('page/common/navi/index.js')
require('page/common/header/index.js')
require('./index.css')
require('util/slider/index.js')
let templateBanner = require('./index.string')
let _mm = require('util/mm.js')

$(function() {
    let bannerHtml = _mm.renderHtml(templateBanner)
    $('.banner-con').html(bannerHtml)
    carousel(
        $('.demo1'), //必选， 要轮播模块(id/class/tagname均可)，必须为jQuery元素
        {
            type: 'leftright', //可选，默认左右(leftright) - 'leftright' / 'updown' / 'fade' (左右/上下/渐隐渐现)
            arrowtype: 'move', //可选，默认一直显示 - 'move' / 'none'  (鼠标移上显示 / 不显示 )
            autoplay: true, //可选，默认true - true / false (开启轮播/关闭轮播)
            time: 3000 //可选，默认3000
        }
    );
});

