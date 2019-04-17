require('./index.css')
require('page/common/navi-simple/index.js')
let _mm = require('util/mm.js')

$(function () {
    let type = _mm.getUrlParam('type')|| 'default'
    $('.' + type + '-success').show()


})
