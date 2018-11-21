/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/lib/poke_royale.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./public/lib/board.js":
/*!*****************************!*\
  !*** ./public/lib/board.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player_pokemon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player_pokemon */ "./public/lib/player_pokemon.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ "./public/lib/ui.js");
/* harmony import */ var _spawn_sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./spawn_sidebar */ "./public/lib/spawn_sidebar.js");
const Util = __webpack_require__(/*! ./util */ "./public/lib/util.js");




class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.offsetX = 0;
    this.offsetY = 0;
    this.enemyPokemon = [];
    this.playerPokemon = [];
    this.selectorRectangle = null;
    this.previousLeftMouseClick = [];
    this.spawnSidebar = new _spawn_sidebar__WEBPACK_IMPORTED_MODULE_2__["default"](Board.SPAWN_SIDEBAR_COORDS);
  }

  add(object) {
    if (object instanceof _player_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      this.playerPokemon.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  addPlayerPokemon(pos) {
    const playerPokemon = new _player_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"]({
      pos: pos || this.randomPosition(),
    });

    this.add(playerPokemon);
    return playerPokemon;
  }

  randomPosition() {
    return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];
  }

  allObjects() {
    if (this.selectorRectangle) {
      return [].concat(this.playerPokemon, this.enemyPokemon, [
        this.selectorRectangle
      ]);
    } else {
      return [].concat(this.playerPokemon, this.enemyPokemon);
    }
  }

  allPokemon() {
    return [].concat(this.playerPokemon, this.enemyPokemon);
  }




  moveObjects(timeDelta) {
    // Handle collisions
    Util.pairs(this.allPokemon()).filter(pair => 
      pair[0].isCollidedWith(pair[1])).
      forEach(collisionPair => {
        collisionPair[0].handleCollisionWith(collisionPair[1]);
        collisionPair[1].handleCollisionWith(collisionPair[0]);
        // let firstObj = collisionPair[0];
        // let secondObj = collisionPair[1];
        // if (firstObj.isMoving() && secondObj.isMoving()){
        //   console.log('collision!')
        //   let firstNewLocation = [firstObj.pos[0] - (2*firstObj.vel[0]), firstObj.pos[1] - (2*firstObj.vel[1])];
        //   let secondNewLocation = [secondObj.pos[0] - (2*secondObj.vel[0]), secondObj.pos[1] - (2*secondObj.vel[1])];
        //   firstObj.moveTo(firstNewLocation);
        //   secondObj.moveTo(secondNewLocation);
        // }
    });



    this.allPokemon().forEach(object => {
      if (object instanceof _player_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        object.move(timeDelta);
      }
    });
  }
  // TODO: integrate timeDelta (?) - this hasn't been needed thus far
  step(timeDelta) {
    this.moveObjects(timeDelta);
    this.checkDestinations();
    // this.checkCollisions();
  }

  checkDestinations() {
    this.allPokemon()
      .filter(obj => obj.destination)
      .forEach(obj => {
        if (Util.dist(obj.pos, obj.destination) <= 15) { //TODO: Check hardcoding of this 15
          obj.vel = [0, 0];
        }
      });
  }

  pokemonClicked(pokemon, clickPos) {
    if (Util.dist(pokemon.pos, clickPos) <= pokemon.radius + 3) {
      return true;
    } else {
      return false;
    }
  }

  // handleMouseClick(e) {
  //     e.preventDefault();
  //     if(e.button == 0) {
  //         this.handleLeftMouseClick(e)
  //     }
  //     if(e.button == 1) {
  //         // middle-mouse
  //     }
  //     if(e.button == 2) {
  //         this.handleLeftMouseClick(e)
  //     }

  // }
  selectOnePokemon(selectedPoke) {
    selectedPoke.selected = true;
    this.playerPokemon.forEach(poke => {
      if (poke != selectedPoke) {
        poke.selected = false;
      }
    });
    return selectedPoke;
  }
  // TODO: refactor this function with the above
  dragOnePokemon(draggedPoke) {
    draggedPoke.isDragging = true;
    this.spawnSidebar.pokemon.forEach(poke => {
      if (poke != draggedPoke) {
        poke.isDragging = false;
      }
    });
    return draggedPoke;
  }

  selectOnlyThesePokemon(selectedPokes) {
    selectedPokes.forEach(poke => {
      poke.selected = true;
    });

    this.playerPokemon.forEach(poke => {
      if (!selectedPokes.includes(poke)) {
        poke.selected = false;
      }
    });
    return selectedPokes;
  }

  handleLeftMouseClick(e) {
    this.previousLeftMouseClick = [e.x, e.y];
    this.playerPokemon.forEach(poke => {
      if (this.pokemonClicked(poke, [e.x, e.y])) {
        this.selectOnePokemon(poke);
      }
    });
    this.spawnSidebar.pokemon.forEach(poke => {
      if (this.pokemonClicked(poke, [e.x, e.y])) {
        // poke.isDragging = true;
        this.dragOnePokemon(poke);
        // this.selectorRectangle = null;
      }
    });
  }

  handleRightMouseClick(e) {
    // debugger
    e.preventDefault();
    let didDeselect = false;
    this.playerPokemon.forEach(poke => {
      if (this.pokemonClicked(poke, [e.x, e.y])) {
        poke.selected = false;
        didDeselect = true;
      }
    });
    if (!didDeselect) {
      this.playerPokemon.forEach(poke => {
        if (poke.selected) {
          poke.setMotionAndDestination([e.x, e.y]);
        }
      });
    }
  }

  handleMouseDownAndMouseMove(e) {
    if (!this.pokeBeingDragged()) {
      if (!this.selectorRectangle) {
        this.selectorRectangle = new _ui__WEBPACK_IMPORTED_MODULE_1__["SelectorRectangle"](
          this.previousLeftMouseClick,
          [e.x, e.y]
        );
      } else {
        // console.log([e.x, e.y]);
        this.selectorRectangle.updateRect([e.x, e.y]);
      }
    } else {
      this.spawnSidebar.updateDraggedPoke([e.x, e.y]);
    }
  }

  createPokemonFromSidebarPokemon(droppedPoke){
    // let id = droppedPoke.imgId;
    // axios.get(`/sprites/${id}`)
    //   .then((response) => {
    //     console.log(response);
    //     debugger;
    //     let newPoke = new PlayerPokemon({
    //       pos: droppedPoke.pos,
    //       imgSrc: response.imgSrc,
    //       imgId: droppedPoke.imgId
    //     });
    //     this.playerPokemon.push(newPoke);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    let newPoke = new _player_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"]({
      pos: droppedPoke.pos,
      imgSrc: `https://sprites.pokecheck.org/i/${droppedPoke.imgId}.gif`,
      imgId: droppedPoke.imgId
    });
    // debugger
    this.playerPokemon.push(newPoke);
    
  }

  handleMouseUp(e) {
    let droppedPoke = this.pokeBeingDragged();
    if (droppedPoke) {
      this.createPokemonFromSidebarPokemon(droppedPoke);
      this.spawnSidebar.resetAll();
    } else {
      this.groupSelect();
      this.selectorRectangle = null;
    }
  }

  pokeBeingDragged() {
    return this.spawnSidebar.pokemon.filter(poke => poke.isDragging)[0];
  }

  groupSelect() {
    if (!this.selectorRectangle) return;
    // debugger
    this.selectOnlyThesePokemon(
      this.playerPokemon.filter(poke =>
        this.selectorRectangle.inSelectRectangle(poke.pos)
      )
    );
  }

  setOffsets(offsetX, offsetY) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.spawnSidebar.translationOffset(offsetX, offsetY);
  }

  draw(ctx) {
    ctx.clearRect(this.offsetX, this.offsetY, 5000, 5000);
    // ctx.restore();
    ctx.fillStyle = Board.BG_COLOR;
    ctx.fillRect(this.offsetX, this.offsetY, 5000, 5000);

    // Order by lowest y location. Pokemon lower on the canvas are in front and thus drawn last
    this.allPokemon().sort((poke1, poke2) => (poke1.pos[1] + poke1.radius) - (poke2.pos[1] + poke2.radius)).forEach( poke => {
      poke.draw(ctx);
    });
    if (this.selectorRectangle) { this.selectorRectangle.draw(ctx); }


    // this.allObjects().forEach(object => {
    //   // console.log('draw object:' + object)
    //   if (object instanceof PlayerPokemon) {
    //     // console.log(object.selected)
    //   }
    //   object.draw(ctx);
    // });
    this.spawnSidebar.draw(ctx);
  }

  start() {
    this.lastTime = 0;
    // start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.step(timeDelta);
    this.draw(this.ctx);
    this.lastTime = time;

    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

Board.BG_COLOR = "#28ba32";
Board.DIM_X = 2000;
Board.DIM_Y = 1000;
Board.SPAWN_SIDEBAR_COORDS = [Board.DIM_X - 200 , 50];
Board.FPS = 32;
Board.MOVES = {
    w: [0, 2],
    a: [2, 0],
    s: [0, -2],
    d: [-2, 0],
    up: [0, 2],
    left: [2, 0],
    down: [0, -2],
    right: [-2, 0],
};

/* harmony default export */ __webpack_exports__["default"] = (Board);


// class GameView {
//   constructor(game, ctx) {
//     this.ctx = ctx;
//     this.game = game;
//     this.player_pokemon = this.game.addPlayerPokemon();
//   }



//   start() {
//     this.lastTime = 0;
//     // start the animation
//     requestAnimationFrame(this.animate.bind(this));
//   }

//   animate(time) {
//     const timeDelta = time - this.lastTime;

//     this.game.step(timeDelta);
//     this.game.draw(this.ctx);
//     this.lastTime = time;

//     // every call to animate requests causes another call to animate
//     requestAnimationFrame(this.animate.bind(this));
//   }
// }

// GameView.MOVES = {
//   w: [0, -1],
//   a: [-1, 0],
//   s: [0, 1],
//   d: [1, 0],
// };

// module.exports = GameView;

/***/ }),

/***/ "./public/lib/player_pokemon.js":
/*!**************************************!*\
  !*** ./public/lib/player_pokemon.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pokemon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pokemon */ "./public/lib/pokemon.js");

const Util = __webpack_require__(/*! ./util */ "./public/lib/util.js");

class PlayerPokemon extends _pokemon__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(options) {
    options.radius = PlayerPokemon.RADIUS;
    options.vel = [0, 0];
    options.color = options.color || Util.randomColor();
    let id = options.imgId;
    if(id.length === 1) { id = '00' + id}
    if (id.length === 2) { id = '0' + id }
    options.imgSrc = options.imgSrc.replace(options.imgId, id);
    options.imgId = id;

    super(options);
    this.selected = options.selected || false;
  }

  relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }
}

PlayerPokemon.RADIUS = 15;
/* harmony default export */ __webpack_exports__["default"] = (PlayerPokemon);


/***/ }),

/***/ "./public/lib/poke_royale.js":
/*!***********************************!*\
  !*** ./public/lib/poke_royale.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./public/lib/board.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ "./public/lib/ui.js");
// const MovingObject = require("./moving_object.js");
// const Util = require("./util.js");
// const Game = require("./game.js");
// window.Game = Game;
// window.MovingObject = MovingObject;
// window.ctx = document.getElementById("game-canvas").getContext("2d");

// console.log("Webpack is working!");
// console.log("test!");

// function PokeRoyale(options) {
//   PokeRoyale.prototype.COLOR = 'pink';
//   PokeRoyale.prototype.RADIUS = 69; 
//   MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: Util.randomVec(this.RADIUS)});
//   // const mo = new MovingObject({color: this.COLOR, radius: this.RADIUS, vel: Util.randomVec(this.RADIUS)});
// }
// // Asteroid.prototype.COLOR = 'pink';
// // Asteroid.prototype.RADIUS = 69; 

// Util.inherits(Asteroid, MovingObject);
// window.PokeRoyale = PokeRoyale;





document.addEventListener("DOMContentLoaded", () => {

  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 5000;
  canvasEl.height = 5000;

  const ctx = canvasEl.getContext("2d");

  ctx.translate(0,0)
  const board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);
  board.start();

  // TODO: Needs to be deleted later as User chooses either fire/water/grass at start
  // board.addPlayerPokemon([100,100]);
  // board.addPlayerPokemon([200,200]);

  canvasEl.offsetX = 0;
  canvasEl.offsetY = 0;
  function EventWrapper(e, canvas) {
    this.x = e.x + canvas.offsetX || e.x;
    this.y = e.y + canvas.offsetY || e.y;
    this.preventDefault = e.preventDefault.bind(e);
    // console.log("offsetX " + canvas.offsetX);
    // console.log("offsetY " + canvas.offsetY);
  }

  canvasEl.addEventListener("mousedown", function(e){
    let wrapper = new EventWrapper(e, this)
    board.handleLeftMouseClick.bind(board)(wrapper);
    this.onmousemove = function (e) {
      let wrapper = new EventWrapper(e, this);
      // console.log('x: ' + wrapper.x);
      // console.log(("y: " + wrapper.x));
      board.handleMouseDownAndMouseMove.bind(board)(wrapper);
     }
    // this.addEventListener("mousemove", board.handleMouseDownAndMouseMove.bind(board));
  });
  canvasEl.addEventListener("mouseup", function(e){
    let wrapper = new EventWrapper(e, this);
    board.handleMouseUp.bind(board)(wrapper);
    this.onmousemove = null;
    // this.removeEventListener("mousemove", board.handleMouseDownAndMouseMove);
  });
  canvasEl.addEventListener('click', function(e){
    let wrapper = new EventWrapper(e, this);
    this.onmousemove = null;
    board.handleLeftMouseClick.bind(board)(wrapper);},
    false);
  canvasEl.addEventListener('contextmenu', function(e){
    let wrapper = new EventWrapper(e, this);
    this.onmousemove = null;
    board.handleRightMouseClick.bind(board)(wrapper);
  }, false);

  // canvasEl.addEventListener("mouseover", function(e){
  //   console.log(e);
  // }, false);

  // TODO use 4 rectangles as a border around viewport and mouseover on each
  canvasEl.addEventListener("mousemove", function(e) {
      if (e.x >= canvasEl.width - 5) {
        this.offsetX += e.x + 5 - canvasEl.width;
        ctx.translate(-(e.x + 5 - canvasEl.width), 0);
      }
      // if (e.x > canvasEl.length) {
      //   ctx.translate(e.x - canvasEl.width)
      // }
      // if (e.y < 0) {
      //   ctx.translate(e.x - canvasEl.width);
      // }
      // if (e.y > canvasEl.height) {
      //   ctx.translate(e.x - canvasEl.width)
      // }
    }, false);
  Object.keys(_board__WEBPACK_IMPORTED_MODULE_0__["default"].MOVES).forEach(function(k) {
    key(k, () => { 
      const dirX = _board__WEBPACK_IMPORTED_MODULE_0__["default"].MOVES[k][0];
      const dirY = _board__WEBPACK_IMPORTED_MODULE_0__["default"].MOVES[k][1];
      this.offsetX -= dirX;
      this.offsetY -= dirY;
      // ctx.save();
      ctx.translate(dirX, dirY); 
      board.setOffsets(this.offsetX, this.offsetY);
    });
  }, canvasEl);


  

  window.ctx = ctx;
  window.UI = _ui__WEBPACK_IMPORTED_MODULE_1__;
});




/***/ }),

/***/ "./public/lib/pokemon.js":
/*!*******************************!*\
  !*** ./public/lib/pokemon.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const Stream = __webpack_require__(/*! ../vendor/stream */ "./public/vendor/stream.js");
const Util = __webpack_require__(/*! ./util */ "./public/lib/util.js");
const axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

class Pokemon {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.destination = options.destination;
    this.selected = options.selected;
    this.imgSrc = options.imgSrc;
    this.imgId = options.imgId;
    if (this.imgSrc && !this.spritesheetCanvas && this.imgSrc.slice(this.imgSrc.length - 3, this.imgSrc.length) === 'gif') {
      let img = document.createElement("img");
      img.src = this.imgSrc;
      img.id = this.imgId; 
      img.setAttribute("rel:animated_src", this.imgSrc);
      img.crossOrigin = "use-credentials";
      let div = document.getElementById("spritesheets");
      div.appendChild(img);

      let spriteUrl = encodeURIComponent(this.imgSrc);
      axios.get(`/sprites/${spriteUrl}`)
        .then((response) => {
          debugger
          console.log(response);
        })
        .catch(function (error) {
          debugger
          console.log(error);
        });
      debugger
      let superGif = new SuperGif({
        gif: document.getElementById(this.imgId),
        auto_play: false
      });
      const play = (res) => {
        debugger
        superGif.play();
        for (let i = 1; i < superGif.get_length(); i++) {
          let offset = { x: 0, y: i * superGif.get_canvas().height };
          superGif.set_frame_offset(i, offset);
        }
        superGif.set_sizes(superGif.get_canvas().width, superGif.get_length() * superGif.get_canvas().height);
        superGif.get_canvas().id = this.imgId;
        this.spritesheetCanvas = superGif.get_canvas();
        this.num_frames = superGif.get_length();
        this.height = this.spritesheetCanvas.height / this.num_frames;
        this.width = this.spritesheetCanvas.width;
        this.radius = this.width > this.height ? this.width / 2 : this.height / 2;
      }
      debugger
      superGif.load(play);
    }
    this.currentFrame = 0;   
    this.goingRound = false;
  }

  draw(ctx) {
    //TODO: delete if not needed
    if (false) { var h, img; } else if (false) {}

    if (this.spritesheetCanvas) {
      ctx.drawImage(this.spritesheetCanvas, 0, this.currentFrame * this.height, this.width, this.height,
         this.pos[0] - this.width / 2, this.pos[1] - this.height / 2, this.width, this.height);
      this.currentFrame = (this.currentFrame + 1) % this.num_frames;
    } else {
      let img = new Image();
      img.src = this.imgSrc;
      img.id = this.imgId;
      ctx.drawImage(img, this.pos[0] - this.width / 2, this.pos[1] - this.height / 2);
      img.onload = function(e) {
        this.width = e.target.width;
        this.height = e.target.height;
      }.bind(this)
    }


    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.stroke();
    // ctx.fillStyle = this.color;
    // ctx.fill();

    // if (this.width && this.height) { 
    //   ctx.rect(this.pos[0] - this.width / 2, this.pos[1] - this.height / 2, this.width, this.height); 
    //   ctx.stroke();
    // } else {
    //   ctx.beginPath();
    //   ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    //   ctx.stroke();
    //   ctx.fillStyle = this.color;
    //   ctx.fill();
    // }
  }

  aheadOf(otherObj) {
    return Math.abs(this.pos[0]) > Math.abs(otherObj.pos[0]) && Math.abs(this.pos[1]) > Math.abs(otherObj.pos[1]);
  }

  hasSameDestination(otherObject) {
    return this.destination[0] === otherObject.destination[0] && this.destination[1] === otherObject.destination[1];
  }
 
  isMoving() {
    return this.vel[0] != 0 || this.vel[1] != 0;
  }

  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    const oneBehindOther = this.pos[1] + this.radius < otherObject.pos[1] || otherObject.pos[1] + otherObject.radius < this.pos[1];
    return centerDist < (this.radius + otherObject.radius - 1) && !oneBehindOther;
  }

  handleCollisionWith(otherObject) {
    // otherVel = otherObject.vel;
    const awayFrom0 = otherObject.vel.filter(v => Math.abs(v) > 1).length === otherObject.vel.length &&
      this.vel.filter(v => Math.abs(v) > 1).length === this.vel.length;
    const pOtherV = otherObject.vel.map(v => (v) >= 0);
    const pV = this.vel.map(v => (v) >= 0);
    const allPos = pOtherV[0] && pOtherV[1] && pV[0] && pV[1];
    const allNeg = !pOtherV[0] && !pOtherV[1] && !pV[0] && !pV[1];
    const aheadWillBounce = awayFrom0 && ((!pOtherV[0] && pOtherV[1] && !pV[0] && pV[1]) || (pOtherV[0] && !pOtherV[1] && pV[0] && !pV[1]) || allNeg || allPos);
    const willGoRound = (pOtherV[0] && pOtherV[1] && !pV[0] && !pV[1]) ||
      (!pOtherV[0] && !pOtherV[1] && pV[0] && pV[1]) ||
      (pOtherV[0] && !pOtherV[1] && !pV[0] && pV[1]) ||
      (!pOtherV[0] && pOtherV[1] && pV[0] && !pV[1]); 
    const willBounce = (pOtherV.concat(pV).filter(p => p).length === 3 ||
      pOtherV.concat(pV).filter(p => p).length === 1)
    // 3 possible outcomes if both moving
    // 1) +y+x +y+x, -y-x -y-x, +y-x +y-x, -y+x -y+x = ahead one bounces forward, behind one destination updated if same destination
    // 2) +y+x -y-x, -y-x +y+x, +y-x -y+x, -y+x +y-x = teleport through each other
    // 3) +y+x +y-x, -y+x +y+x, +y-x +y+x, +y+x -y+x, -y-x -y+x, +y-x -y-x, -y+x -y-x, -y-x +y-x  = Bounce off normal, one furthest to destination has destination updated if same destination
    if (this.isMoving() && otherObject.isMoving()) {
      // console.log(this.goingRound);

      if (aheadWillBounce && !this.goingRound) {
        console.log("aheadWillBounce");
        // debugger
        if (this.aheadOf(otherObject)) {
          console.log("Ahead BOUNCE");
          // debugger
          // console.log(this.imgSrc + ": " + this.destination);
          // console.log(otherObject.destination);
          // console.log(this.imgSrc);
          this.move();
          this.move();
        } 
        // else if (this.hasSameDestination(otherObject)) {
        //   console.log("UPDATE DEST")
        //   this.destination = [this.destination[0] - (this.vel[0] * otherObject.radius * 2), this.destination[1] - (this.vel[1] * otherObject.radius * 2)]
        // }
      } else if (willGoRound && !this.goingRound) {
        console.log("willGoRound");
        const previousDestination = this.destination.slice();
        const leftSideOld = [
          otherObject.pos[0] - (otherObject.radius + this.radius),
          otherObject.pos[1]
        ];
        const rightSideOld = [
          otherObject.pos[0] + (otherObject.radius + this.radius),
          otherObject.pos[1]
        ];
        this.moveRound(otherObject)
      } else if (willBounce && !this.goingRound) {
        console.log("willBounce");
        console.log("this.vel: " + this.vel)
        console.log("otherObj.vel: " + otherObject.vel)
        // debugger
        const beforeDest = this.destination.slice();
        this.vel = Util.direction(otherObject.pos, this.pos);
        this.move();
        this.move();
        this.setMotionAndDestination(beforeDest);
        // this.destination = [this.destination[0] - this.vel[0] * otherObject.radius * 2, this.destination[1] - this.vel[1] * otherObject.radius * 2]
    }
    } else if (!this.goingRound && this.isMoving() && Util.dist(this.pos, this.destination) <= otherObject.radius + this.radius) {
      console.log("Early Arrival")
      this.destination = this.pos;
    } else if (this.isMoving()) {
      // TODO: A* Pathing
      // Go round if pokemon's feet is "inside" the colliding object
      if(!this.goingRound) {
        this.moveRound(otherObject);
      }
    } else {
      this.vel = Util.direction(otherObject.pos, this.pos);
      this.move();
      this.move();
      this.setMotionAndDestination(this.pos);
    }
  }

  moveRound(otherObject) {
    const previousDestination = this.destination.slice();
    let leftSide = Util.findThirdPointInRightTriangle(
      otherObject.pos,
      this.pos,
      // otherObject.radius > this.radius ? otherObject.radius : this.radius,
      otherObject.radius + this.radius,
      1
    );
    let rightSide = Util.findThirdPointInRightTriangle(
      otherObject.pos,
      this.pos,
      // otherObject.radius > this.radius ? otherObject.radius : this.radius,
      otherObject.radius + this.radius,
      -1
    );
    if (Util.dist(this.pos, leftSide) <= Util.dist(this.pos, rightSide)) {
      this.setMotionAndDestination(leftSide);
    } else {
      this.setMotionAndDestination(rightSide);
    }
    this.goingRound = true;
    setTimeout(function() {
        this.setMotionAndDestination(previousDestination);
        setTimeout(function () { this.goingRound = false; }.bind(this), 10 * parseInt(Util.dist(this.pos, this.destination) / Util.speed(this.vel)));   
        console.log("time to go round:" + 10 * Util.dist(this.pos, this.destination) / Util.speed(this.vel));
      }.bind(this), 10*parseInt(Util.dist(this.pos, this.destination) / Util.speed(this.vel)));
  }

  move() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  moveTo(location) {
    this.pos[0] = location[0];
    this.pos[1] = location[1];
  }

  setMotionAndDestination(destination) {
    this.vel = Util.direction(this.pos, destination);
    this.destination = destination;
  }


}

/* harmony default export */ __webpack_exports__["default"] = (Pokemon);
 


// class MovingObject {
//   constructor(options) {
//     this.pos = options.pos;
//     this.vel = options.vel;
//     this.radius = options.radius;
//     this.color = options.color;
//     this.game = options.game;
//     this.isWrappable = true;
//   }

//   collideWith(otherObject) {
//     // default do nothing
//   }

//   draw(ctx) {
//     ctx.fillStyle = this.color;

//     ctx.beginPath();
//     ctx.arc(
//       this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
//     );
//     ctx.fill();
//   }

//   isCollidedWith(otherObject) {
//     const centerDist = Util.dist(this.pos, otherObject.pos);
//     return centerDist < (this.radius + otherObject.radius);
//   }

//   move(timeDelta) {
//     // timeDelta is number of milliseconds since last move
//     // if the computer is busy the time delta will be larger
//     // in this case the MovingObject should move farther in this frame
//     // velocity of object is how far it should move in 1/60th of a second
//       this.pos[0] += this.vel[0];
//       this.pos[1] += this.vel[1];
    
//     // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
//     //     offsetX = this.vel[0] * velocityScale,
//     //     offsetY = this.vel[1] * velocityScale;

//     // this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

//     // if (this.game.isOutOfBounds(this.pos)) {
//     //   if (this.isWrappable) {
//     //     this.pos = this.game.wrap(this.pos);
//     //   } else {
//     //     this.remove();
//     //   }
//     // }
//   }

//   remove() {
//     this.game.remove(this);
//   }
// }

// const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

// module.exports = MovingObject;


/***/ }),

/***/ "./public/lib/sidebar_pokemon.js":
/*!***************************************!*\
  !*** ./public/lib/sidebar_pokemon.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pokemon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pokemon */ "./public/lib/pokemon.js");
const Util = __webpack_require__(/*! ./util */ "./public/lib/util.js");


class SidebarPokemon extends _pokemon__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(options) {
    options.radius = SidebarPokemon.RADIUS;
    options.vel = [0, 0];
    options.color = options.color || Util.randomColor();
    super(options)
    this.starting_pos = options.pos.slice(0);
    this.isDragging = false;
  }

  translationOffset(offsetX, offsetY) {
    this.pos[0] = this.starting_pos[0] + offsetX;
    this.pos[1] = this.starting_pos[1] + offsetY;
  }

}

SidebarPokemon.RADIUS = 15;
/* harmony default export */ __webpack_exports__["default"] = (SidebarPokemon);

/***/ }),

/***/ "./public/lib/spawn_sidebar.js":
/*!*************************************!*\
  !*** ./public/lib/spawn_sidebar.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar_pokemon */ "./public/lib/sidebar_pokemon.js");

const Util = __webpack_require__(/*! ./util */ "./public/lib/util.js");

class SpawnSidebar {
    constructor(topLeftCoords) {
        this.untranslatedTopLeftCoords = topLeftCoords.slice(0);
        this.topLeftCoords = topLeftCoords;
        this.width = _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"].RADIUS * 4;
        this.pokeX = topLeftCoords[0] + (this.width / 2);
        this.ySpacing = _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"].RADIUS * 3;
        this.firstPokeYPosition = topLeftCoords[1] + this.ySpacing;
        this.pokemon = [];
        this.generateRandomPokemon();
        this.height = SpawnSidebar.NUM_POKEMON * _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"].RADIUS * 3;
        setInterval(this.generateRandomPokemon.bind(this), 5000);
    }

    generateRandomPokemon() {
        const randomIds = []
        for(let i = 0; i < 5; i++){
            let pokeId = (Math.floor(Math.random() * 649) + 1).toString();
            randomIds.push(pokeId);
        }

        for (let i = 0; i < SpawnSidebar.NUM_POKEMON; i++) {
            let newPoke = new _sidebar_pokemon__WEBPACK_IMPORTED_MODULE_0__["default"]({
                pos: [this.pokeX, this.firstPokeYPosition + (i * this.ySpacing)],
                imgSrc: `https://sprites.pokecheck.org/icon/${randomIds[i]}.png`,
                imgId: randomIds[i]
            });
            if (this.pokemon.length != SpawnSidebar.NUM_POKEMON) {
                this.pokemon.push(newPoke);
            } else if(!this.pokemon[i].isDragging) {
                this.pokemon[i] = newPoke;
            }
        }
    }

    draw(ctx) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.5;
        ctx.fillStyle = 'white';
        ctx.fillRect(this.topLeftCoords[0], this.topLeftCoords[1], this.width, this.height);

        this.pokemon.forEach(poke => {
            poke.draw(ctx);
        });

    }

    translationOffset(offsetX, offsetY) {
        this.topLeftCoords[0] = this.untranslatedTopLeftCoords[0] + offsetX;
        this.topLeftCoords[1] = this.untranslatedTopLeftCoords[1] + offsetY;
        this.pokemon.forEach(poke => {
            poke.translationOffset(offsetX, offsetY);
        });
    }

    updateDraggedPoke(pos) {
        this.pokemon.filter(poke => poke.isDragging)[0].pos = pos;
    }

    resetAll() {
        this.pokemon.forEach(poke => {
            poke.isDragging = false;
        });
        this.generateRandomPokemon();
    }

}
SpawnSidebar.NUM_POKEMON = 3;
/* harmony default export */ __webpack_exports__["default"] = (SpawnSidebar);

/***/ }),

/***/ "./public/lib/ui.js":
/*!**************************!*\
  !*** ./public/lib/ui.js ***!
  \**************************/
/*! exports provided: SelectorRectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectorRectangle", function() { return SelectorRectangle; });
const Util = __webpack_require__(/*! ./util */ "./public/lib/util.js"); 

class SelectorRectangle {
    constructor(startCoords, endCoords) {
        this.startCoords = startCoords; 
        this.updateRect(endCoords);
    }

    updateRect(endCoords) {
        this.endCoords = endCoords;
        this.thirdCoord = [this.startCoords[0], this.endCoords[1]]
        this.defineRect = [
            this.startCoords[0],
            this.startCoords[1],
            this.endCoords[0],
            this.endCoords[1],
            this.thirdCoord[0],
            this.thirdCoord[1]];
    }

    inSelectRectangle(coords) {
        // debugger
        return Util.inRect(coords, this.defineRect);
    }

    draw(ctx) {
        // ctx.fillStyle = 'black';
        // ctx.fillRect(100,100,200,200);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.5;
        const x = this.endCoords[0] - this.startCoords[0];
        const y = this.endCoords[1] - this.startCoords[1];
        ctx.strokeRect(this.startCoords[0],this.startCoords[1],x,y);

        // ctx.rect(this.topleft[0],this.topleft[1],this.bottomRight[0],this.bottomRight[1]);
        // ctx.stroke();
    }


}



/***/ }),

/***/ "./public/lib/util.js":
/*!****************************!*\
  !*** ./public/lib/util.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {


const Util = {
  // Find distance between two points.
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  speed(vel) {
    return Math.sqrt(Math.pow(vel[0], 2) + Math.pow(vel[1], 2));
  },
  // Direction vector between two points.
  direction(pos1, pos2) {
    if(Util.dist(pos1, pos2) === 0) { return [0, 0] }
    return [
      (pos2[0] - pos1[0]) / Util.dist(pos1, pos2),
      (pos2[1] - pos1[1]) / Util.dist(pos1, pos2)
    ];
  },
  // Note we need 3 points for the rect in case the rectangle is tilted
  // Corners in ax,ay,bx,by,dx,dy
  // Point in x, y
  // Source: https://stackoverflow.com/a/2752754/2734863
  inRect(point, rect) {
    [x, y] = point;
    [ax, ay, bx, by, dx, dy] = rect;
    const bax = bx - ax;
    const bay = by - ay;
    const dax = dx - ax;
    const day = dy - ay;

    if ((x - ax) * bax + (y - ay) * bay < 0.0) {
      return false;
    }
    if ((x - bx) * bax + (y - by) * bay > 0.0) {
      return false;
    }
    if ((x - ax) * dax + (y - ay) * day < 0.0) {
      return false;
    }
    if ((x - dx) * dax + (y - dy) * day > 0.0) {
      return false;
    }

    return true;
  },
  randomColor() {
    const hexDigits = "0123456789ABCDEF";

    let color = "#";
    for (let i = 0; i < 3; i++) {
      color += hexDigits[Math.floor(Math.random() * 16)];
    }

    return color;
  },
  pairs(arr) {
    let res = [],
      l = arr.length;
    for (var i = 0; i < l; ++i)
      for (var j = i + 1; j < l; ++j) res.push([arr[i], arr[j]]);
    return res;
  },
  // r = distance from right-angle point to unknown
  // C = right-angle point
  // B = other point
  findThirdPointInRightTriangle(C, B, r, left = 1) {// if left = 1 the D is left of the line AB. Run with -1 to get other side
    // Want other part of midpoint.
    // C = A + B / 2
    let A = [0,0];
    A[0] = 2*C[0] - B[0];
    A[1] = 2*C[1] - B[1];

    const nx = B[0] - A[0];
    const ny = B[1] - A[1];
    r /= Math.sqrt(nx * nx + ny * ny) * left;
    return [
      A[0] + nx / 2 - ny * r,
      A[1] + ny / 2 + nx * r
    ];
  },

  // The actual parsing; returns an object with properties.
  parseGIF(st, handler) {
    // Generic functions
    var bitsToNum = function(ba) {
      return ba.reduce(function(s, n) {
        return s * 2 + n;
      }, 0);
    };

    var byteToBitArr = function(bite) {
      var a = [];
      for (var i = 7; i >= 0; i--) {
        a.push(!!(bite & (1 << i)));
      }
      return a;
    };

    handler || (handler = {});

    // LZW (GIF-specific)
    var parseCT = function(entries) {
      // Each entry is 3 bytes, for RGB.
      var ct = [];
      for (var i = 0; i < entries; i++) {
        ct.push(st.readBytes(3));
      }
      return ct;
    };

    var readSubBlocks = function() {
      var size, data;
      data = "";
      do {
        size = st.readByte();
        data += st.read(size);
      } while (size !== 0);
      return data;
    };

    var parseHeader = function() {
      var hdr = {};
      hdr.sig = st.read(3);
      hdr.ver = st.read(3);
      if (hdr.sig !== "GIF") throw new Error("Not a GIF file."); // XXX: This should probably be handled more nicely.
      hdr.width = st.readUnsigned();
      hdr.height = st.readUnsigned();

      var bits = byteToBitArr(st.readByte());
      hdr.gctFlag = bits.shift();
      hdr.colorRes = bitsToNum(bits.splice(0, 3));
      hdr.sorted = bits.shift();
      hdr.gctSize = bitsToNum(bits.splice(0, 3));

      hdr.bgColor = st.readByte();
      hdr.pixelAspectRatio = st.readByte(); // if not 0, aspectRatio = (pixelAspectRatio + 15) / 64
      if (hdr.gctFlag) {
        hdr.gct = parseCT(1 << (hdr.gctSize + 1));
      }
      handler.hdr && handler.hdr(hdr);
    };

    var parseExt = function(block) {
      var parseGCExt = function(block) {
        var blockSize = st.readByte(); // Always 4
        var bits = byteToBitArr(st.readByte());
        block.reserved = bits.splice(0, 3); // Reserved; should be 000.
        block.disposalMethod = bitsToNum(bits.splice(0, 3));
        block.userInput = bits.shift();
        block.transparencyGiven = bits.shift();

        block.delayTime = st.readUnsigned();

        block.transparencyIndex = st.readByte();

        block.terminator = st.readByte();

        handler.gce && handler.gce(block);
      };

      var parseComExt = function(block) {
        block.comment = readSubBlocks();
        handler.com && handler.com(block);
      };

      var parsePTExt = function(block) {
        // No one *ever* uses this. If you use it, deal with parsing it yourself.
        var blockSize = st.readByte(); // Always 12
        block.ptHeader = st.readBytes(12);
        block.ptData = readSubBlocks();
        handler.pte && handler.pte(block);
      };

      var parseAppExt = function(block) {
        var parseNetscapeExt = function(block) {
          var blockSize = st.readByte(); // Always 3
          block.unknown = st.readByte(); // ??? Always 1? What is this?
          block.iterations = st.readUnsigned();
          block.terminator = st.readByte();
          handler.app && handler.app.NETSCAPE && handler.app.NETSCAPE(block);
        };

        var parseUnknownAppExt = function(block) {
          block.appData = readSubBlocks();
          // FIXME: This won't work if a handler wants to match on any identifier.
          handler.app &&
            handler.app[block.identifier] &&
            handler.app[block.identifier](block);
        };

        var blockSize = st.readByte(); // Always 11
        block.identifier = st.read(8);
        block.authCode = st.read(3);
        switch (block.identifier) {
          case "NETSCAPE":
            parseNetscapeExt(block);
            break;
          default:
            parseUnknownAppExt(block);
            break;
        }
      };

      var parseUnknownExt = function(block) {
        block.data = readSubBlocks();
        handler.unknown && handler.unknown(block);
      };

      block.label = st.readByte();
      switch (block.label) {
        case 0xf9:
          block.extType = "gce";
          parseGCExt(block);
          break;
        case 0xfe:
          block.extType = "com";
          parseComExt(block);
          break;
        case 0x01:
          block.extType = "pte";
          parsePTExt(block);
          break;
        case 0xff:
          block.extType = "app";
          parseAppExt(block);
          break;
        default:
          block.extType = "unknown";
          parseUnknownExt(block);
          break;
      }
    };

    var parseImg = function(img) {
      var deinterlace = function(pixels, width) {
        // Of course this defeats the purpose of interlacing. And it's *probably*
        // the least efficient way it's ever been implemented. But nevertheless...
        var newPixels = new Array(pixels.length);
        var rows = pixels.length / width;
        var cpRow = function(toRow, fromRow) {
          var fromPixels = pixels.slice(fromRow * width, (fromRow + 1) * width);
          newPixels.splice.apply(
            newPixels,
            [toRow * width, width].concat(fromPixels)
          );
        };

        // See appendix E.
        var offsets = [0, 4, 2, 1];
        var steps = [8, 8, 4, 2];

        var fromRow = 0;
        for (var pass = 0; pass < 4; pass++) {
          for (var toRow = offsets[pass]; toRow < rows; toRow += steps[pass]) {
            cpRow(toRow, fromRow);
            fromRow++;
          }
        }

        return newPixels;
      };

      img.leftPos = st.readUnsigned();
      img.topPos = st.readUnsigned();
      img.width = st.readUnsigned();
      img.height = st.readUnsigned();

      var bits = byteToBitArr(st.readByte());
      img.lctFlag = bits.shift();
      img.interlaced = bits.shift();
      img.sorted = bits.shift();
      img.reserved = bits.splice(0, 2);
      img.lctSize = bitsToNum(bits.splice(0, 3));

      if (img.lctFlag) {
        img.lct = parseCT(1 << (img.lctSize + 1));
      }

      img.lzwMinCodeSize = st.readByte();

      var lzwData = readSubBlocks();

      img.pixels = lzwDecode(img.lzwMinCodeSize, lzwData);

      if (img.interlaced) {
        // Move
        img.pixels = deinterlace(img.pixels, img.width);
      }

      handler.img && handler.img(img);
    };

    var parseBlock = function() {
      var block = {};
      block.sentinel = st.readByte();

      switch (
        String.fromCharCode(block.sentinel) // For ease of matching
      ) {
        case "!":
          block.type = "ext";
          parseExt(block);
          break;
        case ",":
          block.type = "img";
          parseImg(block);
          break;
        case ";":
          block.type = "eof";
          handler.eof && handler.eof(block);
          break;
        default:
          throw new Error("Unknown block: 0x" + block.sentinel.toString(16)); // TODO: Pad this with a 0.
      }

      if (block.type !== "eof") setTimeout(parseBlock, 0);
    };

    var parse = function() {
      parseHeader();
      setTimeout(parseBlock, 0);
    };

    parse();
  }

  // randomVec(length) {
  //  const deg = 2 * Math.PI * Math.random();
  //  return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  // },
  // scale(vec, m) {
  //   return [vec[0] * m, vec[1] * m];
  // },
  // inherits(childClass, parentClass) {
  //   function Surrogate() {}
  //   Surrogate.prototype = parentClass.prototype;
  //   surrogate = new Surrogate();
  //   childClass.prototype = surrogate;
  //   childClass.prototype.constructor = childClass;
  // }
};

module.exports = Util;

/***/ }),

/***/ "./public/vendor/stream.js":
/*!*********************************!*\
  !*** ./public/vendor/stream.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Stream
/**
 * @constructor
 */
// Make compiler happy.
var Stream = function (data) {
    this.data = data;
    this.len = this.data.length;
    this.pos = 0;

    this.readByte = function () {
        if (this.pos >= this.data.length) {
            throw new Error('Attempted to read past end of stream.');
        }
        if (data instanceof Uint8Array)
            return data[this.pos++];
        else
            return data.charCodeAt(this.pos++) & 0xFF;
    };

    this.readBytes = function (n) {
        var bytes = [];
        for (var i = 0; i < n; i++) {
            bytes.push(this.readByte());
        }
        return bytes;
    };

    this.read = function (n) {
        var s = '';
        for (var i = 0; i < n; i++) {
            s += String.fromCharCode(this.readByte());
        }
        return s;
    };

    this.readUnsigned = function () { // Little-endian.
        var a = this.readBytes(2);
        return (a[1] << 8) + a[0];
    };
};

module.exports = Stream;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map