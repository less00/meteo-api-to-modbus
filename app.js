const axios = require('axios');
const https = require('https');
const net = require('net')
const modbus = require('jsmodbus')

const {modbusAdress,modbusValue} = require('./address.js')
//const testData = require('./test-data.js')

const agent = new https.Agent({
    rejectUnauthorized: false
});

const netServer = new net.Server()
const server = new modbus.server.TCP(netServer, {
    //holding: holding
})
server.on('connection', function (client) {
    console.log('New Connection')
})
netServer.listen(888)


const socket = new net.Socket()
const client = new modbus.client.TCP(socket, 1)
const options = {
    'host' : '127.0.0.1',
    'port' : 888
}
let value,addressKey
function readApiFun(){
    axios.get('http://192.168.16.11/api/v2/data/meteo')
    .then(function (response) {
        // handle success
        response = response.data
        console.log(response);
        if(response != null || response != ''){
            for (var key in response) {
                //console.log("key " + key);    
                for (var childKey in response[key]) {
                    //console.log("child key " + childKey);
                    //console.log(Array.isArray(testData[key][childKey]))
                    Array.isArray(response[key][childKey]) === true ? value = response[key][childKey][0]['value'] : value = response[key][childKey]['value']                
                    addressKey = key+'.'+childKey
                    if(modbusAdress[addressKey]){
                        address = modbusAdress[addressKey]
                        //console.log(value)
                        //console.log(typeof(value))
                        typeof(value) === 'string' || typeof(value) === 'boolean' ? modbusValue[value] ? value = modbusValue[value] : value = 0 : value = value          
                        writeModbusFun(addressKey,address,value)    
                    }
                    
                }
            }
        }
    })
    .catch(function (error) {
        // handle error
        console.log('api error ----- ',error);
    })
    .then(function () {
        // always executed
    });
}
function writeModbusFun(tagName,address,value){
    let buf = Buffer.allocUnsafe(4)
    buf.writeFloatLE(value)         
    client.writeMultipleRegisters(address,buf)
    .then(function (resp) {
        //console.log(resp)
        console.log('tagname --- ',tagName,' --- address --- ',address,' --- Value ---',value)
    }).catch(function () {
        console.error("# Error -- Modbus")
        socket.end()
    })
}
socket.on('connect', function () {
    setInterval(() => {
        readApiFun()
    }, 7000);
})

socket.connect(options)