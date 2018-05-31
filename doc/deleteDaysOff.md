# Retrieving user details

Deletes the days off with the given id

* **URL:** <br>
    /days/:id

* **Method:** <br>
    `DELETE`

* **URL Params** <br>
**Required:** <br>
    `id = [integer]`

* **Data Params** <br>
    None

* **Success Response:** <br>
    * **Code:** 204 <br>
      **Content:** 
    None

* **Error Response:** <br>
    * **Code:** 404 NOT FOUND <br>
      **Content:** 
    ```javascript
    {
        message: "Not found!"
    }
    ```
    * **Code:** 500 INTERNAL SERVER ERROR <br>
      **Content:** 
    ```javascript
    {
        serverErrorMessage: "the error was logged and we’ll be checking it shortly"
    }
    ```
 
* **Sample Call:** <br>
    ```javascript
    fetch("localhost:3000/days/0", {method:'DELETE'});
    ```
