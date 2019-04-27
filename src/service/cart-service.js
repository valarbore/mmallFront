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
    }
}
module.exports = _cart
