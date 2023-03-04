//modules
//як імпорт тут буде require
// const {sayHello} = require('./helper')
//
// sayHello();
//____________________________________________________
// const { logToConsole } = require('./test/test')
// logToConsole()
// //global variables
// //шлях до поточної директорії(а саме папки звідки запускаємо)
// console.log(__dirname);
// //шлях до поточної директорії та поточного файлу
// console.log(__filename);
// //шлях до current working directory (а саме загальної папки де є app.js, бо запускали ми в терміналі- node app.js)
// //process - теперішній процес ноди
// console.log(process.cwd());
//____________________________________________________
//path
//https://nodejs.org/dist/latest-v18.x/docs/api/path.html
// const path = require('path');
//щоб відображався коректний вигляд шляху на різних ОС
// const joinedPath = path.join(__dirname, 'test', 'test.js');
// console.log(joinedPath);

//щоб відображався коректний вигляд шляху ЯКЩО Є зайві символи
// const normalizedPath = path.normalize('///test///test2/test.txt');
// console.log(normalizedPath);

//аналог join, який сам дописує __dirname
// const resolvedPath = path.resolve('test', 'test.js');
// console.log(resolvedPath);

// -- OS -operation system --(модуль, бібліотека)
//https://nodejs.org/dist/latest-v18.x/docs/api/os.html
// const os = require('os');

// console.log(os.arch());
// console.log(os.cpus());

// -- FS --
//доступ до всієї файлової системи
const fs = require('fs');
const path = require('path');
//записати файл
// fs.writeFile(path.join('test', 'text2.txt'), 'Hello from Okten !!!', (err)=>{
//   if (err) throw new Error(err.message)
// })
// fs.writeFile(path.join('test', 'text2.txt'), 'some info', (err, data) => {
//     if (err) {
//         throw new Error(err.message)
//     }
// })
//прочитати файл
// fs.readFile(path.join('test', 'text.txt'), (err, data)=>{
//   if (err) throw new Error(err.message);
//   console.log(data.toString());
// })
//дописати інформацію в файл
// fs.appendFile(path.join('test', 'text2.txt'), '\nHello from Okten again!', (err)=>{
//   if (err) throw new Error();
// })
//видаляє інф в файлі
// fs.truncate(path.join('test', 'text2.txt'), (err)=>{
//   if (err) throw new Error();
// })
//видаляє сам файл
// fs.unlink(path.join('test', 'text2.txt'), (err)=>{
//   if (err) throw new Error();
// })
//повертає різну інформацію про даний файл (чи є папкою чи файлом дані)
// fs.stat(path.join('test'), (err, stats)=>{
//   if (err) throw new Error();
//   console.log(stats.isDirectory());
//   console.log(stats.isFile());
// })
//
//прочитати директорію. Отримуємо масив елементів що є в директорії
// fs.readdir(path.join('test'), {withFileTypes: true},(err, data)=>{
//   if (err) throw new Error();
//   data.forEach(file=>{
//     console.log(file.isFile());
//   })
// })
//створити папку
// fs.mkdir(path.join('test', 'test2'), (err)=>{
//   if (err) throw new Error();
// })




