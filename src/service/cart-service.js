let _mm = require('util/mm.js')
let _cart = {
    addToCart: function (productInfo, resolve, reject) {
        _mm.request({
            url: '/api/cart/add.do',
            data: productInfo,
            method: "POST",
            success: resolve,
            error: reject
        })
    },
    selectProduct: function (productId, resolve, reject) {
        _mm.request({
            url: '/api/cart/select.do',
            data: {productId:productId},
            method: "GET",
            success: resolve,
            error: reject
        })
    },
    cancelSelectProduct: function (productId, resolve, reject) {
        _mm.request({
            url: '/api/cart/un_select.do',
            data: {productId:productId},
            method: "GET",
            success: resolve,
            error: reject
        })
    },
    selectProductAll: function ( resolve, reject) {
        _mm.request({
            url: '/api/cart/select_all.do',
            method: "GET",
            success: resolve,
            error: reject
        })
    },
    cancelSelectProductAll: function ( resolve, reject) {
        _mm.request({
            url: '/api/cart/un_select_all.do',
            method: "GET",
            success: resolve,
            error: reject
        })
    },
    getCartList: function ( resolve, reject) {
        _mm.request({
            url: '/api/cart/list.do',
            method: "GET",
            success: resolve,
            error: reject
        })
    },
    getCartCount: function ( resolve, reject) {
        _mm.request({
            url: '/api/cart/get_total_num.do',
            method: "GET",
            success: resolve,
            error: reject
        })
    },
    updateProduct: function (productInfo, resolve, reject) {
        _mm.request({
            url: '/api/cart/update.do',
            data: productInfo,
            method: "POST",
            success: resolve,
            error: reject
        })
    },
    deleteProduct: function (productId, resolve, reject) {
        _mm.request({
            url: '/api/cart/delete_product.do',
            data: productId,
            method: "POST",
            success: resolve,
            error: reject
        })
    }

}
module.exports = _cart
