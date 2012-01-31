$(function(){
    Presentaiton.prototype.updateH1Contents = function() {
		var $content = $('div.' + this.options.contentsClass + ':visible');
		if ( $('h1', $content).size() == 0 ) return;
		var $h1 = $('h1', $content).eq(0);
		$h1.css({
			'margin-top': ( $content.height() / 2 - $h1.height() / 2 ) + 'px',
			'text-align': 'center'
		});	
	}
    Presentaiton.prototype.updateWindowSize = function() {
        var wh = $(window).height();
        var $content = $('div.' + this.options.contentsClass + ':visible');
        var y = $content.position() !== null ? $content.position().top : 0;
        if ($('#footer').size() > 0) {
            var fh = $('#footer').outerHeight();
            $content.height(wh - fh - y);
        } else {
            $content.height(wh - y);
        }
		this.updateH1Contents();
    }
	var presen = new Presentaiton();
	$('#left-navi').click(function(){
		presen.movePrev();
	});
	$('#right-navi').click(function(){
		presen.moveNext();
	});
});
