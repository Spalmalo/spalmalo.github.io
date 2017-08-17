'use strict';
/* global $ */

svg4everybody();

// $(function() {
// 	FastClick.attach(document.body);
// });

// $('.table').basictable({ baseClass: 'table' });

// Paralax background
(function(){
	var $window = $(window);
	$('[data-paralax-type="background"]').each(function(){
		var $bgobj = $(this);

		$(window).scroll(function() {
			var yPos = -($window.scrollTop() / $bgobj.data('paralax-speed'));
			var coords = '50% '+ yPos + 'px';
			$bgobj.css({
				backgroundPosition: coords
			});
		});
	});
})();


// Modules
//= require source/modules/**/!(_)*.js

