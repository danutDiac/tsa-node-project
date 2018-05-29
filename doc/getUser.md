# Retriving user details

Returns a JSON with information about a single user

* **URL:** <br>
    /users/:id

* **Method:** <br>
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
            userId: 1, 
            first_name: "Catalin",
            last_name: "Popescu",
            email: "catalin.popescu@gmail.com",
            phone_number: "0745231445"
    }
    ```

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
        error: "Internal server error"
    }
    ```
 
* **Sample Call:** <br>
    ```javascript
    fetch("localhost:3000/users/1");
    ```
