var cron = require('node-cron');
const https = require('https')

const bUrl = 'https://digitallocker-server.onrender.com';



const job = new cron.schedule('*/14 * * * *', function (){
  console.log('restarting server')
  https.get(bUrl, (res)=>{
    if(res.statusCode == 200){
      console.log('server restarted')
    }else{
      console.error(
        `failed to restart server with status code : ${res.statusCode}`
      )
    }
  }).on('error', (err)=>{
    console.error('Error during Restart', err.message)
  })

})

module.exports = {
    job,
}