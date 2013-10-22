describe('project-files', function () {
  var chai = require('chai');
  var expect = chai.expect;

  var module,exports;
  beforeEach(function(){
    exports = {};
    module = {exports:exports};
  });

  function createProjectFiles(files){
    require('../index.js')(module,exports,files);
  }

  it('should create a mergeFilesFor function on exports',function(){
    createProjectFiles({'src':['mySrc']});
    expect(exports).to.respondTo('mergeFilesFor');
  });

  it('should add an array called "files" to exports',function(){
    createProjectFiles({'src':['mySrc']});
    expect(exports).to.have.property('files');
    expect(exports.files).to.have.property('src').that.deep.equals(['mySrc']);
  });

  describe('mergeFilesFor',function(){

    it('will return a simple array',function(){
      createProjectFiles({'src':['mySrc1','mySrc2']});
      expect(exports.mergeFilesFor('src')).to.deep.equal(['mySrc1','mySrc2']);
    });

    it('will concat arrays if supplied multiple arguments',function(){
      createProjectFiles({'src':['mySrc1','mySrc2'],'src2':['mySrc3','mySrc4']});
      expect(exports.mergeFilesFor('src','src2')).to.deep.equal(['mySrc1','mySrc2','mySrc3','mySrc4']);
    });

    it('will insert other source arrays using @notation',function(){
      createProjectFiles({'src':['srcA','@src1','srcB','@src2','srcC'],'src1':['mySrc1','mySrc2'],'src2':['mySrc3','mySrc4']});
      expect(exports.mergeFilesFor('src')).to.deep.equal(['srcA','mySrc1','mySrc2','srcB','mySrc3','mySrc4','srcC']);
    });

    it('will work with multiple layers of nesting',function(){
      createProjectFiles({'src':['@src1','srcC'],'src1':['mySrc1','mySrc2','@src2'],'src2':['mySrc3','mySrc4']});
      expect(exports.mergeFilesFor('src')).to.deep.equal(['mySrc1','mySrc2','mySrc3','mySrc4','srcC']);
    });
  });

});