(function () {
    "use strict";

    var dataPromises = [];
    var blogs;

    var blogPosts = new WinJS.Binding.List();

    function getFeeds() {
      blogs = [
        {
          key: "blog1",
          url: 'http://windowsteamblog.com/windows/b/developers/atom.aspx',
          title: 'tbd', updated: 'tbd',
          acquireSyndication: acquireSyndication, dataPromise: null
        },
        {
          key: "blog2",
          url: 'http://windowsteamblog.com/windows/b/windowsexperience/atom.aspx',
          title: 'tbd', updated: 'tbd',
          acquireSyndication: acquireSyndication, dataPromise: null
        },
        {
          key: "blog3",
          url: 'http://windowsteamblog.com/windows/b/extremewindows/atom.aspx',
          title: 'tbd', updated: 'tbd',
          acquireSyndication: acquireSyndication, dataPromise: null
        },
        {
          key: "blog4",
          url: 'http://windowsteamblog.com/windows/b/business/atom.aspx',
          title: 'tbd', updated: 'tbd',
          acquireSyndication: acquireSyndication, dataPromise: null
        },
        {
          key: "blog5",
          url: 'http://windowsteamblog.com/windows/b/bloggingwindows/atom.aspx',
          title: 'tbd', updated: 'tbd',
          acquireSyndication: acquireSyndication, dataPromise: null
        },
        {
          key: "blog6",
          url: 'http://windowsteamblog.com/windows/b/windowssecurity/atom.aspx',
          title: 'tbd', updated: 'tbd',
          acquireSyndication: acquireSyndication, dataPromise: null
        },
        {
          key: "blog7",
          url: 'http://windowsteamblog.com/windows/b/springboard/atom.aspx',
          title: 'tbd', updated: 'tbd',
          acquireSyndication: acquireSyndication, dataPromise: null
        },
        {
          key: "blog8",
          url: 'http://windowsteamblog.com/windows/b/windowshomeserver/atom.aspx',
          title: 'tbd', updated: 'tbd',
          acquireSyndication: acquireSyndication, dataPromise: null
        },
        {
          key: "blog9",
          url: 'http://windowsteamblog.com/windows_live/b/developer/atom.aspx',
          title: 'tbd', updated: 'tbd',
          acquireSyndication: acquireSyndication, dataPromise: null
        },
        {
          key: "blog10",
          url: 'http://windowsteamblog.com/ie/b/ie/atom.aspx',
          title: 'tbd', updated: 'tbd',
          acquireSyndication: acquireSyndication, dataPromise: null
        },
        {
          key: "blog11",
          url: 'http://windowsteamblog.com/windows_phone/b/wpdev/atom.aspx',
          title: 'tbd', updated: 'tbd',
          acquireSyndication: acquireSyndication, dataPromise: null
        },
        {
          key: "blog12",
          url: 'http://windowsteamblog.com/windows_phone/b/wmdev/atom.aspx',
          title: 'tbd', updated: 'tbd',
          acquireSyndication: acquireSyndication, dataPromise: null
        }];
    }

    function acquireSyndication( url ) {
      return WinJS.xhr( {
        url: url,
        headers: { "If-Modified-Since": "Mon, 27 Mar 1972 00:00:00 GMT" }
      } );
    }

    function getBlogPosts() {
      
    }

    function getItemsFromXml( articleSyndication, bPosts, feed ) {
      
    }

    var list = new WinJS.Binding.List();
    var groupedItems = list.createGrouped(
        function groupKeySelector(item) { return item.group.key; },
        function groupDataSelector(item) { return item.group; }
    );

    // TODO: データを実際のデータに置き換えます。
    // 非同期ソースのデータは使用可能になるたびに追加できます。
    generateSampleData().forEach(function (item) {
        list.push(item);
    });

    WinJS.Namespace.define("Data", {
        items: groupedItems,
        groups: groupedItems.groups,
        getItemReference: getItemReference,
        getItemsFromGroup: getItemsFromGroup,
        resolveGroupReference: resolveGroupReference,
        resolveItemReference: resolveItemReference
    });

    // 項目の参照を取得します。グループ キーと項目のタイトルを
    // 簡単にシリアル化できる、項目への一意の参照として使用します。
    function getItemReference(item) {
        return [item.group.key, item.title];
    }

    // この関数は、指定されたグループに属する項目のみが格納された
    // WinJS.Binding.List を返します。
    function getItemsFromGroup(group) {
        return list.createFiltered(function (item) { return item.group.key === group.key; });
    }

    // 指定されたグループ キーに対応する一意のグループを取得します。
    function resolveGroupReference(key) {
        for (var i = 0; i < groupedItems.groups.length; i++) {
            if (groupedItems.groups.getAt(i).key === key) {
                return groupedItems.groups.getAt(i);
            }
        }
    }

    // 指定された文字列配列から一意の項目を取得します。項目には
    // グループ キーと項目のタイトルが含まれます。
    function resolveItemReference(reference) {
        for (var i = 0; i < groupedItems.length; i++) {
            var item = groupedItems.getAt(i);
            if (item.group.key === reference[0] && item.title === reference[1]) {
                return item;
            }
        }
    }

    // アプリケーションのデータ リストに追加できるサンプル データの配列を
    // 返します。 
    function generateSampleData() {
      
    }
})();
