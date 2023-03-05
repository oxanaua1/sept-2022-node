// -- EVENT --
// const event = require('node:events');
// //викликаємо конструктор класу івент
// const eventEmitter = new event();
// //за доп методу оn() можемо декларувати івенти. приймає два параметри назву івента 'click' і тіло ф-ї, тобто колбек
// //через задекларований метод оn(), івент можна викликає багато разів
// eventEmitter.on('click', (data)=>{
//     console.log('click, click', data);
//     console.log(data);
// })
// //для виклику івента використ emit
// eventEmitter.emit('click', {name:'Anna'})
//
// //через задекларований метод оnct(), івент можна ОДИН багато разів
// eventEmitter.emit('click')
// eventEmitter.emit('click')
// eventEmitter.emit('click')
//
// eventEmitter.once('clickAndDie', ()=>{
//   console.log("I'm gonna die after being called");
// })
// console.log(eventEmitter.eventNames());
//
// eventEmitter.emit('clickAndDie');
//
// eventEmitter.emit('clickAndDie');
// eventEmitter.emit('clickAndDie');
// eventEmitter.emit('clickAndDie');
// eventEmitter.emit('clickAndDie');
//______________________________________________________________________________________________________________________
// -- STREAMS --
// read, write, duplex, transform --- types of streams
//All streams are instances of EventEmitter.//instances-похідні, екземпляри
//chunk - частина файлу, що ми читаємо
// const fs = require('fs');
// const path = require("path");
// const readStream = fs.createReadStream(path.join('test', 'text3.txt'));
//
// readStream.on('data', (chunk)=>{
//     console.log(chunk);
// })

// const writeStream = fs.createWriteStream(path.join('test', 'text2.txt'))
// //записуємо інформацію
// readStream.on('data', (chunk) => {
//     writeStream.write(chunk);
// });
//метод pipe читає readStream і перезаписує в writeStream, те саме робить що і вище з доп on
// readStream.pipe(writeStream)

//ф-я що оброблятиме помилки
// const handleError = () => {
//   console.error('ERROR!!!');
//зупинить виконання читання через метод destroy
//   readStream.destroy();
// запише в writeStream помилку
//   writeStream.end('ERROR WHILE READING FILE');
// }

// readStream
    //якщо ерор виконай ф-ю handleError
//   .on('error', handleError)
//   .pipe(writeStream)
//   .on('error', handleError);
//______________________________________________________________________________________________________________________
// -- EXPRESS --
//https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet/xcae6f4a7ff015e7d:transporting-packets/a/transmission-control-protocol--tcp
//https://www.fortinet.com/resources/cyberglossary/tcp-ip
//Transmission Control Protocol (TCP) is a communications standard that enables application programs and computing
// devices to exchange messages over a network. It is designed to send packets across the internet and ensure the
// successful delivery of data and messages over networks.
//The Internet Protocol (IP) is the method for sending data from one device to another across the internet. Every device
// has an IP address that uniquely identifies it and enables it to communicate with and exchange data with other devices
// connected to the internet.
//TCP and IP are separate protocols that work together to ensure data is delivered to its intended destination within
// a network. IP obtains and defines the address—the IP address—of the application or device the data must be sent to.
// TCP is then responsible for transporting and routing data through the network architecture and ensuring it gets
// delivered to the destination application or device that IP has defined.
//HTTPS, meaning Hypertext Transfer Protocol Secure.This is accomplished by adding security layers,
// Secure Sockets Layer (SSL) and Transport Layer Security (TLS), to the original Hypertext Transfer Protocol (HTTP)
// to encrypt whatever information is being transferred from a user to a website. Using public key infrastructure (PKI),
// the SSL and TLS layers work to ensure you are sending data directly to the intended recipient and that the information
// is being sent from and to the sources indicated.
//DNS (Domain Name System)- єрархічна розподілена система перетворення імені хоста (комп'ютера або іншого мережевого пристрою) в IP-адресу

//npm -i express - в терміналі, встановлюємо express
//npm init -y - створити package.json

