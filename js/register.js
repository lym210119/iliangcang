/*
* @Author: liyangming
* @Date:   2017-07-22 12:34:48
* @Last Modified by:   liyangming
* @Last Modified time: 2017-07-22 14:01:41
*/

'use strict';

(function(){
	// 验证用户名
	$("input[name=username]").blur(function(){
		// var reg = /^\w{3,20}$/;
		// 	if(!reg.test($(this).val())) {
		// 		$(".error-user").html("帐号须由3-20个字符组成");
		// 	}
		$.post("http://h6.duchengjiu.top/shop/api_user.php", {
			"status": "check",
			"username": $(this).val()
		}, function(response){
			console.log(response);

			if (response.code === 2001) {
				$(".error-user").html("用户名已存在");
			} else if (response.code === 1000) {
				$(".error-user").html("用户名必须由3-20个字符组成");
			} else {
				$(".error-user").html("");
			}

		}, "json");
	})
	// 验证密码和注册
	$("#reg-btn").click(function() {
		var username = $('input[name="username"]').val();
		var password = $('input[name="password"]').val();

		if (password.length < 6 || password.length > 20) {
			$('.error-pass').html('密码必须由6-20个字符组成，区分大小写')
		}
		$.post('http://h6.duchengjiu.top/shop/api_user.php', {
			"status": "register",
			"username": username,
			"password": password
		}, function(response){
			console.log(response);
			if (response.code === 0) {
				alert(response.message);
				location.assign("index.html");
			}
		}, "json")
	});
})()