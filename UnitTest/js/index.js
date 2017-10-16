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
$('#select_fields').on('change', function(){
		$(this).parent().removeClass('error-field').find('.error').remove();
	})
	$('#table_name').on('keyup', function(){
		$(this).parent().removeClass('error-field').find('.error').remove();
	});

	$("form#search").on('click', '#submit', function(evt) {
		validForm();
		evt.preventDefault();
	});
	$("form#search").on('click', '#reset', function(evt){
		$(this).parents('form').find('.field').removeClass('error-field').find('.error').remove();
		$('#output').empty().hide();
	});

describe('Validating Start Time field', function () {

	var startTime;
	beforeEach(function () {
		loadFixtures('js/form.html');
		startTime = $('#start_time').parent().find('.error');
	});

	it('should alert when start time is left blank', function () {

		$( "#start_time" ).val('');
		$("#submit").click();
		expect(startTime).toExist();
	});

	it('should raise no errors if it is valid', function () {

		$( "#start_time" ).val('1');
		$(".validate").click();
		expect(startTime).toExist();
	})
});

describe('Validating End Time field', function () {

	var endTime;
	beforeEach(function () {
		loadFixtures('js/form.html');
		endTime = $('#end_time').parent().find('.error');
	});

	it('should alert when end time is left blank', function () {

		$( "#end_time" ).val('');
		$("#submit").click();
		expect(endTime).toExist();
	});

	it('should raise no errors if it is valid', function () {

		$( "#end_time" ).val('1');
		$(".validate").click();
		expect(endTime).toExist();
	})
});

describe('Validating select field', function () {

	var selectFields;
	beforeEach(function () {
		loadFixtures('js/form.html');
		selectFields = $('#select_fields').parent().find('.error');
	});

	it('should alert when no option is selected', function () {

		$( "#select_fields" ).val('');
		$("#submit").click();
		expect(selectFields).toExist();
	});

	it('should raise no errors if it is valid', function () {

		$( "#select_fields" ).val('SomeString');
		$(".validate").click();
		expect(selectFields).toExist();
	})
});

describe('Validating Table name field', function () {

	var tableName;
	beforeEach(function () {
		loadFixtures('js/form.html');
		tableName = $('#table_name').parent().find('.error');
	});

	it('should alert when table name is left blank', function () {

		$( "#table_name" ).val('');
		$("#submit").click();
		expect(tableName).toExist();
	});

	it('should raise no errors if it is valid', function () {

		$( "#table_name" ).val('SomeString');
		$(".validate").click();
		expect(tableName).toExist();
	})
});