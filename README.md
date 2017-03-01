# TreeAtrioJs

[![N|Solid](http://static8.viadeo-static.com/nB1iV387YzOsQ1hvxFsQqq8EIuA=/fit-in/200x200/filters:fill(white)/71865124654443b2bf70612b45b3f2d8/1434476532.jpeg)](http://www.web-atrio.com/)

# TreeGrid for jquery

  - With button open all
  - With search


This text you see here is *actually* written in Markdown! To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.

### Installation

Dillinger requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd dillinger
$ npm install -d
$ node app
```

For production environments...

```sh
$ npm install --production
$ npm run predeploy
$ NODE_ENV=production node app
```

### Plugins

| Plugin 
| ------ |
| Underscore |
| Boostrap Css | 

### Development


First Tab:
```sh
    /* HTML */ 
    <button id="toggleTree" class="btn btn-default"></button>
    <input type="text" class="filterinput form-control" placeholder="Search by text">
    <div id="tree-container"></div>
    
    /* JAVASCRIPT */
    $('#tree-container').treeatriojs({
        data: dataAjax,
        buttonId: "toggleTree",
        labelExpand: "Tout ouvrir", // an event will be triggered when mouse hover out the label
        labelCollapse: "Tout fermer",
        searchClass: "filterinput"
    });
```

License
----

MIT
**Free Software, Hell Yeah!**
