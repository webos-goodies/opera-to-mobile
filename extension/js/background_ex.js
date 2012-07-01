// Copyright (c) 2012 By Chihiro Ito. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var popupPort = null;
var popupView = {
  closed:true,
  getTabId:function() { return 'dummy'; },
  showMessage:function(msg) { invokePopup('showMessage', [msg]); },
  showSubmitErrorMessage:function() { invokePopup('showSubmitErrorMessage'); },
  setTimeout:function() {}
};

function invokePopup(name, args) {
  if(popupPort) {
    args = args || [];
    console.log('invoke ' + name + '(' + args + ') on the popup context.');
    popupPort.postMessage({type:'invoke', name:name, args:args});
  }
};

opera.extension.onconnect = function(e) {
  if(e.origin.indexOf("popup.html") > -1 && e.origin.indexOf('widget://') == 0){
    console.log('Popup is connected.');
    popupPort        = e.source;
    popupView.closed = false;
  }
};

opera.extension.ondisconnect = function(e) {
  if(e.origin.indexOf("popup.html") > -1 && e.origin.indexOf('widget://') == 0){
    console.log('Popup is disconnected.');
    popupPort        = null;
    popupView.closed = true;
  }
};

opera.extension.onmessage = function(e) {
  var data = e.data;
  console.log('onmessage: ' + data.type);
  switch(data.type) {
  case 'authorized':
    onAuthorized(e);
    break;

  case 'retrieveUrl':
    onRetrieveUrl(e);
    break;

  case 'replyUrl':
    onReplyUrl(e);
    break;
  }
};

function onAuthorized(e) {
  var url = e.data.data;
  var adapterName = OAuth2.lookupAdapterName(url.substring(0, url.indexOf('?')));
  var finisher = new OAuth2(adapterName, { authorized_url:url });
  window.setTimeout(function(){invokePopup('oauth-callback');}, 1000);
}

function onRetrieveUrl(e) {
  opera.extension.tabs.getSelected().postMessage(e.data);
};

function onReplyUrl(e) {
  var data = {
    url: e.data.url,
    title: e.data.title
  };
  window.setTimeout(function(){invokePopup('dataReady', [data]);}, 1000);
};
