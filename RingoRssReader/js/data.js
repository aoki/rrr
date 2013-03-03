( function () {
  "use strict";

  var list = getBlogPosts();

  var dataPromises = [];
  var blogs;

  var blogPosts = new WinJS.Binding.List();

  function getFeeds() {
    blogs = [
      {
        key: "blog1",
        url: 'http://blogs.windows.com/skydrive/b/skydrive/atom.aspx',
        title: 'tbd', updated: 'tbd',
        acquireSyndication: acquireSyndication, dataPromise: null
      },
      {
        key: "blog2",
        url: 'http://blogs.windows.com/windows/b/windowsexperience/atom.aspx',
        title: 'tbd', updated: 'tbd',
        acquireSyndication: acquireSyndication, dataPromise: null
      },
      {
        key: "blog3",
        url: 'http://blogs.windows.com/windows/b/extremewindows/atom.aspx',
        title: 'tbd', updated: 'tbd',
        acquireSyndication: acquireSyndication, dataPromise: null
      },
      {
        key: "blog4",
        url: 'http://blogs.windows.com/windows/b/business/atom.aspx',
        title: 'tbd', updated: 'tbd',
        acquireSyndication: acquireSyndication, dataPromise: null
      },
      {
        key: "blog5",
        url: 'http://blogs.windows.com/windows/b/bloggingwindows/atom.aspx',
        title: 'tbd', updated: 'tbd',
        acquireSyndication: acquireSyndication, dataPromise: null
      },
      {
        key: "blog6",
        url: 'http://blogs.windows.com/windows/b/windowssecurity/atom.aspx',
        title: 'tbd', updated: 'tbd',
        acquireSyndication: acquireSyndication, dataPromise: null
      },
      {
        key: "blog7",
        url: 'http://blogs.windows.com/windows/b/springboard/atom.aspx',
        title: 'tbd', updated: 'tbd',
        acquireSyndication: acquireSyndication, dataPromise: null
      },
      {
        key: "blog8",
        url: 'http://blogs.windows.com/windows/b/windowshomeserver/atom.aspx',
        title: 'tbd', updated: 'tbd',
        acquireSyndication: acquireSyndication, dataPromise: null
      },
      {
        key: "blog9",
        url: 'http://blogs.windows.com/windows_live/b/developer/atom.aspx',
        title: 'tbd', updated: 'tbd',
        acquireSyndication: acquireSyndication, dataPromise: null
      },
      {
        key: "blog10",
        url: 'http://blogs.windows.com/ie/b/ie/atom.aspx',
        title: 'tbd', updated: 'tbd',
        acquireSyndication: acquireSyndication, dataPromise: null
      },
      {
        key: "blog11",
        url: 'http://blogs.windows.com/windows_phone/b/wpdev/atom.aspx',
        title: 'tbd', updated: 'tbd',
        acquireSyndication: acquireSyndication, dataPromise: null
      },
      {
        key: "blog12",
        url: 'http://blogs.windows.com/windows_phone/b/wmdev/atom.aspx',
        title: 'tbd', updated: 'tbd',
        acquireSyndication: acquireSyndication, dataPromise: null
      }];

    blogs.forEach(function (feed) {
      feed.dataPromise = feed.acquireSyndication(feed.url);
      dataPromises.push(feed.dataPromise);
    });

    return WinJS.Promise.join(dataPromises).then(function() {
      return blogs;
    });
  }

  function acquireSyndication( url ) {
    return WinJS.xhr({
      url: url,
      headers: { "If-Modified-Since": "Mon, 27 Mar 1972 00:00:00 GMT" }
    });
  }

  function getBlogPosts() {
    getFeeds().then(function(){

      blogs.forEach(function(feed){
        feed.dataPromise.then(function(articlesResponse){
          var articleSyndication = articlesResponse.responseXML;

          if (articleSyndication) {
            feed.title = articleSyndication.querySelector("feed > title").textContent;
            var published = articleSyndication.querySelector("feed > enty > published").textContent;
            var date = new Date(published);
            var dateFmt = new Windows.Globalization.DateTimeFormatting.DateTimeFormatter(
                "month.abbreviated day year.full"
              );
            var blogDate = dateFmt.format(date);
            feed.updated = "Last updated" + blogDate;

            getItemsFromXml(articleSyndication, blogPosts, feed);
          } else {
            feed.title = "Error loading blog";
            feed.updated = "Error";
            blogPosts.push({
              group: feed,
              key: "Error loading blog",
              title: feed.url,
              author: "Unlnown",
              month: "?",
              day: "?",
              year: "?",
              content: "Unable to load the blog at " + feed.url
            });
          }
        });
      });
    });

    return blogPosts;
  }

  function getItemsFromXml(articleSysndication, bPosts, feed) {
    var posts = articleSysndication.querySelectorAll("entry");

    for(var postIndex = 0; postIndex < posts.length; postIndex++) {
      var post = posts[postIndex];

      var postTitle = post.querySelector("title").textContent;
      var postAuthor = post.querySelector("author > name").textContent;
      var postPublished = post.querySelector("published").textContent;

      var postDate = new Date(postPublished);
      var monthFmt = new Windows.Globalization.DateTimeFormatting.DateTimeFormatter("month.abbreviated");
      var dayFmt = new Windows.Globalization.DateTimeFormatting.DateTimeFormatter("day");
      var yearFmt = new Windows.Globalization.DateTimeFormatting.DateTimeFormatter("year.full");
      var blogPostMonth = monthFmt.format(postDate);
      var blogPostDay = dayFmt.format(postDate);
      var blogPostYear = yearFmt.format(postDate);

      var staticContent = toStaticHTML(post.querySelector("content").textContent);

      bPosts.push({
        group: feed,
        key: feed.title,
        title: postTitle,
        author: postAuthor,
        month: blogPostMonth.toUpperCase(),
        day: blogPostDay,
        year: blogPostDay,
        content: staticContet
      });
    }
  }

  var groupedItems = list.createGrouped(
      function groupKeySelector( item ) { return item.group.key; },
      function groupDataSelector( item ) { return item.group; }
  );

  WinJS.Namespace.define( "Data", {
    items: groupedItems,
    groups: groupedItems.groups,
    getItemReference: getItemReference,
    getItemsFromGroup: getItemsFromGroup,
    resolveGroupReference: resolveGroupReference,
    resolveItemReference: resolveItemReference
  } );

  // 項目の参照を取得します。グループ キーと項目のタイトルを
  // 簡単にシリアル化できる、項目への一意の参照として使用します。
  function getItemReference( item ) {
    return [item.group.key, item.title];
  }

  // この関数は、指定されたグループに属する項目のみが格納された
  // WinJS.Binding.List を返します。
  function getItemsFromGroup( group ) {
    return list.createFiltered( function ( item ) { return item.group.key === group.key; } );
  }

  // 指定されたグループ キーに対応する一意のグループを取得します。
  function resolveGroupReference( key ) {
    for ( var i = 0; i < groupedItems.groups.length; i++ ) {
      if ( groupedItems.groups.getAt( i ).key === key ) {
        return groupedItems.groups.getAt( i );
      }
    }
  }

  // 指定された文字列配列から一意の項目を取得します。項目には
  // グループ キーと項目のタイトルが含まれます。
  function resolveItemReference( reference ) {
    for ( var i = 0; i < groupedItems.length; i++ ) {
      var item = groupedItems.getAt( i );
      if ( item.group.key === reference[0] && item.title === reference[1] ) {
        return item;
      }
    }
  }

  // アプリケーションのデータ リストに追加できるサンプル データの配列を
  // 返します。 
  function generateSampleData() {
    // TODO: not implement
  }
} )();
