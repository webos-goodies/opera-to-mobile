opera.extension.onmessage = function(e) {
  var data = e.data;
  console.log('onmessage: ' + data.type);
  switch(data.type) {
  case 'invoke':
    onInvoke(e);
    break;
  }
};

function onInvoke(e) {
  var f = window[e.data.name];
  if(typeof f == 'function') {
    f.apply(null, e.data.args);
  }
}

function initPopup() {
  var tab = opera.extension.bgProcess.opera.extension.tabs.getSelected();
  if(tab.url && /^(?:https?|ftp):/.test(tab.url)) {
    initChrome2Device();
  } else {
    $("#welcomeHeaderDiv").removeClass("hidden");
    $("#welcomeHeaderDiv").html('Only http(s): or ftp: can be sent.');
  }
}
