var vcomet = vcomet || {};
vcomet.tests = vcomet.tests || {};
vcomet.tests.core = vcomet.tests.core || {
    importsExpected: [
        {
            "name": "vc-el1",
            "dependencies": []
        },
        {
            "name": "vc-el2",
            "dependencies": [
                "vc-el3",
                "vc-el1"
            ]
        },
        {
            "name": "vc-el3",
            "dependencies": [
                "vc-el4"
            ]
        },
        {
            "name": "vc-el4",
            "dependencies": []
        }
    ],

    importsTemplatesExpected: [
        {
            "name": "vc-el1",
            "template": ""
        },
        {
            "name": "vc-el2",
            "template": "<div class=\"vc-el2-div\"></div>"
        },
        {
            "name": "vc-el3",
            "template": "<div class=\"vc-el3-div\"></div>"
        },
        {
            "name": "vc-el4"
        }
    ],
    importsStylesExpected: [
        {
            "name": "vc-el1",
            "height": 6
        },
        {
            "name": "vc-el2",
            "height": 4
        },
        {
            "name": "vc-el3",
            "height": 3
        },
        {
            "name": "vc-el4",
            "height": 1
        }
    ]
}

function loadExpected() {
    document.querySelector("#importsExpected").value = JSON.stringify(vcomet.tests.core.importsExpected, null, 2);
    document.querySelector("#importsTemplatesExpected").value = JSON.stringify(vcomet.tests.core.importsTemplatesExpected, null, 2);
    document.querySelector("#importsStylesExpected").value = JSON.stringify(vcomet.tests.core.importsStylesExpected, null, 2);
}

function loadCurrent() {

    vcomet.onReady(function () {

        fillCurrentImports();
        fillTemplates();
        fillStyles();

        updateResult();

    });

}

function fillCurrentImports() {

    var imports = [];
    var imported = Object.keys(vcomet.imports.config);
    var dependencies;

    for (var i = 0; i < imported.length; i++) {

        imports.push({});
        imports[i].name = imported[i];
        imports[i].dependencies = [];

        if (vcomet.imports.config[imported[i]].dependencies) {

            dependencies = vcomet.imports.config[imported[i]].dependencies;

            for (var j = 0; j < dependencies.length; j++) {
                imports[i].dependencies.push(dependencies[j].replace(".html", "").toLowerCase());
            }

        }

    }

    vcomet.tests.core.importsCurrent = imports;
    document.querySelector("#importsCurrent").value = JSON.stringify(imports, null, 2);

}

function fillTemplates() {

    var templates = [];
    var importedTemplates = Object.keys(vcomet.imports.templates);
    var tempDiv;

    for (var i = 0; i < importedTemplates.length; i++) {

        templates.push({});
        templates[i].name = importedTemplates[i];

        if (vcomet.imports.templates[importedTemplates[i]]) {

            tempDiv = document.createElement("div");
            tempDiv.appendChild(vcomet.imports.templates[importedTemplates[i]].cloneNode(true).content);

            templates[i].template = tempDiv.innerHTML;
        }

    }

    vcomet.tests.core.importsTemplatesCurrent = templates;
    document.querySelector("#importsTemplatesCurrent").value = JSON.stringify(templates, null, 2);

}

function fillStyles() {

    var styles = [];
    var imported = Object.keys(vcomet.imports.config);
    var tempDiv, element;

    for (var i = 0; i < imported.length; i++) {

        element = document.querySelector(imported[i]);

        if (element) {

            styles.push({});
            styles[i].name = imported[i];

            styles[i].height = element.offsetHeight;

        }

    }

    vcomet.tests.core.importsStylesCurrent = styles;
    document.querySelector("#importsStylesCurrent").value = JSON.stringify(styles, null, 2);

}

function getResult() {

    var equalImports = isArrayEqual(vcomet.tests.core.importsExpected, vcomet.tests.core.importsCurrent);
    var equalImportsTemplates = isArrayEqual(vcomet.tests.core.importsTemplatesExpected, vcomet.tests.core.importsTemplatesCurrent);
    var equalImportsStyles = isArrayEqual(vcomet.tests.core.importsStylesExpected, vcomet.tests.core.importsStylesCurrent);

    return (equalImports && equalImportsTemplates && equalImportsStyles);

}

function updateResult() {

    var isPositiveResult = getResult();
    var resultNode = document.querySelector("#result");

    if (isPositiveResult) {
        resultNode.classList.add("passed");
        resultNode.innerHTML = "PASSED";
    } else {
        resultNode.classList.add("failed");
        resultNode.innerHTML = "FAILED";
    }

}

function isArrayEqual(a1, a2) {
    return JSON.stringify(a1) == JSON.stringify(a2);
}

function internTest(callback) {
    setTimeout(function(){
      callback(getResult());
    }, 1000);
}