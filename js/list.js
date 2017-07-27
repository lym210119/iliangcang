/*
* @Author: liyangming
* @Date:   2017-07-24 09:07:12
* @Last Modified by:   liyangming
* @Last Modified time: 2017-07-27 18:56:47
*/

'use strict';

shop.api.fetchGoodsCategory(function(response){
	console.log(response);
	for (var i = 0; i < response.data.length; i++) {
		var obj = response.data[i];
		var imgSrc = "list"+ (i+1) +".png";
		if (i === 3) {
			imgSrc = "list"+ (i+1) +".jpg";
		}
		$("#list").append('<li>\
                    <a href="goodslist.html?cat_id='+ obj.cat_id +'"><img src="images/'+ imgSrc +'" alt=""></a>\
                </li>');
	}
});


$('.close-footer').click(function(){
	$('footer').css("display", "none");
})