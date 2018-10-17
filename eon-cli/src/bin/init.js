var commons = require("@vimlet/commons");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var path = require("path");
var os = require("os");
var fs = require("fs-extra");
var url = require("url");
var readlineSync = require("readline-sync");
var Sync = require("sync");
var install = require("./install");

var releaseURL = "https://github.com/vimlet/VimletComet-Examples/releases/download/eon-init/";
var templateName;

var projectPath;
var cwd = process.cwd();

module.exports = function (result) {

    projectPath = result.path ? result.path : cwd;

    Sync(function () {

        console.log("\nWelcome to eon\n");

        var downloadTemplate = readlineSync.question("Initialize project with a template? [yes] ");
        if (downloadTemplate.trim() == "" || downloadTemplate.toLowerCase().indexOf("y") == 0) {
            try {
                templateName = handleVersion.sync(null);
                downloadAndExtractTemplate.sync(null, releaseURL, templateName, projectPath);

                // Call to install eon
                install.sync(null, { install: true });

                console.log('\x1b[96m', '\nTo start the server, type "npm start"');
                console.log("\x1b[0m"); // Reset color + newLine

            } catch (error) {
                console.error("\x1b[91m", "\nError: " + error);
                console.error("\x1b[0m"); // Reset color + newLine
            }
        } else {

            var eonJsonObject = {
                eon: "latest",
                path: "eon",
                ignore: [
                    "custom"
                ]
            };

            var eonVersion = readlineSync.question("\neon version? [latest] ");
            if(eonVersion.trim() != "" && eonVersion.toLowerCase() != "latest") {
                eonJsonObject.eon = eonVersion;
            }

            var eonPath = readlineSync.question("\neon path? [eon] ");
            if (eonPath.trim() == "") {
                eonPath = "eon"
            }
            eonJsonObject.path = eonPath;

            // Write file
            fs.writeFileSync("eon.json", JSON.stringify(eonJsonObject, null, 2));

             // Call to install eon
             install.sync(null, { install: true });
        }
    });



}

function handleVersion(cb) {
    var url = "https://api.github.com/repos/vimlet/VimletComet-Examples/releases/tags/eon-init";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var responseObject = JSON.parse(xhttp.responseText);
                var templateName = responseObject.assets[0].name;

                cb(null, templateName);
            } else {
                cb("Request status " + this.status);
            }
        }
    };

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("User-Agent", "vimlet");
    xhttp.send();
}

function downloadAndExtractTemplate(releaseURL, templateName, projectPath, cb) {
    var downloadPath = path.join(os.homedir(), ".eon", "template");
    var file_url = releaseURL + templateName;

    fs.mkdirsSync(projectPath);
    var dest = path.join(downloadPath, templateName);

    if (!fs.existsSync(dest)) {
        commons.request.download(file_url, dest, null, null, function (error) {
            if (!error) {
                // Extract
                commons.compress.unpack(dest, projectPath, "zip", null, null, function (error) {
                    cb(error);
                });
            } else {
                cb(error);
            }
        });
    } else {
        // Extract
        commons.compress.unpack(dest, projectPath, "zip", null, null, function (error) {
            cb(error);
        });
    }

}