require('./index.css')

let _mm = require('util/mm.js')
//通用页面头部
let header={
    init:function () {
        this.onload()
        this.bindEvent()
    },
    onload:function(){
        let keyword = _mm.getUrlParam('keyword')
        // Keyword存在，则回填到输入框
        if(keyword){
            $('#search-input').val(keyword)
        }
    },
    bindEvent:function () {
        let _this=this
        //点击搜索按钮进行提交
        $('#search-btn').click(function () {
            _this.searchSubmit()
        })
    //    输入回车也可以进行搜索提交
        $('#search-input').keyup(function (e) {
            if(e.keyCode===13){
                _this.searchSubmit()
            }
        })
    },
    // 搜索提交
    searchSubmit:function () {
        let keyword = $.trim($('#search-input').val())
        // 提交时有内容正常进入list页，如果为空则返回首页
        if(keyword){
            window.location.href='./list.html?keyword='+keyword
        }else {
            _mm.goHome()
        }
    }
}
header.init()
