project-files
=============

Project File Management, inspired by the Angular.js build system

Install It:
----------
```
npm install --save-dev project-files
```

Configure Your Files:
---------------------
*projectFiles.js*
```javascript
require('project-files')(module,exports,{
    sourceFiles:[
        'src/main.js'
        '@moduleA'
        '@moduleB'
    ],
    moduleA:[
        'src/module-A-1.js'
        'src/module-A-2.js'
    ],
    moduleB:[
        'src/module-B/*.js'
    ],
    testFiles:[
        'test/*.js',
        'other-tests/*.js'
    ]
});
```

Merge Files In Build Scripts:
-----------------------------
*GruntFile.js*
```javascript
var projectFiles = require('./projectFiles.js');
grunt.initConfig({

    /* ... */

    concat:{
        src:projectFiles.mergeFilesFor('sourceFiles'),
        dest:'my-project-sources.js'
    }

    /* ... */

    jshint:{
        src:cameraFiles.mergeFilesFor('sourceFiles')
    }

});
```
*karma.conf.js*
```javascript
var files = require('./projectFiles.js');

module.exports = function(config){
    config.set({
        files:files.mergeFilesFor('sourceFiles','testFiles')
    });
};

```