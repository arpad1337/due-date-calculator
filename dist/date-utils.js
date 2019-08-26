var DateUtils = (function () {
    function DateUtils() {
    }
    /**
     * Checks whether a date is on weekend
     * @param {Date} date - The time of recording the task
     * @returns {boolean}
     */
    DateUtils.isWeekend = function (date) {
        var currentDay = date.getDay();
        return currentDay === 0 || currentDay === 6;
    };
    /**
     * Calculates a due date and time by turnaround time
     * @param {Date} submissionDate - Submission date of the ticket
     * @param {number} turnaroundHours - The turnaround in hours
     * @returns {Date}
     */
    DateUtils.calculateDueDate = function (submissionDate, turnaroundHours) {
        var remainingTime = turnaroundHours * DateUtils.ONE_HOUR_MS;
        var cursor = +submissionDate;
        var startHour = submissionDate.getHours();
        while (remainingTime != 0) {
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
    };
    DateUtils.ONE_HOUR_MS = 60 * 60 * 1000;
    DateUtils.START_HOUR = 9;
    DateUtils.END_HOUR = 17;
    return DateUtils;
})();
exports.DateUtils = DateUtils;
