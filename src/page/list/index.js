'use strict'
require('page/common/navi/index.js')
require('page/common/header/index.js')
require('./index.css')
let _mm = require('util/mm.js')
let _product = require('service/product-service.js')
let templateIndex = require('./index.string')
let Pagination = require('util/pagination/index.js')
let page = {
    data: {
        listParam: {
            keyword: _mm.getUrlParam('keyword') || '',
            categoryId: _mm.getUrlParam('categoryId') || '',
            orderBy: _mm.getUrlParam('orderBy') || 'default',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 20
        }
    },
    init: function () {
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function () {
        this.loadList()
    },
    bindEvent: function () {
        let _this = this
        // 排序点击事件
        $('.sort-item').click(function () {
            let $this = $(this)
            _this.data.listParam.pageNum = 1
            // 点击默认排序
            if ($this.data('type') === 'default') {
                // 已经是active样式
                if ($this.hasClass('active')) {
                    return
                }
                // 其他
                else {
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc')
                    _this.data.listParam.orderBy = 'default'
                }
            }
            // 点击价格排序
            else if ($this.data('type') === 'price') {
                // active class 的处理
                $this.addClass('active').siblings('.sort-item')
                    .removeClass('active asc desc')
                // 升序、降序的处理
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc')
                    _this.data.listParam.orderBy = 'price_asc'
                } else {
                    $this.addClass('desc').removeClass('asc')
                    _this.data.listParam.orderBy = 'price_desc'
                }
            }
            // 重新加载列表
            _this.loadList()
        })
    },
    // 加载list数据
    loadList: function () {
        let listHtml = ''
        let _this = this
        let _listParam = this.data.listParam
        _product.getProductList(_listParam, function (res) {
            listHtml = _mm.renderHtml(templateIndex, {
                list: res.list
            })
            $('.p-list-con').html(listHtml)
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            })
        }, function (errMsg) {
            _mm.errorTips(errMsg)
        })
    },
    // 加载分页信息
    loadPagination: function (pageInfo) {
        let _this = this
        this.pagination ? '' : (this.pagination = new Pagination)
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listParam.pageNum = pageNum
                _this.loadList()
            }
        }),)
    }
}
$(function () {
    page.init()
})
