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

//npm i express - в терміналі, встановлюємо express
//npm init -y - створити package.json

const express = require('express');
//виклик express як ф-ї повертає нам змінну app
const app = express();

//щоб express міг сприймати те що ми передаємо в post req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}))


const PORT = 5100;
app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT} 🚀🚀🚀`);
});
//методи  HTTP запитів:
// app.get()
// app.post()
// app.put()
// app.patch()
// app.delete()

const users = [
    {
        name: 'Oleh',
        age: 19,
        gender: 'male'
    },
    {
        name: 'Anton',
        age: 22,
        gender: 'female'
    },
    {
        name: 'Anya',
        age: 25,
        gender: 'female'
    },
    {
        name: 'Ielizavetta',
        age: 35,
        gender: 'female'
    },
    {
        name: 'Cocos',
        age: 70,
        gender: 'mixed'
    }
]
app.get('/users', (req, res) => {
    res.status('200').json(users);
})
//:userId -params
app.get('/users/:userId', (req, res) => {
    //оскільки params отримуємо від клієнта

    const {userId} = req.params;
//кастуємо до числа, бо в роутері є стрічка, щоб вибрати елемент масиву по індексу, який є числом
//array [array index]

    const user = users[+userId];

    res.json(user);
})


//запит на 'ендпоінт' - /welcome
//req -інф від користувача, res-інф що віддамо користувачу
app.get('/welcome', (req, res) => {
    console.log('welcome');

    //щоб послати щось на сервер
    res.send('welcome')

    //щоб не загружалася консоль коли виводжу лише в консоль
    res.end()
})

app.post('/users', (req, res) => {
    const body = req.body;
    users.push(body);
    res.status('201').json({message: 'User created'})

})

app.put('/users/:userId',
    (req, res) => {
        const {userId} = req.params;
        const userUpdated = req.body
        users[+userId] = userUpdated;
        res.status('200').json({
            message: 'User created',
            data: users[+userId]
        })

    })

app.delete('/users/:userId', (req, res) => {
    const {userId} = req.params;

    users.splice(+userId, 1);

    res.status(200).json({
        message: 'User deleted',
    })
})


//HTTP response status codes
//https://developer.mozilla.org/en-US/docs/Web/HTTP/Status