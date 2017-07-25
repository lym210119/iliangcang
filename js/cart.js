/*
* @Author: liyangming
* @Date:   2017-07-24 17:56:47
* @Last Modified by:   liyangming
* @Last Modified time: 2017-07-25 16:36:55
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
								<p class="goods-subtotal" value="'+ obj.subtotal +'">￥<em class="goods-price">' + obj.goods_price +'</em></p>\
								<ul>\
									<li class="minus">-</li>\
									<li class="nums goods_number" value="' + obj.goods_number + '">'+ obj.goods_number +'</li>\
									<li class="plus">+</li>\
								</ul>\
    						</div>\
    					</div>\
    					<div>\
    						<img class="delete" src="images/delete.png" alt="">\
    					</div>\
    				</li>\
    				');
				// $("#result").html('<p>合计：￥<em id="sum">'+ obj.subtotal +'</em></p>')
			}
			showSun();
		}
	});
});

// 显示总价
function showSun() {
	var goods_boxs = $('.goods-box');
	console.log(goods_boxs);
	var sum = 0;
	for (var i = 0; i < goods_boxs.length; i++) {
		var li = goods_boxs[i];
		// console.log(li);
		if ($(li).children(".checked").children('input').is(':checked')) {
			console.log(li.getElementsByClassName("goods-subtotal"));
			sum += parseInt(li.getElementsByClassName("goods-subtotal")[0].getAttribute("value"));
		}
	}
	console.log(sum);
	$("#sum").text(sum);
}
$('#checkAll').on("click", function(event){
	event = event || widnow.event;
	var selected = event.target.checked;
	console.log(selected);
    var checkboxs = document.getElementsByClassName("goods-id");
        console.log(checkboxs);
        for (var i = 0; i < checkboxs.length; i++) {
            checkboxs[i].checked = selected;
        }
        showSun();
        return;
})

// 事件委托，点击表格中任意元素都会触发

$("#cart-goods").click(function(event) {
	event = event || window.event;
	if (event.target.className === "minus") {
		 updateCart(event.target, "-1");
	}
	if (event.target.className === "plus") {
		 updateCart(event.target, "+1");
	}
	if (event.target.className === "goods-id") {
		showSun();
		checkSelectAll()
	}
	if (event.target.className === "delete") {
		// deleteGoods(event.target);
		var li = event.target.parentNode.parentNode;
		console.log(li);
		var goods_id = $(li).children(".checked").children("input").val();
		console.log(goods_id);
    	shop.api.updateCart(goods_id, "0", function(response){
    		console.log(response);
    	});

    	// 删除DOM元素
    	li.parentNode.removeChild(li);
    	
    	showSun();	
	}
})

// 检查全选的状态，不等于购物车里面的数量的时候就是 false
function checkSelectAll() {
    var goods_count = $("input[type=checkbox]").filter('.goods-id').length;
    console.log(goods_count);
    console.log($("input[type=checkbox]").filter('.goods-id').filter(":checked"));
    if ($("input[type=checkbox]").filter('.goods-id').filter(":checked").length !== goods_count) {
        $("#checkAll").prop("checked", false);
    } else {
        $("#checkAll").prop("checked", true);
    }
}

// 从购物车中删除某件商品
// function deleteGoods(obj) {

// }


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
    var goods_price = li.getElementsByClassName("goods-price")[0];
    var goods_price_value = parseInt(goods_price.innerText);
    var goods_subtotal = li.getElementsByClassName("goods-subtotal")[0];
    console.log(goods_subtotal);
    var goods_subtotal_value = goods_subtotal.getAttribute("value");



        //获得商品编号 和 数量
    if (num === '-1' && goods_number_value <= 1) {
        //当前商品数量为1, 并且是减，不允许再减
        return;
    }
    if (num === '+1' && goods_number_value >= 10) {
        //当前商品数量为10, 并且是加操作，不允许再加
        return;
    }
    if (num === '-1') { //-1
    	// console.log(123);
        goods_number_value--;
        goods_number.text(goods_number_value)
        showSun();
    } else if (num === '+1') { //+1
        goods_number_value++;
        goods_number.text(goods_number_value)
        showSun();
    } else if (num > 0) { //设置固定的数
        goods_number_value = num;
    } else { //删除
        goods_number_value = 0;
    }
    // console.log(goods_number_value);
    goods_number.value = goods_number_value;

    var subtotal = goods_number_value * goods_price_value;

    goods_subtotal.setAttribute('value', subtotal);
    // console.log(goods_subtotal.value);

	

    shop.api.updateCart(goods_id, goods_number_value, function(response){
    	console.log(response);
    });
    showSun();	
}