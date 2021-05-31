console.log("hello world 2!!");
$(document).ready(function() {
	console.log("hello world");
	// when we click calculate!!
	$("#calculator_form").on("submit", function(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		// Get num1
		var num1Val = $("#num1").val();
		// get num2
		var num2Val = $("#num2").val();
		// based on operator
		var operator = $("#operation").val();
		var resultssss;
		if(operator === "+")
		{
			resultssss = parseInt(num1Val, 10) + parseInt(num2Val, 10);
		}
		// put results in results span

		$("#results").html(resultssss);
	});
	window.calculator_calculate = function() {
		$("#calculator_form").trigger("submit");
	};
});
