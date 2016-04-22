node-dlQueue
============

## Description

node-dlQueue: (https://github.com/masubi/node-dlQueue).  There maybe some 
unstated limitations.

## Usage
```javascript
var dlQueue = new DlQueueClass();
var success = function(body){
    console.log("data: "+body);
};
var fail = function(){
    console.log("failure is a bitter pill"); 
}
dlQueue.submitTask("www.google.com", success, fail);
dlQueue.submitTask("www.yahoo.com", success, fail);
dlQueue.startJobExec(); //start execution
dlQueue.stopJobExec();  //stop execution
```

## Install

* npm install .
* npm link

## TODO's
*  implement timeout behavior e.g.  if request takes too long
*  implement unit tests
*  abstract out dl execution(e.g.  make this generic so it just a task queue)


## License 

(The MIT License)

Copyright (c) 2015 masubi &lt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
