/*
* @Author: liyangming
* @Date:   2017-07-21 17:10:02
* @Last Modified by:   liyangming
* @Last Modified time: 2017-07-22 10:53:14
*/

'use strict';

(function(){
	var close = document.querySelector(".close");
	console.log(close);
	var head = document.querySelector(".head");
	close.addEventListener('click', function(){
		head.style.display = "none";
		document.body.style.marginTop = "2.4rem";
	}, false)
})();




// ajax 
(function(){
	var url = "http://h6.duchengjiu.top/shop/api_goods.php";
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var obj = JSON.parse(xhr.responseText).data;
			console.log(obj);

			var goods = document.querySelector("#goods");
			console.log(goods);
			
			for (var i = 1; i < obj.length; i++) {
				var li = document.createElement("li");
				var a = document.createElement("a");
				a.href = "detail.html?goods_id=" + obj[i].goods_id;
				var img = document.createElement("img");
				img.src = obj[i].goods_thumb;
				
				var p = document.createElement("p");
				p.innerText = obj[i].goods_name;
				var span = document.createElement("span");
				span.innerHTML = "￥<em>" + obj[i].price + "</em>";
				a.appendChild(img);
				a.appendChild(p);
				a.appendChild(span);
				li.appendChild(a);
				goods.append(li);
			}
			

		}
	}
	xhr.open("GET", url);
	xhr.send(null);
})();




// banner
(function() {
    // 得到轮播图里面的li
    var carousel = document.querySelector('#carousel');
    var imagesLis = document.querySelectorAll('#carousel .imglist li');
    var circleLis = document.querySelectorAll('#circles li');

    console.log(imagesLis);
    // 信号量
    var idx = 0; // 当前中间图片
    var next = 1; //下一张图
    var prev = imagesLis.length - 1; // 上一张
    var timer = setInterval(function() {
        showNext();
    }, 3000);

    //批量给小圆点绑定touch事件
    for (var i = 0; i < circleLis.length; i++) {
        (function(i) {
            circleLis[i].addEventListener('touchstart', function() {
                clearInterval(timer);
                setCurrentImage(i); //设置当前应该显示第几张
            }, false);
        })(i);
    }

    function setCurrentImage(_idx) {
        idx = _idx;
        prev = idx - 1;
        if (prev === -1) {
            prev = imagesLis.length - 1;
        }
        next = idx + 1;
        if (next > imagesLis.length - 1) {
            next = 0;
        }

        init(); //设置一下当前的图片合适的位置和小圆点合适的位置

        clearInterval(timer);
        timer = setInterval(function() {
            showNext();
        }, 3000);
    }

    var windowWidth;

    // 初始化
    init();

    // 屏幕尺寸改变重新执行初始化
    window.onresize = init;

    function init() {
        // 屏幕的宽度
        windowWidth = document.documentElement.clientWidth;

        // 图片的宽度 / 图片的高度 = 窗口的宽度 / 动态的图片的高度 

        // 设置盒子的高度
        // carousel.style.height = windowWidth / (1680 / 1050) + "px";

        // 设置li的默认位置
        for (var i = 0; i < imagesLis.length; i++) {
            imagesLis[i].style.webkitTransform = "translateX(" + windowWidth + "px)";
        }
        // 去掉过渡，移动的时候我们希望实时跟随鼠标，而不是有过渡效果
        imagesLis[prev].style.transition = "none";
        imagesLis[idx].style.transition = "none";
        imagesLis[next].style.transition = "none";

        // 新的位置
        changePic();
        setPoint();

    }

    // 事件监听
    carousel.addEventListener("touchstart", touchstartHandler, false);
    carousel.addEventListener("touchmove", touchmoveHandler, false);
    carousel.addEventListener("touchend", touchendHandler, false);


    var startX, startTime;

    function touchstartHandler(event) {
        // 阻止默认行为
        event.preventDefault();
        // 手指个数
        if (event.touches.length > 1) return;

        // 记录偏移值
        
        startX = event.touches[0].clientX;

        // 记录时间
        startTime = new Date();

        // 去掉过渡效果
        imagesLis[prev].style.transition = "none";
        imagesLis[idx].style.transition = "none";
        imagesLis[next].style.transition = "none";

    }
    // 手指移动的时候
    function touchmoveHandler(event) {
        event.preventDefault();
        //手指个数

        if (event.touches.length > 1) return;

        // 得到坐标X
        var clientX = event.touches[0].clientX;

        // 改变图片的位置
        imagesLis[idx].style.webkitTransform = "translateX(" + (clientX - startX) + "px)";
        imagesLis[next].style.webkitTransform = "translateX(" + (windowWidth + (clientX - startX)) + "px)";
        imagesLis[prev].style.webkitTransform = "translateX(" + (-windowWidth + (clientX - startX)) + "px)";
    }

    // 触摸结束事件
    function touchendHandler(event) {
        console.log(event);
        event.preventDefault();
        //判断滑动是否成功
        var distance = event.changedTouches[0].clientX - startX;
        //滑动的时间
        var time = new Date() - startTime;

        //如果你向右边滑动超过了屏幕的一半，或者向右滑动时间小于300毫秒，距离大于30px则认为滑动成功
        if (distance >= windowWidth / 2 || (distance > 30 && time < 300)) {
            showPrev();
        } else if (distance <= -windowWidth / 2 || (distance < -30 && time < 300)) {
            showNext();
        } else {
            //绝对值不到windowWidth/2
            console.log('不成功');

            //加上过渡
            imagesLis[prev].style.transition = "all 0.3s ease 0s";
            imagesLis[idx].style.transition = "all 0.3s ease 0s";
            imagesLis[next].style.transition = "all 0.3s ease 0s";

            // 移动
            imagesLis[prev].style.webkitTransform = "translateX(" + -windowWidth + "px)";
            imagesLis[idx].style.webkitTransform = "translateX(0px)";
            imagesLis[next].style.webkitTransform = "translateX(" + windowWidth + "px)";

            clearInterval(timer);
            timer = setInterval(function() {
                showNext();
            }, 3000);
        }
    }

    function showPrev() {
        console.log('向右滑动成功');
        next = idx;
        idx = prev;
        prev--;
        if (prev < 0) {
            prev = imagesLis.length - 1;
        }
        // 加上过渡
        imagesLis[idx].style.transition = "all 0.3s ease 0s";
        imagesLis[next].style.transition = "all 0.3s ease 0s";
        imagesLis[prev].style.transition = "none";

        // 移动
        changePic();
        setPoint();

    }

    function showNext() {
        console.log('向左滑动成功');
        // 先改变信号量
        prev = idx;
        idx = next;
        next++;
        if (next > imagesLis.length - 1) {
            next = 0;
        }

        // 加上过渡
        imagesLis[idx].style.transition = "all 0.3s ease 0s";
        imagesLis[prev].style.transition = "all 0.3s ease 0s";
        imagesLis[next].style.transition = "none";

        // 移动
        changePic();
        setPoint();

    }

    function changePic() {
        imagesLis[idx].style.webkitTransform = "translateX(0px)";
        imagesLis[next].style.webkitTransform = "translateX(" + windowWidth + "px)";
        imagesLis[prev].style.webkitTransform = "translateX(" + -windowWidth + "px)";
    }

    function setPoint() {
        for (var i = 0; i < circleLis.length; i++) {
            circleLis[i].className = "";
        }
        circleLis[idx].className = "cur";
    }
})();

