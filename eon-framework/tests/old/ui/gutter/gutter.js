var eon = eon || {};
eon.tests = eon.tests || {};
eon.tests.ui = eon.tests.ui || {
    build: {},
    buildExpected: {
      gutter: "built",
      firstSection: "built",
      splitter: "built"
    },
    programmatic: {},
    programmaticExpected: {
        gutter: "built",
        firstSection: "built",
        splitter: "built"
    }
}

function loadExpected() {
    // Expected gutter visualization
    document.querySelector("#buildExpected").value = JSON.stringify(eon.tests.ui.buildExpected, null, 2);
    document.querySelector("#programmaticExpected").value = JSON.stringify(eon.tests.ui.programmaticExpected, null, 2);
}
function runTests() {

    var result = document.querySelector("#result");
    var buildExpected = isEqualObject(eon.tests.ui.buildExpected, eon.tests.ui.build);
    var programmaticExpected = isEqualObject(eon.tests.ui.programmaticExpected, eon.tests.ui.programmatic);
    
    if (buildExpected && programmaticExpected) {
        result.classList.add("passed");
        result.innerHTML = "PASSED";
    } else {
        result.classList.add("failed");
        result.innerHTML = "FAILED";
    }
    return result.innerHTML == "PASSED" ? true : false;

}

function internTest(callback) {
    eon.onReady(function(){
        setTimeout(function(){
            // Run all component tests
            callback(runTests());
        }, 1000);
    });
  }

function isEqualObject(obj1, obj2) {
    // Check object equal values
    for (var k in obj1) {
        if (obj1[k] != obj2[k]) { return false; }
    }
    return true;
}

function checkGutterBuild () {
    var gutterCont = document.querySelector(".gutterContainer");
    var declGutter = document.querySelector("#declarativeGutter");

    eon.onReady(function(){
        
        eon.tests.ui.build.gutter = declGutter.offsetWidth > (gutterCont.offsetWidth - 100) ? "built" : "error";
        eon.tests.ui.build.firstSection = declGutter._refs.section.offsetWidth > (declGutter.offsetWidth / 2) - 50 ? "built" : "error";
        eon.tests.ui.build.splitter = declGutter._refs.splitter.offsetWidth == declGutter.splitterSize  ? "built" : "error";
        document.querySelector("#build").value = JSON.stringify(eon.tests.ui.build, null, 2);
    });
}

function createGutter () {
    var programGutter = document.createElement("eon-gutter");
    // Create gutter
    programGutter.setAttribute("type", "vertical");
    programGutter.setAttribute("collapsible", true);
    // Declare sections
    var section = document.createElement("eon-section");
    var section2 = document.createElement("eon-section");
    // Append some colored divs
    for (var i = 0; i < 4; i++) {
        div = document.createElement("div");
        div.className = "innerCard red";
        section.appendChild(div);
        div = document.createElement("div");
        div.className = "innerCard orange";
        section2.appendChild(div);
    }
    // Append elements
    programGutter.appendChild(section);
    programGutter.appendChild(section2);
    eon.onReady(function(){
        // Append programmatic gutter
        document.querySelector("#programTest").appendChild(programGutter);
        setTimeout(function(){
            programGutter.onReady(function(){
                eon.tests.ui.programmatic.gutter = programGutter.offsetHeight > (programTest.offsetHeight - 100) ? "built" : "error";
                eon.tests.ui.programmatic.firstSection = programGutter._refs.section.offsetHeight > (programGutter.offsetHeight / 2) - 50 ? "built" : "error";
                eon.tests.ui.programmatic.splitter = programGutter._refs.splitter.offsetHeight == programGutter.splitterSize  ? "built" : "error";
                document.querySelector("#programmatic").value = JSON.stringify(eon.tests.ui.programmatic, null, 2);
            });
        }, 0);
    });
}