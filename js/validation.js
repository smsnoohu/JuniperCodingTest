jQuery.browser = {};
(function () {
	jQuery.browser.msie = false;
	jQuery.browser.version = 0;
	if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
		jQuery.browser.msie = true;
		jQuery.browser.version = RegExp.$1;
	}
	function validForm(){
		var sTime = $('#start_time'),
			startTime = sTime.val(),
			eTime = $('#end_time'),
			endTime = eTime.val(),
			sField = $('#select_fields'),
			selectField = sField.val(),
			tName = $('#table_name'),
			tableName = tName.val(),
			errorFiled = function(msg){return $('<div class="error" role="alert" aria-live="true">'+msg+'</div>')};
		$('.field').removeClass('error-field');
		$('.error').remove();
		if(!startTime || isNaN(startTime)){
			msg = 'Start Time should not empty';
			sTime.parent().addClass('error-field').prepend(errorFiled(msg));
		}
		if(!endTime || isNaN(endTime)){
			msg = 'End Time should not empty';
			eTime.parent().addClass('error-field').prepend(errorFiled(msg));
		}
		if(!selectField){
			msg = 'Please select atleast one fields';
			sField.parent().addClass('error-field').prepend(errorFiled(msg));
		}
		if(!tableName){
			msg = 'Table Name should not empty';
			tName.parent().addClass('error-field').prepend(errorFiled(msg));
		}
		if(!$('.error').length){
			$('#output').show().html('<h2>Output</h2>' + jsonMarkup($("form#search").serializeObject()));
		}else{
			$('#output').empty().hide();
		}
	}

	$("#start_time").datepicker({
		dateFormat: $.datepicker.TIMESTAMP,
		onSelect: function(selected) {
			$("#end_time").datepicker("option","minDate", selected);
			$(this).parent().removeClass('error-field').find('.error').remove();
		}
	});
	$("#end_time").datepicker({ 
		dateFormat: $.datepicker.TIMESTAMP,
		onSelect: function(selected) {
			$("#start_time").datepicker("option","maxDate", selected);
			$(this).parent().removeClass('error-field').find('.error').remove();
		}
	});
	$('#select_fields').on('change', function(){
		$(this).parent().removeClass('error-field').find('.error').remove();
	})
	$('#table_name').on('keyup', function(){
		$(this).parent().removeClass('error-field').find('.error').remove();
	});

	$("form#search").submit(function(evt) {
		validForm();
		evt.preventDefault();
	});
	$("form#search").on('click', '#reset', function(evt){
		$(this).parents('form').find('.field').removeClass('error-field').find('.error').remove();
		$('#output').empty().hide();
	});
})();