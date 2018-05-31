const chai = require('chai');
const { reqValidData ,checkMail,idIdentification,modifyUserWithFetch,modifyUserWithPut} = require("../src/actions/editUserActions");
const should = chai.should();

describe('Edit user module actions', () => {
    let users = [{
        "id": 0,
        "firstName": "Anca",
        "lastName": "Ioana",
        "email": "u.ancaioana@gmail.com",
        "phone": "090290234"
    }]
    describe("checkMail", () => {
    it("Should return 1 if mail already exist. ", () => {
        const str = {
            "firstName": "Anca",
            "lastName": "Ioana",
            "email": "u.ancaioana@gmail.com",
            "phone": "090290234"
        }
        const result = checkMail(str.email, users)
        chai.expect(result).to.deep.equal(1)
    })

    it("Should return 0 if mail not exist. ", () => {
        const str = {
            "firstName": "Anca",
            "lastName": "Ioana",
            "email": "anca.ioana@gmail.com",
            "phone": "090290234"
        }
        const result = checkMail(str.email, users)
        chai.expect(result).to.deep.equal(0)
    })
});

    describe("modifyUserWithFetch",()=>{
        const str = {
            "firstName": "Anca",
            "lastName": "Ioana",
            "email": "anca.ioana@gmail.com",
            "phone": "090290234"
        }
        const expectedObject={
            "id":0,
            "firstName": "Anca",
            "lastName": "Ioana",
            "email": "anca.ioana@gmail.com",
            "phone": "090290234"
        }
        it("Should make the changes in users for patch!",()=>{
            let pos=0;
            modifyUserWithFetch(users, str, pos)
            chai.expect(users[0]).to.deep.equal(expectedObject)
        })
    })

    describe("modifyUserWithPut",()=>{
        const str = {
            "firstName": "Anca",
            "lastName": "Ioana",
            "email": "anca.ioana@gmail.com",
            "phone": "090290234"
        }
        const expectedObject={
            "id":0,
            "firstName": "Anca",
            "lastName": "Ioana",
            "email": "anca.ioana@gmail.com",
            "phone": "090290234"
        }
        it("Should make the changes in users for patch!",()=>{
            let pos=0;
            modifyUserWithPut(users, str, pos)
            chai.expect(users[0]).to.deep.equal(expectedObject)
        })
    })



    describe("idIdentification", () => {
    it("Should return pozition = 0 if id is find",()=>{
       
        let idNumb=0
        const result = idIdentification(idNumb, users)
        chai.expect(result).to.deep.equal(0)

    })

    it("Should return -1 if id is not find",()=>{ 
        let idNumb=3
        const result = idIdentification(idNumb, users)
        chai.expect(result).to.deep.equal(-1)

    })
});

    describe("reqValiddata", () => {
    it('Should return 1 if all fields are correct edited', () => {
            const str = {
                "firstName": "Anca",
                "lastName": "Maria",
                "email": "ancamaria@gmail.com",
                "phone": "076925398"
            }
            const result = reqValidData(str, 1,users);
            chai.expect(result).to.deep.equal(1);
        })

    it('Should return "Ati introdus emailul gresit" if email field is not valid', () => {
        const str = {
            "firstName": "Anca",
            "lastName": "Maria",
            "email": "ancamariagmail.com",
            "phone": "076925398"
        }
        const result = reqValidData(str, 1,users);
        const test = "Ati introdus emailul gresit" + "\n";
        chai.expect(result).to.deep.equal(test);
    })

    it('Should return "Nu ati introdus niciun email \n" if email field is empty', () => {
        const str = {
            "firstName": "Anca",
            "lastName": "Maria",
            "email": "",
            "phone": "076925398"
        }
        const result = reqValidData(str, 1,users);
        const test = "Nu ati introdus niciun email \n";
        chai.expect(result).to.deep.equal(test);

    })

    it('Should return "Ati introdus prenumele gresit" if firstName field is not valid', () => {
        const str = {
            "firstName": "1Anca",
            "lastName": "Maria",
            "email": "aancamaria@gmail.com",
            "phone": "076925398"
        }
        const result = reqValidData(str, 1,users);
        const test = "Ati introdus prenumele gresit" + "\n";
        chai.expect(result).to.deep.equal(test);

    })
    it('Should return "Nu ati introdus niciun prenume. \n" if firstName field is empty', () => {
        const str = {
            "firstName": "",
            "lastName": "Maria",
            "email": "aancamaria@gmail.com",
            "phone": "076925398"
        }
        const result = reqValidData(str, 1,users);
        const test = "Nu ati introdus niciun prenume. \n";
        chai.expect(result).to.deep.equal(test);

    })

    it('Should return "Ati introdus numele gresit" if lastName field is not valid', () => {
        const str = {
            "firstName": "Anca",
            "lastName": "1Maria",
            "email": "aancamaria@gmail.com",
            "phone": "076925398"
        }
        const result = reqValidData(str, 1,users);
        const test = "Ati introdus numele gresit" + "\n";
        chai.expect(result).to.deep.equal(test);
    })

    it('Should return "Nu ati introdus niciun nume. \n" if lastName field is empty', () => {
        const str = {
            "firstName": "Anca",
            "lastName": "",
            "email": "ancamaria@gmail.com",
            "phone": "076925398"
        }
        const result = reqValidData(str, 1,users);
        const test = "Nu ati introdus niciun nume. \n";
        chai.expect(result).to.deep.equal(test);

    })

    it('Should return "Ati introdus gresit numarul de telefon" if phone field is not valid', () => {
        const str = {
            "firstName": "Anca",
            "lastName": "Maria",
            "email": "ancamaria@gmail.com",
            "phone": "a076925398"
        }
        const result = reqValidData(str, 1,users);
        const test = "Ati introdus gresit numarul de telefon";
        chai.expect(result).to.deep.equal(test);

    })
    it('Should return "Nu ati introdus niciun numar de telefon" if phone field is empty', () => {
        const str = {
            "firstName": "Anca",
            "lastName": "Maria",
            "email": "ancamaria@gmail.com",
            "phone": ""
        }
        const result = reqValidData(str, 1,users);
        const test = "Nu ati introdus niciun numar de telefon \n";
        chai.expect(result).to.deep.equal(test);

    })

    it('Should return 1 if all fields are correct edited', () => {
        const str = {
            "firstName": "Anca",
            "lastName": "Maria",
            "email": "ancamaria@gmail.com",
            "phone": "076925398"
        }
        const result = reqValidData(str, 0,users);
        chai.expect(result).to.deep.equal(1);

    })


    it('Should return "Ati introdus emailul gresit" if email field is not valid', () => {
        const str = {
            "firstName": "Anca",
            "lastName": "Maria",
            "email": "ancamariagmail.com",
            "phone": "076925398"
        }
        const result = reqValidData(str, 0,users);
        const test = "Ati introdus emailul gresit" + "\n";
        chai.expect(result).to.deep.equal(test);

    })


    it('Should return "Ati introdus prenumele gresit" if firstName field is not valid', () => {
        const str = {
            "firstName": "1Anca",
            "lastName": "Maria",
            "email": "ancamaria@gmail.com",
            "phone": "076925398"
        }
        const result = reqValidData(str, 0,users);
        const test = "Ati introdus prenumele gresit" + "\n";
        chai.expect(result).to.deep.equal(test);

    })


    it('Should return "Ati introdus numele gresit" if lastName field is not valid', () => {
        const str = {
            "firstName": "Anca",
            "lastName": "1Maria",
            "email": "ancamaria@gmail.com",
            "phone": "076925398"
        }
        const result = reqValidData(str, 0,users);
        const test = "Ati introdus numele gresit" + "\n";
        chai.expect(result).to.deep.equal(test);

    })

    it('Should return "Ati introdus gresit numarul de telefon" if phone field is not valid', () => {
        const str = {
            "firstName": "Anca",
            "lastName": "Maria",
            "email": "ancamaria@gmail.com",
            "phone": "a076925398"
        }
        const result = reqValidData(str, 0,users);
        const test = "Ati introdus gresit numarul de telefon";
        chai.expect(result).to.deep.equal(test);

    })
})   });