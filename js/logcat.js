$(document).ready(function () {
    $("#format-button").click(function () {
        var rawLog = getTextFromInputField();
        formatLog(rawLog);
    });
});

function getTextFromInputField() {
    return $('#log-input-text').val();
}

function hideInput() {
    $('#log-input').hide();
}

function formatLog(rawLog) {
    var output = $('#log-output');
    output.empty();

    var re = /(\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}:) ([A,E,W,I,D,V]\/)/g;
    var subst = '\n$2';
    var res = rawLog.replace(re, subst);
    var lines = res.split("\n");

    for (var i in lines) {
        var line = lines[i];
        console.log(line);
        var state = "verbose";

        if (line.contains(" E ")) {
            state = "error";
        } else if (line.contains(" W ")) {
            state = "warn";
        } else if (line.contains(" I ")) {
            state = "info";
        } else if (line.contains(" D ")) {
            state = "debug";
        } else if (line.contains(" V ")) {
            state = "verbose";
        } else if (line.contains(" A ")) {
            state = "assert";
        }
        output.append("<p class='level-" + state + "'>" + line + "</p>");
    }
    hideInput();
}


if (typeof String.prototype.startsWith != 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function (str) {
        return this.indexOf(str) == 0;
    };
}

if (typeof String.prototype.contains != 'function') {
    // see below for better implementation!
    String.prototype.contains = function (str) {
        return this.indexOf(str) != -1;
    };
}
var fileReaderOpts = {
    dragClass: "drag",
    readAsDefault: "Text",
    on: {
        load: function (e, file) {
            console.log("load");
            var rawLog = e.target.result;
            formatLog(rawLog);
        },
        groupstart: function (g) {
            console.log("groupstart: " + g);
        },
        groupend: function (g) {
            console.log("groupend: " + g);
        }
    }
};

$("body").fileReaderJS(fileReaderOpts);
