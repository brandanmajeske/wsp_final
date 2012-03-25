/**
 * @author Brandan Majeske
 */

var currentPanel = 1;
var totalPanels = 0;
var autoPlay = true;
var timePassed = 0;
var timeToChange = 10;

function autoAdvance(){

	if ( window.timePassed == window.timeToChange ){
		window.timePassed = 0;
		
		if ( window.currentPanel == window.totalPanels ){
			window.currentPanel = 0;
		}
		
		if ( autoPlay == true ){
			$('.marquee_nav a.marquee_nav_item:nth-child('+(window.currentPanel + 1)+')').trigger('click');
		}
	
	}else{
		window.timePassed += 1;
	}
	
	/* debug */ $('.timePassed').html('timePassed = '+window.timePassed);
	/* debug */ $('.autoPlay').html('autoPlay = '+window.autoPlay);
}



$(document).ready(function(){
	
	/* debug */ $('.autoPlay').html('autoPlay = '+window.autoPlay);
	/* debug */ $('.timePassed').html('timePassed = '+window.timePassed);
	/* debug */ $('.timeToChange').html('timeToChange = '+window.timeToChange);
	/* debug */ $('.currentPanel').html('currentPanel = '+window.currentPanel);
	
	setInterval(autoAdvance, 1000);
	
	$('.marquee_container').hover(
		function(){
			window.autoPlay = false;
			$(this).removeClass('autoplay');
		},
		function(){
			window.autoPlay = true;
			window.timePassed = 0;
			$(this).addClass('autoplay');
		}		
	);
	
	$('.marquee_nav').hover(
		function(){
			window.autoPlay = false;
			$(this).removeClass('autoplay');
		},
		function(){
			window.autoPlay = true;
			window.timePassed = 0;
			$(this).addClass('autoplay');
		}		
	);
	
	
	// Generate Navigation links
	$('.marquee_panels .marquee_panel').each(function(index){
		$('.marquee_nav').append('<a class="marquee_nav_item" ></a>');
		window.totalPanels = index + 1;
		/* debug */ $('.totalPanels').html('totalPanels = '+window.totalPanels);
	});
	
	// Generate Photo Lineup
	$('img.marquee_panel_photo').each(function(index){
		var photoWidth = $('.marquee_container').width();
		var photoPosition = index * photoWidth;
		$('.marquee_photos').append('<img class="marquee_photo" style="left: '+photoPosition+'" src="'+$(this).attr('src')+'" alt="'+$(this).attr('alt')+'" width="700" height="350" />');
		$('.marquee_photos').css('width', photoPosition+photoWidth);
	});

	// Set up Navigation Links
	$('.marquee_nav a.marquee_nav_item').click(function(){
		
		// Set the navigation state
		$('.marquee_nav a.marquee_nav_item').removeClass('selected');
		$(this).addClass('selected');
		
		var navClicked = $(this).index();
		var marqueeWidth = $('.marquee_container').width();
		var distanceToMove = marqueeWidth*(-1);
		var newPhotoPosition = navClicked*distanceToMove + 'px';
		var newCaption = $('.marquee_panel_caption').get(navClicked);
		window.currentPanel = navClicked + 1;
		/* debug */ $('.currentPanel').html('currentPanel = '+window.currentPanel);

		
		
		// Animate the photos and caption
		$('.marquee_photos').animate({left: newPhotoPosition}, 900);
		$('.marquee_caption').animate({top: '310px'}, 750, function(){
			var newHTML = $(newCaption).html();
			$('.marquee_caption_content').html(newHTML);
			setCaption();
		});
	});
	
	// Preload all images, then initialize marquee
	$('.marquee_panels img').imgpreload(function(){
		initializeMarquee();
	});

});

function initializeMarquee(){
	$('.marquee_caption_content').html(
		$('.marquee_panels .marquee_panel:first .marquee_panel_caption').html()
	);
	$('.marquee_nav a.marquee_nav_item:first').addClass('selected');
	$('.marquee_photos').fadeIn(600);
	setCaption();
}

function setCaption(){
	var captionHeight = $('.marquee_caption').height();
	var marqueeHeight = $('.marquee_container').height();
	var newCaptionTop = marqueeHeight - captionHeight - 10;
	$('.marquee_caption').delay(300).animate({top: newCaptionTop}, 750);
}

