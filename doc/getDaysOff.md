# Retrieving user days off

Returns a number that represent the days off of a single user

* **URL:** <br>
    /days/:id

* **Method:** <br>
    `GET`

* **URL Params** <br>
**Required:** <br>
    `id = [integer]`

* **Data Params** <br>
    None

* **Success Response:** <br>
    * **Code:** 200 OK<br>
      **Content:** 
    ```javascript
        17
    ```
    `17 represent the number of day off of a user`

* **Error Response:** <br>
    * **Code:** 404 NOT FOUND <br>
      **Content:** 
    ```javascript
    {
        error: "User not found"
    }
    ```
    * **Code:** 500 INTERNAL SERVER ERROR <br>
      **Content:** 
    ```javascript
    {
        error: "the error was logged and we’ll be checking it shortly"
    }
    ```

* **Sample Call:** <br>
    ```javascript
    fetch("localhost:3000/days/0");
    ```