#! /usr/bin/env node
/*!
 * lib/node-dlQueue.js
 * Copyright(c) 2016 masubi
 * MIT Licensed
 *
 */

"use strict";

/**
 * Module dependencies.
 */
var http = require('http');

var DlQueueClass = function(){
    //
    //  Private
    //

    // storage
    var queue = [];             // wait queue
    var results = {};           //k=id, v=data
    var idCounter = 0;          //currId value

    // task class to store task related information
    var Task = function(state, url, success, failure){
        this._state=state;
        this._url=url;
        this._data={};
        this._id=idCounter;
        idCounter++;

        //wrapper around callbacks i.e. if call backs fail
        this._success = function(){
            try{
                success();
                results[this._id]._state=SUCCESS;
            }catch(e){
                console.log("error in dlQueue success callback")
            }
        };
        this._failure = function(){
            try{
                failure();
            }catch(e){
                results[this._id]._state=FAIL;
                console.log("error in dlQueue failure callback");
            }
        };
    };

    // helper function to make downloading easier
    var downloadExec = function(task) {
        results[task._id]._state=IP;
        results[id]=task;
        http.get(task._url, function(response){
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                task._success(body);
                results[task._id]._data = body;
            });
        });
    };

    // Task States
    var WAITING = "waiting";
    var IP = "in progress";
    var FAIL = "failure";
    var SUCCESS = "success";

    // Queue States
    var running = false;


    //
    //  Public API
    //

    /**
     * Start execution of jobs in task queue
     */
    this.startJobExec = function() {
        if(!running) {
            running = true;

            // set running in own "Thread"
            setTimeout(function(){
                while (running) {
                    if (queue.length > 0) {
                        var task = queue.pop();
                        try {
                            downloadExec(task)
                        } catch (e) {
                            console.log("problem executing task");
                            task._failure();
                        }
                    }
                }
            }, 0);
        }
    };

    /**
     * Stop execution of jobs in task queue
     */
    this.stopJobExec = function() {
        running = false;
    };

    /**
     * Submit a Task to the job queue
     *
     * @param url
     * @param successCb
     * @param failureCb
     * @returns {number} - taskId
     */
    this.submitTask = function(url, successCb, failureCb){
        queue.push(new Task(WAITING, url, successCb, failureCb));
        return idCounter;
    };

    /**
     * Get state of task
     * @param id
     */
    this.getTaskState = function(id){
        if(results[id]){
            return results[id]._state;
        }
    };

    /**
     * Get data if available or return null
     * @param id
     * @returns {*}
     */
    this.getTaskData = function(id){
        if(results[id] && results[id]._state===SUCCESS){
            return results[id]._data;
        }else{
            console.log("data not available, task "+id+" is in state: "+results[id]._state);
            return null
        }
    };
};


