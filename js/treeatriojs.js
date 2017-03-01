/**
 *name: jquery.treeatriojs
 *author: wab-atrio
 *version: 0.1.0
 */

/**input data format:

 [{
    item:{id:'id', label:'label', checked:false}, 
    chidren:[{
        item:{id:'id', label:'label', checked:false}, 
        chidren:[...]
    }]
}, ....]

 */

(function ($) {

    jQuery.fn.treeatriojs = function (settings) {

        settings = $.extend({
            data: [],               // input data which will be used to initilze the tree
            onExpand: null,        // an event will be triggered when the tree node was expanded
            onCollapse: null,      // an event will be triigered when the tree node was collapsed
            onPreCheck: null,      // an event will be triggered before the tree node was checked
            onCheck: null,         // an event will be triggered when the tree node was checked
            onUnCheck: null,       // an event will be triggered when the tree node was unchecked
            onLabelHoverOver: null,// an event will be triggered when mouse hover over the label
            onLabelHoverOut: null,  // an event will be triggered when mouse hover out the label
            labelExpand: "Expand All", // an event will be triggered when mouse hover out the label
            labelCollapse: "Collapse All",  // an event will be triggered when mouse hover out the label
            buttonId: "",
            searchClass: ""// an event will be triggered when mouse hover out the label
        }, settings);

        var container = $(this), $tree = this, searchArray = [], p = 0, baseData;

        //get children html tag string
        function getChildrenHtml(treesdata, firstNode) {
            var result = '', len = treesdata.length, node, clen, arrowClass, checkedClass = ''
            checkedChildren;
            var isTrueSet;
            for (i = 0; i < len; i++) {
                node = treesdata[i];
                $.data($tree, node.item.id, node); //attach node data to node id
                clen = node.children ? node.children.length : 0;
                arrowClass = 'collapsed fa ';
                if (clen === 0) {
                    arrowClass = 'nochildren';
                    isTrueSet = (node.item.checked == 'true');
                    checkClass = isTrueSet ? 'checked' : '';
                } else {
                    var checkedChildren = $.grep(node.children, function (el) {
                        return (el.item.checked == 'true');
                    });
                    checkClass = checkedChildren.length === 0 ? '' : checkedChildren.length === clen ? 'checked' : 'half_checked';
                }
                var rootClass = (firstNode) ? 'class="root list-group-item"' : '';

                result +=
                    '<li rel="' + node.item.id + '" ' + rootClass + ' ><div class="item-container">' +
                    '<div class="checkbox ' + checkClass + '"></div>' +
                    '<label class="arrow ' + arrowClass + '">' + node.item.label + '</label>' +
                    '</div>' +
                    '</li>';
            }
            return result;
        }

        function toArray(object) {
            /*if(Array.isArray(object) || Object.keys(object).length < 1){
             return object;
             }*/
            var tempArray = [];
            for (var t in object) {
                tempArray.push(object[t]);
            }
            return tempArray;
        };

        //display children node with data source
        function updateChildrenNodes($li, data, isExpanded, isCheckbox) {
            data.children = toArray(data.children);
            if (data.children && data.children.length > 0) {
                var innerHtml = isExpanded ? '<ul class="list-group">' : '<ul style="display:none;"  class="list-group">';
                innerHtml += getChildrenHtml(data.children) + '</ul>';
                $li.append(innerHtml);
            }

            $li.addClass('updated');
            if (isCheckbox) {
                if (data.children && data.children.length > 0) {
                    for (var i = 0; i < data.children.length; i++) {
                        if (data.children[i].children) {
                            if (toArray(data.children[i].children).length > 0) {
                                updateChildrenNodes($($li.find('li[rel=' + data.children[i].item.id + ']')), data.children[i], isExpanded, isCheckbox);
                            }
                        }
                    }
                }
            }
        }

        //initialize the check tree with the input data
        (function initalCheckTree(data) {
            if (settings.buttonId != "") {
                $('#' + settings.buttonId).html(settings.labelExpand);
            }
            var treesHtml = '<ul class="checktree">';
            var allData = (data) ? data : settings.data;
            baseData = settings.data;
            console.log(allData);
            treesHtml += getChildrenHtml(allData, true);
            container.empty().append(treesHtml + '<ul>');
        })();

        //bind select change to checkbox
        container.off('selectchange', '.checkbox').on('selectchange', '.checkbox', function () {
            if (settings.onPreCheck) {
                if (!settings.onPreCheck($(this).parent())) {
                    return;
                }
            }

            var $li = $(this).parent();
            var dataSource = $.data($tree, $li.attr('rel'));
            var $all = $(this).siblings('ul').find('.checkbox');
            var $checked = $all.filter('.checked');

            //all children checked
            if ($all.length === $checked.length) {
                $(this).removeClass('half_checked').addClass('checked');
                dataSource.item.checked = true;
                if (settings.onCheck) {
                    settings.onCheck($li);
                }
                //all children are unchecked
            } else if ($checked.length === 0) {
                dataSource.item.checked = false;
                $(this).removeClass('checked').removeClass('half_checked');
                if (settings.onUnCheck) {
                    settings.onUnCheck($li);
                }
                //some children are checked
            } else {
                dataSource.item.checked = false;
                if (settings.onHalfCheck && !$(this).hasClass('half_checked')) {
                    settings.onHalfCheck($li);
                }

                $(this).removeClass('checked').addClass('half_checked');
            }
        });

        //expand and collapse node
        container.off('click', '.arrow').on('click', '.arrow', function () {
            if ($(this).hasClass('nochildren')) {
                return;
            }

            var $li = $(this).parent().parent();
            if (!$(this).hasClass('fa')) {
                $(this).addClass('fa');
            }
            if (!$li.hasClass('updated')) {
                updateChildrenNodes($li, $.data($tree, $li.attr('rel')), true);
                $(this).removeClass('collapsed').addClass('expanded');
                if (settings.onExpand) {
                    settings.onExpand($li);
                }
            } else {
                $(this).parent().siblings("ul").toggle();
                if ($(this).hasClass('collapsed')) {
                    $(this).removeClass('collapsed').addClass('expanded');
                    if (settings.onExpand) {
                        settings.onExpand($li);
                    }
                } else {
                    $(this).removeClass('expanded').addClass('collapsed');
                    if (settings.onCollapse) {
                        settings.onCollapse($li);
                    }
                }
            }
        });

        //check and uncheck node
        container.off('click', '.checkbox').on('click', '.checkbox', function () {
            var $li = $(this).parent().parent();
            var dataSource = $.data($tree, $li.attr('rel'));
            var $subli = $(this).parent().parent();
            if (!$li.hasClass('updated')) {
                updateChildrenNodes($li, dataSource, false, true);
            }
            if (settings.onPreCheck) {
                if (!settings.onPreCheck($li)) {
                    return;
                }
            }

            $(this).removeClass('half_checked').toggleClass('checked');

            if ($(this).hasClass('checked')) {
                dataSource.item.checked = true;
                if (settings.onCheck) {
                    settings.onCheck($li, true);
                }

                $(this).parent().next('ul').find('.checkbox').not('.checked').removeClass('half_checked').addClass('checked').each(function () {
                    $.data($tree, $subli.attr('rel')).item.checked = true;
                    if (settings.onCheck) {
                        settings.onCheck($subli, false);
                    }
                });
            } else {
                dataSource.item.checked = false;
                if (settings.onUnCheck) {
                    settings.onUnCheck($li, true);
                }

                $(this).parent().next('ul').find('.checkbox').filter('.checked').removeClass('half_checked').removeClass('checked').each(function () {

                    $.data($tree, $subli.attr('rel')).item.checked = false;
                    if (settings.onUnCheck) {
                        settings.onUnCheck($subli, false);
                    }
                });
            }

            $(this).parents('ul').siblings('.checkbox').trigger('selectchange');
            var isHalfChecked = [];
            if (!$(this).hasClass('checked')) {
                if ($(this).parent().parent().parent().prev().hasClass('item-container')) {
                    $(this).parent().parent().parent().prev().find('.checkbox').removeClass('checked');
                    $(this).parent().parent().parent().prev().find('.checkbox').addClass('half_checked');
                    recursiveHalfChecked($(this).parent().parent().parent().prev().find('.checkbox'));
                    $(this).parent().parent().parent().prev().next().find('.checkbox').each(function () {
                        if (!$(this).hasClass('checked')) {
                            isHalfChecked.push($(this));
                        }
                    });
                    if (isHalfChecked.length == $(this).parent().parent().parent().prev().next().find('.checkbox').length) {
                        $(this).parent().parent().parent().prev().find('.checkbox').removeClass('half_checked');
                    }
                }
            } else {
                if ($(this).parent().parent().parent().prev().hasClass('item-container')) {
                    $(this).parent().parent().parent().prev().find('.checkbox').addClass('checked');
                    $(this).parent().parent().parent().prev().find('.checkbox').removeClass('half_checked');
                    recursiveHalfChecked($(this).parent().parent().parent().prev().find('.checkbox'), true);
                }
                var self = $(this);
                $(this).closest('.root').find('.checkbox').each(function (index) {
                    if (!$(this).hasClass('checked')) {
                        if ($(this).parent().parent().parent().prev().hasClass('item-container')) {
                            if ($(this).hasClass('half_checked')) {
                                $(this).parent().parent().parent().prev().find('.checkbox').addClass('checked');
                                $(this).parent().parent().parent().prev().find('.checkbox').removeClass('half_checked');
                                recursiveHalfChecked(self.parent().parent().parent().prev().find('.checkbox'), true);
                            } else {
                                $(this).parent().parent().parent().prev().find('.checkbox').removeClass('checked');
                                $(this).parent().parent().parent().prev().find('.checkbox').addClass('half_checked');
                                recursiveHalfChecked(self.parent().parent().parent().prev().find('.checkbox'));
                            }
                        }
                    }
                });
            }
        });

        var recursiveHalfChecked = function ($elt, reverse) {
            if (reverse) {
                if ($elt.parent().parent().parent().prev().hasClass('item-container')) {
                    $elt.parent().parent().parent().prev().find('.checkbox').addClass('checked');
                    $elt.parent().parent().parent().prev().find('.checkbox').removeClass('half_checked');
                    recursiveHalfChecked($elt.parent().parent().parent().prev().find('.checkbox'), true);
                }
            } else {
                if ($elt.parent().parent().parent().prev().hasClass('item-container')) {
                    $elt.parent().parent().parent().prev().find('.checkbox').removeClass('checked');
                    $elt.parent().parent().parent().prev().find('.checkbox').addClass('half_checked');
                    recursiveHalfChecked($elt.parent().parent().parent().prev().find('.checkbox'));
                }
            }
        }

        //click label also trigger check action
        // container.off('click', 'label').on('click', 'label', function () {
        //     $(this).prev('.checkbox').trigger('click');
        // });

        container.off('mouseenter', 'label').on('mouseenter', 'label', function () {
            $(this).addClass("hover");
            if (settings.onLabelHoverOver) settings.onLabelHoverOver($(this).parent());
        });

        container.off('mouseleave', 'label').on('mouseleave', 'label', function () {
            $(this).removeClass("hover");
            if (settings.onLabelHoverOut) settings.onLabelHoverOut($(this).parent());
        });


        $('#' + settings.buttonId).on('click', function (e) {
            e.preventDefault();
            var self = $(this);
            if (self.html() != settings.labelExpand) {
                $(this).html(settings.labelExpand);
            } else {
                $(this).html(settings.labelCollapse);
            }
            container.find('label').each(function () {
                if ($(this).hasClass('nochildren')) {
                    return;
                }
                var $li = $(this).parent().parent();
                if (!$(this).hasClass('fa')) {
                    $(this).addClass('fa');
                }
                if (!$li.hasClass('updated')) {
                    updateChildrenNodes($li, $.data($tree, $li.attr('rel')), true, true);
                    $(this).removeClass('collapsed').addClass('expanded');
                    $(this).parent().siblings("ul").find('label.collapsed').each(function () {
                        $(this).removeClass('collapsed').addClass('expanded');
                    });
                } else {
                    //$(this).parent().siblings("ul").toggle();
                    if (self.html() != settings.labelExpand) {
                        $(this).parent().siblings("ul").show();
                        $(this).removeClass('collapsed').addClass('expanded');
                    } else {
                        $(this).parent().siblings("ul").hide();
                        $(this).removeClass('expanded').addClass('collapsed');
                    }
                }
            });
        });

        /**
         * Filter tree
         */
        if (settings.searchClass != "") {
            $('.' + settings.searchClass).on('keyup', function (e) {
                e.preventDefault();
                var self = $(this);
                // custom css expression for a case-insensitive contains()
                jQuery.expr[':'].Contains = function (a, i, m) {
                    return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
                };
                var filter = $(this).val();
                searchArray = [];
                searchTree(baseData, filter);
            });
        }


        function search(data, filter, newArray, newData, index, subParent) {
            _.find(data, function (o, i) {
                var newItem = newArray.length - 1;
                if(!o.children){
                    subParent = false;
                }
                if (o.item.label.search(new RegExp(filter, "i")) != -1 && (o.item.parent === "true" || subParent)) {
                    if (newArray.length === 0 || o.item.parent === "true") {
                        newArray.push(o);
                        //p++;
                    } else {
                        if (!newArray[newItem].children) {
                            newArray[newItem].children = [];
                        }
                        newArray[newItem].children.push(o);
                    }
                } else {
                    if (o.children) {
                        if (newArray.length === 0 || o.item.parent === "true") {
                            newArray.push({'item': o.item});
                            //p++;
                        } else {
                            if (!newArray[newItem].children) {
                                newArray[newItem].children = [];
                            }
                            newArray[newItem].children.push({item: o.item});
                        }
                        search(o.children, filter, newArray, newData++, i, true);
                    } else {
                        var newChildren = newArray[newItem].children.length - 1;
                        if (o.item.label.search(new RegExp(filter, "i")) != -1) {
                            if (!newArray[newItem].children[newChildren].children) {
                                newArray[newItem].children[newChildren].children = [];
                            }
                            newArray[newItem].children[newChildren].children.push({item: o.item});
                        }
                    }
                }
            });
        }

        function format(newArray, filter, subparent) {
            for (var i = 0; i < newArray.length; i++) {
                if (newArray[i].item.label.search(new RegExp(filter, "i")) == -1) {
                    if (newArray[i].children) {
                        format(newArray[i].children, filter, true);
                    } else {
                        if (newArray[i] && newArray[i].item && newArray[i].item.label.search(new RegExp(filter, "i")) == -1) {
                            newArray.splice(i, 1)
                            i--;
                        }
                    }
                }
            }

        }

        function searchTree(data, filter) {
            if (filter != '' && filter.length > 2) {
                var newArray = [];
                var newData = 0;
                p = 0;
                search(data, filter, newArray, newData);
                format(newArray, filter);
                for (var i = 0; i < newArray.length; i++) {
                    if (newArray[i] && newArray[i].children.length === 0 && newArray[i].item.label.search(new RegExp(filter, "i")) == -1) {
                        newArray.splice(i, 1);
                        i--;
                    }
                }
            } else {
                newArray = settings.data;
            }
            if (settings.buttonId != "") {
                $('#' + settings.buttonId).html(settings.labelExpand);
            }
            var treesHtml = '<ul class="checktree">';
            var allData = newArray;
            treesHtml += getChildrenHtml(allData, true);
            container.empty().append(treesHtml + '<ul>');
        }
    };
})(jQuery);
