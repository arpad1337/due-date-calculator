declare var require: any;
declare var module: any;
declare var process: any;

import { DateUtils } from './date-utils';

export class Program {
    static main(argv: string[]): void {
        if (argv.length < 2) {
            throw new Error("You must supply submissionDate && turnaround hours as arguments, eg: \"2019-10-18T16:02:00Z\" \"10\"");
        }
        const submissionDate = new Date(argv[0]);
        const turnaroundHours = Math.abs(parseInt(argv[1], 10)); 
        console.log("The task is due to:", DateUtils.calculateDueDate(submissionDate, turnaroundHours).toString());
    }
}

if (require && require.main === module) {
    try {
        Program.main((<string[]> process.argv).slice(2, 4));
    } catch(e) {
        console.error(e.message);
    }
}