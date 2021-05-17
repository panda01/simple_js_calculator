'use strict';
const system = require('system');
const isCorrectNumOfArgs = system.args.length === 3;
if(!isCorrectNumOfArgs) {
	console.log('Usage: phantomjs test_calculator.js https://example.com');
}

const page = require('webpage').create();
page.open(system.args[2], function(responseStatus) {
	const responseWasSuccessful = responseStatus == 'success';
	if(!responseWasSuccessful) {
		console.error('Error: response status was ' + responseStatus + '; Couldn\'t get: ' + page.url);
		phantom.exit();
		return;
	}
	// console.log(page.content);

	const pageTitle = page.evaluate(getPageTitle);
	console.log('the page title: ', page.title);
	phantom.exit();
});

function testForInputs() {
	// test that the number input is there
	return $('#num1').html();
}

// our simple shortener for querySelectorAll
function $(selector) {
	const selectedNodeList = window.document.querySelectorAll(selector);
	const isEmptyList = selectedNodeList.length === 0;
	if(isEmptyList) {
		return undefined;
	}
	return new fakeQuery(selectedNodeList);
}
class fakeQuery {
	#nodeList
	constructor(nodes) {
		this.#nodeList = nodes;
	}

	isEmpty() {
		return (this.#nodeList.length === 0);
	}
	html() {
		return this.#nodeList[0].innerHTML;
	}
	val(newValue) {
		const oldVal = this.#nodeList[0].value;
		if(newValue !== undefined && newValue !== null) {
			this.#nodeList.forEach(function(node) {
				node.value = newValue;
			});
		}

		return oldVal;
	}
}
