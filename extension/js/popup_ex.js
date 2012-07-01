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
