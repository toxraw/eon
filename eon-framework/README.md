
<p align="center">
<a href="https://vimlet.com/eon">
<img width="450" src="logo.png"></img>
</a>
</p>

[//]: # (badges)

<p align='center'>
<a href='https://github.com/vimlet/VimletComet/blob/master/LICENSE'><img src='https://vimlet.com/vimlet/VimletComet/master/docs/readme/1530868538617/license.svg?raw=true' title='License' alt='license'></a>
<a href='https://vimlet.com/downloads'><img src='https://vimlet.com/vimlet/VimletComet/master/docs/readme/1530868538617/build.svg?raw=true' title='Build' alt='build'></a>
<img src='https://vimlet.com/vimlet/VimletComet/master/docs/readme/1530868538617/semver.svg?raw=true' title='Semver' alt='semver'>
<a href='https://vimlet.com/vimlet/VimletComet/master/docs/release/index.html'><img src='https://vimlet.com/vimlet/VimletComet/master/docs/readme/1530868538617/docs.svg?raw=true' title='Docs' alt='docs'></a>
</p>

[//]: # (badges)


<p align="center">
<strong>Fast, Light & Productive UX</strong>
</p>

eon is an **ultra light and fast web framework** that focuses on user experience and developer experience, allowing you to create intuitive interfaces across any device with little effort. eon harness state of the art technologies to provide a smooth developing experience without compromising **compatibility and performance**, so you can stay highly productive while retaining full control of your user interface. 

Bundled with eon there is a comprehensive library of **flexible and themeable** components that will suit most of your needs but you can also create your own with ease. 

At is heart eon takes care of the hassles of user interface creation, effectively simplifying a plethora of issues that any interface designer faces in a daily basis (compatibility, performance, responsiveness, data binding, extensibility...) so you can stay focused on what really matters, your app!

## Features

* **Light:** Core of less than 16kb (minified and gzipped).
* **Fast:** With its asynchronous patterns and natively supported specs.
* **Intuitive:** The DOM is your API; HTML and JavaScript are enough to work with eon.
* **Semantic:** Non-verbose declarative and programmatic API.
* **Templating:** Data binding capabilities.
* **Compatible:** Designed for all modern browsers.
* **Customizable:** Themeable and customizable components.
* **Extensible:** Write once, reach everywhere.
* **Responsive:** Mobile first, visual and functionality adaptation.


## Installation

* You can download the latest version [here](https://vimlet.com/downloads) and add it to your project.

* Via NPM:
```npm install @vimlet/eon-cli -g```

    Once it is installed

    ```eon-cli install```

    > You can execute ```eon-cli install``` to update it later.


## How to use

Once it's downloaded, simply import it into your head.
```html
<head>
    <script src="eon/eon.js"></script>
</head>
```
*Ensure that you use the path to your eon location folder*

### Importing components

You have to import the components that you wish to use in your head too.
```html
<head>
    <script>
        eon.import([
            "eon/ui/vc-button.html"
        ]);
    </script>
</head>
```

Now it can be use anywhere in the body as any other html element.

```html
<body>
    <vc-button label="Click Me!"><vc-button>
</body>
```

To use it programmatically due to its asynchronous nature you need to wait for eon.onReady

```javascript
eon.onReady(function () {
    document.querySelector("vc-button").label = "Hello World";
});
```

Keep reading the full [documentation](https://vimlet.com/vimlet/VimletComet/master/docs/release/index.html)

## License

eon is released under MIT License. See [LICENSE](https://github.com/vimlet/VimletComet/blob/master/LICENSE) for details.
