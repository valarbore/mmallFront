require('page/common/header/index.js')
require('./index.css')
require('page/common/navi/index.js')
let _mm = require('util/mm.js')
let _cart = require('service/cart-service.js')
let templateIndex = require('./index.string')
let page = {
    data: {},
    init: function () {
        this.loadCart()
        this.bindEvent()
    },
    loadCart: function () {
        let _this = this
        // 获取购物车列表
        _cart.getCartList(function (res) {
            _this.renderCart(res)
        }, function (errMsg) {
            $('.page-wrap').html('<p class="err-tips">用户未登录，登录后刷新重试。</p>')
        })
    },
    renderCart: function (data) {
        this.filter(data)
        this.data.cartInfo = data
        $('.nav .cart-count').text(this.calculateCount())
        let cartHtml = _mm.renderHtml(templateIndex, data)
        $('.page-wrap').html(cartHtml)
    },
    calculateCount () {
        let count = 0,
            list = this.data.cartInfo.cartProductVoList
        for (let i = 0, j = list.length; i < j; i++) {
            count += list[i].quantity
        }
        return count
    },
    bindEvent: function () {
        let _this = this
        $(document).on('click', '.cart-select', function () {
            let $this = $(this),
                productId = $this.parents('.cart-table').data('product-id')
            // 选中
            if ($this.is(':checked')) {
                _cart.selectProduct(productId, function (res) {
                    _this.renderCart(res)
                }, function (errMsg) {
                    _mm.errorTips(errMsg)
                })
            }
            // 取消选中
            else {
                _cart.cancelSelectProduct(productId, function (res) {
                    _this.renderCart(res)
                }, function (errMsg) {
                    _mm.errorTips(errMsg)
                })
            }
        })
        $(document).on('click', '.cart-select-all', function () {
            let $this = $(this)
            // 全选
            if ($this.is(':checked')) {
                _cart.selectProductAll(function (res) {
                    _this.renderCart(res)
                }, function (errMsg) {
                    _mm.errorTips(errMsg)
                })
            }
            // 取消全选
            else {
                _cart.cancelSelectProductAll(function (res) {
                    _this.renderCart(res)
                }, function (errMsg) {
                    _mm.errorTips(errMsg)
                })
            }
        })
        $(document).on('click', '.count-btn', function () {
            let $this = $(this),
                $pCount = $this.siblings('.count-input'),
                currentCount = parseInt($pCount.val()),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                minCount = 1,
                maxCount = $pCount.data('max'),
                newCount = 0
            if (type === 'plus') {
                if (currentCount >= maxCount) {
                    _mm.errorTips('该商品数量已达上限')
                    return
                }
                newCount = currentCount + 1
            } else if (type === 'minus') {
                if (currentCount <= minCount) {
                    return
                }
                newCount = currentCount - 1
            }
            _cart.updateProduct({
                count: newCount,
                productId: productId
            }, function (res) {
                _this.renderCart(res)
            }, function (errMsg) {
                _mm.errorTips(errMsg)
            })
        })
        $(document).on('keyup', '.count-input', function (e) {
            if (e.keyCode === 13) {
                _this.updateByInput($(this))
            }
        })
        $(document).on('blur', '.count-input', function () {
            _this.updateByInput($(this))
        })
        $(document).on('click', '.cart-delete', function () {
            if (window.confirm('确认删除该商品？')) {
                let productId = $(this).parents('.cart-table').data('product-id')
                _this.deleteProduct(productId)
            }
        })
        $(document).on('click', '.delete-select', function () {
            let arrProductIds = [],
                list = _this.data.cartInfo.cartProductVoList
            for (let i = 0, j = list.length; i < j; ++i) {
                if (list[i].productChecked === 1) {
                    arrProductIds.push(list[i].productId)
                }
            }
            if (arrProductIds.length) {
                if (window.confirm('确认删除选择商品？')) {
                    _this.deleteProduct(arrProductIds.join(','))
                }
            } else {
                _mm.errorTips('无选中项')
            }
        })
        $(document).on('click', '.btn-submit', function () {
            if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
                window.location.href = './confirm.html'
            } else {
                _mm.errorTips('没有选择需要结算的商品')
            }
        })
    },
    filter: function (data) {
        data.notEmpty = !!data.cartProductVoList.length
    },
    updateByInput: function (target) {
        let _this = this
        let $this = target,
            currentCount = parseInt($this.val()),
            productId = $this.parents('.cart-table').data('product-id'),
            minCount = 1,
            maxCount = $this.data('max'),
            newCount = 0
        if (currentCount > maxCount) {
            newCount = maxCount
        } else if (currentCount < minCount) {
            newCount = minCount
        } else {
            newCount = currentCount
        }
        _cart.updateProduct({
            count: newCount,
            productId: productId
        }, function (res) {
            _this.renderCart(res)
        }, function (errMsg) {
            _mm.errorTips(errMsg)
        })
    },
    deleteProduct (productId) {
        let _this = this
        _cart.deleteProduct({
            productIds: productId
        }, function (res) {
            _this.renderCart(res)
        }, function (errMsg) {
            _mm.errorTips(errMsg)
        })
    }
}
$(function () {
    page.init()
})
