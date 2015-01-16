/*
 * buddha-bless-you
 * 
 *
 * Copyright (c) 2015 nevercannot
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path');
module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('buddha_bless_you', 'Buddha\'s grace illuminates code as sunshine', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      who:'alpaca',
      commentSymbol:'//'
      
    });
    var testExisRegexMap=
    {
      'buddha':/o888888888o/,
      'alpaca':/┗┓┓┏━┳┓┏┛/

    };
    var who = options.who,
        commentSymbol = options.commentSymbol,
        commentFilePathMap=
          {
            'buddha':'assets/buddha.txt',
            'alpaca':'assets/alpaca.txt'
          },
        commentFilePath = path.join(__dirname,commentFilePathMap[who]),
        commentContent = grunt.file.read(commentFilePath),
        lineCommentArr = commentContent.split(grunt.util.normalizelf('\n'));

    lineCommentArr.forEach(function(value,index,arr)
      {
        arr[index]=commentSymbol+value;

      });

    commentContent = lineCommentArr.join(grunt.util.normalizelf('\n'));

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
    var src = file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read file source.
        var originaFileContent = grunt.file.read(filepath),
            newFileContent = commentContent +
                             grunt.util.normalizelf('\n')+
                             originaFileContent;
        if(testExisRegexMap[who].test(originaFileContent)){return;}
        grunt.file.write(filepath,newFileContent);

      });



      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });


};
