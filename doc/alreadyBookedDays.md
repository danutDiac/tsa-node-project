# Retriving already booked days
Returns an array of days booked for an user and a list of URL for POST and DELETE
* **URL:** <br>
    /days/:id
* **Method** <br>
    `GET`

* **URL Params** <br>
**Required:** <br>
    `id = [integer]`

* **Data Params** <br>
    None

* **Success Response:** <br>
    * **Code:** 200 <br>
      **Content:** 
    ```javascript
        {
            bookedDays : [
                "2018-02-20",
                "2018-02-21"
            ],
            links : {
                POST : "http://localhost:3000/days",
                DELETE : "http://localhost:3000/days/0"
            }

    }
    ```
* **Error Response:** <br>
    * **Code:** 404 NOT FOUND <br>
      **Content:** 
    ```javascript
    {
        error: "User not found/no days booked yet"
    }
    ```
    * **Code:** 500 INTERNAL SERVER ERROR <br>
      **Content:** 
    ```javascript
    {
        error:'the error was logged and we’ll be checking it shortly'
    }
    ```
 
* **Sample Call:** <br>
    ```javascript
    fetch("localhost:3000/days/0");
    ```

