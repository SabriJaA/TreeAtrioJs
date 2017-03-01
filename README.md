# TreeAtrioJs

[![N|Solid](http://static8.viadeo-static.com/nB1iV387YzOsQ1hvxFsQqq8EIuA=/fit-in/200x200/filters:fill(white)/71865124654443b2bf70612b45b3f2d8/1434476532.jpeg)](http://www.web-atrio.com/)

# TreeGrid for jquery

  - With button open all
  - With search


This text you see here is *actually* written in Markdown! To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.

### Installation
# CSS
```sh
  <link rel="stylesheet" type="text/css" href="css/treeatriojs.css"/>
  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
  <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet' type='text/css'>
```
#JS

```sh
  <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  <script type="text/javascript" src="js/treeatriojs.js"></script>
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
