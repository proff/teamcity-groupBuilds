jQuery(function () {
    var cookieName = "groupSnapshotResultsEnabled";
    if ((location.href.indexOf("viewLog.html") < 0 || (location.href.indexOf("tab=") >= 0 && location.href.indexOf("tab=buildResultsDiv") < 0 && location.href.indexOf("tab=queuedBuildOverviewTab") < 0)) &&
        (location.href.indexOf("viewQueued.html") < 0 || (location.href.indexOf("tab=") >= 0 && location.href.indexOf("tab=queuedBuildOverviewTab") < 0))) {
        return;
    }
    var old = BS.Util.hide;
    BS.Util.hide = function () {
        var value = old.apply(this, arguments);
        init();
        return value;
    }
    init();

    function init() {
        var table = jQuery("table.modificationBuilds");
        if (table.data("groupSnapshotInit"))
            return;
        table.data("groupSnapshotInit", true);
        var originalOrder;
        var groupByProjectLink = jQuery("<a href='#'>group by project</a>");
        groupByProjectLink.click(groupByProject);
        jQuery("table.modificationBuilds").after(groupByProjectLink);

        var sortByTimeLink = jQuery("<a href='#'>sort by time</a>");
        sortByTimeLink.click(sortByTime).hide();
        jQuery("table.modificationBuilds").after(sortByTimeLink);

        if (Cookies.get(cookieName)) groupByProject();


        function groupByProject() {
            Cookies.set(cookieName, 1);
            jQuery(groupByProjectLink).hide();
            jQuery(sortByTimeLink).show();
            originalOrder = jQuery("tr.buildTypeProblem", table);
            var lastInGroup = {};
            originalOrder.each(function () {
                var names = new Array();
                jQuery("a.buildTypeName ", this).each(function () {
                    names.push(jQuery(this).text());
                });
                var name = names.slice(0, names.length - 1).join(", ");
                if (lastInGroup[name]) {
                    jQuery(this).detach().insertAfter(lastInGroup[name]);
                } else {
                    jQuery(this).detach().appendTo(table);
                }
                lastInGroup[name] = this;
            })
        }

        function sortByTime() {
            Cookies.remove(cookieName);
            jQuery(groupByProjectLink).show();
            jQuery(sortByTimeLink).hide();
            var table = jQuery("table.modificationBuilds");
            originalOrder.each(function () {
                jQuery(this).detach().appendTo(table);
            })
        }
    }
})