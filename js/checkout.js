/*
* @Author: liyangming
* @Date:   2017-07-25 17:20:09
* @Last Modified by:   liyangming
* @Last Modified time: 2017-07-25 21:06:03
*/

'use strict';

$(function(){
	shop.api.fetchCart(function(response){
		console.log(response);
		if (response.data.length > 0) {
			var sum = 0;
			for (var i = 0; i < response.data.length; i++) {
				var obj = response.data[i];
				console.log(obj);
				$('#goods-list').append('<li>\
					<div class="goods-pic"><img src="'+ obj.goods_thumb +'" alt=""></div>\
					<div class="goods-info">\
						<p class="title">'+ obj.goods_name +'</p>\
						<p class="price">￥<em>'+ obj.goods_price +'</em> <i>x'+ obj.goods_number +'</i><span></span></p>\
						<p class="mail">免运费（限中国大陆）</p>\
					</div>\
				</li>');

				sum += parseInt(obj.goods_price * obj.goods_number);
				console.log(sum);
				$('#result').text(sum);
			}
		}
	});
})

fetchUserAddress();
function fetchUserAddress() {
	shop.api.fetchUserAddress(function(response){
		console.log(response);
		for (var i = 0; i < response.data.length; i++) {
			var obj = response.data[i];
			console.log(obj);
			$("#addlist").append('<li class="addItem">\
					<div class="chose" data-id="'+ obj.address_id +'"></div>\
					<div class="add-info">\
						<p>'+ obj.address_name +'&nbsp;&nbsp;/&nbsp;&nbsp;'+ obj.mobile +'</p>\
						<p>[默认]'+ obj.province +'&nbsp;&nbsp;'+ obj.city +'&nbsp;&nbsp;'+ obj.address +'</p>\
					</div>\
					<div class="edit" data-id="'+ obj.address_id +'">\
					</div>\
				</li>')
		}
	})
}