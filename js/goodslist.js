/*
* @Author: liyangming
* @Date:   2017-07-24 10:05:23
* @Last Modified by:   liyangming
* @Last Modified time: 2017-07-24 10:23:41
*/

'use strict';

var cat_id = $.getQueryString("cat_id");
shop.api.fetchGoodsListByCatId(cat_id, function(response){
	console.log(response);
	if (response.data.length === 0) {
		$('#goodslist').html("<h1>当前分类下面没有商品<h1>");
	}

	for (var i = 0; i <response.data.length; i++) {
		var obj = response.data[i];
		$('#goodslist').append('<li>\
                    <a href="detail.html?goods_id='+ obj.goods_id +'">\
                        <img src="'+ obj.goods_thumb +'" alt="">\
                        <p>'+ obj.goods_name +'</p>\
                        <span>￥<em>'+ obj.price +'</em></span>\
                    </a>\
                </li>');
		
	}
});