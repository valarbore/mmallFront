require('./index.css')
let templatePagination = require('./index.string')
let _mm = require('util/mm.js')

let Pagination = function () {
    let _this = this
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    }
    // 事件的处理
    $(document).on('click', '.pg-item', function () {
        let $this = $(this)
        if ($this.hasClass('active') || $this.hasClass('disabled')) {
            return
        }
        typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : null
    })
}
// 渲染分页组件
Pagination.prototype.render = function (userOption) {
    this.option = $.extend({}, this.defaultOption, userOption)
    // 判断容器是否为合法的jQuery对象
    if (!(this.option.container instanceof jQuery)) {
        return
    }
    // 判断分页是否只有一页
    if (this.option.pages <= 1) {
        return
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml())
}
// 获取分页的html
Pagination.prototype.getPaginationHtml = function () {
    let html = ''
    let pageArray = []
    let start = this.option.pageNum - this.option.pageRange > 0 ? this.option.pageNum - this.option.pageRange : 1
    let end = this.option.pageNum + this.option.pageRange < this.option.pages ? this.option.pageNum + this.option.pageRange : this.option.pages
    pageArray.push({
        name: '上一页',
        value: this.option.prePage,
        disabled: !this.option.hasPreviousPage
    })
    for (let i = start; i <= end; i++) {
        pageArray.push({
            name: i,
            value: i,
            active: (i === this.option.pageNum)
        })
    }
    pageArray.push({
        name: '下一页',
        value: this.option.nextPage,
        disabled: !this.option.hasNextPage
    })
    html = _mm.renderHtml(templatePagination, {
        pageArray: pageArray,
        pageNum: this.option.pageNum,
        pages: this.option.pages
    })
    return html
}
module.exports = Pagination
