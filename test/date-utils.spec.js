const assert = require('assert');
const { DateUtils } = require('../dist/date-utils');

describe('DateUtils test', function () {
    it('should calculate due date of 2019-10-18T16:02:00Z with 10 hours as 2019-10-22T10:02:00.000Z', function () {
        const due = +DateUtils.calculateDueDate(new Date("2019-10-18T16:02:00Z"), 10);
        assert.equal(due, +(new Date("2019-10-22T10:02:00.000Z")));
    });
    it('should calculate due date of 2019-08-11T16:02:00Z with 86 hours as 2019-08-27T14:02:00.000Z', function () {
        const due = +DateUtils.calculateDueDate(new Date("2019-08-11T16:02:00Z"), 86);
        assert.equal(due, +(new Date("2019-08-27T14:02:00.000Z")));
    });
    it('should return true if weekend 2019-10-19T16:02:00Z', function () {
        assert.equal(DateUtils.isWeekend(new Date("2019-10-19T16:02:00Z")), true);
    });
});