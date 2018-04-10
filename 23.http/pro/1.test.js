// process.argv.forEach(function (arg) {
//     console.log(arg);
//     process.stdout.write(arg);
// })

process.argv.slice(2).forEach(function (arg) {
    console.log(arg);
    process.stdout.write(arg);
})