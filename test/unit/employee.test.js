const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const async = require('async');
const Taleo = require('../../');
const env = require('../env');

describe('employee', function () {
  var taleo;

  this.timeout(30000);

  before(function (done) {
    taleo = new Taleo(env);
    taleo.connect(done);
  });

  after(function (done) {
    taleo.close(done);
  });

  it('get employee by ID', function (done) {
    taleo.getEmployee(110, (err, employee) => {
      expect(err).to.not.exist;
      expect(employee).to.exist;
      expect(employee).to.be.an('object');
      done();
    });
  });

  describe('employee properties', function () {
    var employee;

    before(function (done) {
      taleo.getEmployee(110, (err, emp) => {
        employee = emp;
        expect(err).to.not.exist;
        done();
      });
    });

    it('employee ID', function (done) {
      expect(employee.getId()).to.exist;
      expect(employee.getId()).to.be.a('number');
      done();
    });
  });
});
