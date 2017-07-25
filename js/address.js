/*
* @Author: liyangming
* @Date:   2017-07-25 20:25:45
* @Last Modified by:   liyangming
* @Last Modified time: 2017-07-25 21:40:33
*/

'use strict';
$(function(){
	$("#saveAdd").click(function(){
		var data = $('form').serialize();
		console.log(data);
		shop.api.addUserAddress(data, function(response){
			console.log(response);
			if (response.code === 0) {
				fetchUserAddress();
				location.href = "checkout.html";
			}
		})
	});
});



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
				</li>');
		}
	})
}


$(".edit").click(function(){
	location.href = "address.html?data-id=" + $(this).getAttribute("data-id");
})