/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
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

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/assets/favicons/android-chrome-192x192.png","9d16d05af59c27a677890166c4f0c16a"],["/assets/favicons/android-chrome-512x512.png","4eca12492fcc012b09dd766a823763fa"],["/assets/favicons/apple-touch-icon.png","138350967e4bb7a784596cffdc3e1734"],["/assets/favicons/favicon-16x16.png","72840c43f64bfc844ba032e4f48bfc06"],["/assets/favicons/favicon-32x32.png","1ae0434a66b89919af5a5cf873455344"],["/assets/favicons/mstile-144x144.png","d65181a1e3d52ad2f3dcf473cdd6052f"],["/assets/favicons/mstile-150x150.png","de6c940012a027955343925b248a3864"],["/assets/favicons/mstile-310x150.png","980aa3055e2eca806fe9c116a519027f"],["/assets/favicons/mstile-310x310.png","b7edcf31778bbf229c4430ef8c070602"],["/assets/favicons/mstile-70x70.png","b9ea9d82642651708180ed5515af924e"],["/assets/favicons/safari-pinned-tab.svg","50f97bcf196ea0218873bfaba9d6a87a"],["/assets/fonts/lato/black.eot","d2d9ddbd08ae0ade29cebca9330a05fc"],["/assets/fonts/lato/black.ttf","a54bddbc1689d05277d2127f58589917"],["/assets/fonts/lato/black.woff","f80bda6afd19534368443a3d0323a140"],["/assets/fonts/lato/black.woff2","33d5f0d956f3fc30bc51f81047a2c47d"],["/assets/fonts/lato/blackItalic.eot","a8642cee117dd62f5e48b1ff0f7db272"],["/assets/fonts/lato/blackItalic.ttf","4c66fb2b46d728c2e8d73dff1ea22172"],["/assets/fonts/lato/blackItalic.woff","798eafdd87dc8f3174f76164f0685e02"],["/assets/fonts/lato/blackItalic.woff2","0f4fa9755f480e75463e74b3dce5a3ee"],["/assets/fonts/lato/bold.eot","a2fb219c999a8fa6b95ad7c24890072e"],["/assets/fonts/lato/bold.ttf","5b1b8b856d7a8cb1cb0bae6d0573f2e9"],["/assets/fonts/lato/bold.woff","d878b6c29b10beca227e9eef4246111b"],["/assets/fonts/lato/bold.woff2","cccb897485813c7c256901dbca54ecf2"],["/assets/fonts/lato/boldItalic.eot","7b48d663230528ecb6dbf730251bbe44"],["/assets/fonts/lato/boldItalic.ttf","71e8fd8ecaf5b352d6bee317985c2ee8"],["/assets/fonts/lato/boldItalic.woff","9c7e4e9eb485b4a121c760e61bc3707c"],["/assets/fonts/lato/boldItalic.woff2","0b6bb6725576b072c5d0b02ecdd1900d"],["/assets/fonts/lato/italic.eot","0acac3839ae2c89cf8b553c29943fceb"],["/assets/fonts/lato/italic.ttf","4ffc48d0549568bb624b9ef9c1cf2626"],["/assets/fonts/lato/italic.woff","f28f2d6482446544ef1ea1ccc6dd5892"],["/assets/fonts/lato/italic.woff2","4eb103b4d12be57cb1d040ed5e162e9d"],["/assets/fonts/lato/regular.eot","8ab18d934cfa1e51dc8273cd8585387e"],["/assets/fonts/lato/regular.ttf","6d4e78225df0cfd5fe1bf3e8547fefe4"],["/assets/fonts/lato/regular.woff","27bd77b9162d388cb8d4c4217c7c5e2a"],["/assets/fonts/lato/regular.woff2","bd03a2cc277bbbc338d464e679fe9942"],["/assets/images/content/projects/bublik.jpg","90fe243ec1a2ade64f57b79b0c408e2a"],["/assets/images/content/projects/bublik@2x.jpg","426eaf1f6dde7dfa2b83393752cea6db"],["/assets/images/content/projects/findout.jpg","ec70dece846d839be56c96808ccbfa0b"],["/assets/images/content/projects/findout@2x.jpg","5f5454c17d5373582fb3e0895770cd2e"],["/assets/images/content/projects/kwiki.jpg","621d1234a7a017e4aa4bb584b2e5bf08"],["/assets/images/content/projects/kwiki@2x.jpg","ec810ef0d36f9a21db9d9806b0f6a41e"],["/assets/images/content/projects/kwiki_mobile.jpg","5ac2a3bf45736958532ded8b39483376"],["/assets/images/content/projects/kwiki_mobile@2x.jpg","d248c159873746eef3e401b0b93ed62b"],["/assets/images/content/projects/megacom.jpg","14c8d91564a2778f5d9731e392682cce"],["/assets/images/content/projects/megacom@2x.jpg","ca6c6657f3ec7a3703ebb72c51ce7a23"],["/assets/images/content/projects/projct.jpg","a343a05a6fb3a9df192f82159cdb713d"],["/assets/images/content/projects/projct@2x.jpg","34ac8ea181471865a5c0f76e328b500d"],["/assets/images/content/projects/projct_mobile.jpg","3b35f2c698e5a4eb37578aea727ffa66"],["/assets/images/content/projects/projct_mobile@2x.jpg","1d7c757529ef477096d82c908769143e"],["/assets/images/content/projects/promzona.jpg","db101e6bafae3b756724f9bfbeebedbb"],["/assets/images/content/projects/promzona@2x.jpg","228406713c9b1db6809195024553a29b"],["/assets/images/content/projects/unodc.jpg","e834a3c8a0f2f1cbe76b3832beb72c3d"],["/assets/images/content/projects/unodc@2x.jpg","8cff12f5cbcd1da42517a696a95b603c"],["/assets/images/footer__cubes@2x.png","2c77b7b135864a258a877283478032ad"],["/assets/images/form__captcha.png","886a122a8853e69d5d73de480c1fc502"],["/assets/images/get-portfolio-section__cube-small@2x.png","4112dd56c814a4fafa54f76bfe1fa668"],["/assets/images/get-portfolio-section__cube@2x.png","b733ae8506dadde03b3ecc927992c472"],["/assets/images/get-portfolio-section__tip.svg","9fdfb14925128add4ffe2bdbe8b8cfbb"],["/assets/images/hero-section__land.png","034c4023b63922461819fc915700f6a8"],["/assets/images/hero-section__land@2x.png","f9a6a94ff18a11a0845eccb1fc1200ad"],["/assets/images/how-we-do__bulb.png","e8e4bb71de426442242b9fe5998c1969"],["/assets/images/how-we-do__bulb@2x.png","3b6c49a149f7392210dd9bfd920e808c"],["/assets/images/how-we-do__diamond.png","b6cea40f47140813882e1ab5ab1fb1ea"],["/assets/images/how-we-do__diamond@2x.png","a6b022790f8871524781a63044828186"],["/assets/images/how-we-do__point.svg","de50bf7feecca8edc275e41051e36a3d"],["/assets/images/how-we-do__user.png","81f4e4828fb5d74b505f55d92aae6d78"],["/assets/images/how-we-do__user@2x.png","c8d0165a047efc1d66b8d65036df9207"],["/assets/images/icons.svg","9121a984e8e9bdf9b9d46e65c2f7587a"],["/assets/images/input__eye_close.svg","ac7f6d715a1a41c82e8e980a7397e141"],["/assets/images/input__eye_open.svg","e953a00498da7048eeccafb2c17db1f2"],["/assets/images/logo.svg","9d66c8d03df1f595cbf0d0efff32b799"],["/assets/images/section__big-cube.png","b8a203f62aab4a6445250e28818f026d"],["/assets/images/section__big-cube@2x.png","c838c34f0be2fc3ee76d06489fd01abe"],["/assets/images/section__cubes-projects.png","a391a1dda672f5ff3d16b9a55f79f069"],["/assets/images/section__cubes-projects@2x.png","c83e677c6613392da0443a03b14016ed"],["/assets/images/section__small-cube.png","d07274cc64480d294a0e18d26c464d3d"],["/assets/images/section__small-cube@2x.png","06a4b11210ed39514d71b798dd009a00"],["/assets/images/social__mail.svg","b9347b976d876888d7f203739e7042f9"],["/assets/images/social__skype.svg","032af6d25e4d22f97ac6970d894afc5f"],["/assets/images/social__telegram.svg","3352562b8cd23fb13af0b1c1e4443ad3"],["/assets/images/social__whatsapp.svg","cbcd5cc82133d0e44d108bb1281a402f"],["/assets/images/sprite.png","9245dbeea1e9941cee7a779d2af3ab8c"],["/assets/images/sprite@2x.png","c2f1670ffb0ef944d25ac46a95e0890b"],["/assets/images/tech-list__android.svg","1220e45a44d029068be44867945ad677"],["/assets/images/tech-list__aws-ec2.svg","3ee915e7164ea62214bb57a72b712d00"],["/assets/images/tech-list__aws-ecs.svg","40fc2469716695007fea0adce8bba2b8"],["/assets/images/tech-list__aws-s3.svg","0db9a4079aa7f5426ec9dff0c4a50d46"],["/assets/images/tech-list__aws-sns.svg","d714071570891aadb83447de5e19115d"],["/assets/images/tech-list__aws.svg","6ea1a265db3693d186576e0dd5babb51"],["/assets/images/tech-list__backbone.svg","76467abacb4453057b9c3b685ca6360e"],["/assets/images/tech-list__calabash.svg","b003648a868ecee6c05f10d5b708864c"],["/assets/images/tech-list__capistrano.svg","ce96a9c2c7e79496e002985f059522b9"],["/assets/images/tech-list__capybara.svg","877a22094fbf563731cbec74b140d352"],["/assets/images/tech-list__cloud-computing.svg","31feb6331dc04552c611700dac0f2abf"],["/assets/images/tech-list__cucumber.svg","e161efebaa6b77be5392b4387a741d1a"],["/assets/images/tech-list__digital-ocean.svg","953cae1982a43a1c0a0df5b7647d1da6"],["/assets/images/tech-list__docker.svg","79f704ef063beb08fc3ec9bac6244f22"],["/assets/images/tech-list__elastic-search.svg","b824ebe15b99b7ced036a723fb48de3a"],["/assets/images/tech-list__html.svg","8de0519d92a61e76f4fb9dfc82787404"],["/assets/images/tech-list__jenkins.svg","e168e0ebbc374c87beaf5bb96e9b9db0"],["/assets/images/tech-list__js.svg","9344349412a7ea79c2756d16baf28e3e"],["/assets/images/tech-list__kotlin.svg","aa665d8d62ba3b55d1ddc78877a310a3"],["/assets/images/tech-list__marionette.svg","bdfa813174a163e9042d8ed66d952fd3"],["/assets/images/tech-list__meteor.svg","d92774363c64b065bad4d3c9595efa26"],["/assets/images/tech-list__mongo-db.svg","9b2e80634eec08f9c09959241e7522af"],["/assets/images/tech-list__nginx.svg","8f1a886a4b6ac9c7ba802187b4dbec00"],["/assets/images/tech-list__node-js.svg","77e2b834186103c930a28a6b9e8d1602"],["/assets/images/tech-list__obj-c.svg","e7efdfaacfc804446fa88a823f11d27c"],["/assets/images/tech-list__postgre-sql.svg","fdb93825d68f8d2a0d05c583ef9b6208"],["/assets/images/tech-list__react.svg","5d4d13687450891e76cdfe4e34047f5c"],["/assets/images/tech-list__redis.svg","d2ed3a17e2ebd32ed638e9b45b6193cc"],["/assets/images/tech-list__rspec.svg","3f1bdbc45d59430ab92ad4de3e94af5c"],["/assets/images/tech-list__ruby.svg","3af142790afe75657e351e3cf1510028"],["/assets/images/tech-list__rubyonrails.svg","aa330f9e5e1c4476e5d13b50d8414003"],["/assets/images/tech-list__rxswift.svg","7bb30897264e93c7b6e7e8a8c55ca8a9"],["/assets/images/tech-list__selenium.svg","fa986085c3a28772320d474ce5ebee12"],["/assets/images/tech-list__sidekiq.svg","65f0f95b238b89792303856c292f683a"],["/assets/images/tech-list__stylus.svg","e0f6ab554e66d549ed823f424fde51b9"],["/assets/images/tech-list__swift.svg","0152fb26e0070d5baec54284ab29a243"],["/assets/javascripts/main.js","ff09bea19c8be99fd9a5d5b4b1b8e421"],["/assets/javascripts/vendor.js","04fd3e7082ab596341c79d0cad59eab0"],["/assets/stylesheets/main.css","c43512f813726840e878129e8fffbaf1"],["/assets/stylesheets/reset.css","dd2adcb8277779bb0360eac5328e1b26"],["/en/index.html","3e97573eb053df9f4f97c736fd86e612"],["/en/thx.html","12ed2969c178f45a84a7fc19951facb9"],["/index.html","e68dd23128350503f1a006ba14bc2f0d"],["/ru/index.html","a055b3221d1eff2bf485494d7ab0b0c2"],["/ru/thx.html","c00bc54ee920fcb90d8a5090bc8bf7a6"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







