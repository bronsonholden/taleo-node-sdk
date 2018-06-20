const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
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
    taleo.getEmployee(614, (err, employee) => {
      expect(err).to.not.exist;
      expect(employee).to.exist;
      expect(employee).to.be.an('object');
      done();
    });
  });

  it('get employee page', function (done) {
    taleo.getEmployees({
      start: 1,
      limit: 5
    }, (err, employees) => {
      expect(err).to.not.exist;
      expect(employees).to.exist;
      expect(employees).to.be.an('array');
      expect(employees.length).to.equal(5);
      done();
    });
  });

  it('get second employee page', function (done) {
    var eid;

    taleo.getEmployees({
      start: 1,
      limit: 5
    }, (err, employees) => {
      expect(err).to.not.exist;
      expect(employees).to.exist;
      expect(employees).to.be.an('array');
      expect(employees.length).to.equal(5);
      eid = employees[0].getId();
      taleo.getEmployees({
        start: 6,
        limit: 5
      }, (err, employees) => {
        expect(err).to.not.exist;
        expect(employees).to.exist;
        expect(employees).to.be.an('array');
        expect(employees.length).to.equal(5);
        expect(employees[0].getId()).to.not.equal(eid);
        done();
      });
    });
  });

  if (process.env.GET_ALL_TESTS) {
    it('get all employees', function (done) {
      this.timeout(300000);
      taleo.getEmployees((err, employees) => {
        expect(err).to.not.exist;
        expect(employees).to.exist;
        expect(employees).to.be.an('array');
        done();
      });
    });
  }

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

    it('employee first name', function (done) {
      expect(employee.getFirstName()).to.exist;
      expect(employee.getFirstName()).to.be.a('string');
      done();
    });

    it('employee last name', function (done) {
      expect(employee.getLastName()).to.exist;
      expect(employee.getLastName()).to.be.a('string');
      done();
    });

    it('employee gender', function (done) {
      expect(employee.getGender()).to.exist;
      expect(employee.getGender()).to.be.a('string');
      done();
    });

    it('employee location', function (done) {
      expect(employee.getLocation()).to.exist;
      expect(employee.getLocation()).to.be.a('number');
      done();
    });

    it('employee job title', function (done) {
      expect(employee.getJobTitle()).to.exist;
      expect(employee.getJobTitle()).to.be.a('string');
      done();
    });

    it('employee phone number', function (done) {
      expect(employee.getPhoneNumber()).to.exist;
      expect(employee.getPhoneNumber()).to.be.a('string');
      done();
    });

    it('employee SSN', function (done) {
      expect(employee.getSsn()).to.exist;
      expect(employee.getSsn()).to.be.a('string');
      done();
    });

    it('employee email', function (done) {
      expect(employee.getEmail()).to.exist;
      expect(employee.getEmail()).to.be.a('string');
      done();
    });

    it('employee department', function (done) {
      expect(employee.getDepartment()).to.exist;
      expect(employee.getDepartment()).to.be.a('number');
      done();
    });

    it('employee address', function (done) {
      expect(employee.getAddress()).to.exist;
      expect(employee.getAddress()).to.be.a('string');
      done();
    });

    it('employee address (second line)', function (done) {
      expect(employee.getAddress2()).to.exist;
      expect(employee.getAddress2()).to.be.a('string');
      done();
    });

    it('employee city', function (done) {
      expect(employee.getCity()).to.exist;
      expect(employee.getCity()).to.be.a('string');
      done();
    });

    it('employee county', function (done) {
      expect(employee.getCounty()).to.exist;
      expect(employee.getCounty()).to.be.a('string');
      done();
    });

    it('employee ZIP code', function (done) {
      expect(employee.getZipCode()).to.exist;
      expect(employee.getZipCode()).to.be.a('string');
      done();
    });

    it('employee country', function (done) {
      expect(employee.getCountry()).to.exist;
      expect(employee.getCountry()).to.be.a('string');
      done();
    });
  });
});
