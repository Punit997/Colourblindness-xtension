chrome.storage.sync.get('filter', function (obj) {
    if (obj.filter === null || obj.filter === undefined) {
        obj.filter = "normal";
        chrome.storage.sync.set({'filter': obj.filter});
    }
    addFilter(obj.filter);
    /*
    The purpose of this is to retrieve a filter value from the synchronized storage area and apply it to functionality in this extension. If the "filter" value is not already set in the synchronized storage area, it sets a default value of "normal" before applying the filter.
    */
});