const fs = require('node:fs/promises');
const path = require('node:path');
//
// const worker = async () => {
//     try {
//         const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt'];
//         const folderNames = ['folder1', 'folder2', 'folder3', 'folder4'];
// //Проміси виконуються паралельно. Всередину закидуємо купу асинхронного і через Promise.all виконується паралельно все
//         const promises = folderNames.map(async (folderName, index) => {
//             const folderPath = path.join(process.cwd(), folderName);
//
//             await fs.mkdir(folderPath, {recursive: true});
//             await fs.writeFile(path.join(folderPath, fileNames[index]), 'hello world')
//
//         });
//         await Promise.all(promises)
// //асинхронний map повертає масив промісів
//
// ////можна бачити виконання промісу через його метод allSettled. Якщо в Promise.all один проміс впале тоді зупиниться і виконання інших промісів
// ////allSettled та all працюють однаково
// //// console.log(promises)
// ////     const a = await Promise.allSettled(promises);
// ////    console.log(a
//
//         const files = await fs.readdir(path.join(process.cwd()));
//
//         for (const file of files) {
//             const stats = await fs.stat(path.join(process.cwd(), file));
//             const isFile = stats.isFile();
//
//             if (isFile) {
//                 console.log('This is file : ', path.join(process.cwd(), file));
//             } else {
//                 console.log('This is directory : ', path.join(process.cwd(), file));
//             }
//         }
//
//
//     } catch (e) {
//         console.log(e.message);
//     }
// }
//
//
// worker().then();


//проміси виконуються одночасно
const worker = async () => {
    try {
        const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt'];
        const folderNames = ['folder1', 'folder2', 'folder3', 'folder4'];

        const filesPromises = fileNames.map(async (fileName) => {
            await fs.writeFile(path.join(process.cwd(), fileName), 'Hello World');
        });

        const foldersPromises = folderNames.map(async (folderName) => {
            await fs.mkdir(path.join(process.cwd(), folderName), { recursive: true });
        });

        await Promise.all([...filesPromises, ...foldersPromises]);
    } catch (e) {
        console.error(e.message);
    }
}
//створили асинхронну ф-ю(без назви), в якій спочатку виконується створення файлів(виконується сама ф-я worker), а потім читання їх
(async () => {
    await worker();
    console.log(await fs.readdir(path.join(process.cwd())));
})();