"use strict";
require("angular");
var CSInterface_1 = require("CSInterface");
var cs = new CSInterface_1.CSInterface();
var command = {
    handler: "docCloser",
};
var responseHandler = function (result) {
    try {
        JSON.parse(result);
    }
    catch (err) {
        console.error(result, err);
    }
};
var action = function () {
    cs.evalScript("marshal(" + JSON.stringify(command) + ")", responseHandler);
};
var trigger = document.getElementById("btn-go");
trigger.addEventListener("click", action);
