/*
* @Author: liyangming
* @Date:   2017-07-24 15:06:55
* @Last Modified by:   liyangming
* @Last Modified time: 2017-07-24 20:25:22
*/

'use strict';

var goods_id = $.getQueryString("goods_id");
console.log(goods_id);

shop.api.fetchGoodsDetail(goods_id, function(response){
	var obj = response.data[0];
	console.log(obj);

	$(".goods-pic").html('<img src="'+ obj.goods_thumb +'"/>');
	$(".goods-desc").html(obj.goods_desc);
	$(".goods-price").html(obj.price);
});


var num = $(".nums").text();
console.log(num);
$(".minus").click(function(){
	num--;
	if(num < 1) {
		num = 1;
	}
	$(".nums").text(num);
});
$(".plus").click(function(){
	num++;
	if(num > 100) {
		num = 100;
	}
	$(".nums").text(num);
});

$("#cart-btn").click(function(){
	if (!localStorage.token) {
		location.href = "login.html#callbackurl=" + location.href;
		return;
	}

	var goods_number = localStorage.getItem("cart" + goods_id);
	console.log(goods_number);
	goods_number = goods_number ? parseInt(goods_number) + 1 : 1;
	console.log(goods_id, goods_number)
	console.log(localStorage.getItem("token"));
	updateCartInfo(goods_id, goods_number, function(response){
		console.log(response);
		// location.href = "/cart.html";
	});
});