// ===============================================================================
//  Microsoft patterns & practices
//  Hilo JS Guidance
// ===============================================================================
//  Copyright © Microsoft Corporation.  All rights reserved.
//  This code released under the terms of the 
//  Microsoft patterns & practices license (http://hilojs.codeplex.com/license)
// ===============================================================================

(function (globals) {
    "use strict";

    var activation = Windows.ApplicationModel.Activation,
        app = WinJS.Application;
    
    function runSpecs() {

        var specRunner;
        var runLinkedTests = false;

        if (runLinkedTests) {
            // Any missing elements here will cause an error:
            //      WinRTError: The system cannot find the file specified.
            specRunner = new Hilo.SpecRunner({
                src: "includes/source",
                specs: "includes/specs",
                helpers: "js/helpers"
            });
        } else {
            specRunner = new Hilo.SpecRunner({
                src: "js",
                specs: "specs",
                helpers: "js/helpers"
            });
        }

        // Handle any errors in the execution that
        // were not part of a failing test
        specRunner.addEventListener("error", function (args) {
            document.querySelector("body").innerText = args.detail;
        });
        
        // run the specs
        specRunner.run();
    }

    var showError = function (e) {
        var errorsList = document.querySelector("#errors ul");
        var errorEl = document.createElement("li");

        errorEl.innerText = e.detail.exception ? JSON.stringify(e.detail.exception) : e.detail.errorMessage || "Unknown Error"
        errorsList.appendChild(errorEl);

        document.querySelector("#errors").style.display = "block";
        // By returning true, we signal that the exception was handled,
        // preventing the application from being terminated
        return true;
    };

    // Try to catch any error that might escape the specRunner (sinon-chai does this)
    //  This can be caused by basic failing assertations
    WinJS.Application.onerror = showError;
    window.onerror = showError;



    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            args.setPromise(WinJS.UI.processAll().then(function () {

                runSpecs();

            }));
        }
    }, false);

    app.start();
})(this);
