// ==UserScript==
// @include http://webos-goodies.jp/misc/operatomobile.html*
// ==/UserScript==

/*
 * Copyright 2012 Chihiro Ito. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

if (document.location.href.indexOf('http://webos-goodies.jp/misc/operatomobile.html') == 0) {

  opera.extension.postMessage({
    type: 'authorized',
    data: window.location.href
  });

  window.close();

}
