# Editing user details

Edits a user that can be selected by id. Editing can be done via two seperate methods : `PUT` for all user details, `PATCH` for specific user details.

## PUT

* **URL:** <br>
    /users/:id

* **Method:** <br>
    `PUT`

* **URL Params** <br>
    `id=[integer]`
    
* **Data Params** <br>
    `firstName=[string]`
    `lastName=[string]`
    `email=[string]`
    `phone=[string]`

    Note: All specified fields need to take a valid series of input data.

* **Success response** <br>
    * **Code:** 201 <br>
      **Content:**
      `Rewrites data from the DB at the specified ID with new input. All specified fields in the Data Params section need to be utilized`

* **Error response** <br>
    * **Code:** 400 <br>
      **Content:**
      ```javascript
        { 
            "message": "Invalid ID" 
        }
      ```
    * **Code:** 500 <br>
      **Content:**
      ```javascript
      {
        "serverErrorMessage": "the error was logged and we’ll be checking it shortly"
      }
      ```

* **Sample call** <br>
    ```javascript
        fetch("localhost:3000/users/1")
    ```

## PATCH

* **URL:** <br>
    /users/:id

* **Method:** <br>
    `PATCH`

* **URL Params** <br>
    `id=[integer]`
    
* **Data Params** <br>
    `firstName=[string]`or
    `lastName=[string]`or
    `email=[string]` or
    `phone=[string]` or

    Note: Either specified field needs to take valid input. Not all are required for the modification to occur.

* **Success response** <br>
    * **Code:** 201 <br>
      **Content:**
      `Rewrites one of the specified fields or more from the DB, at the given ID.`

* **Error response** <br>
    * **Code:** 400 <br>
      **Content:**
      ```javascript
        { 
            "message": "Invalid ID" 
        }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```javascript
      {
            "serverErrorMessage": "the error was logged and we’ll be checking it shortly"
      }
      ```

* **Sample call** <br>
    ```javascript
        fetch("localhost:3000/users/1")
    ```