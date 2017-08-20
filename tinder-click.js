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
           likeNTimes(10);
       }, 10000);

    function likeOne(driver){
        driver
            .elementById("com.tinder:id/gamepad_like")
            .click();
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function likeNTimes(n) {
        var j = 2000;
        for(var i = 1; i<=n; i++){
            var tout = getRandomInt(j*i/2, j*i);
            setTimeout(function () {
                likeOne(driver);
            }, tout);
        }
    }
