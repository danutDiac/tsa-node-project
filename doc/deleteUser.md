# Retrieving user details

Deletes a single user with given id

* **URL:** <br>
    /users/:id

* **Method:** <br>
    `DELETE`

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
        message: "User deleted"
    }
    ```

* **Error Response:** <br>
    * **Code:** 404 NOT FOUND <br>
      **Content:** 
    ```javascript
    {
        message: "User not found"
    }
    ```
    * **Code:** 500 INTERNAL SERVER ERROR <br>
      **Content:** 
    ```javascript
    {
        message: "Internal server error"
    }
    ```
 
* **Sample Call:** <br>
    ```javascript
    fetch("localhost:3000/users/0", {method:'DELETE'});
    ```