const fs = require('fs');
const path = require('path');
//const base = './test';
var argv = argv = require('minimist')(process.argv.slice(2));
const base = argv['_'][0];
var sum = 0;
var resultMass = [];
const readDir = (base, level) => {
    fs.readdir(base, (err, files) => {
        if (err) return console.log(err);
        //async.eachSeries(files, function (item, eachCallback)
        files.forEach((item) => {
            let localBase = path.join(base, item);
            fs.stat(localBase, (err, state) => {
                if (err) return console.log(err);

                if (state.isDirectory()) {
                    console.log(' '.repeat(level) + 'DIR: ' + item);
                    // если это директория, то проверяем дальше, рекурсивно продолжаем искать дальше
                    readDir(localBase, level + 1);
                } else {
                    console.log(' '.repeat(level) + 'File: ' + item);
                    // Здесь мы точно знаем, что это файл, значит надо прочитать его и сложить уже числа
                    fs.readFile(localBase, {encoding: 'utf8'}, (err, result) => {
                        //sum = sum + parseInt(result);
                        let arrOfString = result.split(' ');
                        console.log(arrOfString);
                        resultMass.push(arrOfString);
                        console.log(resultMass);
                    });
                }
            });

        });
    });
};


readDir(base, 0);

//console.log(sum);

// for (let i = 0; i < arrOfString.length; i++) {
//     sum = sum + parseInt(arrOfString[i]);
// }
// console.log(sum);
