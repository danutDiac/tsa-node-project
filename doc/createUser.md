# Creating user 
Returns a URL containing the ID of the new created user 
* **URL:** <br>
    /users/
* **Method:** <br>
    `POST`
* **URL Params** <br>
	None
**Required:** <br>
    `Data in body`
* **Data Params** <br>
    All the user details completed in the input fields given using body
* **Success Response:** <br>
    * **Code:** 200 <br>
      **Content:** 
      ```javascript
        {
            userId: 1, 
            first_name: “Ion”,
            last_name: “Neculce”,
            email: "cronicar@gmail.com",
            phone_number: "0720557248”
       }
       ```
* **Error Response:** <br>
    * **Code:** 400 FAILED CLIENT REQUEST <br>
      **Content:** 
      ```javascript
      {
         error_fname: “Ati introdus prenumele gresit”,
	    error_lname: “Ati introdus numele gresit”,
	    error_email: “Ati introdus emailul gresit”,
	    error_phone: “Ati introdus gresit numarul de telefon”
      }
      ```
    
