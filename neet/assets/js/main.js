$(function(){
	var startDate = new Date();
	setInterval(updateTime, 500);

	var page = parseInt(location.hash.replace('#',''), 10) || 0;
	page = move(page);

	$(window).keyup(function(ev){
		ev.stopPropagation();
		var code = ev.keyCode;
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

	hljs.tabReplace = '    '; // 4 spaces
	hljs.initHighlightingOnLoad();
	$('code').each(function(i, e) {hljs.highlightBlock(e, '    ')});

	function prev(p) {
		if (p > 0) p = move(p - 1); 
		return p;
	}

	function next(p) {
		if (p + 1 < $('div.contents').size()) p = move(p + 1);
		return p;
	}

	function move(p) {
		if (isNaN(p) || p < 0 || $('div.contents').size() <= p) p = 0;
		$('div.contents').hide().eq(p).show();
		updatePager(p);
		updateWindowSize();
		location.hash = '#' + p;
		return p;
	}

	function hasPage(p) {
		return p >= 0 && p < $('div.contents').size();
	}

	function updatePager(p) {
		var pager = '<span>Page: ' + addZero(p,2) + '/' + addZero(($('div.contents').size() - 1), 2) + '</span>';
		$('#pager').html(pager);
		if (hasPage(p - 1)) $('#pager').append(' ').append($(document.createElement('a')).attr('href','javascript:void(0)').text('Prev').click(function(){prev(p);}));
		if (hasPage(p + 1)) $('#pager').append(' ').append($(document.createElement('a')).attr('href','javascript:void(0)').text('Next').click(function(){next(p);}));
	}

	function updateWindowSize() {
		var wh = $(window).height();
		var fh = $('#footer').outerHeight();
		var $content = $('div.contents:visible');
		var y = $content.position().top;
		$content.height(wh - fh - y);
	}

	function updateTime() {
		var t = (new Date()).getTime() - startDate.getTime();
		var h = m = s = 0;
		t /= 1000;
		if (t > 3600) {
			h = parseInt(t / 3600);
			t = t % 3600;
		}
		if (t > 60) {
			m = parseInt(t / 60);
			t = t % 60;
		}
		s = parseInt(t);

		$('#time').html('経過：' + addZero(h) + '時間' + addZero(m) + '分' + addZero(s) + '秒');
	}

	function addZero(n, z) {
		z = z || 1;
		var zero = '';
		var len = z - (''+n).length + 1;
		for (var i = 0; i < len; i++) zero += '0';
		return n < Math.pow(10, z) ? zero + n : n;
	}
});
