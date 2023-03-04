const fs = require('fs');
const path = require('path');

// for (let i = 1; i < 5; i++) {
//     fs.mkdir(path.join('newDir', `newDir${i}`), {recursive: true},
//         (err) => {
//             if (err) {
//                 throw new Error(err.message)
//             }
//             fs.writeFile(path.join('newDir', `newDir${i}`, `newFile${i}.txt`), `New INFO FROM FILE N newFile${i}.txt`,
//                 {recursive: true},
//                 (err) => {
//                     if (err) {
//                         throw new Error(err.message)
//                     }
//                 })
//
//         })
// }

// fs.stat(path.join('newDir'), (err, data) => {
//     if (err) {
//         throw new Error(err.message)
//     }
//     console.log(data);
//     console.log(data.isDirectory());
//     console.log(data.isFile());
// })

function foo() {


    fs.readdir(path.join('newDir'), {withFileTypes: true},
        (err, files) => {
            if (err) {
                throw new Error(err.message)
            }
            files.forEach(file => {
                console.log(file.isDirectory(), `${file.name}`);
                console.log(file.isFile(), `${file.name}`);


            })

        }

    )
}


