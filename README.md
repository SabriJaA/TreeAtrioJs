# TreeAtrioJs

[![N|Solid](http://static8.viadeo-static.com/nB1iV387YzOsQ1hvxFsQqq8EIuA=/fit-in/200x200/filters:fill(white)/71865124654443b2bf70612b45b3f2d8/1434476532.jpeg)](http://www.web-atrio.com/)

# Preview

[![N|Solid](http://img11.hostingpics.net/pics/650497demoTreeAtrioJs.png)]


## TreeGrid for jquery

  - With button open all
  - With search


## Installation
### CSS
```sh
  <link rel="stylesheet" type="text/css" href="css/treeatriojs.css"/>
  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
  <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet' type='text/css'>
```
### JS

```sh
  <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  <script type="text/javascript" src="js/treeatriojs.js"></script>
```

## Plugins

| Plugin 
| ------ |
| Underscore |
| Boostrap Css | 

## Development


First Tab:
```sh
    /* HTML */ 
    <button id="toggleTree" class="btn btn-default"></button>
    <input type="text" class="filterinput form-control" placeholder="Search by text">
    <div id="tree-container"></div>
    
    /* JSON */
    var mockData = [];
    mockData.push({
        item:{
            id: 'id1',
            label: 'test',
            checked: false
        },
        children: [{
           item:{
                id: 'id11',
                label: 'Lorem ipsum dolor 11',
                checked: false
            } 
        },{
           item:{
                id: 'id12',
                label: 'reza',
                checked: false
            } 
        },{
           item:{
                id: 'id13',
                label: 'Lorem ipsum dolor 13',
                checked: false
            } ,
            children: [{
                item:{
                    id: 'id11',
                    label: 'Lorem ipsum dolor 11',
                    checked: false
                }
            },{
                item:{
                    id: 'id12',
                    label: 'reza',
                    checked: false
                }
            },{
                item:{
                    id: 'id13',
                    label: 'Lorem ipsum dolor 13',
                    checked: false
                }
            }]
        }]
    });
            
    /* JAVASCRIPT */
    $('#tree-container').treeatriojs({
        data: mockData,
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
