"use strict";
require("angular");
var CSInterface_1 = require("CSInterface");
var cs = new CSInterface_1.CSInterface();
var responseHandler = function (result) {
    try {
        JSON.parse(result);
    }
    catch (err) {
        console.error(result, err);
    }
};
var action = function (command) {
    cs.evalScript("marshal(" + JSON.stringify(command) + ")", responseHandler);
};
var service = function () {
    return {
        execute: function (params) {
            action(params);
        }
    };
};
angular.module("CutLayout").factory("ILST", service);
