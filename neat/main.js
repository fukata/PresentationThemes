$(function(){
	function prev(p) {
		if (p > 0) { p = move(p - 1); } 
		return p;
	}

	function next(p) {
		if (p + 1 < $('div.contents').size()) { p = move(p + 1); }
		return p;
	}

	function move(p) {
		if (isNaN(p) || p < 0 || $('div.contents').size() <= p) { p = 0; }
		$('div.contents').hide().eq(p).show();
		updatePager(p);
		updateWindowSize();
		location.hash = p;
		return p;
	}

	function hasPage(p) {
		return p >= 0 && p < $('div.contents').size();
	}

	function updatePager(p) {
		var pager = '<span>Page: ' + p + '/' + ($('div.contents').size() - 1) + '</span>';
		$('#pager').html(pager);
		if (hasPage(p - 1)) { $('#pager').append(' ').append($(document.createElement('a')).attr('href','#').text('Prev').click(function(){prev(p);})); }
		if (hasPage(p + 1)) { $('#pager').append(' ').append($(document.createElement('a')).attr('href','#').text('Next').click(function(){next(p);})); }
	}

	function updateWindowSize() {
		var wh = $(window).height();
		var fh = $('#footer').outerHeight();
		var $content = $('div.contents:visible');
		var y = $content.position().top;
		$content.height(wh - fh - y);
	}

	var page = parseInt(location.hash.replace('#',''), 10) || 0;
	page = move(page);

	$(window).keyup(function(){
		event.stopPropagation();
		var code = event.keyCode;
		switch (code) {
			case 38: // up
			case 37: // left
			case 75: // k
				page = prev(page);
				break;
			case 40: // down 
			case 39: // right 
			case 74: // j
				page = next(page);
				break;
		}
	});

	$(window).resize(function(){
		updateWindowSize();
	});
});
