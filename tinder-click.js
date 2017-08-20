"use strict";

require("./helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    serverConfigs = require('./helpers/appium-servers');

        var driver;
        var serverConfig = process.env.npm_package_config_sauce ?
            serverConfigs.sauce : serverConfigs.local;
        driver = wd.promiseChainRemote(serverConfig);
        require("./helpers/logging").configure(driver);

        var desired = _.clone(require("./helpers/caps").android25);
        driver
            .init(desired)
            .setImplicitWaitTimeout(300000);

       setTimeout(function() {
           var fileName = getFileName();
           likeNTimes(10, fileName);
       }, 10000);

    function likeOne(fileName, i, n){
        return driver
            .elementById("com.tinder:id/gamepad_like")
            .click()
            .takeScreenshot().then(
                function(image, err) {
                    var currentFileName = fileName+'_'+i+'.png';
                    require('fs').writeFile(currentFileName, image, 'base64', function(err) {
                        console.log(err);
                    });
                    }
                ).then(function(){
                    if(i === n){
                        driver.quitApp();
                    } else {
                        likeOne(fileName, i+1, n);
                    }
                })
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function likeNTimes(n, fileName) {
        driver.takeScreenshot().then(
                function(image, err) {
                    var currentFileName = fileName+'_startState.png';
                    require('fs').writeFile(currentFileName, image, 'base64', function(err) {
                        console.log(err);
                    });
                    }
        ).then(function(){
            likeOne(fileName, 1, n);
        });
    }

    function getFileName() {
        return Date.now();
    }
