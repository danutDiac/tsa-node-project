const fs = require("fs");

const writeFile = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, error => {
            if (error) reject(error);
            else resolve();
        });
    });
};

// const writeFile = (path, data) => new Promise((resolve, reject) => {
//     fs.writeFile(path, data, err => {
//         err ? reject(err) : resolve()
//     })
// })

const readFile = path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, data) => {
            if (error) reject(error);
            else resolve(data);
        });
    });
};

// const readFile = path => new Promise((resolve, reject) => {
//     fs.readFile(path, (err, data) => {
//         err ? reject(err) : resolve(data)
//     })
// })

const parseJSON = data => {
    return new Promise((resolve, reject) => {
        try {
            resolve(JSON.parse(data));
        } catch (error) {
            reject(error);
        }
    });
};

function runGeneratorFlow(generator) {
	const runGenerator = generator()
	let value, nextStep = runGenerator.next()


	runSteps(nextStep)

	function runSteps(step) {
		if(!step.done) {
			let stepResult = step.value
			if (stepResult === undefined) {
				runSteps(runGenerator.next())
			}

			if (stepResult.then !== undefined) {
				stepResult.then(value => {
					runSteps(runGenerator.next(value))
				}).catch(promiseStepError => {
					console.log("promise step error", promiseStepError)
				})
			} else {
				runSteps(runGenerator.next(stepResult))
			}
		}
	}
}

const maxId = (array) => {
    if (array.length === 0) return 0;
    return array[array.length - 1].id;
};

// const maxId = array => array.length === 0 ? 0 : array[array.length - 1].id

const newId = array => {
    if (array.length === 0) return 0;
    return array[array.length - 1].id + 1;
};


const findItemById = (array, id) => {
    return array.find(item => item.id === id);
};

const findItemByUserId = (array, id) => {
    return array.filter(item => item.userId === id);
}

module.exports = {
    writeFile,
    readFile,
    parseJSON,
    maxId,
    newId,
	findItemById,
	runGeneratorFlow
}
