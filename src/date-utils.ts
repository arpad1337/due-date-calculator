export class DateUtils {

    public static ONE_HOUR_MS = 60 * 60 * 1000;
    public static START_HOUR = 9;
    public static END_HOUR = 17;

    /**
     * Checks whether a date is on weekend
     * @param {Date} date - The time of recording the task
     * @returns {boolean} 
     */
    public static isWeekend(date: Date): boolean {
        const currentDay = date.getDay();
        return currentDay === 0 || currentDay === 6;
    }

    /**
     * Calculates a due date and time by turnaround time
     * @param {Date} submissionDate - Submission date of the ticket
     * @param {number} turnaroundHours - The turnaround in hours
     * @returns {Date}
     */
    public static calculateDueDate(submissionDate: Date, turnaroundHours: number): Date {
        let remainingTime = turnaroundHours * DateUtils.ONE_HOUR_MS;
        let cursor = +submissionDate;
        let startHour = submissionDate.getHours();

        while(remainingTime != 0) {
            if (DateUtils.isWeekend(new Date(cursor))) {
                cursor += 24 * DateUtils.ONE_HOUR_MS;
                continue;
            }
            startHour = new Date(cursor).getHours();
            if (startHour >= DateUtils.START_HOUR && startHour < DateUtils.END_HOUR) {
                cursor += DateUtils.ONE_HOUR_MS * 1;
                remainingTime -= DateUtils.ONE_HOUR_MS;
            }
            if (startHour >= DateUtils.END_HOUR) {
                cursor = +(new Date(cursor + (24 - (DateUtils.END_HOUR - DateUtils.START_HOUR)) * DateUtils.ONE_HOUR_MS));
            }
        }

        return new Date(cursor);
    }

}