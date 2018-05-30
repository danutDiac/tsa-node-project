# Booking days off

Returns a JSON with days off from an user

*   **URL:** <br>
    /days/

*   **Method** <br>
    `POST`

*   **URL Params** <br>
    **Require:** <br>
    None

*   **Data Params** <br>

    ```javascript
    {
      “userId”: 0,
      “startDate”: “2018-05-23”,
      “endDate”: “2018-06-10”
    }
    ```

*   **Succes Response:** <br>
*   **Code:** 200 <br>
    **Content:**

    ```javascript
    /days/1
    ```

* **DataBase interaction** <br>

    ```javascript
    {
      "id": 0,
      "userId": 0,
      "daysOff": [
        "2018-05-23",
        "2018-05-24",
        "2018-05-25",
        "2018-05-28",
        "2018-05-29",
        "2018-05-30",
        "2018-05-31",
        "2018-06-01",
        "2018-06-04",
        "2018-06-05",
        "2018-06-06",
        "2018-06-07",
        "2018-06-08"
      ]
    }
    ```


* **Error Response:** <br>
    * **Code:** 400 BAD REQUEST <br>
        **Content:**


    ```javascript
    {
      error: "Bad request"
    }
    ```
* **Sample Call:** <br>


    ```javascript
    fetch("localhost:3000/days/")
    ```

