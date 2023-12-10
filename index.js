const express = require('express')
var cors = require('cors')
const app = express()
const http = require("http")
const server = http.createServer(app)
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const { job } = require('./cron.js')


 app.use(cors())
 app.use(express.json());
  const serviceAccount = {
    "type": "service_account",
    "project_id": "photoopdb-bf7fd",
    "private_key_id": "8debca62411015c1e9303ec79a1c8abff0683e4f",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDSsZagbBZaoI2E\nRrHocr0ojON1vqh/MbFsAiEVaewsPthOmT2vvHzChT1kVwyDEen0aj8jlHeIeWKu\nez8mX8HJYSMhOquxB3lwehTE71IwrOEg5vK+j1Xj4p/kOq1LS/uq0rBPnp1OQQJ5\n9FqmTU9aH5445X4O/Qd8nSi4564KbjLM92y3ys7shFl1Nd0Me3SoI7Qms2mr7aFj\nqoKGK9C9GHIruENyQMwMZerczwUj9Ku/YfcKyUC/RdCTHE967D0Z93QRQfKwOJwU\nKgh97zQjHAlilziheWJl2mt3m9UxIJ56qZfFvyQgiMGzmIS1zwv6DLlgOd51yAPk\nzb4nV319AgMBAAECggEAA9Zf1H1Akvn85X1/C0w7sEpKzeiPm5//h81Yq9Hmmr49\n6q8bGLKpmwxIYiXUdQ3yp0NUfZwiF8CZ3GzGOvGaciLgx6WcRuz3A/2bDFMwRU6v\nUBmNdNKxUTyvQBrmk0okoO1+h31vhu76upEsljhGP7c8zH8I0Ubi3xziwStkKV77\n+8VXNxhsud7qon7niteOCGS7F7b9upz8ctlk7UvQYGBjkU+FiLB2k4pbxfV6gvOl\ngW9S7OdUQOTuor5kReJhVzynY6crM5ueyb2Txqkq8UUZPd5H/eKL6i3cPvAPOKvG\nZasKeJA+jOlNEmxdzNercoNzTFB6gihWXApLJw/+AQKBgQDsiHaX4zGVvAKaJpag\nTO1A6TbmMhVwhDDyUX8pb9JNrMZ0qn9ibj+k2PrmffbISYSYOlGIArS4PBKvEbC4\n8YRDzc4l3P9sqdcY+Or8GpN0KHKxv4qhjx0n2Xd4aDcyWOsD7+urmLc722nEKBTe\nsvyxC9gf6LQzkqJbIsgbfXJPwQKBgQDkCLago9q71hOshVA51suCVMYTdyc8n3QL\nBEgskDR/jWgwsPO3XPOzlLRHfX+8Y/oi4r8XcJIA/0Ksb2EdSDkSzdvYQefBcTS9\nRICVyxOn50+zav/KeFU2sDFfwxfSTObW3oGHa6itacTWnAMw7Hl2k9F5+HyFtLfR\nOzu895mcvQKBgBB1LktDM6AHhObU6IYe1CNAFuHNelBp4j36Da8EaM2ex/A2LMbc\nhPEjZ9HB0fn9o4w0AphEF+75vxMPWAyGQX22RDG+PseAycajCzafYsMiTViwyySS\noKS1LOrj1XNbXH7Zorw91AIGMkXDxC/6pDptaIxP1LoB6eoNcX74K4wBAoGBAIdW\nZI2Ssg8pTyPlO2gYg1Am4ChNX4wrVsPzFqLcM0xAsMW1P/Bjyn+akiSb52P4Mkzi\nJmfS99R/qyKMOCcY5kayxvfipZm5hoOOVIKStGfCcRsbNhUEtg5vI96h+1FlMtvz\n0wx8aPADBkAY+AvhTXWC5aBuSflQ+IfFj/7nNNRBAoGAbEhUAnDHkflu7SUDJO/J\ns1YwQg2vs51b6X+15fxRCzibvBd8Q+TwubnKr/FLw/uSY04kViN81zq/P1Q0B/yp\nhSPQgll6hEEySANY+4I8+2gRhnbDn1Kbm7SbPopIfMOdovJN4jURoIS0WmfmjX4Q\nxK5dl0mwLpqApwWb2CmfovM=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-hx98a@photoopdb-bf7fd.iam.gserviceaccount.com",
    "client_id": "117392657355652505565",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hx98a%40photoopdb-bf7fd.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  
  initializeApp({
    credential: cert(serviceAccount)
  });
  
  const db = getFirestore()

  const registerClick = async (time) =>{
    const docRef = db.collection('clicks');

    await docRef.add({
    clicked: time,
    });

}


const PORT = process.env.PORT || 3000
app.get('/', (req,res) =>{
  res.send("Hello World!!");
})
app.post('/register-click', (req,res)=>{
  //console.log(req.body.time)
    registerClick(req.body.time)
    res.status(200).send({
      message: 'Click registered' 
    })
}
)
job.start()

app.listen(
    PORT,
    () =>{
        console.log(`listening to Port ${PORT}`)
    }
)