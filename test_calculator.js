/*
casper.options.verbose = true;
casper.options.logLevel ="debug";
*/

casper.test.begin('Calculator Works correctly', function(test) {
	casper.on("resource.error", function(resource) {
		this.echo("Resource errored: " + resource.url);
	});
	casper.on("resource.received", function(resource) {
		this.echo("Resource received: " + resource.url);
	});
	casper.on("remote.message", function(msg) {
		this.echo("++ Console Log: " + msg);
	});
	casper.on("page.error", function(msg) {
		this.echo("-- Console Error: " + msg);
	});
	casper
		.start('http://localhost')
		.waitForSelector("#calculator_form, #num1, #num2, #operation, #calculate",
			function success() {
				C("Setting 5 for inputs, and '+' as the operation");
				var worked = this.evaluate(function() {
					$("#num1").val(5);
					$("#num2").val(5);
					$("#operation").val("+");
					return true;
				});
			},
			function fail() {
			}, 1000)
		.wait(1000, function() {
			C("submiting the form");
			var submit = this.evaluate(function() {
				return window.calculator_calculate();
				// return $("#calculator_form").trigger("submit");
			});
		})
		.wait(1000, function() {
			var num1Val = this.evaluate(function() {
				return $("#results").html();
			});
			dump(num1Val);
		})
		.waitForSelector("#results", function() {
			test.assertEquals(this.evaluate(function() {
				return $("#results").html();
			}), "10");
		})
		.run(function() {
			test.done();
		});
});

casper.test.begin('Calculator is laid out correctly', function(test) {
	casper
		.start('http://localhost', function() {
			test.assertTitle("Calculator");
		})
		.then(function() {
			C("Test everthing exists");
			test.assertExists("#num1");
			test.assertExists("#num2");
			test.assertExists("#operation");
			test.assertExists("#calculate");
			test.assertExists("#results");
			test.assertExists("#calculator_form");
			test.assertAllVisible("#num1, #num2, #operation, #calculate, #calculator_form");
		})
		.then(function() {
			C("Testing #num1 input");
			var num1Info = this.getElementInfo("#num1");
			test.assertEquals(num1Info.nodeName, "input");
			test.assertEquals(num1Info.attributes.type, "number");
			test.assertEquals(num1Info.attributes.name, "num1");

			C("Testing #num2 input");
			var num2Info = this.getElementInfo("#num2");
			test.assertEquals(num2Info.nodeName, "input");
			test.assertEquals(num2Info.attributes.type, "number");
			test.assertEquals(num2Info.attributes.name, "num2");

			C("Testing #operation select");
			var operationSelInfo = this.getElementInfo("#operation");
			test.assertEquals(operationSelInfo.nodeName, "select");
		})
		.run(function() {
			test.done();
		});
});

function C(msg) {
	casper.echo(msg, "COMMENT");
}
function dump(obj) {
	require("utils").dump(obj);
}

