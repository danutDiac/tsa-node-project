function * testGenerator () {
	const step1Value = yield 1;
	console.log("inside generator:", step1Value)
	const step2Value = yield 2;
	console.log("inside generator:", step2Value)
	const step3Value = yield 3;
	console.log("inside generator:", step3Value)
}

function runGeneratorFlow(generator) {
	const runGenerator = generator()
	let value, nextStep = runGenerator.next()

	runSteps(nextStep)

	function runSteps(step) {
		if(!step.done) {
			value = step.value
			console.log("outside control:", value)
			step = runGenerator.next(value)
			runSteps(step)
		}
	}

}

runGeneratorFlow(testGenerator)