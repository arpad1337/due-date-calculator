const assert = require('assert');
const { DateUtils } = require('../dist/date-utils');

describe('DateUtils test', function () {

    it('should calculate due date of 2019-10-18T16:02:00 with 10 hours as 2019-10-22T10:02:00', function () {
        const due = +DateUtils.calculateDueDate(new Date("2019-10-18T16:02:00"), 10);
        assert.equal(due, +(new Date("2019-10-22T10:02:00.000")));
    });

    it('should calculate due date of 2019-08-11T16:02:00 with 86 hours as 2019-08-27T14:02:00', function () {
        const due = +DateUtils.calculateDueDate(new Date("2019-08-11T16:02:00"), 86);
        assert.equal(due, +(new Date("2019-08-27T14:02:00.000")));
    });

    it('should round submission date and calculate date of 2019-08-08T07:02:00 with 1 hours as 2019-08-08T10:02:00', function () {
        const due = +DateUtils.calculateDueDate(new Date("2019-08-08T07:02:00"), 1);
        assert.equal(due, +(new Date("2019-08-08T10:02:00")));
    });

    it('should round submission date and calculate date of 2019-08-11T18:02:00 with 1 hours as 2019-08-12T10:02:00', function () {
        const due = +DateUtils.calculateDueDate(new Date("2019-08-11T18:02:00"), 1);
        assert.equal(due, +(new Date("2019-08-12T10:02:00")));
    });

    it('should return true if weekend 2019-10-19T16:02:00', function () {
        assert.equal(DateUtils.isWeekend(new Date("2019-10-19T16:02:00")), true);
    });

});