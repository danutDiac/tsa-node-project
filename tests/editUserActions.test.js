const chai = require('chai');
const { checkMail, reqValidData } = require("../src/actions/editUserActions");
const should = chai.should();

const mongoose = require("mongoose")
const config = require("../config/config")
const chaiHttp = require('chai-http')
const server = require('../src/main')

chai.use(chaiHttp)

let User = require("../src/models/userModel")

describe('Edit user module actions', () => {
    let users = [{
        "id": 0,
        "firstName": "Anca",
        "lastName": "Ioana",
        "email": "u.ancaioana@gmail.com",
        "phone": "090290234"
    }]
    describe("checkMail", () => {
        it("Should return 1 if mail already exist. ", (done) => {
            const str = {
                "firstName": "Anca",
                "lastName": "Ioana",
                "email": "u.ancaioana@gmail.com",
                "phone": "090290234"
            }
            const result = checkMail(str.email, users)
            chai.expect(result).to.deep.equal(1)
            done();
        })

        it("Should return 0 if mail not exist. ", (done) => {
            const str = {
                "firstName": "Anca",
                "lastName": "Ioana",
                "email": "anca.ioana@gmail.com",
                "phone": "090290234"
            }
            const result = checkMail(str.email, users)
            chai.expect(result).to.deep.equal(0)
            done();
        })
    });

    describe("reqValidData", () => {
        it('Should return 1 if all fields are correct edited', (done) => {
            const str = {
                "firstName": "Anca",
                "lastName": "Maria",
                "email": "ancamaria@gmail.com",
                "phone": "076925398"
            }
            const result = reqValidData(str, users, 1).then(() =>
                done()
            )
        })


        it('Should return "Ati introdus emailul gresit" if email field is not valid', (done) => {
            const str = {
                "firstName": "Anca",
                "lastName": "Maria",
                "email": "ancamariagmail.com",
                "phone": "076925398"
            }
            const output = {
                "status": 400,
                "message": "Ati introdus emailul gresit" + "\n"
            }
            reqValidData(str, users, 1).catch((result) => {
                chai.expect(result).to.deep.equal(output);
                done();
            })


        })

            it('Should return "Nu ati introdus niciun email" if email field is empty', (done) => {
                const str = {
                    "firstName": "Anca",
                    "lastName": "Maria",
                    "email": "",
                    "phone": "076925398"
                }
                const output = {
                    "status": 400,
                    "message": "Nu ati introdus niciun email \n"
                }
                reqValidData(str, users,1).catch((result)=>{
                chai.expect(result).to.deep.equal(output);
                done()
                })
            })

            it('Should return "Ati introdus prenumele gresit" if firstName field is not valid', (done) => {
                const str = {
                    "firstName": "1Anca",
                    "lastName": "Maria",
                    "email": "aancamaria@gmail.com",
                    "phone": "076925398"
                }
                const output = {
                    "status": 400,
                    "message": "Ati introdus prenumele gresit" + "\n"
                }
              reqValidData(str, users,1).catch((result)=>{
                chai.expect(result).to.deep.equal(output);
                done()
              })
            })
            it('Should return "Nu ati introdus niciun prenume." if firstName field is empty', (done) => {
                const str = {
                    "firstName": "",
                    "lastName": "Maria",
                    "email": "aancamaria@gmail.com",
                    "phone": "076925398"
                }
                const output = {
                    "status": 400,
                    "message": "Nu ati introdus niciun prenume. \n"
                }
             reqValidData(str, users,1).catch((result)=>{
                chai.expect(result).to.deep.equal(output);
                done()
             })
            })

            it('Should return "Ati introdus numele gresit" if lastName field is not valid', (done) => {
                const str = {
                    "firstName": "Anca",
                    "lastName": "1Maria",
                    "email": "aancamaria@gmail.com",
                    "phone": "076925398"
                }
                const output = {
                    "status": 400,
                    "message": "Ati introdus numele gresit" + "\n"
                }
                reqValidData(str, users,1).catch((result)=>{
                    chai.expect(result).to.deep.equal(output);
                    done()
                })
                })

            it('Should return "Nu ati introdus niciun nume." if lastName field is empty', (done) => {
                const str = {
                    "firstName": "Anca",
                    "lastName": "",
                    "email": "ancamaria@gmail.com",
                    "phone": "076925398"
                }
                const output = {
                    "status": 400,
                    "message": "Nu ati introdus niciun nume. \n"
                }
                reqValidData(str, users,1).catch((result)=>{
                    chai.expect(result).to.deep.equal(output);
                    done()
                })
            })

            it('Should return "Ati introdus gresit numarul de telefon" if phone field is not valid', (done) => {
                const str = {
                    "firstName": "Anca",
                    "lastName": "Maria",
                    "email": "ancamaria@gmail.com",
                    "phone": "a076925398"
                }
                const output = {
                    "status": 400,
                    "message": "Ati introdus gresit numarul de telefon"
                }
                
                reqValidData(str, users,1).catch((result)=>{
                    chai.expect(result).to.deep.equal(output);
                    done()
                })
            })
            it('Should return "Nu ati introdus niciun numar de telefon" if phone field is empty', (done) => {
                const str = {
                    "firstName": "Anca",
                    "lastName": "Maria",
                    "email": "ancamaria@gmail.com",
                    "phone": ""
                }
                const output = {
                    "status": 400,
                    "message": "Nu ati introdus niciun numar de telefon \n"
                }
                reqValidData(str, users,1).catch((result)=>{
                    chai.expect(result).to.deep.equal(output);
                    done()
                })
            })

            it('Should return 0 if all fields are correct edited', (done) => {
                const str = {
                    "firstName": "Anca",
                    "lastName": "Maria",
                    "email": "ancamaria@gmail.com",
                    "phone": "076925398"
                }
                const result = reqValidData(str, users,0).then(()=>
           done()
        )
            })

    
            it('Should return "Ati introdus emailul gresit" if email field is not valid', (done) => {
                const str = {
                    "firstName": "Anca",
                    "lastName": "Maria",
                    "email": "ancamariagmail.com",
                    "phone": "076925398"
                }
                const output = {
                    "status": 400,
                    "message": "Ati introdus emailul gresit" + "\n"
                }
                reqValidData(str, users,0).catch((result)=>{
                    chai.expect(result).to.deep.equal(output);
                    done()
                })
            })

            it('Should return "Ati introdus prenumele gresit" if firstName field is not valid', (done) => {
                const str = {
                    "firstName": "1Anca",
                    "lastName": "Maria",
                    "email": "aancamaria@gmail.com",
                    "phone": "076925398"
                }
                const output = {
                    "status": 400,
                    "message": "Ati introdus prenumele gresit" + "\n"
                }
              reqValidData(str, users,0).catch((result)=>{
                chai.expect(result).to.deep.equal(output);
                done()
              })
            })
        

            it('Should return "Ati introdus numele gresit" if lastName field is not valid', (done) => {
                const str = {
                    "firstName": "Anca",
                    "lastName": "1Maria",
                    "email": "aancamaria@gmail.com",
                    "phone": "076925398"
                }
                const output = {
                    "status": 400,
                    "message": "Ati introdus numele gresit" + "\n"
                }
                reqValidData(str, users,0).catch((result)=>{
                    chai.expect(result).to.deep.equal(output);
                    done()
                })
                })


            it('Should return "Ati introdus gresit numarul de telefon" if phone field is not valid', (done) => {
                const str = {
                    "firstName": "Anca",
                    "lastName": "Maria",
                    "email": "ancamaria@gmail.com",
                    "phone": "a076925398"
                }
                const output = {
                    "status": 400,
                    "message": "Ati introdus gresit numarul de telefon"
                }
                
                reqValidData(str, users,0).catch((result)=>{
                    chai.expect(result).to.deep.equal(output);
                    done()
                })
            })
    })
});