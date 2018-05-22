# Node project general rules
## General
* only use file-based database

## API
* use REST [constraints] (https://en.wikipedia.org/wiki/Representational_state_transfer#Architectural_constraints)
* payload from response should be in JSON format
* all successful GET or POST requests should return a response with the HTTP status code: 200
* all successful PUT or PATCH requests should return a response with the HTTP status code: 201
* all successful DELETE requests should return a response with the HTTP status code: 204
* all failed client requests (ex: invalid parameters) should return a response with a suggestive error message and with the HTTP status code: 400
* a request for a resource that does not exist should return a response with the HTTP status code: 404
* all server errors should return a response with the body { serverErrorMessage: “the error was logged and we’ll be checking it shortly” } with a HTTP status code: 500
..* all server errors should be logged (saved in a file)

* document each endpoint created. Add the documentation in README.md file, [here's an example] (https://gist.github.com/iros/3426278)

## Functional
* keep functions simple (single responsibility)
* have at least 1 test for each function