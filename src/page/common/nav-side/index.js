require('./index.css')
let _mm = require('util/mm.js')
let templateIndex = require('./index.string')
// 侧边导航
let navSide = {
    option: {
        name: '',
        navList: [
            { name: 'user-center', desc: '个人中心', href: './user-center.html' },
            { name: 'order-list', desc: '我的订单', href: './order-list.html' },
            { name: 'user-pass-update', desc: '修改密码', href: './user-pass-update.html' },
            { name: 'about', desc: '关于ValarMall', href: './about.html' },
        ]
    },
    init: function (option) {
        // 合并选项
        $.extend(this.option, option)
        this.renderNav()
    },
    renderNav: function () {
        // 找到选择项
        for (let i = 0, l = this.option.navList.length; i < l; ++i) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true
            }
        }
        // 注入html
        let navHtml = _mm.renderHtml(templateIndex, {
            navList: this.option.navList
        })
        $('.nav-side').html(navHtml)
    }
}
module.exports = navSide
