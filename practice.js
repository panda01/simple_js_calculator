$(document).ready(function() {
	// when we click calculate!!
	$("#calculator_form").on("submit", function(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		// Get num1
		const num1Val = $("#num1").val();
		// get num2
		const num2Val = $("#num2").val();
		// based on operator
		const operator = $("#operation").val();
		let resultssss;
		if(operator === "+")
		{
			resultssss = parseInt(num1Val, 10) + parseInt(num2Val, 10);
		}
		// put results in results span

		$("#results").html(resultssss);
	});
});
