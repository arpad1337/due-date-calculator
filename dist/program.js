var date_utils_1 = require('./date-utils');
var Program = (function () {
    function Program() {
    }
    Program.main = function (argv) {
        console.log(argv);
        if (argv.length < 2) {
            throw new Error("You must supply submissionDate && turnaround hours as arguments");
        }
        var submissionDate = new Date(argv[0]);
        var turnaroundHours = parseInt(argv[1], 10);
        console.log("The task is due to:", date_utils_1.DateUtils.calculateDueDate(submissionDate, turnaroundHours));
    };
    return Program;
})();
exports.Program = Program;
if (require && require.main === module) {
    try {
        Program.main(process.argv.slice(2, 4));
    }
    catch (e) {
        console.error(e.message);
    }
}
