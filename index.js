const dotEnv = require("dotenv");
dotEnv.config();
const relate = require("./database/relationships");
relate();


const {loginWithEmailPassword,
    verifyToken,
    loginWithApi,
    authorizeIfAdmin,
    authorizeToken,
    authorizeApi,} = require("./auth");



loginWithEmailPassword("debra@gmail.com", "1234").then(user => console.log(user));


// verifyToken( 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMiwiZW1haWwiOiJqYWhtb3JhbnRAZ21haWwuY29tIiwiaWF0IjoxNjc5NTYzNzMxLCJleHAiOjE2Nzk1NzA5MzF9.b_lAEQVMaaDyx7BHZHVgcEZ2cSp58FO_k0vzkWTiIWo').then((res) => console.log('this res', res))

// loginWithApi('1').then(res => console.log('this api user', res))

 authorizeIfAdmin( 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6ImRlYnJhQGdtYWlsLmNvbSIsImlhdCI6MTY3OTU3NzAxNSwiZXhwIjoxNjc5NTg0MjE1fQ.VBw4kksgdcj1HnUyqT1rPJQWicr0YFJ8DQW9hGQnumI').then((res) => console.log('this res', res))
 