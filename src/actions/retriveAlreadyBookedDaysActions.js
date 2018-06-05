const { getJSONFromFile } = require("../helpers/helpers")

const parseJSONFromFile = (path) => {
    return new Promise((resolve, reject) => {
        getJSONFromFile(path)
            .then(resolve)
            .catch(error => {
                reject({
                    status: 500,
                    message: 'the error was logged and we’ll be checking it shortly'
                })
            })
    })
}

const findBookedDays =  (userId, daysOff) => {
    let daysBooked = [];
    daysOff.forEach(element => {
      if (element["userId"] === userId) {
        daysBooked.push(...element["daysOff"]);
      }
    });
    return daysBooked;
  };

  const getAlreadyBookedDays = (userId, daysOff) => {
      return new Promise ((response, reject) => {
          const bookedDays = findBookedDays(userId, daysOff);
          if (bookedDays.length === 0)
            reject({
                    "status" : 404,
                    "message": "User not found/no days booked yet"
                })
            
            else {
                 response(bookedDays);
            }
      }) 
  }

  const sendResponse = (request, response, bookedDays) => {
      return new Promise((resolve, reject) => {
          try {
              response.status(200).send({
                  bookedDays: bookedDays,
                  links: {
                      "POST":`http://localhost:3000/days`,
                      "DELETE": `http://localhost:3000/days/${Number(request.params.id)}`
                  }
              })
              resolve();
          }
          catch (err) {
              reject(err)
          }
      })
  }

const sendError = (response, err) => {
    response.status(err["status"]).json({ "error": err["message"] });
}
  

const retriveAlreadyBookedDays = (request, response) => {
    parseJSONFromFile("db/daysOff.json")
        .then(getAlreadyBookedDays.bind(null, Number(request.params.id)))
        .then(sendResponse.bind(null,request, response))
        .catch(sendError.bind(null, response))
    
  };
  module.exports = {
    retriveAlreadyBookedDays,
    findBookedDays,
    getAlreadyBookedDays
    
  };