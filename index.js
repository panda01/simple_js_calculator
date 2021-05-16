const page = require('webpage').create();
page.open('https://localhost', function(responseStatus) {
	const responseWasSuccessful = responseStatus == "success";
	if(!responseWasSuccessful) {
		console.error("Error: response status was " + responseStatus + "; Couldn't get website");
		phantom.exit();
		return;
	}
	// console.log(page.content);

	const pageTitle = page.evaluate(getPageTitle);
	console.log("the page title: ", pageTitle);
	phantom.exit();
});

function getPageTitle() {
	return $("head title").html();
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
