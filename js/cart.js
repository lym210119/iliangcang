/*
* @Author: liyangming
* @Date:   2017-07-24 17:56:47
* @Last Modified by:   liyangming
* @Last Modified time: 2017-07-25 12:53:58
*/

'use strict';


$(function() {
	shop.api.fetchCart(function(response) {
		console.log(response);
		if (response.data.length > 0) {
			for (var i = 0; i < response.data.length; i++) {
				var obj = response.data[i];
				obj.subtotal = parseInt(obj.goods_price) * parseInt(obj.goods_number);
				console.log(obj);
				$("#cart-goods").append('<li class="goods-box">\
    					<div class="checked"><input class="goods-id" value="'+ obj.goods_id +'" type="checkbox" checked="checked"></div>\
    					<div>\
    						<span><img src="'+ obj.goods_thumb +'" alt=""></span>\
    						<div class="goods-info">\
    							<p>'+ obj.goods_name +'</p>\
								<p>￥<em>' + obj.goods_price +'</em></p>\
								<ul>\
									<li class="minus">-</li>\
									<li class="nums goods_number" value="' + obj.goods_number + '">'+ obj.goods_number +'</li>\
									<li class="plus">+</li>\
								</ul>\
    						</div>\
    					</div>\
    					<div>\
    						<img src="images/delete.png" alt="">\
    					</div>\
    				</li>\
    				');
				$("#result").html('<p>合计：￥<em id="sum">'+ obj.subtotal +'</em></p>')
			}
			showSun();
		}
	});
});

// 显示总价
function showSun() {
	var goods_boxs = $('.goods-box');
	var sum = 0;
	for (var i = 0; i < goods_boxs.length; i++) {
		var li = goods_boxs[i];
		if ($(li).children(".checked").children('input').is(':checked')) {
			sum += parseInt($(li).children("div:nth-child(2)").children(".goods-info").children("p:nth-child(2)").children("em").text());
		}
	}
	$("#sum").text(sum);
}

// 事件委托，点击表格中任意元素都会触发
$("#cart-goods").click(function(event) {
	event = event || window.event;
	if (event.target.className === "plus") {
		 updateCart(event.target, 1);
	}
})


$("checkAll").click(function(){
	if ($(this).is(":checked")) {
		$('.goods-id').each(function(i){
			$(this).prop('checked', false);
		});
	} else {
		$('.goods-id').each(function(i){
			$(this).prop('checked', true);
		});
	}
})



// obj 当前操作的对象
// num 减 1 或者 加 1 ， 或者是固定的数字，或者是 0；
function updateCart(obj, num) {
	// 数量为1的时候不处理，数量大于1的时候
    // 商品数量减1，最少数量是1
    // 商品小计重新计算和赋值
    // 显示总价
    // 请求ajax
    var li = obj.parentNode.parentNode.parentNode.parentNode;
   
    var goods_id = $(li).children(".checked").children("input").val();
    // console.log(goods_id);
    var goods_number = $(obj.parentNode).children(".goods_number");
    var goods_number_value = parseInt(goods_number.text());
    // console.log(li);
    // console.log(goods_id);
    console.log(goods_number);
    console.log(goods_number_value);


    goods_number_value += num;

    console.log(goods_number_value);
    goods_number.text(goods_number_value);

    shop.api.updateCart(goods_id, goods_number_value, function(response){
    	console.log(response);
    });
    	showSun();
}