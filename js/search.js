/*
* @Author: liyangming
* @Date:   2017-07-22 15:50:00
* @Last Modified by:   liyangming
* @Last Modified time: 2017-07-27 18:56:21
*/

'use strict';

(function(){
    var close = document.querySelector(".close");
    console.log(close);
    var head = document.querySelector(".head");
    close.addEventListener('click', function(){
        head.style.display = "none";
        document.body.style.paddingTop = "2.4rem";
        $('header').css('height','2.4rem');
    }, false)


    $()
})();

//获取参数search_text, 然后将内容放到搜索框
var searchText = $.getQueryString('search_text');
console.log(searchText);
var oSearchText = document.getElementById('search-text');
oSearchText.value = searchText;


	// $.ajax({
	//     "url": 'http://h6.duchengjiu.top/shop/api_goods.php',
	//     'type': 'GET',
	//     'dataType': 'json',
	//     'data':{
	//     	"search_text": searchText
	// 	  },
	//     'success': function(response) {
	//     	console.log(response);
	//     }
	// });






// $.ajax({
// 	"url":"http://h6.duchengjiu.top/shop/api_goods.php?search_text=" + searchText,
// 	"type": "GET",
// 	"dataType": "json",
// 	"data": {
// 		"pagesize": 12
// 	},
// 	"success": function(response) {
// 		console.log(response);
// 	}
// });

searchGoods();
//调用搜索商品接口
function searchGoods() {
    shop.api.searchGoods({
        "search_text": searchText,
        // "page": 1,
        // "pagesize": 100,
        "callback": function(response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
            	var obj = response.data[i];
	            var html = '<li>\
	                    <a href=detail.html?goods_id"'+ obj.goods_id +'">\
	                        <img src="'+ obj.goods_thumb +'" alt="">\
	                        <p>'+ obj.goods_name +'</p>\
	                        <span>￥<em>'+ obj.price+'</em></span>\
	                    </a>\
	                </li>';
	             $('#goods').append(html);  
            }
        }
    })
}
