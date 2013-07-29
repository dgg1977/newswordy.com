var woffEnabled = true;
var customPath = "/-";

if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) $('html').addClass('iphone');

$(document).ready(function() {

	if (location.hash) {
		toggle_pane(location.hash, true);
	}

	//pane nav
	$('body > header > nav a.about').click(function(e) {
		toggle_pane('about', null);
		e.preventDefault();
	});
	
	$('#pane a.close').click(function(e) {
		toggle_pane('', false);
		e.preventDefault();
	});
	
	//keyboard shortcuts
	$(document).keydown(function(e) {
		switch(e.keyCode) {
			case 37: //left
				if ($('footer > nav a.previous').length > 0) {
					e.preventDefault();
					location.href = $('footer > nav a.previous').attr('href');
				}
				break;
			case 39: //right
				if ($('footer > nav a.next').length > 0) {
					e.preventDefault();
					location.href = $('footer > nav a.next').attr('href');
				}
				break;
			case 27: //esc
				e.preventDefault();
				toggle_pane('', false);
				break;
		}
	});
	
	//expand definition
	$('body > article > p').append('<a href="http://www.google.com/search?q='+$('body > article').attr('data-word')+'&tbs=dfn:1" target="_blank" title="Read full definition (via Google)" class="more"><img src="/assets/img/more.png" alt="more" width="30" height="30" /></a>');

});

function toggle_pane(pane, force) {
	pane = pane.replace('#', '');
	mobile = ($('html').hasClass('iphone') && $('#pane').css('position') == 'absolute');
	
	if (pane && (force == true || (force == null && !$('#pane').is(':visible')))) {
		$('body > header > nav a.'+pane).addClass('selected');
		if (mobile) {
			$('body').addClass('show_pane');
			$('body > header, body > article, body > footer').delay(500).fadeOut('fast');
		} else {
			$('#pane').slideDown('slow');
		}
	} else {
		$('body > header > nav a').removeClass('selected');
		if (mobile) {
			$('body > header, body > article, body > footer').show();
			$('body').removeClass('show_pane');
		} else {
			$('#pane').slideUp('slow');
		}
		if (location.hash && location.hash != '#') location.href='#';
	}
}