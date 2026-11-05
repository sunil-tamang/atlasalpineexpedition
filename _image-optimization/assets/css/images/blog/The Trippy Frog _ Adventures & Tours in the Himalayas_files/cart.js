/* https://cdnjs.cloudflare.com/ajax/libs/Ladda/1.0.6/spin.min.js */

!function(t,i){"object"==typeof exports?module.exports=i():"function"==typeof define&&define.amd?define(i):t.Spinner=i()}(this,function(){"use strict";function t(t,i){var e,o=document.createElement(t||"div");for(e in i)o[e]=i[e];return o}function i(t){for(var i=1,e=arguments.length;i<e;i++)t.appendChild(arguments[i]);return t}function e(t,i,e,o){var n=["opacity",i,~~(100*t),e,o].join("-"),r=.01+e/o*100,s=Math.max(1-(1-t)/i*(100-r),t),a=l.substring(0,l.indexOf("Animation")).toLowerCase(),c=a&&"-"+a+"-"||"";return d[n]||(p.insertRule("@"+c+"keyframes "+n+"{0%{opacity:"+s+"}"+r+"%{opacity:"+t+"}"+(r+.01)+"%{opacity:1}"+(r+i)%100+"%{opacity:"+t+"}100%{opacity:"+s+"}}",p.cssRules.length),d[n]=1),n}function o(t,i){var e,o,n=t.style;for(i=i.charAt(0).toUpperCase()+i.slice(1),o=0;o<c.length;o++)if(e=c[o]+i,void 0!==n[e])return e;if(void 0!==n[i])return i}function n(t,i){for(var e in i)t.style[o(t,e)||e]=i[e];return t}function r(t){for(var i=1;i<arguments.length;i++){var e=arguments[i];for(var o in e)void 0===t[o]&&(t[o]=e[o])}return t}function s(t,i){return"string"==typeof t?t:t[i%t.length]}function a(t){this.opts=r(t||{},a.defaults,u)}var l,c=["webkit","Moz","ms","O"],d={},p=function(){var e=t("style",{type:"text/css"});return i(document.getElementsByTagName("head")[0],e),e.sheet||e.styleSheet}(),u={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",position:"absolute"};a.defaults={},r(a.prototype,{spin:function(i){this.stop();var e=this,o=e.opts,r=e.el=n(t(0,{className:o.className}),{position:o.position,width:0,zIndex:o.zIndex});o.radius,o.length,o.width;if(n(r,{left:o.left,top:o.top}),i&&i.insertBefore(r,i.firstChild||null),r.setAttribute("role","progressbar"),e.lines(r,e.opts),!l){var s,a=0,c=(o.lines-1)*(1-o.direction)/2,d=o.fps,p=d/o.speed,u=(1-o.opacity)/(p*o.trail/100),f=p/o.lines;!function t(){a++;for(var i=0;i<o.lines;i++)s=Math.max(1-(a+(o.lines-i)*f)%p*u,o.opacity),e.opacity(r,i*o.direction+c,s,o);e.timeout=e.el&&setTimeout(t,~~(1e3/d))}()}return e},stop:function(){var t=this.el;return t&&(clearTimeout(this.timeout),t.parentNode&&t.parentNode.removeChild(t),this.el=void 0),this},lines:function(o,r){function a(i,e){return n(t(),{position:"absolute",width:r.length+r.width+"px",height:r.width+"px",background:i,boxShadow:e,transformOrigin:"left",transform:"rotate("+~~(360/r.lines*d+r.rotate)+"deg) translate("+r.radius+"px,0)",borderRadius:(r.corners*r.width>>1)+"px"})}for(var c,d=0,p=(r.lines-1)*(1-r.direction)/2;d<r.lines;d++)c=n(t(),{position:"absolute",top:1+~(r.width/2)+"px",transform:r.hwaccel?"translate3d(0,0,0)":"",opacity:r.opacity,animation:l&&e(r.opacity,r.trail,p+d*r.direction,r.lines)+" "+1/r.speed+"s linear infinite"}),r.shadow&&i(c,n(a("#000","0 0 4px #000"),{top:"2px"})),i(o,i(c,a(s(r.color,d),"0 0 1px rgba(0,0,0,.1)")));return o},opacity:function(t,i,e){i<t.childNodes.length&&(t.childNodes[i].style.opacity=e)}});var f=n(t("group"),{behavior:"url(#default#VML)"});return!o(f,"transform")&&f.adj?function(){function e(i,e){return t("<"+i+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',e)}p.addRule(".spin-vml","behavior:url(#default#VML)"),a.prototype.lines=function(t,o){function r(){return n(e("group",{coordsize:d+" "+d,coordorigin:-c+" "+-c}),{width:d,height:d})}function a(t,a,l){i(u,i(n(r(),{rotation:360/o.lines*t+"deg",left:~~a}),i(n(e("roundrect",{arcsize:o.corners}),{width:c,height:o.width,left:o.radius,top:-o.width>>1,filter:l}),e("fill",{color:s(o.color,t),opacity:o.opacity}),e("stroke",{opacity:0}))))}var l,c=o.length+o.width,d=2*c,p=2*-(o.width+o.length)+"px",u=n(r(),{position:"absolute",top:p,left:p});if(o.shadow)for(l=1;l<=o.lines;l++)a(l,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(l=1;l<=o.lines;l++)a(l);return i(t,u)},a.prototype.opacity=function(t,i,e,o){var n=t.firstChild;o=o.shadow&&o.lines||0,n&&i+o<n.childNodes.length&&(n=(n=(n=n.childNodes[i+o])&&n.firstChild)&&n.firstChild)&&(n.opacity=e)}}():l=o(f,"animation"),a});

/* https://cdnjs.cloudflare.com/ajax/libs/Ladda/1.0.6/ladda.min.js */

/*!
 * Ladda 1.0.6 (2018-02-04, 13:15)
 * http://lab.hakim.se/ladda
 * MIT licensed
 *
 * Copyright (C) 2017 Hakim El Hattab, http://hakim.se
 */

!function(t,e){"use strict";"object"==typeof exports?module.exports=e(require("spin.js")):"function"==typeof define&&define.amd?define(["spin"],e):t.Ladda=e(t.Spinner)}(this,function(t){"use strict";var e=[];function a(a){if(void 0!==a){if(/ladda-button/i.test(a.className)||(a.className+=" ladda-button"),a.hasAttribute("data-style")||a.setAttribute("data-style","expand-right"),!a.querySelector(".ladda-label")){var u=document.createElement("span");u.className="ladda-label",n=a,i=u,(r=document.createRange()).selectNodeContents(n),r.surroundContents(i),n.appendChild(i)}var n,i,r,d,o,s=a.querySelector(".ladda-spinner");s||((s=document.createElement("span")).className="ladda-spinner"),a.appendChild(s);var F={start:function(){return d||(d=function(e){var a,u,n=e.offsetHeight;0===n&&(n=parseFloat(window.getComputedStyle(e).height));n>32&&(n*=.8);e.hasAttribute("data-spinner-size")&&(n=parseInt(e.getAttribute("data-spinner-size"),10));e.hasAttribute("data-spinner-color")&&(a=e.getAttribute("data-spinner-color"));e.hasAttribute("data-spinner-lines")&&(u=parseInt(e.getAttribute("data-spinner-lines"),10));var i=.2*n;return new t({color:a||"#fff",lines:u||12,radius:i,length:.6*i,width:i<7?2:3,zIndex:"auto",top:"auto",left:"auto",className:""})}(a)),a.disabled=!0,a.setAttribute("data-loading",""),clearTimeout(o),d.spin(s),this.setProgress(0),this},startAfter:function(t){return clearTimeout(o),o=setTimeout(function(){F.start()},t),this},stop:function(){return F.isLoading()&&(a.disabled=!1,a.removeAttribute("data-loading")),clearTimeout(o),d&&(o=setTimeout(function(){d.stop()},1e3)),this},toggle:function(){return this.isLoading()?this.stop():this.start()},setProgress:function(t){t=Math.max(Math.min(t,1),0);var e=a.querySelector(".ladda-progress");0===t&&e&&e.parentNode?e.parentNode.removeChild(e):(e||((e=document.createElement("div")).className="ladda-progress",a.appendChild(e)),e.style.width=(t||0)*a.offsetWidth+"px")},enable:function(){return this.stop()},disable:function(){return this.stop(),a.disabled=!0,this},isLoading:function(){return a.hasAttribute("data-loading")},remove:function(){clearTimeout(o),a.disabled=!1,a.removeAttribute("data-loading"),d&&(d.stop(),d=null),e.splice(e.indexOf(F),1)}};return e.push(F),F}console.warn("Ladda button target must be defined.")}function u(t,e){if("function"==typeof t.addEventListener){var u=a(t),n=-1;t.addEventListener("click",function(){var a,i,r=!0,d=function(t,e){for(;t.parentNode&&t.tagName!==e;)t=t.parentNode;return e===t.tagName?t:void 0}(t,"FORM");if(void 0!==d&&!d.hasAttribute("novalidate"))if("function"==typeof d.checkValidity)r=d.checkValidity();else for(var o=(a=d,i=[],["input","textarea","select"].forEach(function(t){for(var e=a.getElementsByTagName(t),u=0;u<e.length;u++)e[u].hasAttribute("required")&&i.push(e[u])}),i),s=0;s<o.length;s++){var F=o[s],l=F.getAttribute("type");if(""===F.value.replace(/^\s+|\s+$/g,"")&&(r=!1),"checkbox"!==l&&"radio"!==l||F.checked||(r=!1),"email"===l&&(r=/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i.test(F.value)),"url"===l&&(r=/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(F.value)),!r)break}r&&(u.startAfter(1),"number"==typeof e.timeout&&(clearTimeout(n),n=setTimeout(u.stop,e.timeout)),"function"==typeof e.callback&&e.callback.apply(null,[u]))},!1)}}return{bind:function(t,e){var a;if("string"==typeof t)a=document.querySelectorAll(t);else{if("object"!=typeof t)throw new Error("target must be string or object");a=[t]}e=e||{};for(var n=0;n<a.length;n++)u(a[n],e)},create:a,stopAll:function(){for(var t=0,a=e.length;t<a;t++)e[t].stop()}}});





/*=======================CART.JS===========================*/

var app = window.app || {},
business_paypal = 'jondoe@gmail.com'; // here goes your paypal email

(function($){
	'use strict';

	//no conflict con underscores

	app.init = function(){
		//totalItems totalAmount
		var total = 0,
		items = 0

		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;

		if(undefined != cart.items && cart.items != null && cart.items != '' && cart.items.length > 0){
			_.forEach(cart.items, function(n, key) {
			   items = (items + n.cant)
			   total = total  + (n.cant * n.price)
			});
		}
		$('.totalItems').text(items) 	// Custom Total Items
		$('#totalItems').text(items)
		$('.totalAmount').text('$ '+total+ ' INR')

	}

	app.createProducts = function(productName){

		var products = [
			// {
			// 	id : 1,
			// 	name : 'Beas River Rafting 12 KM ',
			// 	img : 'assets/css/thumbs/rafting_num/rafting1.jpg',
			// 	oldprice: 1200.00,
			// 	price : 1000.00,
			// 	prodType : 'rafting',
			// 	stock : 4,
			// 	location: 'Kullu',
			// 	urlName : 'beas-river-rafting'
			// },
			{
				id : 1,
				name : 'Trishuli River Rafting Tour ',
				img : 'assets/css/images/rafting/banner01.jpg',
				oldprice: 1200.00,
				price : 1000.00,
				prodType : 'rafting',
				descShort :   "If you're looking for an exhilarating outdoor adventure that's perfect for the whole family or a group of friends, Trishuli River rafting is just what you need! This one-day tour takes you on a thrilling ride down one of Nepal's most famous rivers, surrounded by stunning natural scenery and local culture.",
				descPartOne : "If you're looking for an exhilarating outdoor adventure that's perfect for the whole family or a group of friends, Trishuli River rafting is just what you need! This one-day tour takes you on a thrilling ride down one of Nepal's most famous rivers, surrounded by stunning natural scenery and local culture.",
				descPartTwo : "If you're looking for an exhilarating outdoor adventure that's perfect for the whole family or a group of friends, Trishuli River rafting is just what you need! This one-day tour takes you on a thrilling ride down one of Nepal's most famous rivers, surrounded by stunning natural scenery and local culture.",
				stock : 4,
				location: 'Trishuli River Nepal',
				urlName : 'trishuli-river-rafting'
			},
			{
				id : 2,
				name : 'Bhote Koshi River Rafting Tour ',
				img : 'assets/css/images/rafting/banner1.jpg',
				oldprice: 1200.00,
				price : 1000.00,
				prodType : 'rafting',
				descShort :   'Bhote Koshi River Rafting Tour is an exciting adventure activity that takes you through one of the most thrilling white water rapids in Nepal. The Bhote Koshi River is located just a few hours drive from Kathmandu, and it offers some of the best rapids for rafting and kayaking enthusiasts...',
				descPartOne : 'Bhote Koshi River Rafting Tour is an exciting adventure activity that takes you through one of the most thrilling white water rapids in Nepal. The Bhote Koshi River is located just a few hours drive from Kathmandu, and it offers some of the best rapids for rafting and kayaking enthusiasts...',
				descPartTwo : 'Bhote Koshi River Rafting Tour is an exciting adventure activity that takes you through one of the most thrilling white water rapids in Nepal. The Bhote Koshi River is located just a few hours drive from Kathmandu, and it offers some of the best rapids for rafting and kayaking enthusiasts...',
				stock : 4,
				location: 'Kullu',
				urlName : 'bhote-koshi-river-rafting'
			},
			{
				id : 3,
				name : 'Karnali River Rafting Tour ',
				img : 'assets/css/images/rafting/banner2.jpg',
				oldprice: 1200.00,
				price : 1000.00,
				prodType : 'rafting',
				descShort :   "The Karnali River is one of Nepal's most challenging and longest rivers, and rafting down its rapids is an adventure that you'll never forget. This 10-day expedition takes you through remote areas of Nepal, where you'll experience breathtaking scenery, interact with locals, and challenge yourself both mentally and physically.. ",
				descPartOne : "The Karnali River is one of Nepal's most challenging and longest rivers, and rafting down its rapids is an adventure that you'll never forget. This 10-day expedition takes you through remote areas of Nepal, where you'll experience breathtaking scenery, interact with locals, and challenge yourself both mentally and physically.. ",
				descPartTwo : "The Karnali River is one of Nepal's most challenging and longest rivers, and rafting down its rapids is an adventure that you'll never forget. This 10-day expedition takes you through remote areas of Nepal, where you'll experience breathtaking scenery, interact with locals, and challenge yourself both mentally and physically.. ",
				
				stock : 4,
				location: 'Kullu',
				urlName : 'karnali-river-rafting'
			},
			{
				id : 4,
				name : 'Kali Gandaki River Rafting Tour ',
				img : 'assets/css/images/rafting/banner3.jpg',
				oldprice: 1200.00,
				price : 1000.00,
				prodType : 'rafting',
				descShort :   'The Kali Gandaki River Rafting tour is not just about thrilling rafting experiences but also about immersing yourself in the beauty and serenity of the Nepalese countryside. The tour offers a unique and unforgettable experience that combines adventure, culture, and nature. ',
				descPartOne : 'The Kali Gandaki River Rafting tour is not just about thrilling rafting experiences but also about immersing yourself in the beauty and serenity of the Nepalese countryside. The tour offers a unique and unforgettable experience that combines adventure, culture, and nature. ',
				descPartTwo : 'The Kali Gandaki River Rafting tour is not just about thrilling rafting experiences but also about immersing yourself in the beauty and serenity of the Nepalese countryside. The tour offers a unique and unforgettable experience that combines adventure, culture, and nature. ',
				
				stock : 4,
				location: 'Kullu',
				urlName : 'kali-gandaki-river-rafting'
			},
			{
				id : 5,
				name : 'Tamur River Rafting Tour ',
				img : 'assets/css/images/rafting/banner4.jpg',
				oldprice: 1200.00,
				price : 1000.00,
				prodType : 'rafting',
				descShort :   ' Tamur River is one of the most exciting and challenging rivers in Nepal, with rapids ranging from class III to IV+. The river originates in the snow-capped peaks of the Himalayas and flows through dense forests, cascading waterfalls, and remote villages before reaching the lowlands of eastern Nepal. ',
				descPartOne : ' Tamur River is one of the most exciting and challenging rivers in Nepal, with rapids ranging from class III to IV+. The river originates in the snow-capped peaks of the Himalayas and flows through dense forests, cascading waterfalls, and remote villages before reaching the lowlands of eastern Nepal. ',
				descPartTwo : ' Tamur River is one of the most exciting and challenging rivers in Nepal, with rapids ranging from class III to IV+. The river originates in the snow-capped peaks of the Himalayas and flows through dense forests, cascading waterfalls, and remote villages before reaching the lowlands of eastern Nepal. ',
				
				stock : 4,
				location: 'Kullu',
				urlName : 'tamur-river-rafting'
			},
			{
				id : 6,
				name : 'Seti River Rafting Tour ',
				img : 'assets/css/images/rafting/banner5.jpg',
				oldprice: 1200.00,
				price : 1000.00,
				prodType : 'rafting',
				descShort :   ' Seti River rafting tour is a thrilling adventure experience that takes you through the beautiful Seti River in Nepal. This river is known for its crystal clear water, lush green surroundings, and diverse flora and fauna, making it an ideal destination for adventure lovers.',
				descPartOne : ' Seti River rafting tour is a thrilling adventure experience that takes you through the beautiful Seti River in Nepal. This river is known for its crystal clear water, lush green surroundings, and diverse flora and fauna, making it an ideal destination for adventure lovers.',
				descPartTwo : ' Seti River rafting tour is a thrilling adventure experience that takes you through the beautiful Seti River in Nepal. This river is known for its crystal clear water, lush green surroundings, and diverse flora and fauna, making it an ideal destination for adventure lovers.',
				stock : 4,
				location: 'Kullu',
				urlName : 'seti-river-rafting'
			},
			
			{
				id : 7,
				name : 'Marshyangdi River Rafting Tour ',
				img : 'assets/css/images/rafting/banner6.jpg',
				oldprice: 1200.00,
				price : 1000.00,
				prodType : 'rafting',
				descShort :   'Marshyangdi River Rafting Tour is an exciting adventure that takes you through one of the most beautiful and challenging rivers in Nepal. The river is known for its fast-flowing rapids, steep gorges, and stunning mountain scenery, making it an ideal destination for adrenaline junkies and nature lovers. ',	
				descPartOne : ' Marshyangdi River Rafting Tour is an exciting adventure that takes you through one of the most beautiful and challenging rivers in Nepal. The river is known for its fast-flowing rapids, steep gorges, and stunning mountain scenery, making it an ideal destination for adrenaline junkies and nature lovers.',
				descPartTwo : 'Marshyangdi River Rafting Tour is an exciting adventure that takes you through one of the most beautiful and challenging rivers in Nepal. The river is known for its fast-flowing rapids, steep gorges, and stunning mountain scenery, making it an ideal destination for adrenaline junkies and nature lovers. ',
				stock : 4,
				location: 'Kullu',
				urlName : 'marshyangdi-river-rafting'
			},

			{
				id : 8,
				name : 'Sun Koshi River Rafting Tour ',
				img : 'assets/css/images/rafting/banner7.jpg',
				oldprice: 1200.00,
				price : 1000.00,
				prodType : 'rafting',
				descShort :   "The Sun Koshi River is a 270-kilometer long river that originates from the Himalayas and flows through the stunning landscapes of Nepal's mid-hills, before meeting the Ganges in India. The river is famous for its exciting rapids, breathtaking scenery, and diverse cultural experiences ",
				descPartOne : "The Sun Koshi River is a 270-kilometer long river that originates from the Himalayas and flows through the stunning landscapes of Nepal's mid-hills, before meeting the Ganges in India. The river is famous for its exciting rapids, breathtaking scenery, and diverse cultural experiences ",
				descPartTwo : "The Sun Koshi River is a 270-kilometer long river that originates from the Himalayas and flows through the stunning landscapes of Nepal's mid-hills, before meeting the Ganges in India. The river is famous for its exciting rapids, breathtaking scenery, and diverse cultural experiences ",
				
				stock : 4,
				location: 'Kullu',
				urlName : 'sun-koshi-river-rafting'
			},

			// {
			// 	id : 8,
			// 	name : 'Bheri River Rafting Tour ',
			// 	img : 'assets/css/images/rafting/banner7.jpg',
			// 	oldprice: 1200.00,
			// 	price : 1000.00,
			// 	prodType : 'rafting',
			// 	descShort :   ' Manaslu Base Camp Trek is a magnificent trek that takes you through the remote regions of the Himalayas in Nepal. This trek is gaining popularity due to its stunning landscapes, diverse cultures and pristine natural beauty. ',
			// 	descPartOne : ' Manaslu Base Camp Trek is a magnificent trek that takes you through the remote regions of the Himalayas in Nepal. This trek is gaining popularity due to its stunning landscapes, diverse cultures and pristine natural beauty. ',
			// 	descPartTwo : ' Manaslu Base Camp Trek is a magnificent trek that takes you through the remote regions of the Himalayas in Nepal. This trek is gaining popularity due to its stunning landscapes, diverse cultures and pristine natural beauty. ',
				
			// 	stock : 4,
			// 	location: 'Kullu',
			// 	urlName : 'bheri-river-rafting'
			// },

			// {
			// 	id : 8,
			// 	name : 'Arun River Rafting Tour ',
			// 	img : 'assets/css/images/rafting/banner7.jpg',
			// 	oldprice: 1200.00,
			// 	price : 1000.00,
			// 	prodType : 'rafting',
			// 	descShort :   ' Manaslu Base Camp Trek is a magnificent trek that takes you through the remote regions of the Himalayas in Nepal. This trek is gaining popularity due to its stunning landscapes, diverse cultures and pristine natural beauty. ',
			// 	descPartOne : ' Manaslu Base Camp Trek is a magnificent trek that takes you through the remote regions of the Himalayas in Nepal. This trek is gaining popularity due to its stunning landscapes, diverse cultures and pristine natural beauty. ',
			// 	descPartTwo : ' Manaslu Base Camp Trek is a magnificent trek that takes you through the remote regions of the Himalayas in Nepal. This trek is gaining popularity due to its stunning landscapes, diverse cultures and pristine natural beauty. ',
				
			// 	stock : 4,
			// 	location: 'Kullu',
			// 	urlName : 'arun-river-rafting'
			// },

		
			{
				id : 9,
				name : '6400 FT. in 10 Minutes',
				img : 'assets/css/thumbs/para_num/paragliding1.jpg',
				oldprice: 2799.00,
				price : 1899.00,
				prodType : 'paragliding',

				stock : 1,
				location: 'Dobhi',
				urlName : '#',
			},
			{
				id : 10,
				name : '8000 FT. in 20 Minutes',
				img : 'assets/css/thumbs/para_num/paragliding2.jpg',
				oldprice: 3200.00,
				price : 2099.00,
				prodType : 'paragliding',
				stock : 1,
				location: 'Bir-Billing',
				urlName : '#',
			},

			//  Trekking 
			{
				id : 11,
				name : 'Everest Base Camp Trek',
				img : 'assets/css/images/treks/everest_base_min.jpg',
				price : 12000.00,
				prodType :    'trekking',
				descShort :   'The Everest Base Camp Trek is a bucket-list adventure that takes you through the stunning Khumbu region of Nepal, providing trekkers with the opportunity to experience the worlds highest mountain range up close. The trek begins in Lukla, a small mountain town, and passes through charming Sherpa villages, where trekkers can experience the unique culture and way of life of the local people.',
				descPartOne : 'The Everest Base Camp Trek is a bucket-list adventure that takes you through the stunning Khumbu region of Nepal, providing trekkers with the opportunity to experience the worlds highest mountain range up close. The trek begins in Lukla, a small mountain town, and passes through charming Sherpa villages, where trekkers can experience the unique culture and way of life of the local people.',
				descPartTwo : 'The Everest Base Camp Trek is a bucket-list adventure that takes you through the stunning Khumbu region of Nepal, providing trekkers with the opportunity to experience the worlds highest mountain range up close. The trek begins in Lukla, a small mountain town, and passes through charming Sherpa villages, where trekkers can experience the unique culture and way of life of the local people.',
				stock : 1,
				days : 7,
				nights: 6,
				urlName : 'everest-base-camp-trek'
			},
			{

				id : 12,
				name : 'Annapurna Base Camp Trek',
				img : 'assets/css/images/treks/annapurna_base_camp_min.jpg',
				price : 12000.00,
				prodType :    'trekking',
				descShort :   ' The Annapurna Base Camp Trek is a journey that offers a truly unforgettable adventure into the heart of the Himalayas. This trek takes you through some of the most beautiful landscapes in Nepal, including lush green forests, quaint villages, and high-altitude mountains....',
				descPartOne : ' The Annapurna Base Camp Trek is a journey that offers a truly unforgettable adventure into the heart of the Himalayas. This trek takes you through some of the most beautiful landscapes in Nepal, including lush green forests, quaint villages, and high-altitude mountains....',
				descPartTwo : ' The Annapurna Base Camp Trek is a journey that offers a truly unforgettable adventure into the heart of the Himalayas. This trek takes you through some of the most beautiful landscapes in Nepal, including lush green forests, quaint villages, and high-altitude mountains....',
				stock : 1,
				days : 7,
				nights: 6,
				urlName : 'annapurna-base-camp-trek'
			},
			{
				id : 13,
				name : 'Manaslu Base Camp Trek',
				img : 'assets/css/images/treks/manasalu_min.jpg',
				price : 1787,
				prodType : 'trekking',
				descShort :   ' Manaslu Base Camp Trek is a magnificent trek that takes you through the remote regions of the Himalayas in Nepal. This trek is gaining popularity due to its stunning landscapes, diverse cultures and pristine natural beauty. ',
				descPartOne : ' Manaslu Base Camp Trek is a magnificent trek that takes you through the remote regions of the Himalayas in Nepal. This trek is gaining popularity due to its stunning landscapes, diverse cultures and pristine natural beauty. ',
				descPartTwo : ' Manaslu Base Camp Trek is a magnificent trek that takes you through the remote regions of the Himalayas in Nepal. This trek is gaining popularity due to its stunning landscapes, diverse cultures and pristine natural beauty. ',
				stock : 1,
				days : 6,
				nights: 5,
				urlName : 'manaslu-base-camp-trek'
				
			},
			{
				id : 14,
				name : 'Mardi Himal Trek',
				img : 'assets/css/images/treks/mardi_himal_min.jpg',
				price : 12000.00,
				prodType :    'trekking',
				descShort :   ' The Mardi Himal Trek is a trekking experience that takes you deep into the heart of the Himalayas. This stunning journey presents an overwhelming and picturesque adventure to Mardi Himal, where you will be completely soaked with the views of snowcapped peaks, green rolling hills, and pristine forests of lovely rhododendron-magnolia-pines and oak tree lines...',
				descPartOne : ' The Mardi Himal Trek is a trekking experience that takes you deep into the heart of the Himalayas. This stunning journey presents an overwhelming and picturesque adventure to Mardi Himal, where you will be completely soaked with the views of snowcapped peaks, green rolling hills, and pristine forests of lovely rhododendron-magnolia-pines and oak tree lines...',
				descPartTwo : ' The Mardi Himal Trek is a trekking experience that takes you deep into the heart of the Himalayas. This stunning journey presents an overwhelming and picturesque adventure to Mardi Himal, where you will be completely soaked with the views of snowcapped peaks, green rolling hills, and pristine forests of lovely rhododendron-magnolia-pines and oak tree lines...',
				stock : 1,
				days : 7,
				nights: 6,
				urlName : 'mardi-himal-trek'
			},
			{
				id : 15,
				name : 'Makalu Base Camp Trek',
				img : 'assets/css/images/treks/makalu_base_camp_min.jpg',
				price : 12000.00,
				prodType :    'trekking',
				descShort :   "The Makalu Base Camp Trek is a journey to explore the beauty of Nepal's Makalu Barun National Park, a region filled with diverse flora and fauna. The park is home to rare and endangered species like the snow leopard, Himalayan black bear, red panda, and musk deer. ...",
				descPartOne : "The Makalu Base Camp Trek is a journey to explore the beauty of Nepal's Makalu Barun National Park, a region filled with diverse flora and fauna. The park is home to rare and endangered species like the snow leopard, Himalayan black bear, red panda, and musk deer. ...",
				descPartTwo : "The Makalu Base Camp Trek is a journey to explore the beauty of Nepal's Makalu Barun National Park, a region filled with diverse flora and fauna. The park is home to rare and endangered species like the snow leopard, Himalayan black bear, red panda, and musk deer. ...",
				stock : 1,
				days : 7,
				nights: 6,
				urlName : 'makalu-base-camp-trek'
			},
		
			{
				id : 16,
				name : 'Manaslu Circuit Trek',
				img : 'assets/css/images/treks/manaslu_circuit_min.jpg',
				price : 7500.00,
				prodType : 'trekking',
				descShort : 'The Manaslu Circuit Trek is a breathtaking adventure that takes you on a journey through the rugged terrain and awe-inspiring landscapes of the Himalayas. This trek is a unique blend of natural beauty, cultural heritage, and unparalleled adventure, making it a popular choice among trekkers from all over the world.',
				descPartOne : 'The Manaslu Circuit Trek is a breathtaking adventure that takes you on a journey through the rugged terrain and awe-inspiring landscapes of the Himalayas. This trek is a unique blend of natural beauty, cultural heritage, and unparalleled adventure, making it a popular choice among trekkers from all over the world. ',
				descPartTwo : 'The Manaslu Circuit Trek is a breathtaking adventure that takes you on a journey through the rugged terrain and awe-inspiring landscapes of the Himalayas. This trek is a unique blend of natural beauty, cultural heritage, and unparalleled adventure, making it a popular choice among trekkers from all over the world. ',
				stock : 1,
				days : 3,
				nights: 2,
				urlName : 'manaslu-circuit-trek'
			},
			{
				id : 17,
				name : 'Langtang Valley Trek',
				img : 'assets/css/images/treks/langtang_valley_min.jpg',
				// price : 5000.00,
				prodType : 'trekking',
				descShort :  'The trek to Langtang Valley is known for its stunning views of the Langtang Lirung, which stands at 7,227 meters. You will also get to experience the majestic views of the Ganesh Himal and Dorje Lakpa. The highlight of the trek is the ascent to the Kyanjin Ri viewpoint, which offers unparalleled views of the Himalayan range.',
				descPartOne : 'The trek to Langtang Valley is known for its stunning views of the Langtang Lirung, which stands at 7,227 meters. You willl also get to experience the majestic views of the Ganesh Himal and Dorje Lakpa. The highlight of the trek is the ascent to the Kyanjin Ri viewpoint, which offers unparalleled views of the Himalayan range.',
				descPartTwo : 'The trek to Langtang Valley is known for its stunning views of the Langtang Lirung, which stands at 7,227 meters. You willl also get to experience the majestic views of the Ganesh Himal and Dorje Lakpa. The highlight of the trek is the ascent to the Kyanjin Ri viewpoint, which offers unparalleled views of the Himalayan range.',
				stock : 1,
				days : 3,
				nights: 2,
				urlName : 'langtang-valley-trek'
			},
			{
				id : 18,
				name : 'Upper Mustang Trek',
				img : 'assets/css/images/treks/dhaulagiri_circuit_min.jpg',
				price : 12000.00,
				prodType :    'trekking',
				descShort :   'The Upper Mustang Trek is a popular and remote trekking destination located in the north-central part of Nepal. This trek takes you through the heart of the Upper Mustang region, offering breathtaking views of the Himalayan Mountains and stunning landscapes, including vast arid valleys, high cliffs, and unique rock formations.				',
				descPartOne : 'The Upper Mustang Trek is a popular and remote trekking destination located in the north-central part of Nepal. This trek takes you through the heart of the Upper Mustang region, offering breathtaking views of the Himalayan Mountains and stunning landscapes, including vast arid valleys, high cliffs, and unique rock formations.				',
				descPartTwo : 'The Upper Mustang Trek is a popular and remote trekking destination located in the north-central part of Nepal. This trek takes you through the heart of the Upper Mustang region, offering breathtaking views of the Himalayan Mountains and stunning landscapes, including vast arid valleys, high cliffs, and unique rock formations.				',
				stock : 1,
				days : 7,
				nights: 6,
				urlName : 'upper-mustang-trek'
			},
			{
				id : 19,
				name : 'Yala Peak Trek',
				img : 'assets/css/images/treks/yala_peak_min.jpg',
				price : 12000.00,
				prodType : 'trekking',
				descShort : 'Yala Peak Trek is a popular trekking destination located in the Langtang region of Nepal. The trek takes you through some of the most breathtaking scenery in the world, including stunning views of the Himalayan Mountains and its surrounding valleys.',
				descPartOne : 'Yala Peak Trek is a popular trekking destination located in the Langtang region of Nepal. The trek takes you through some of the most breathtaking scenery in the world, including stunning views of the Himalayan Mountains and its surrounding valleys.',
				descPartTwo : 'Yala Peak Trek is a popular trekking destination located in the Langtang region of Nepal. The trek takes you through some of the most breathtaking scenery in the world, including stunning views of the Himalayan Mountains and its surrounding valleys.',
				stock : 1,
				days : 7,
				nights: 6,
				urlName : 'yala-peak-trek'
			},
			{
				id : 20,
				name : 'Gosai Kund Trek',
				img : 'assets/css/images/treks/gosai_kunda_min.jpg',
				price : 12000.00,
				prodType : 'trekking',
				descShort : 'Gosainkunda Trek is one of the most popular trekking destinations in Nepal. Located in the Langtang region of the Himalayas, this trek is renowned for its stunning natural beauty, pristine mountain lakes, and cultural significance.',
				descPartOne : 'Gosainkunda Trek is one of the most popular trekking destinations in Nepal. Located in the Langtang region of the Himalayas, this trek is renowned for its stunning natural beauty, pristine mountain lakes, and cultural significance.',
				descPartTwo : 'Gosainkunda Trek is one of the most popular trekking destinations in Nepal. Located in the Langtang region of the Himalayas, this trek is renowned for its stunning natural beauty, pristine mountain lakes, and cultural significance.',
				stock : 1,
				days : 7,
				nights: 6,
				urlName : 'gosai-kunda-trek'
			},
			{
				id : 21,
				name : 'Tamang Heritage Trail',
				img : 'assets/css/images/treks/gosai_kunda_min.jpg',
				price : 12000.00,
				prodType : 'trekking',
				descShort : 'The Tamang Heritage Trail Trek is a unique journey through the heart of the Langtang region of Nepal. This trek takes you through small Tamang villages, allowing you to experience the rich culture and traditions of the Tamang people. ',
				descPartOne : 'The Tamang Heritage Trail Trek is a unique journey through the heart of the Langtang region of Nepal. This trek takes you through small Tamang villages, allowing you to experience the rich culture and traditions of the Tamang people.',
				descPartTwo : 'The Tamang Heritage Trail Trek is a unique journey through the heart of the Langtang region of Nepal. This trek takes you through small Tamang villages, allowing you to experience the rich culture and traditions of the Tamang people. ',
				stock : 1,
				days : 7,
				nights: 6,
				urlName : 'tamang-heritage-trail-trek'
			},
			{
				id : 22,
				name : 'Gokyo Chola Pass Trek',
				img : 'assets/css/images/treks/chola_min.jpg',
				price : 12000.00,
				prodType :    'trekking',
				descShort :   'Chola Pass Trek is one of the most popular trekking routes in Nepal that offers a combination of breathtaking scenery and challenging trails. The trek is situated in the Sagarmatha National Park, which is a UNESCO World Heritage Site and is home to some of the highest peaks in the world, including Mt. Everest...',
				descPartOne : 'Chola Pass Trek is one of the most popular trekking routes in Nepal that offers a combination of breathtaking scenery and challenging trails. The trek is situated in the Sagarmatha National Park, which is a UNESCO World Heritage Site and is home to some of the highest peaks in the world, including Mt. Everest...',
				descPartTwo : 'Chola Pass Trek is one of the most popular trekking routes in Nepal that offers a combination of breathtaking scenery and challenging trails. The trek is situated in the Sagarmatha National Park, which is a UNESCO World Heritage Site and is home to some of the highest peaks in the world, including Mt. Everest...',
				stock : 1,
				days : 16,
				nights: 15,
				urlName : 'gokyo-chola-pass-trek'
			},
			{
				id : 23,
				name : 'The Three Passes Trek',
				img : 'assets/css/images/treks/three_passes_min.jpg',
				price : 12000.00,
				prodType :    'trekking',
				descShort :   'The Three Passes Trek is a challenging and rewarding journey through the Everest region of Nepal. This trek takes you through some of the most breathtaking mountain scenery in the world, including views of Mt. Everest, Mt. Lhotse, Mt. Nuptse, and other stunning peaks...',
				descPartOne : 'The Three Passes Trek is a challenging and rewarding journey through the Everest region of Nepal. This trek takes you through some of the most breathtaking mountain scenery in the world, including views of Mt. Everest, Mt. Lhotse, Mt. Nuptse, and other stunning peaks...',
				descPartTwo : 'The Three Passes Trek is a challenging and rewarding journey through the Everest region of Nepal. This trek takes you through some of the most breathtaking mountain scenery in the world, including views of Mt. Everest, Mt. Lhotse, Mt. Nuptse, and other stunning peaks...',
				stock : 1,
				days : 7,
				nights: 6,
				urlName : 'three-pass-trek'
			},
			{
				id : 24,
				name : 'Kanchenjunga Circuit Trek',
				img : 'assets/css/images/treks/kanchenjunga_circuit_min.jpg',
				price : 12000.00,
				prodType :    'trekking',
				descShort :   'Located in the eastern part of Nepal, the Kanchenjunga trek is an unexplored and virgin trail that offers a peaceful and secluded experience to trekkers. Kanchenjunga is the third highest peak in the world, and the trekking route provides breathtaking views of snow-capped mountains, mesmerizing landscapes, and an exotic scenic view of the Himalayas...',
				descPartOne : 'Located in the eastern part of Nepal, the Kanchenjunga trek is an unexplored and virgin trail that offers a peaceful and secluded experience to trekkers. Kanchenjunga is the third highest peak in the world, and the trekking route provides breathtaking views of snow-capped mountains, mesmerizing landscapes, and an exotic scenic view of the Himalayas...',
				descPartTwo : 'Located in the eastern part of Nepal, the Kanchenjunga trek is an unexplored and virgin trail that offers a peaceful and secluded experience to trekkers. Kanchenjunga is the third highest peak in the world, and the trekking route provides breathtaking views of snow-capped mountains, mesmerizing landscapes, and an exotic scenic view of the Himalayas...',
				stock : 1,
				days : 7,
				nights: 6,
				urlName : 'kanchenjunga-circuit-trek'
			},
			{
				id : 25,
				name : 'Makalu sherpani Col Pass Trek',
				img : 'assets/css/images/treks/makalu_sherpani_min.jpg',
				price : 12000.00,
				prodType :    'trekking',
				descShort :   '  The Makalu Sherpani Col Pass Trek is one of the most challenging and adventurous treks in Nepal. This trek is known for its stunning natural beauty, diverse landscapes, and unique cultural experiences. It is an off-the-beaten-path trek that takes you through remote villages, high mountain passes, and lush forests...',
				descPartOne : '  The Makalu Sherpani Col Pass Trek is one of the most challenging and adventurous treks in Nepal. This trek is known for its stunning natural beauty, diverse landscapes, and unique cultural experiences. It is an off-the-beaten-path trek that takes you through remote villages, high mountain passes, and lush forests...',
				descPartTwo : '  The Makalu Sherpani Col Pass Trek is one of the most challenging and adventurous treks in Nepal. This trek is known for its stunning natural beauty, diverse landscapes, and unique cultural experiences. It is an off-the-beaten-path trek that takes you through remote villages, high mountain passes, and lush forests...',
				stock : 1,
				days : 7,
				nights: 6,
				urlName : 'makalu-sherpani-col-pass-trek'
			},
			
			{
				id : 26,
				name : 'Dhaulagiri Circuit Trek',
				img : 'assets/css/images/treks/dhaulagiri_circuit_min.jpg',
				price : 12000.00,
				prodType :    'trekking',
				descShort :   'The Dhaulagiri Circuit Trek is one of the most challenging and remote trekking experiences in Nepal. This trek is known for its breathtaking views of the Dhaulagiri Mountain, which stands at an elevation of 8,167 meters and is the seventh highest peak in the world. The trek starts from the town of Beni, which is easily accessible from Pokhara, and takes around three weeks to complete..',
				descPartOne : 'The Dhaulagiri Circuit Trek is one of the most challenging and remote trekking experiences in Nepal. This trek is known for its breathtaking views of the Dhaulagiri Mountain, which stands at an elevation of 8,167 meters and is the seventh highest peak in the world. The trek starts from the town of Beni, which is easily accessible from Pokhara, and takes around three weeks to complete..',
				descPartTwo : 'The Dhaulagiri Circuit Trek is one of the most challenging and remote trekking experiences in Nepal. This trek is known for its breathtaking views of the Dhaulagiri Mountain, which stands at an elevation of 8,167 meters and is the seventh highest peak in the world. The trek starts from the town of Beni, which is easily accessible from Pokhara, and takes around three weeks to complete..',
				stock : 1,
				days : 7,
				nights: 6,
				urlName : 'dhaulagiri-trek'
			},
			{
				id : 27,
				name : 'Tashi Lapcha Pass Trek',
				img : 'assets/css/images/treks/tashi_lapcha_min.jpg',
				price : 12000.00,
				prodType :    'trekking',
				descShort :   'The Tashi Lapcha Pass Trek is a challenging and rewarding trekking adventure that takes you through the heart of the Himalayas in Nepal. This trek is not for the faint-hearted, as it involves crossing high mountain passes and trekking in remote areas....',
				descPartOne : 'The Tashi Lapcha Pass Trek is a challenging and rewarding trekking adventure that takes you through the heart of the Himalayas in Nepal. This trek is not for the faint-hearted, as it involves crossing high mountain passes and trekking in remote areas. ...',
				descPartTwo : 'The Tashi Lapcha Pass Trek is a challenging and rewarding trekking adventure that takes you through the heart of the Himalayas in Nepal. This trek is not for the faint-hearted, as it involves crossing high mountain passes and trekking in remote areas.',
				stock : 1,
				days : 7,
				nights: 6,
				urlName : 'tashi-lapcha-pass-trek'
			},
			
	{
			id : 28,
			name : 'Annapurna Circuit Trek',
			img : 'assets/css/images/treks/annapurna_circuit_min.jpg',
			price : 12000.00,
			prodType :    'trekking',
			descShort :   'The Annapurna Circuit Trek is one of the most popular and iconic treks in Nepal, renowned for its stunning natural beauty and cultural diversity. This 15 to 20-day trek takes you through the picturesque landscapes of the Annapurna region, offering breathtaking views of snow-capped peaks, crystal-clear lakes, pristine forests, and lush green valleys. ...',
			descPartOne : 'The Annapurna Circuit Trek is one of the most popular and iconic treks in Nepal, renowned for its stunning natural beauty and cultural diversity. This 15 to 20-day trek takes you through the picturesque landscapes of the Annapurna region, offering breathtaking views of snow-capped peaks, crystal-clear lakes, pristine forests, and lush green valleys ...',
			descPartTwo : 'The Annapurna Circuit Trek is one of the most popular and iconic treks in Nepal, renowned for its stunning natural beauty and cultural diversity. This 15 to 20-day trek takes you through the picturesque landscapes of the Annapurna region, offering breathtaking views of snow-capped peaks, crystal-clear lakes, pristine forests, and lush green valleys ...',
			stock : 1,
			days : 7,
			nights: 6,
			urlName : 'annapurna-circuit-trek'
	},
		{
			id : 29,
			name : 'Annapurna Base Camp Trek North',
			img : 'assets/css/images/treks/dhaulagiri_circuit_min.jpg',
			price : 12000.00,
			prodType :    'trekking',
			descShort :   ' Nestled in the heart of the Annapurna region lies a trek that is as diverse in its scenery as it is in its cultural experiences. The Annapurna Base Camp Trek from North is a journey that takes you through charming villages, lush forests, and towering mountains that have captivated adventurers for generations ...',
			descPartOne : ' .Nestled in the heart of the Annapurna region lies a trek that is as diverse in its scenery as it is in its cultural experiences. The Annapurna Base Camp Trek from North is a journey that takes you through charming villages, lush forests, and towering mountains that have captivated adventurers for generations...',
			descPartTwo : ' Nestled in the heart of the Annapurna region lies a trek that is as diverse in its scenery as it is in its cultural experiences. The Annapurna Base Camp Trek from North is a journey that takes you through charming villages, lush forests, and towering mountains that have captivated adventurers for generations...',
			stock : 1,
			days : 7,
			nights: 6,
			urlName : 'annapurna-base-camp-north-trek'
			},

			{
				id : 30,
				name : 'Bhrigu Lake Trek',
				img : 'assets/css/images/treks/bhrigu_min.jpg',
				price : 7500.00,
				prodType : 'trekking',
				descShort : 'Brighu Lake Is An High Altitude Alpine Lake Near Manali Town At Altitude Of 14,009 Ft .It Is One Of The Most Beautiful Lake Named After Saint Maharishi Bhrigu One Of The Seven Great Sages Of Hindu Puranas .',
				descPartOne : 'Brighu Lake Is An High Altitude Alpine Lake Near Manali Town At Altitude Of 14,009 Ft .It Is One Of The Most Beautiful Lake Named After Saint Maharishi Bhrigu One Of The Seven Great Sages Of Hindu Puranas ',
				descPartTwo : 'Brighu Lake Provides The Panaromic View Of Summits Like FriendShip Peak  Hanuman Tibaa And DhaulaDhar Range . It is A 3 Day Easy Trek To The Beautiul Lake Lying On Top Of Himalayas ',
				stock : 1,
				days : 3,
				nights: 2,
				urlName : 'bhrigu-lake-trek'
			},
			{
				id : 31,
				name : 'Mantalai Lake Trek',
				img : 'assets/css/images/treks/wild_min.jpg',
				price : 12000.00,
				prodType : 'trekking',
				descShort : 'Mantalai Lake Trek is a popular Himalayan trek in the Indian state of Himachal Pradesh. The trek takes you through lush green meadows, dense forests, and rugged terrain to reach the beautiful Mantalai Lake, which is located at an altitude of 4,150 meters (13,615 feet). The trek is known for its breathtaking views of the snow-capped Himalayan peaks, crystal-clear streams, and pristine alpine forests...',
				descPartOne : 'Mantalai Lake Trek is a popular Himalayan trek in the Indian state of Himachal Pradesh. The trek takes you through lush green meadows, dense forests, and rugged terrain to reach the beautiful Mantalai Lake, which is located at an altitude of 4,150 meters (13,615 feet). The trek is known for its breathtaking views of the snow-capped Himalayan peaks, crystal-clear streams, and pristine alpine forests...',
				descPartTwo : 'Mantalai Lake Trek is a popular Himalayan trek in the Indian state of Himachal Pradesh. The trek takes you through lush green meadows, dense forests, and rugged terrain to reach the beautiful Mantalai Lake, which is located at an altitude of 4,150 meters (13,615 feet). The trek is known for its breathtaking views of the snow-capped Himalayan peaks, crystal-clear streams, and pristine alpine forests...',
				stock : 1,
				days : 7,
				nights: 6,
				urlName : 'mantalai-lake-trek'
			},
			{
				id : 32,
				name : 'Kufri Trek',
				img : 'assets/css/images/treks/kufri_min.jpg',
				price : 5000.00,
				prodType : 'trekking',
				descShort : 'Kufri One Of The Most Beautiful And Virgin Place In the Lap Of Himalayas . Kufri Trek Was Also Our First Ever Trek 5 Friends On A Quest To Discover The Nature Beauty Which Lies At Top Of The Mountain ....',
				descPartOne : 'Kufri One Of The Most Beautiful And Virgin Place In the Lap Of Himalayas . Kufri Trek Was Also Our First Ever Trek 5 Friends On A Quest To Discover The Natures Beauty Which Lies At Top Of The Mountain ..',
				descPartTwo : 'Kufri Trek Is One Of The Best Short Trek Around Kullu Manali Valley With Breathtaking View . It Is Also The Best Place For Camping With 2 And Half Hour Short Trail Gives the View Of Parvati Valley And DhaulaDhar Range .',
				stock : 1,
				days : 3,
				nights: 2,
				urlName : 'kufri-trek'
			},

			{
				id : 33,
				name : 'Beas Kund Trek',
				img : 'assets/css/images/treks/beas_min.jpg',
				price : 8500.00,
				prodType : 'trekking',
				descShort : 'Beas Kund Is The Origin Of Mighty Beas River Its A Beautiful Glacial Lake Forming The Beas River Which Gives Life To Millions Of People In the Himalayas ...',
				descPartOne : 'Beas Kund Is The Origin Of Mighty Beas River Its A Beautiful Glacial Lake Forming The Beas River Which Gives Life To Millions Of People In the Himalayas ...',
				descPartTwo : 'An integral part of Manali’s topography, which is India’s favourite adventure zone, this trek is voted amongst the easiest of trails and most attractive to beginners. An exciting activity, being around Hampta Pass opens a whole new beautiful world. Coupled with a stopover at the eerie and placid Chandra Tal, this journey is replete with adventure and scenic moments.',
				stock : 1,
				days : 3,
				nights: 2,
				urlName : 'beas-kund-trek'
			},

			{
					id : 34,
					name : 'Pin Parvati Trek',
					img : 'assets/css/images/treks/pin_parvati_min.jpg',
					price : 35000.00,
					prodType : 'trekking',
					descShort : 'Pin Paravati Pass Is The Mountain Pass Connect The Parvati Valley With Pin Valley Of Spiti. It Is Located At Altitude Of 17,500 Ft...',
					descPartOne : 'Pin Paravati Pass Is The Mountain Pass Connect The Parvati Valley With Pin Valley Of Spiti. It Is Located At Altitude Of 17,500 Ft...',
					descPartTwo : 'Pin Paravati Pass Is The Mountain Pass Connect The Parvati Valley With Pin Valley Of Spiti. It Is Located At Altitude Of 17,500 Ft..',
					stock : 1,
					days : 11,
					nights: 10,
					urlName : 'pin-parvati-trek'
				},
				{
					id : 35,
					name : 'Fungni Top Trek',
					img : 'assets/css/images/treks/fungni_min.jpg',
					price : 6000.00,
					prodType : 'trekking',
					descShort : 'Fungni Top Is One Of The Most beautiful virgin Trek Only Few have explored. Locals Have Named This Mountain After Goddess Fungani who They Believe Resides At The Top Of This Mountain.',
					descPartOne : 'Fungni Top Is One Of The Most beautiful virgin Trek Only Few have explored. Locals Have Named This Mountain After Goddess Fungani who They Believe Resides At The Top Of This Mountain.',
					descPartTwo : 'Fungni Top Is One Of The Most beautiful virgin Trek Only Few have explored. Locals Have Named This Mountain After Goddess Fungani who They Believe Resides At The Top Of This Mountain.',
					stock : 1,
					days : 3,
					nights: 2,
					urlName : 'fungni-top-trek'
				},
				{
					id : 36,
					name : 'Kais Dhar Trek',
					img : 'assets/css/images/treks/kais_dhar_min.jpg',
					price : 7500.00,
					prodType : 'trekking',
					descShort : ' Kais Dhar An Extremly Beautiful Place, With Grassy Meadows And Densely Forested Mountains Just 10 Km From Kullu Town . It is One Of The Most Beautiful And Virgin Place In Kullu Manali Only Visited By Locals For Grazing Thier Cattles ...',
					descPartOne : ' Kais Dhar An Extremly Beautiful Place, With Grassy Meadows And Densely Forested Mountains Just 10 Km From Kullu Town . It is One Of The Most Beautiful And Virgin Place In Kullu Manali Only Visited By Locals For Grazing Thier Cattles ...',
					descPartTwo : ' Kais Dhar An Extremly Beautiful Place, With Grassy Meadows And Densely Forested Mountains Just 10 Km From Kullu Town . It is One Of The Most Beautiful And Virgin Place In Kullu Manali Only Visited By Locals For Grazing Thier Cattles ...',
					stock : 1,
					days : 3,
					nights: 2,
					urlName : 'kais-dhar-trek'
				},
				{
					id : 37,
					name : 'Malana Village Trek',
					img : 'assets/css/images/treks/malana_min.jpg',
					price : 6500.00,
					prodType : 'trekking',
					descShort : 'Malana - The mysterious and beautiful ancient village located in the mountains of Parvati Valley, is famous for its unique culture and...',
					descPartOne : 'Malana - The mysterious and beautiful ancient village located in the mountains of Parvati Valley, is famous for its unique culture and the Marijuana it produces, popularly known as the  Malana Cream. Marijuana (or weed) can be used for medical purposes and can treat a number of different conditions such as posttraumatic stress disorder (PTSD, Nausea, Anorexia, Pain. It can also cure one of the deadly disease - Cancer. The purity of Marijuana it produces, has made it famous in all around the world.',
					descPartTwo : 'The villager&#39;s Of Malana are said to be the descendants of <a style="color:#40c279;font-weight: bold;" href="https://en.wikipedia.org/wiki/Alexander_the_Great" target="_blank">Alexander the Great</a>. The valley of Malana is over-shadowed by the <a style="color:#40c279;font-weight: bold;" href="{% link _treks/chandrakhani-pass.html %}">Chandrakhani Pass</a> And <a style="color:#40c279;font-weight: bold;" href="{% link _treks/deo-tibba-base-camp.html %}">Deo Tibba</a> Peaks.',
					stock : 1,
					days : 4,
					nights: 3,
					urlName : 'malana-village-trek'
			},
			{
				id : 38,
				name : 'Sar Pass Trek',
				img : 'assets/css/images/treks/sar_min.jpg',
				price : 9000.00,
				prodType : 'trekking',
				descShort : 'Sar pass is one of the most popular trek in parvati valley at altitude of 13,845 Ft. The trek start from the magic valley kasol which is favourite spot for backpackers around the world . ',
				descPartOne : 'Sar pass is one of the most popular trek in parvati valley at altitude of 13,845 Ft. The trek start from the magic valley kasol which is favourite spot for backpackers around the world .',
				descPartTwo : 'Sar pass is one of the most popular trek in parvati valley at altitude of 13,845 Ft. The trek start from the magic valley kasol which is favourite spot for backpackers around the world .',
				stock : 1,
				days : 6,
				nights: 5,
				urlName : 'sar-pass-trek'
			},
			{
				id : 39,
				name : 'Dehnasar Lake Trek',
				img : 'assets/css/images/treks/dehnasar_lake_min.jpg',
				price : 10000.00,
				prodType : 'trekking',
				descShort : 'Dehnasar A high altitude alpine lake situated deep inside the snow caped mountains Of Lugvalley . Lugvalley is beautiful village just 20 km from kullu town .The village has a beautiful landscape with never-ending shades of greenery all around the village. ',
				descPartOne : 'Dehnasar A high altitude alpine lake situated deep inside the snow caped mountains Of Lugvalley . Lugvalley is beautiful village just 20 km from kullu town .The village has a beautiful landscape with never-ending shades of greenery all around the village. ',
				descPartTwo : 'Dehnasar A high altitude alpine lake situated deep inside the snow caped mountains Of Lugvalley . Lugvalley is beautiful village just 20 km from kullu town .The village has a beautiful landscape with never-ending shades of greenery all around the village. ',
				stock : 1,
				days : 3,
				nights: 2,
				urlName : 'dehnasar-lake-trek'
			},
			{
				id : 40,
				name : 'ChandraKhani Pass Trek',
				img : 'assets/css/images/treks/chandrakhani-pass_min.jpg',
				price : 8500.00,
				prodType : 'trekking',
				descShort : 'Chandrakhani pass is a beautiful & calm pass at altitude of 12,007 Ft located in kullu valley of himachal pradesh . the top of ChandraKhani pass offers the fabulous  view of Deo Tibba , Pir Panjal and parvati valley ..',
				descPartOne : 'Chandrakhani pass is a beautiful & calm pass at altitude of 12,007 Ft located in kullu valley of himachal pradesh . the top of ChandraKhani pass offers the fabulous  view of Deo Tibba , Pir Panjal and parvati valley .',
				descPartTwo : 'Chandrakhani pass is a beautiful & calm pass at altitude of 12,007 Ft located in kullu valley of himachal pradesh . the top of ChandraKhani pass offers the fabulous  view of Deo Tibba , Pir Panjal and parvati valley .',
				stock : 1,
				days : 3,
				nights: 2,
				urlName : 'chandrakhani-pass-trek'
			},

			{
				id : 41,
				name : 'Deo Tibba Base Camp Trek',
				img : 'assets/css/images/treks/deo_tibba_min.jpg',
				price : 15500.00,
				prodType : 'trekking',
				descShort : ' Deo Tibba peak is one of the highest mountain peaks in kullu valley also known as the "Throne of Gods" at altitude of 20,013 Ft .',
				descPartOne : ' Deo Tibba peak is one of the highest mountain peaks in kullu valley also known as the "Throne of Gods" at altitude of 20,013 Ft .',
				descPartTwo : ' Deo Tibba peak is one of the highest mountain peaks in kullu valley also known as the "Throne of Gods" at altitude of 20,013 Ft .',
				stock : 1,
				days : 6,
				nights: 5,
				urlName : 'deo-tibba-base-camp-trek'
			},


			{
				id : 42,
				name : 'Hampta Pass Trek',
				img : 'assets/css/images/treks/hampta_min.jpg',
				price : 8500.00,
				prodType : 'trekking',
				descShort :   'Nestled in the beautiful state of Himachal Pradesh, Hampta Pass Trek is a fantastic adventure that takes you on a journey through stunning landscapes, dense forests, and high-altitude terrain. The trek is named after the Hampta Pass, a natural divide that separates the Kullu Valley from the Lahaul Valley.',
				descPartOne : 'Nestled in the beautiful state of Himachal Pradesh, Hampta Pass Trek is a fantastic adventure that takes you on a journey through stunning landscapes, dense forests, and high-altitude terrain. The trek is named after the Hampta Pass, a natural divide that separates the Kullu Valley from the Lahaul Valley.',
				descPartTwo : 'Nestled in the beautiful state of Himachal Pradesh, Hampta Pass Trek is a fantastic adventure that takes you on a journey through stunning landscapes, dense forests, and high-altitude terrain. The trek is named after the Hampta Pass, a natural divide that separates the Kullu Valley from the Lahaul Valley.',
				stock : 1,
				days : 4,
				nights: 3,
				urlName : 'hampta-pass-trek'
			},
			
			
			// Camping Products
			{
				id : 43,
				name : 'Camping In The Wild',
				img : 'assets/css/images/camping/camp-in-wild-min.jpg',
				price : 1200.00,
				prodType : 'camping',
				stock : 1,
				days : 6,
				nights: 5,
				urlName : 'camping-in-the-wild'
			},

			{
				id : 44,
				name : 'Camping Near River',
				img : 'assets/css/images/camping/camp-near-river-min.jpg',
				price : 1000.00,
				prodType : 'camping',
				stock : 1,
				days : 6,
				nights: 5,
				urlName : 'camping-near-river'
			},


// Tour Packages
			{
				id : 45,
				name : 'Shimla Manali Escape',
				img : 'assets/css/images/escape-trips/shimla-manali-escape/shimla_min.jpg',
				price : 10000,
				prodType : 'escape-trips',
				stock : 1,
				act1: 'Sightseeing',
				act1Icon: 'fas fa-binoculars',
				act2: 'Camping',
				act2Icon: 'fas fa-campground',
				act3: 'Rafting',
				act3Icon: 'fas fa-water',
				days : 5,
				nights: 4,
				urlName : 'shimla-manali-escape'
			},
			{
				id : 46,
				name : 'Bijli Mahadev Escape',
				img : 'assets/css/images/escape-trips/weekend-escape/weekend-escape-min.jpg',
				price : 7000,
				prodType : 'escape-trips',
				stock : 1,
				act1: 'Local Tour',
				act1Icon: 'fas fa-binoculars',
				act2: 'Camping',
				act2Icon: 'fas fa-campground',
				act3: 'Rafting',
				act3Icon: 'fas fa-water',
				days : 3,
				nights: 2,
				urlName : 'bijli-mahadev-escape'
			},


			{
				id : 47,
				name : 'Spiti Valley Escape',
				img : 'assets/css/images/escape-trips/spiti-valley-escape/spiti_min.jpg',
				price : 9999,
				prodType : 'escape-trips',
				stock : 1,
				act1: 'Moderate Trek',
				act1Icon: 'fas fa-hiking',
				act2: 'Camping',
				act2Icon: 'fas fa-campground',
				act3: 'Rafting',
				act3Icon: 'fas fa-water',
				days : 6,
				nights: 5,
				urlName : 'spiti-valley-escape'
			},

			{
				id : 48,
				name : 'Tirthan Valley Escape',
				img : 'assets/css/images/escape-trips/tirthan-valley/tirthan-valley.jpg',
				price : 9999,
				prodType : 'escape-trips',
				stock : 1,
				act1: 'Moderate Trek',
				act1Icon: 'fas fa-hiking',
				act2: 'Camping',
				act2Icon: 'fas fa-campground',
				act3: 'Rafting',
				act3Icon: 'fas fa-water',
				days : 6,
				nights: 5,
				urlName : 'tirthan-valley-escape'
			},
			{
				id : 49,
				name : 'Himalayan Escape',
				img : 'assets/css/images/escape-trips/himalayan-escape/himalayan-escape-min.jpg',
				price : 6500,
				prodType : 'escape-trips',
				stock : 1,
				act1: 'Sightseeing',
				act1Icon: 'fas fa-binoculars',
				act2: 'Camping',
				act2Icon: 'fas fa-campground',
				act3: 'Rafting',
				act3Icon: 'fas fa-water',
				days : 6,
				nights: 5,
				urlName : 'himalayan-escape'
			},

			{
				id : 50,
				name : 'Magic Valley Escape',
				img : 'assets/css/images/escape-trips/magic-valley-escape/magic-valley-escape-min.jpg',
				price : 8000,
				prodType : 'escape-trips',
				stock : 1,
				act1: 'Moderate Trek',
				act1Icon: 'fas fa-hiking',
				act2: 'Camping',
				act2Icon: 'fas fa-campground',
				act3: 'Rafting',
				act3Icon: 'fas fa-water',
				days : 6,
				nights: 5,
				urlName : 'magic-valley-escape'
			},
			{
				id : 51,
				name : 'Leh Ladakh Escape',
				img : 'assets/css/images/escape-trips/leh-ladakh-escape/leh_min.jpg',
				price : 9999,
				prodType : 'escape-trips',
				stock : 1,
				act1: 'Moderate Trek',
				act1Icon: 'fas fa-hiking',
				act2: 'Camping',
				act2Icon: 'fas fa-campground',
				act3: 'Rafting',
				act3Icon: 'fas fa-water',
				days : 6,
				nights: 5,
				urlName : 'leh-ladakh-escape'
			},




			//Bike-Tours Products
			{
				id : 52,
				name : 'Annapurna Circuit MTB Tour',
				img : 'assets/css/images/bike-tours/annapurna-circuit-mtb-tour/01.jpg',
				price : 36000.00,
				prodType : 'bike-tour',
				descShort :   'The Annapurna Circuit Mountain Biking Tour is a unique way to experience one of the worlds most beautiful regions. It provides an opportunity to test ones endurance, experience the local culture, and immerse oneself in the breathtaking beauty of the Himalayas.',
				descPartOne : 'The Annapurna Circuit Mountain Biking Tour is a unique way to experience one of the worlds most beautiful regions. It provides an opportunity to test ones endurance, experience the local culture, and immerse oneself in the breathtaking beauty of the Himalayas.',
				descPartTwo : 'The Annapurna Circuit Mountain Biking Tour is a unique way to experience one of the worlds most beautiful regions. It provides an opportunity to test ones endurance, experience the local culture, and immerse oneself in the breathtaking beauty of the Himalayas.',
				stock : 1,
				days : 3,
				nights: 2,
				fixedDate: '15 September',
				urlName : 'annapurna-circuit-mtb-tour'
			},
			{
				id : 53,
				name : 'Kathmandu Valley MTB Tour',
				img : 'assets/css/images/bike-tours/kathmandu-valley-mtb-tour/banner2.jpg',
				price : 36000.00,
				prodType : 'bike-tour',
				descShort :   "The Kathmandu Valley Mountain Bike Tour is a fantastic way to explore the cultural and natural wonders of Nepal's capital city and the surrounding region. With its stunning mountain scenery, rich history, and vibrant culture, Kathmandu is a popular destination for travelers from all over the world.",
				descPartOne : "The Kathmandu Valley Mountain Bike Tour is a fantastic way to explore the cultural and natural wonders of Nepal's capital city and the surrounding region. With its stunning mountain scenery, rich history, and vibrant culture, Kathmandu is a popular destination for travelers from all over the world.",
				descPartTwo : "The Kathmandu Valley Mountain Bike Tour is a fantastic way to explore the cultural and natural wonders of Nepal's capital city and the surrounding region. With its stunning mountain scenery, rich history, and vibrant culture, Kathmandu is a popular destination for travelers from all over the world.",
				stock : 1,
				days : 3,
				nights: 2,
				fixedDate: '15 September',
				urlName : 'kathmandu-valley-bike-tour'
			},
			{
				id : 54,
				name : 'Upper Mustang MTB Tour',
				img : 'assets/css/images/bike-tours/upper-mustang-mtb-tour/banner2.jpg',
				price : 8500.00,
				prodType : 'bike-tour',
				descShort :   'The Upper Mustang mountain bike tour is an unforgettable adventure that will take you through some of the most stunning landscapes in the world. Youll ride through remote mountain villages, ancient walled cities, and breathtaking natural scenery that will leave you awe-inspired. This tour is perfect for experienced mountain bikers who are looking for a challenge, as it involves long rides on varied terrain and elevation changes.',
				descPartOne : 'The Upper Mustang mountain bike tour is an unforgettable adventure that will take you through some of the most stunning landscapes in the world. Youll ride through remote mountain villages, ancient walled cities, and breathtaking natural scenery that will leave you awe-inspired. This tour is perfect for experienced mountain bikers who are looking for a challenge, as it involves long rides on varied terrain and elevation changes.',
				descPartTwo : 'The Upper Mustang mountain bike tour is an unforgettable adventure that will take you through some of the most stunning landscapes in the world. Youll ride through remote mountain villages, ancient walled cities, and breathtaking natural scenery that will leave you awe-inspired. This tour is perfect for experienced mountain bikers who are looking for a challenge, as it involves long rides on varied terrain and elevation changes.',
				stock : 1,
				days : 3,
				nights: 2,
				urlName : 'upper-mustang-mtb-tour'
				
			},
			{
				id : 55,
				name : 'Manaslu Circuit MTB Tour',
				img : 'assets/css/images/bike-tours/manaslu-circuit-mtb-tour/banner2.jpg',
				price : 36000.00,
				prodType : 'bike-tour',
				descShort :   'The Manaslu Circuit Mountain Bike Tour is an unforgettable adventure that takes you through the breathtaking landscapes of the Manaslu region in Nepal. This 13-day tour is designed for mountain biking enthusiasts who are looking for a challenge and a unique cultural experience.',
				descPartOne : 'The Manaslu Circuit Mountain Bike Tour is an unforgettable adventure that takes you through the breathtaking landscapes of the Manaslu region in Nepal. This 13-day tour is designed for mountain biking enthusiasts who are looking for a challenge and a unique cultural experience.',
				descPartTwo : 'The Manaslu Circuit Mountain Bike Tour is an unforgettable adventure that takes you through the breathtaking landscapes of the Manaslu region in Nepal. This 13-day tour is designed for mountain biking enthusiasts who are looking for a challenge and a unique cultural experience.',
				stock : 1,
				days : 13,
				nights: 12,
				fixedDate: '15 September',
				urlName : 'manaslu-circuit-mtb-tour'
			},

			{
				id : 56,
				name : 'Nagarkot MTB Tour',
				img : 'assets/css/images/bike-tours/spiti/spiti_min.jpg',
				price : 8500.00,
				prodType : 'bike-tour',
				descShort : 'Chandrakhani pass is a beautiful & calm pass at altitude of 12,007 Ft located in kullu valley of himachal pradesh . the top of ChandraKhani pass offers the fabulous  view of Deo Tibba , Pir Panjal and parvati valley ..',
				descPartOne : 'Chandrakhani pass is a beautiful & calm pass at altitude of 12,007 Ft located in kullu valley of himachal pradesh . the top of ChandraKhani pass offers the fabulous  view of Deo Tibba , Pir Panjal and parvati valley .',
				descPartTwo : 'Chandrakhani pass is a beautiful & calm pass at altitude of 12,007 Ft located in kullu valley of himachal pradesh . the top of ChandraKhani pass offers the fabulous  view of Deo Tibba , Pir Panjal and parvati valley .',
				stock : 1,
				days : 3,
				nights: 2,
				urlName : 'nagarkot-mtb-tour'
			},
			{
				id : 57,
				name : 'Shivapuri National Park MTB Tour',
				img : 'assets/css/images/bike-tours/spiti/spiti_min.jpg',
				price : 8500.00,
				prodType : 'bike-tour',
				descShort : 'Chandrakhani pass is a beautiful & calm pass at altitude of 12,007 Ft located in kullu valley of himachal pradesh . the top of ChandraKhani pass offers the fabulous  view of Deo Tibba , Pir Panjal and parvati valley ..',
				descPartOne : 'Chandrakhani pass is a beautiful & calm pass at altitude of 12,007 Ft located in kullu valley of himachal pradesh . the top of ChandraKhani pass offers the fabulous  view of Deo Tibba , Pir Panjal and parvati valley .',
				descPartTwo : 'Chandrakhani pass is a beautiful & calm pass at altitude of 12,007 Ft located in kullu valley of himachal pradesh . the top of ChandraKhani pass offers the fabulous  view of Deo Tibba , Pir Panjal and parvati valley .',
				stock : 1,
				days : 3,
				nights: 2,
				urlName : 'shivapuri-mtb-tour'
			},
			{
				id : 58,
				name : 'Chitwan Safari MTB Tour',
				img : 'assets/css/images/bike-tours/spiti/spiti_min.jpg',
				price : 8500.00,
				prodType : 'bike-tour',
				descShort : 'Chandrakhani pass is a beautiful & calm pass at altitude of 12,007 Ft located in kullu valley of himachal pradesh . the top of ChandraKhani pass offers the fabulous  view of Deo Tibba , Pir Panjal and parvati valley ..',
				descPartOne : 'Chandrakhani pass is a beautiful & calm pass at altitude of 12,007 Ft located in kullu valley of himachal pradesh . the top of ChandraKhani pass offers the fabulous  view of Deo Tibba , Pir Panjal and parvati valley .',
				descPartTwo : 'Chandrakhani pass is a beautiful & calm pass at altitude of 12,007 Ft located in kullu valley of himachal pradesh . the top of ChandraKhani pass offers the fabulous  view of Deo Tibba , Pir Panjal and parvati valley .',
				stock : 1,
				days : 3,
				nights: 2,
				urlName : 'chitwan-safari-mtb-tour'
			},
			{
				id : 59,
				name : 'Pokhara MTB Tour',
				img : 'assets/css/images/bike-tours/leh-manali/banner1.jpg',
				price : 36000.00,
				prodType : 'bike-tour',
				descShort : 'Chandrakhani pass is a beautiful & calm pass at altitude of 12,007 Ft located in kullu valley of himachal pradesh . the top of ChandraKhani pass offers the fabulous  view of Deo Tibba , Pir Panjal and parvati valley ..',
				descPartOne : 'Chandrakhani pass is a beautiful & calm pass at altitude of 12,007 Ft located in kullu valley of himachal pradesh . the top of ChandraKhani pass offers the fabulous  view of Deo Tibba , Pir Panjal and parvati valley .',
				descPartTwo : 'Chandrakhani pass is a beautiful & calm pass at altitude of 12,007 Ft located in kullu valley of himachal pradesh . the top of ChandraKhani pass offers the fabulous  view of Deo Tibba , Pir Panjal and parvati valley .',
				stock : 10,
				days : 12,
				nights: 11,
				fixedDate: '15 September',
				urlName : 'pokhara-valley-bike-tour'
			},

	
		],
		wrapper = $('.productWrapper'),
		content = ''
		var upperLimit, lowerLimit;
		if(productName=='rafting'){
			lowerLimit = 0
			upperLimit = 7
		}
		else if(productName=='paragliding'){
			lowerLimit = 8
			upperLimit = 9
		}
		else if(productName=='trekking'){
			lowerLimit = 10
			upperLimit = 41
		}
		else if(productName=='camping'){
			lowerLimit = 42
			upperLimit = 43
		}
		else if(productName=='escape-trips'){
			lowerLimit = 44
			upperLimit = 50
		}
		else if(productName=='escape-trips-4'){
			lowerLimit = 44
			upperLimit = 47
		}
		else if(productName=='bike-tours'){
			lowerLimit = 51
			upperLimit = 54
		}
	
		else{
			lowerLimit = 50
			upperLimit = products.length - 1
		}

		for(var i = lowerLimit; i <= upperLimit; i++){
			if((upperLimit < 8)){
				if(products[i].stock > 0){
					// content+= '<div class="wrapper col-medium" data-aos="zoom-in" data-aos-easing="ease-in-out-quad">'
					// content+= '<a href="/activities/'+ products[i].prodType + '/' + products[i].urlName +'" class="wopper wopper--'+ products[i].prodType +' '+ products[i].prodType +'-'+(i+1)+'" style="background-image: url(/'+products[i].img+')">'
					// content+= '<div class="para__title"><i class="fa fa-map-marker-alt"></i>&nbsp;'+products[i].location
					// content+= '</div>'
					// content+= '</a>'
					// content+= '<div class="wopper__footer">'
					// content+= '<div class="wopper__info">'
					// content+= '<div>'
					// content+= '<a class="wopper__info-detail" href="javascript:void(0);">'+products[i].name+'</a>'
					// content+= '<button class="wopper__info-cart btn prod-'+products[i].id+'" data-style="zoom-out" onclick="app.addtoCart('+products[i].id+');" title="Add To Cart"><i class="fas fa-cart-plus"></i></button>'
					// content+= '</div>'
					// content+= '<a class="wopper__info-price prod-'+products[i].id+'"><span style="text-decoration: line-through;">₹ '+products[i].oldprice+' /-</span><span> ₹ '+products[i].price+' /-</span></a>'
					// content+= '</div>'
					// content+= '</div>'
					// content+= '</div>'

					// content+= '<div class="row row--padding-medium">'
					// content+= '<div class="wrapper col-medium" data-aos="zoom-in" data-aos-easing="ease-in-out-quad">'
					// content+= '<a href="/activities/'+ products[i].prodType + '/' + products[i].urlName +'" class="wopper wopper--trek" style="display: flex; justify-content: center; background-image: url(\'/'+products[i].img+'\')">'
					// content+= '<span class="banner__overlay">'
					// content+= '</span>'
					// content+= '<span class="trek__title">'
					// content+= '<span>'+ products[i].name +'</span></span>'
					// content+= '</a>'
					// content+= '<div class="wopper__footer">'
					// content+= '<div class="wopper__info">'
					// content+= '<div>'
					// // content+= '<a class="wopper__info-detail" style="" href="/activities/trekking/'+ products[i].urlName +'">'+ products[i].days +' Days '+ products[i].nights +' Nights</a>'
					// // content+= '<button class="wopper__info-cart btn prod-'+products[i].id+'" data-style="zoom-out" onclick="app.addtoCart('+products[i].id+');" title="Add To Cart"><i class="fas fa-cart-plus"></i></button>'
					// content+= '</div>'
					// // content+= '<a class="wopper__info-price" href="/activities/trekking/'+ products[i].urlName +'"><span>₹ '+ products[i].price +' /-</span></a>'
					// content+= '<a class="wopper__info-price" href="/activities/trekking/"><span></span></a>'
					// content+= '</div>'
					// content+= '</div>'
					// content+= '</div>'
					// content+= '<div class="col-medium wrapper-text-right" data-aos="fade-left" data-aos-easing="ease-in-out-quad">'
					// content+= '<h2 class="content__sub-title content__title-white" style="float: left; margin-left: 0; padding-top: 0; margin-bottom: .8em;">About</h2><br />'
					// content+= '<p class="content__pg content--detail">'
					// content+= '<span>'+ products[i].descShort +' </span>'
					// content+= '</p>'
					// content+= '<p class="trippy_btn-wrapper">'
					// content+= '<a href="/activities/'+ products[i].prodType + '/' + products[i].urlName  +'"><button class="trippy_btn"><span class="trippy_btn-left"></span>Book Now<span class="trippy_btn-right"></span></button>'
					// content+= '</a><br />'
					// content+= '</p>'
					// content+= '</div>'
					// content+= '</div>'

					content+= '<div class="row row--padding-medium">'
					content+= '<div class="wrapper col-medium" data-aos="zoom-in" data-aos-easing="ease-in-out-quad">'
					content+= '<a href="/activities/'+ products[i].prodType + '/' + products[i].urlName +'" class="wopper wopper--trek" style="display: flex; justify-content: center; background-image: url(\'/'+products[i].img+'\')">'
					content+= '<span class="banner__overlay">'
					content+= '</span>'
					content+= '<span class="trek__title">'
					// content+= '<span>'+ products[i].name +'</span></span>'
					content+= '</a>'
					content+= '<div class="wopper__footer">'
					content+= '<div class="wopper__info">'
					content+= '<div>'
					// content+= '<a class="wopper__info-detail" style="" href="/activities/trekking/'+ products[i].urlName +'">'+ products[i].days +' Days '+ products[i].nights +' Nights</a>'
					// content+= '<button class="wopper__info-cart btn prod-'+products[i].id+'" data-style="zoom-out" onclick="app.addtoCart('+products[i].id+');" title="Add To Cart"><i class="fas fa-cart-plus"></i></button>'
					content+= '</div>'
					// content+= '<a class="wopper__info-price" href="/activities/trekking/'+ products[i].urlName +'"><span>₹ '+ products[i].price +' /-</span></a>'
					content+= '<a class="wopper__info-price" href="/activities/trekking/"><span></span></a>'
					// content+= '<a href="/activities/bike-tours/'+ products[i].urlName +'"><button class="trippy_btn"><span class="trippy_btn-left"></span>Book Now<span class="trippy_btn-right"></span></button>'
					content+= '</div>'
					content+= '</div>'
					content+= '</div>'

					content+= '<div class="col-medium wrapper-text-right" data-aos="fade-left" data-aos-easing="ease-in-out-quad">'
					content+= '<h2 class="content__sub-title content__title-white" style="float: left; margin-left: 0; padding-top: 0; margin-bottom: .8em;">'+ products[i].name +'</h2><br />'
					content+= '<p class="content__pg content--detail">'
					content+= '<span>'+ products[i].descShort +' </span>'
					content+= '</p>'
					content+= '<p class="trippy_btn-wrapper">'
					content+= '<a href="/activities/'+ products[i].prodType + '/' + products[i].urlName  +'"><button class="trippy_btn"><span class="trippy_btn-left"></span>Book Now<span class="trippy_btn-right"></span></button>'
					content+= '</a><br />'
					content+= '</p>'
					content+= '</div>'
					content+= '</div>'
				}
			}
			// Treks
			else if((upperLimit >= 10)&&(upperLimit<=41)){
				if(products[i].stock > 0){
					content+= '<div class="row row--padding-medium">'
					content+= '<div class="wrapper col-medium" data-aos="zoom-in" data-aos-easing="ease-in-out-quad">'
					content+= '<a href="/activities/trekking/'+ products[i].urlName +'" class="wopper wopper--trek" style="display: flex; justify-content: center; background-size:cover; background-image: url(\'/'+products[i].img+'\')">'
					content+= '<span class="banner__overlay">'
					// content+= '<span class="trek-slide--price"><span style="font-size: 60%;">Starting From</span> <i class="fa fa-rupee-sign"></i> 2199/-</span>'
					content+= '</span>'
					content+= '<span class="trek__title">'
					// content+= '<span>'+ products[i].name +'</span></span>'
					content+= '</a>'
					content+= '<div class="wopper__footer">'
					content+= '<div class="wopper__info">'
					content+= '<div>'
					// content+= '<a class="wopper__info-detail" style="" href="/activities/trekking/'+ products[i].urlName +'">'+ products[i].days +' Days '+ products[i].nights +' Nights</a>'
					// content+= '<button class="wopper__info-cart btn prod-'+products[i].id+'" data-style="zoom-out" onclick="app.addtoCart('+products[i].id+');" title="Add To Cart"><i class="fas fa-cart-plus"></i></button>'
					content+= '</div>'
					// content+= '<a class="wopper__info-price" href="/activities/trekking/'+ products[i].urlName +'"><span>₹ '+ products[i].price +' /-</span></a>'
					content+= '<a class="wopper__info-price" href="/activities/trekking/"><span></span></a>'
					content+= '</div>'
					content+= '</div>'
					content+= '</div>'
					content+= '<div class="col-medium wrapper-text-right" data-aos="fade-left" data-aos-easing="ease-in-out-quad">'
					// content+= '<h2 class="content__sub-title content__title-white" style="float: left; margin-left: 0; padding-top: 0; margin-bottom: .8em;">About</h2><br />'
					content+= '<h2 class="content__sub-title content__title-white" style="float: left; margin-left: 0; padding-top: 0; margin-bottom: .8em;">'+ products[i].name +'</h2><br />'
					content+= '<p class="content__pg content--detail">'
					content+= '<span>'+ products[i].descShort +' </span>'
					content+= '</p>'
					content+= '<p class="trippy_btn-wrapper">'
					content+= '<a href="/activities/trekking/'+ products[i].urlName +'"><button class="trippy_btn"><span class="trippy_btn-left"></span>Book Now<span class="trippy_btn-right"></span></button>'
					content+= '</a><br />'
					content+= '</p>'
					content+= '</div>'
					content+= '</div>'
				}
			}

			// Camping
			else if((upperLimit >= 42)&&(upperLimit<=43)){
				if(products[i].stock > 0){
					content+= '<div class="wrapper col-medium" data-aos="zoom-in" data-aos-easing="ease-in-out-quad">'
					content+= '<a href="/activities/camping/'+ products[i].urlName +'" class="wopper wopper--'+ products[i].prodType +' '+ products[i].prodType +'-'+(i+1)+'" style="background-image: url(/'+products[i].img+')">'
//					content+= '<div class="para__title"><i class="fa fa-map-marker-alt"></i>&nbsp;'+products[i].location
//					content+= '</div>'
					content+= '</a>'
					content+= '<div class="wopper__footer">'
					content+= '<div class="wopper__info">'
					content+= '<div>'
					content+= '<a class="wopper__info-detail" href="javascript:void(0);">'+products[i].name+'</a>'
					content+= '<button class="wopper__info-cart btn prod-'+products[i].id+'" data-style="zoom-out" onclick="app.addtoCart('+products[i].id+');" title="Add To Cart"><i class="fas fa-cart-plus"></i></button>'
					content+= '</div>'
					content+= '<a class="wopper__info-price prod-'+products[i].id+'"><span> ₹ '+products[i].price+' /-</span></a>'
					content+= '</div>'
					content+= '</div>'
					content+= '</div>'
				}
			}

			// Escape Trips
			else if((upperLimit >= 44)&&(upperLimit<=50)){
				if(products[i].stock > 0){

					content+= '<div class="row row--padding-medium">'
					content+= '<div class="wrapper col-medium" data-aos="zoom-in" data-aos-easing="ease-in-out-quad">'
					content+= '<a href="/escape-trips/'+ products[i].urlName +'" class="wopper wopper--trek" style="display: flex; justify-content: center; background-image: url(\'/'+products[i].img+'\')">'
					content+= '<span class="banner__overlay">'
					content+= '</span>'
					content+= '<span class="trek__title">'
					content+= '<span>'+ products[i].name +'</span></span>'
					content+= '</a>'
					content+= '<div class="wopper__footer">'
					content+= '<div class="wopper__info">'
					content+= '<div>'
					// content+= '<a class="wopper__info-detail" style="" href="/activities/trekking/'+ products[i].urlName +'">'+ products[i].days +' Days '+ products[i].nights +' Nights</a>'
					// content+= '<button class="wopper__info-cart btn prod-'+products[i].id+'" data-style="zoom-out" onclick="app.addtoCart('+products[i].id+');" title="Add To Cart"><i class="fas fa-cart-plus"></i></button>'
					content+= '</div>'
					// content+= '<a class="wopper__info-price" href="/activities/trekking/'+ products[i].urlName +'"><span>₹ '+ products[i].price +' /-</span></a>'
					content+= '<a class="wopper__info-price" href="/activities/trekking/"><span></span></a>'
					content+= '</div>'
					content+= '</div>'
					content+= '</div>'
					content+= '<div class="col-medium wrapper-text-right" data-aos="fade-left" data-aos-easing="ease-in-out-quad">'
					content+= '<h2 class="content__sub-title content__title-white" style="float: left; margin-left: 0; padding-top: 0; margin-bottom: .8em;">About</h2><br />'
					content+= '<p class="content__pg content--detail">'
					content+= '<span>'+ products[i].descShort +' </span>'
					content+= '</p>'
					content+= '<p class="trippy_btn-wrapper">'
					content+= '<a href="/escape-trips/'+ products[i].urlName +'"><button class="trippy_btn"><span class="trippy_btn-left"></span>Book Now<span class="trippy_btn-right"></span></button>'
					content+= '</a><br />'
					content+= '</p>'
					content+= '</div>'
					content+= '</div>'


					// content+='<div class="row--padding-medium col-medium">'
					// content+='<div class="trek-slide">'
					// content+='	<div style="position: relative;">'
					// content+='		<img class="trek-slide--img trek-slide4" style="background-image:url(/'+ products[i].img +')">'
					// content+='		<div class="wopper__footer adventure">'
					// content+='			<div class="wopper__info" style="padding: 0;">'
					// content+='				<a class="wopper__info-price white wopper__act-name" href="/escape-trips/'+ products[i].urlName +'"><span>'+ products[i].name +'</span></a>'
					// content+='			</div>'
					// content+='		</div>'
					// content+='	</div>'
					// content+='	  <span class="trek-slide--price"><span style="font-size: 60%;">From</span> <i class="fa fa-rupee-sign"></i> '+ products[i].price +'/-</span>'
					// content+= '<button class="wopper__info-cart btn-escape btn prod-'+products[i].id+'" data-style="zoom-out" onclick="app.addtoCart('+products[i].id+');" title="Add To Cart"><i class="fas fa-cart-plus"></i></button>'
					// content+='	<div class="trek-slide--text">'
					// content+='		<div class="trek-slide--meta">'
					// content+='			<div class="">'
					// content+='				<span>'+ products[i].act1 +'</span>'
					// content+='				<span class="meta-type"><i class="'+ products[i].act1Icon +'"></i></span>'
					// content+='			</div>'
					// content+='			<div class="">'
					// content+='				<span>'+ products[i].act2 +'</span>'
					// content+='				<span class="meta-type"><i class="'+ products[i].act2Icon +'"></i></span>'
					// content+='			</div>'
					// content+='			<div class="">'
					// content+='				<span>'+ products[i].act3 +'</span>'
					// content+='				<span class="meta-type"><i class="'+ products[i].act3Icon +'"></i></span>'
					// content+='			</div>'
					// content+='		</div>'
					// content+='	</div>'
					// content+='</div>'
					// content+='</div>'



					// content+= '<div class="wrapper col-medium" data-aos="zoom-in" data-aos-easing="ease-in-out-quad">'
					// content+= '<a href="/escape-trips/'+ products[i].urlName +'" class="wopper wopper--'+ products[i].prodType +' '+ products[i].prodType +'-'+(i+1)+'" style="background-image: url(/'+products[i].img+')">'
					// content+= '</a>'
					// content+= '<div class="wopper__footer">'
					// content+= '<div class="wopper__info">'
					// content+= '<div>'
					// content+= '<a class="wopper__info-detail" href="javascript:void(0);">'+products[i].name+'</a>'
					// content+= '</div>'
					// content+= '<a class="wopper__info-price prod-'+products[i].id+'"><span> ₹ '+products[i].price+' /-</span></a>'
					// content+= '</div>'
					// content+= '</div>'
					// content+= '</div>'
				}
			}

			// Bike-Tours
			else if((upperLimit >= 51)&&(upperLimit<=54)){
				if(products[i].stock > 0){

					// content+='<div class="row--padding-medium col-medium">'
					// content+='<div class="trek-slide">'
					// content+='	<div style="position: relative;">'
					// content+='		<img class="trek-slide--img trek-slide4" style="background-image:url(/'+ products[i].img +')">'
					// content+='		<div class="wopper__footer adventure">'
					// content+='			<div class="wopper__info" style="padding: 0;">'
					// content+='				<a class="wopper__info-price white wopper__act-name" href="/activities/bike-tours/'+ products[i].urlName +'"><span>'+ products[i].name +'</span></a>'
					// content+='			</div>'
					// content+='		</div>'
					// content+='	</div>'
					// content+='	  <span class="trek-slide--price"><span style="font-size: 60%;">From</span> <i class="fa fa-rupee-sign"></i> '+ products[i].price +'/-</span>'
					// content+= '<button class="wopper__info-cart btn-escape btn prod-'+products[i].id+'" data-style="zoom-out" onclick="app.addtoCart('+products[i].id+');" title="Add To Cart"><i class="fas fa-cart-plus"></i></button>'
					// content+='	<div class="trek-slide--text">'
					// content+='		<div class="trek-slide--meta">'
					// content+='			<div class="">'
					// content+='				<span>'+ products[i].days +'</span>'
					// content+='				<span class="meta-type">DAYS &nbsp;<i class="fas fa-sun"></i></span>'
					// content+='			</div>'
					// content+='			<div class="">'
					// content+='				<span>'+ products[i].nights +'</span>'
					// content+='				<span class="meta-type">NIGHTS &nbsp;<i class="fas fa-moon"></i></span>'
					// content+='			</div>'
					// content+='			<div class="">'
					// content+='				<span>'+ products[i].fixedDate +'</span>'
					// content+='				<span class="meta-type">DEPARTURE &nbsp;<i class="fas fa-calendar-alt"></i></span>'
					// content+='			</div>'
					// content+='		</div>'
					// content+='	</div>'
					// content+='</div>'
					// content+='</div>'

					
						content+= '<div class="row row--padding-medium">'
						content+= '<div class="wrapper col-medium" data-aos="zoom-in" data-aos-easing="ease-in-out-quad">'
						content+= '<a href="/activities/bike-tours/'+ products[i].urlName +'" class="wopper wopper--trek" style="display: flex; justify-content: center; background-image: url(\'/'+products[i].img+'\')">'
						content+= '<span class="banner__overlay">'
						content+= '</span>'
						content+= '<span class="trek__title">'
						// content+= '<span>'+ products[i].name +'</span></span>'
						content+= '</a>'
						content+= '<div class="wopper__footer">'
						content+= '<div class="wopper__info">'
						content+= '<div>'
						// content+= '<a class="wopper__info-detail" style="" href="/activities/trekking/'+ products[i].urlName +'">'+ products[i].days +' Days '+ products[i].nights +' Nights</a>'
						// content+= '<button class="wopper__info-cart btn prod-'+products[i].id+'" data-style="zoom-out" onclick="app.addtoCart('+products[i].id+');" title="Add To Cart"><i class="fas fa-cart-plus"></i></button>'
						content+= '</div>'
						// content+= '<a class="wopper__info-price" href="/activities/trekking/'+ products[i].urlName +'"><span>₹ '+ products[i].price +' /-</span></a>'
						content+= '<a class="wopper__info-price" href="/activities/trekking/"><span></span></a>'
						// content+= '<a href="/activities/bike-tours/'+ products[i].urlName +'"><button class="trippy_btn"><span class="trippy_btn-left"></span>Book Now<span class="trippy_btn-right"></span></button>'
						content+= '</div>'
						content+= '</div>'
						content+= '</div>'

						content+= '<div class="col-medium wrapper-text-right" data-aos="fade-left" data-aos-easing="ease-in-out-quad">'
						content+= '<h2 class="content__sub-title content__title-white" style="float: left; margin-left: 0; padding-top: 0; margin-bottom: .8em;">'+ products[i].name +'</h2><br />'
						content+= '<p class="content__pg content--detail">'
						content+= '<span>'+ products[i].descShort +' </span>'
						content+= '</p>'
						content+= '<p class="trippy_btn-wrapper">'
						content+= '<a href="/activities/bike-tours/'+ products[i].urlName +'"><button class="trippy_btn"><span class="trippy_btn-left"></span>Book Now<span class="trippy_btn-right"></span></button>'
						content+= '</a><br />'
						content+= '</p>'
						content+= '</div>'
						content+= '</div>'
				}
			}

			// Mountain bike tours
			else if((upperLimit >= 60)&&(upperLimit<=66)){
				if(products[i].stock > 0){

					content+='<div class="row--padding-medium col-medium">'
					content+='<div class="trek-slide">'
					content+='	<div style="position: relative;">'
					content+='		<img class="trek-slide--img trek-slide4" style="background-image:url(/'+ products[i].img +')">'
					content+='		<div class="wopper__footer adventure">'
					content+='			<div class="wopper__info" style="padding: 0;">'
					content+='				<a class="wopper__info-price white wopper__act-name" href="/activities/bike-tours/'+ products[i].urlName +'"><span>'+ products[i].name +'</span></a>'
					content+='			</div>'
					content+='		</div>'
					content+='	</div>'
					content+='	  <span class="trek-slide--price"><span style="font-size: 60%;">From</span> <i class="fa fa-rupee-sign"></i> '+ products[i].price +'/-</span>'
					content+= '<button class="wopper__info-cart btn-escape btn prod-'+products[i].id+'" data-style="zoom-out" onclick="app.addtoCart('+products[i].id+');" title="Add To Cart"><i class="fas fa-cart-plus"></i></button>'
					content+='	<div class="trek-slide--text">'
					content+='		<div class="trek-slide--meta">'
					content+='			<div class="">'
					content+='				<span>'+ products[i].days +'</span>'
					content+='				<span class="meta-type">DAYS &nbsp;<i class="fas fa-sun"></i></span>'
					content+='			</div>'
					content+='			<div class="">'
					content+='				<span>'+ products[i].nights +'</span>'
					content+='				<span class="meta-type">NIGHTS &nbsp;<i class="fas fa-moon"></i></span>'
					content+='			</div>'
					content+='			<div class="">'
					content+='				<span>'+ products[i].fixedDate +'</span>'
					content+='				<span class="meta-type">DEPARTURE &nbsp;<i class="fas fa-calendar-alt"></i></span>'
					content+='			</div>'
					content+='		</div>'
					content+='	</div>'
					content+='</div>'
					content+='</div>'
				}
			}

			// Packages
			else{
				if(products[i].stock > 0){
					content+= '<div class="wrapper col-medium" data-aos="zoom-in" data-aos-easing="ease-in-out-quad">'
					content+= '<a href="javascript:void(0);" class="wopper wopper--'+ products[i].prodType +' '+ products[i].prodType +'-'+(i+1)+'" style="background-image: url(/'+products[i].img+')">'
					content+= '<div class="para__title"><i class="fa fa-map-marker-alt"></i>&nbsp;'+products[i].location
					content+= '</div>'
					content+= '</a>'
					content+= '<div class="wopper__footer">'
					content+= '<div class="wopper__info">'
					content+= '<div>'
					content+= '<a class="wopper__info-detail" href="javascript:void(0);">'+products[i].name+'</a>'
					content+= '<button class="wopper__info-cart btn prod-'+products[i].id+'" data-style="zoom-out" onclick="app.addtoCart('+products[i].id+');" title="Add To Cart"><i class="fas fa-cart-plus"></i></button>'
					content+= '</div>'
					content+= '<a class="wopper__info-price prod-'+products[i].id+'"><span style="text-decoration: line-through;">₹ '+products[i].oldprice+' /-</span><span> ₹ '+products[i].price+' /-</span></a>'
					content+= '</div>'
					content+= '</div>'
					content+= '</div>'
				}
			}

		}

		wrapper.html(content)

		localStorage.setItem('products',JSON.stringify(products))
	}

	app.addtoCart = function(id){
		var l = Ladda.create( document.querySelector( '.prod-'+id ) );

		l.start();
		var products = JSON.parse(localStorage.getItem('products')),
		product = _.find(products,{ 'id' : id }),
		cant = 1;
		//if(cant <= product.stock){
			if(undefined != product){
				if(cant > 0){
					setTimeout(function(){
						var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
						app.searchProd(cart,product.id,parseInt(cant),product.name,product.price,product.img,product.stock, product.urlName, product.prodType, product.location)
						l.stop();
						// Do something when the product is added, like show custom message to the user confirming that their product is added to the cart.
//						alertContent += '<div class="cart-alert cart-alert--msg">',
//						alertContent += '	<span><i class="fa fa-check-circle"></i>&nbsp;Added to cart!</span>',
//						alertContent += '	<a class="cart-alert--close no-select">x</a>',
//						alertContent += '</div>';
//						alertWrapper.html(alertContent);
//						msgSelfDestruct();
					},2000)
				}else{
					alert('Only quantities greater than zero are allowed')
				}
			}else{
				alert('Oops! Something bad happened, try again later')
			}
		//}
		//else{
			//alert('Can not add more than this product')
		//}
	}

	app.searchProd = function(cart,id,cant,name,price,img,available, urlName, prodType, location){
		//if we pass a negative value to the amount, it is deducted from the cart
		var curProd = _.find(cart.items, { 'id': id });

		if(undefined != curProd && curProd != null){
			//the product already exists, we add one more to its quantity
//			if(curProd.cant < available){
				curProd.cant = parseInt(curProd.cant + cant);
				msgAlert('Quantity Increased!');
				msgSelfDestruct();
			//}else{
			//	alert('Can not add more than this product')
			//}

		}else{
			//if not, we add it to the cart
			var prod = {
				id : id,
				cant : cant,
				name : name,
				price : price,
				img : img,
				available : available,
				urlName : urlName,
				prodType : prodType,
				location : location
			}
			cart.items.push(prod);
			 msgAlert('Added to cart!');
			msgSelfDestruct();
//			alertContent += '<div class="cart-alert cart-alert--msg">',
//			alertContent += '	<span><i class="fa fa-check-circle"></i>&nbsp;Added to cart!</span>',
//			alertContent += '</div>';
//			alertWrapper.html(alertContent);
//			msgSelfDestruct();
		}
		localStorage.setItem('cart',JSON.stringify(cart))
		app.init()
		app.getProducts()
		//app.updatePayForm()
	}

	app.getProducts = function(checkoutForm){
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []},
		msg = '',
		total = 0
//		wrapper.html('');
		if(checkoutForm=="checkout"){
			var wrapper = $('#cartItems');
			if(undefined == cart || null == cart || cart == '' || cart.items.length == 0){
				var wrapper = $('#formContainer');
				var items = '';
				items += '<h3 style="font-variant:none; color:#333;">Your cart is empty</h3><br /><br />'
				items += '<p class="content__pg" style="text-align: center; font-size: 1em;">'
        		items += '<a href="/" style="color:#fff; background:#333; padding:1em;">GO BACK TO HOME</a>'
    			items +='</p>'
				wrapper.html(items);
				$('.cart').css('left','-400%')
			}else{
				var totalCart=0;
				var items = '';
				_.forEach(cart.items, function(n, key) {
					var counter = 0;
				   total = (n.cant * n.price);
				   totalCart = totalCart+total;
				   items += '<input type="text" name="activity-'+n.id+'" value="'+ n.prodType +'  |  '+ n.name +'  |  '+ n.cant +'  |  Rs.'+ n.price +'/-  |  Rs.'+ total + '">'
					counter = counter + 1;
				});

				wrapper.html(items)
				$('.cart').css('left','-500%')
			}
		}
		else{
			var wrapper = $('.cart');
			if(undefined == cart || null == cart || cart == '' || cart.items.length == 0){
				wrapper.html('<h3 style="font-variant:none;">Your cart is empty</h3>');
				$('.cart').css('left','-400%')
			}else{
				var totalCart=0;
				var items = '';
				_.forEach(cart.items, function(n, key) {
				   total = (n.cant * n.price);
				   totalCart = totalCart+total;
				   items += '<div class="row product__wrapper">'
				   items += '	<div class="container wrapper col-narrow product__image">'
					if(n.id < 5){
						items += '		<a href="/activities/'+n.prodType+'/" class="wopper wopper--'+n.prodType+'" style="background: url(/'+n.img+') center no-repeat; background-size:cover;">'
						items+= '<span class="para__title para__title-cart"><i class="fa fa-map-marker-alt"></i>&nbsp;'+n.location
						items+= '</span>'
						items+= '</a>'
					}
					else{
						items += '		<a href="/activities/'+n.prodType+'/'+n.urlName+'" class="wopper wopper--'+n.prodType+'" style="background: url(/'+n.img+') center no-repeat; background-size:cover;">'
						items+= '</a>'

					}

				   items += '	</div>'
				   items += '	<div class="col-wide product__detail-wrapper">'
				   items += '		<div class="product__detail">'
				   items += '			<div class="product__detail-name">'
				   items += '				<span class="productName">'+n.name+'</span>'
				   items += '				<span class="productPrice">₹ '+n.price+' /-</span>'
				   items += '			</div>'
				   items += '			<div class="product__detail-dynamic">'
				   items += '				<input type="number" value="'+n.cant+'" readonly="readonly" max-length=20>'
				   items += '				<div class="input__btn-set">'
				   items += '					<button class="input__btn product__add prod-'+n.id+'" title="Add Quantity" onclick="app.addtoCart('+n.id+');" data-style="zoom-out" title="Add To Cart">+</button>'
				   items += '					<button class="input__btn product__less" title="Remove Quantity" onclick="app.updateItem('+n.id+','+n.available+');">-</button>'
				   items += '				</div>'
				   items += '				<span class="totalPrice">₹ '+total+' /-</span>'
				   items += '			</div>'
				   items += '		</div>'
				   items += '		<div class="product__action">'
				   items += '			<a class="product__action-remove productRemove" onclick="app.deleteProd('+n.id+')">x</a>'
				   items += '		</div>'
				   items += '	</div>'
				   items += '</div>'

				   /*items += '<li>'
				   items += '<img src="'+n.img+'" />'
				   items += '<h3 class="title">'+n.name+'<br><span class="price">'+n.cant+' x ₹ '+n.price+' INR</span> <button class="add" onclick="app.updateItem('+n.id+','+n.available+')"><i class="icon ion-minus-circled"></i></button> <button onclick="app.deleteProd('+n.id+')" ><i class="icon ion-close-circled"></i></button><div class="clearfix"></div></h3>'
				   items += '</li>'*/
				});
				   items += '<span class="row hr-line" style="margin-top:4em;"></span>';
				   items += '<div class="row">';
				   items += '	<div class="row cart__total">';
				   items += '		<span class="cart__total-name">TOTAL</span>';
				   items += '		<span class="cart__total-amount">₹ '+totalCart+'</span>';
				   items += '	</div>';
				   items += '</div>';
				   items += '<span class="row hr-line" style="margin-top:2em;"></span>'
				   items += '<div class="row cart__checkout">'
				   items += '	<a href="/checkout/">'
				   items += '		<button class="trippy_btn" onclick="">'
				   items += '			<span class="trippy_btn-left"></span>Checkout<span class="trippy_btn-right">					 </span>'
				   items += '		</button>'
				   items += '	</a>'
				   items += '</div>'
				//Add the total to the cart
				/*items += '<li id="total">Total : ₹ '+total+' INR <div id="submitForm"></div></li>';*/
				wrapper.html(items)
				$('.cart').css('left','-500%')
			}
		}
	}

	app.updateItem = function(id,available){
		//subtract one to the amount of the shopping cart
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ,
		curProd = _.find(cart.items, { 'id': id });
			//update the cart
			curProd.cant = curProd.cant - 1;
			//validate that the amount is not less than 0
			if(curProd.cant > 0){
				localStorage.setItem('cart',JSON.stringify(cart))
				app.init()
				app.getProducts()
				msgAlert('Quantity Decreased!');
				msgSelfDestruct();
//				alertContent += '<div class="cart-alert cart-alert--msg">',
//				alertContent += '	<span><i class="fa fa-check-circle"></i>&nbsp;Quantity Decreased!</span>',
//				alertContent += '</div>';
//				alertWrapper.html(alertContent);
//				msgSelfDestruct();
				//app.updatePayForm()
			}else{
				app.deleteProd(id,true);
			}
	}

	app.delete = function(id){
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
		var curProd = _.find(cart.items, { 'id': id });
		_.remove(cart.items, curProd);
		localStorage.setItem('cart',JSON.stringify(cart))
		app.init()
		app.getProducts()
		//app.updatePayForm()
		msgAlert('Item removed from Cart!');
		msgSelfDestruct();
//		alertContent += '<div class="cart-alert cart-alert--msg">',
//		alertContent += '	<span><i class="fa fa-check-circle"></i>&nbsp;Removed Successfully!</span>',
//		alertContent += '</div>';
//		alertWrapper.html(alertContent);
//		msgSelfDestruct();
	}

	app.deleteProd = function(id,remove){

		if(undefined != id && id > 0){

			if(remove == true){
				app.delete(id)
			}else{
				var conf = confirm('Do you want to delete this product?')
				if(conf){
					app.delete(id)
				}
			}


		}
	}

	// Add product quantity


	//app.updatePayForm = function(){
		//that will generate a dynamic form for paypal
		//with the products and their prices
	/*	var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
		var statics = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_cart"><input type="hidden" name="upload" value="1"><input type="hidden" name="currency_code" value="USD" /><input type="hidden" name="business" value="'+business_paypal+'">',
		dinamic = '',
		wrapper = $('#submitForm')

		wrapper.html('')

		if(undefined != cart && null != cart && cart != ''){
			var i = 1;
			_.forEach(cart.items, function(prod, key) {
					dinamic += '<input type="hidden" name="item_name_'+i+'" value="'+prod.name+'">'
					dinamic += '<input type="hidden" name="amount_'+i+'" value="'+prod.price+'">'
					dinamic += '<input type="hidden" name="item_number_'+i+'" value="'+prod.id+'" />'
					dinamic += '<input type="hidden" name="quantity_'+i+'" value="'+prod.cant+'" />'
				i++;
			})

			statics += dinamic + '<button type="submit" class="pay">Pay Now &nbsp;<i class="ion-chevron-right"></i></button></form>'

			wrapper.html(statics)
		}
	}	*/

	$(document).ready(function(){
		app.init();
		//app.getProducts()
		//app.updatePayForm()
		//app.createProducts()
	});

	function msgAlert(msg){
		var alertWrapper = $('.cart-alert--wrapper'),
//		origHtml = $(".cart-alert--wrapper").html(),
		alertContent = '';
//		alertContent += origHtml;
//		alertContent = origHtml;
//		alertWrapper.html('');

		alertContent += '<div class="cart-alert cart-alert--msg">',
		alertContent += '	<span><i class="fa fa-check-circle"></i>&nbsp;'+msg+'!</span>',
//		alertContent += '	<a class="cart-alert--close no-select">x</a>',
		alertContent += '</div>';
		alertWrapper.html(alertContent);
		msgSelfDestruct();
	}

	function msgSelfDestruct(){
			(function(){
				setTimeout(function(){
					$('.cart-alert--msg:first-child').delay(1000).fadeOut(4000, function(){
						$(this).remove();
					});
				}, 1000);
			})();
	}

})(jQuery);
