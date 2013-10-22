module.exports = function(module,exports,files){
  if (exports) {
    exports.files = files;
    exports.mergeFilesFor = function() {
      var mergedFiles = [];

      Array.prototype.slice.call(arguments, 0).forEach(function(filegroup) {
        if(!files[filegroup]){
          console.log(files);
          throw new Error('No definition for: ' + filegroup);
        }
        files[filegroup].forEach(function(file) {
          // replace @ref
          var match = file.match(/^\@(.*)/);
          if (match) {
            if(!files[match[1]]){
              throw new Error('No definition for: ' + match[1]);
            }
            mergedFiles = mergedFiles.concat(exports.mergeFilesFor(match[1]));
          } else {
            mergedFiles.push(file);
          }
        });
      });

      return mergedFiles;
    };
  }
};