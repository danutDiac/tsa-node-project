const fs = require("fs");
const { readFile, writeFile, findItemById, runGeneratorFlow } = require("../helpers/helpers");

let deleteUserFromDatabase = (users, user) => {
    let index = users.indexOf(user);
    if (index >= 0) users.splice(index, 1);
};

let deleteUser = (req, res) => {

	function * deleteUserFlow() {
		const userFileData = yield readFile("db/users.json")
		let users = JSON.parse(userFileData);
		let user = yield findItemById(users, Number(req.params.id));
		if (user) {
			deleteUserFromDatabase(users, user);
			yield writeFile("db/users.json", JSON.stringify(users))
			res.status(200).json({
				"GET": req.headers.host + req.baseUrl,
				"POST": req.headers.host + req.baseUrl
			});
		} else {
			res.status(404).json({
				message: 'User not found'
			})
		}
	}

	try {
		runGeneratorFlow(deleteUserFlow)
	} catch (error) {
		console.log("the 500 error:", error)
		res.status(500).json({
			serverErrorMessage:
				"the error was logged and we’ll be checking it shortly"
		});
	}
};

if (process.env.NODE_ENV == "dev") {
    module.exports = {
        deleteUserFromDatabase,
        deleteUser
    }
} else {
    module.exports = {
        deleteUser
    }
}
