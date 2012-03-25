/**
 * @author Brandan Majeske
 */

$(document).ready(function(){
	
	$('#mapForm').change(function(){
		
		//alert( $('#mapForm option:selected').val() );
		var selectedService = $('#mapForm option:selected').val();
		
		if( selectedService == 'ALL' ){
			$('a.dot').show(1000);	
		}else{
			$('a.dot[service*="'+selectedService+'"]').show(1000);
			$('a.dot[service!="'+selectedService+'"]').hide(1000);
		}
		
	});
	
	$('a.dot').click(function(){
		
		//alert( $(this).attr('destination') );
		
		$('a.dot').removeClass('selected');
		$(this).addClass('selected');
		
		var destination = '.destination_detail#'+$(this).attr('destination');
		var htmlCode = $(destination).html();
		
		$('.detail_container').fadeOut(300, function(){
			$('.detail_container .destination_detail').html(htmlCode);
			$('.detail_container').fadeIn(300);
			
		});	
		
	});
		
});

