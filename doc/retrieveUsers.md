# Retrieving users

Returns a JSON with information about a list of users 

* **URL:** <br>
    /users/

* **Method:** <br>
    `GET`

* **URL Params** <br>
**Required:** <br>
    `name = [string]`

* **Data Params** <br>
    None

* **Success Response:** <br>
    * **Code:** 200 <br>
      **Content:** 
    ```javascript
        [{
            id: 1, 
            firstName: "Grigore",
            lastName: "Ureche",
            email: "letopiset@gmail.com",
            phone: "0745231445"
        },...
        ]
    ```

* **Error Response:** <br>
    * **Code:** 404 NOT FOUND <br>
      **Content:** 
    ```javascript
    {
        serverErrorMessage: "Users not found"
    }
    ```
    * **Code:** 500 INTERNAL SERVER ERROR <br>
      **Content:** 
    ```javascript
    {
        error: "Internal server error"
    }
    ```
 
* **Sample Call:** <br>
    ```javascript
    fetch("localhost:3000/users/");
    ```
