$(function() {
	$.mask.definitions['~'] = "[+-]";
	$("#phone").mask("(99) 9 9999 - 9999");
	$("#data_nascimento").mask("99/99/9999");
});

