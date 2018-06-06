# Retrieving user details

Returns an array with National Days

* **URL:** <br>
    /nationalDays

* **Method:** <br>
    `GET`

* **URL Params** <br>
**Required:** <br>
    none

* **Data Params** <br>
    None

* **Success Response:** <br>
    * **Code:** 200 <br>
      **Content:** 
    ```javascript
    [{
        "id": 0,
        "name": "Anul nou",
        "days": ["2018-01-01", "2018-01-02"]
    },
    {
        "id": 1,
        "name": "Ziua Unirii Principatelor Romane",
        "days": ["2018-01-24"]
    }]

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
    fetch("localhost:3000/nationalDays");
    ```
