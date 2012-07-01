var url = document.location.href;

if (url.match(/^http[s]?:\/\/maps\.google\./) ||
    url.match(/^http[s]?:\/\/www\.google\.[a-z]{2,3}(\.[a-z]{2})\/maps/)) {

  opera.extension.onmessage = function(e) {
    console.log('onmessage: ' + e.data.type);
    switch(e.data.type) {
    case 'retrieveUrl':
      retrieveUrl(e);
      break;
    }
  };

  function retrieveUrl(e) {
    var data = {
      type:'replyUrl',
      url: url,
      originalUrl: url,
      title: document.title
    };

    // Google Maps URL override
    var link = document.getElementById('link');
    if (link && link.href) {
      console.log('permalink: ' + link.href);
      data.url = link.href;
    }

    e.source.postMessage(data);
  };
}
