export class DateUtils {

    public static ONE_HOUR_MS = 60 * 60 * 1000;
    public static ONE_MINUTE_MS = 60 * 1000;
    public static ONE_SECOND_MS = 1000;
    public static START_HOUR = 9;
    public static END_HOUR = 17;

    /**
     * Checks whether a date is on weekend
     * @param {Date} date - Any given Date
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
        if (turnaroundHours < 0) {
            throw new Error('turnaroundHours must be positive');
        }
        let remainingTime = turnaroundHours * DateUtils.ONE_HOUR_MS;
        let cursor = +submissionDate;
        let startHour;

        if (submissionDate.getHours() > DateUtils.END_HOUR) {
            cursor = +(submissionDate.setHours(DateUtils.START_HOUR)) + 
                        24 * DateUtils.ONE_HOUR_MS  - 
                        submissionDate.getMinutes() * DateUtils.ONE_MINUTE_MS - 
                        submissionDate.getSeconds() * DateUtils.ONE_SECOND_MS;
        }
        else if (submissionDate.getHours() < DateUtils.START_HOUR) {
            cursor = +(submissionDate.setHours(DateUtils.START_HOUR)) - 
                        submissionDate.getMinutes() * DateUtils.ONE_MINUTE_MS - 
                        submissionDate.getSeconds() * DateUtils.ONE_SECOND_MS;
        }

        while(remainingTime !== 0) {
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