const { describe, it, before, after } = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const async = require('async');
const Taleo = require('../../');
const env = require('../env');

chai.use(require('chai-url'));

describe('packet', function () {
  var taleo;

  this.timeout(30000);

  before(function (done) {
    taleo = new Taleo(env);
    taleo.connect(done);
  });

  after(function (done) {
    taleo.close(done);
  });

  describe('attachment properties', function () {
    var attachment;

    before(function (done) {
      taleo.getEmployee(1108, (err, employee) => {
        expect(err).to.not.exist;
        taleo.getAttachments(employee, (err, attachments) => {
          expect(err).to.not.exist;
          expect(attachments).to.be.an('array');
          expect(attachments.length).to.be.above(0);
          attachment = attachments[0];
          done();
        });
      });
    });

    it('attachment ID', function (done) {
      expect(attachment.getId()).to.exist;
      expect(attachment.getId()).to.be.a('number');
      done();
    });

    it('attachment type', function (done) {
      expect(attachment.getAttachmentType()).to.exist;
      expect(attachment.getAttachmentType()).to.be.a('string');
      expect(attachment.getAttachmentType()).to.be.oneOf([
        'Offer_Type',
        'Resume_Type',
        'User_Attachment_Type',
        'Candidate_Attachment_Type'
      ]);
      done();
    });

    it('attachment entity', function (done) {
      expect(attachment.getAttachedId()).to.exist;
      expect(attachment.getAttachedId()).to.be.a('number');
      expect(attachment.getAttachedId()).to.be.equal(1108);
      done();
    });

    it('attachment entity type', function (done) {
      expect(attachment.getAttachedEntityType()).to.exist;
      expect(attachment.getAttachedEntityType()).to.be.a('string');
      expect(attachment.getAttachedEntityType()).to.be.equal('employee');
      done();
    });

    it('attachment download URL', function (done) {
      expect(attachment.getDownloadUrl()).to.exist;
      expect(attachment.getDownloadUrl()).to.be.a('string');
      expect(attachment.getDownloadUrl()).to.be.have.protocol('https');
      expect(attachment.getDownloadUrl()).to.be.contain.hostname('taleo.net');
      expect(attachment.getDownloadUrl()).to.be.contain.path(`/object/employee/1108/attachment/${attachment.getId()}`);
      done();
    });
  });
});
