/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*******************************!*\
  !*** ./src/test/Yelp.test.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Yelp = __webpack_require__(/*! ../Yelp */ 1);
	
	var _Yelp2 = _interopRequireDefault(_Yelp);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(/*! dotenv */ 4).config();
	
	var chai = __webpack_require__(/*! chai */ 5);
	var expect = chai.expect;
	
	var opts = {
	  consumer_key: process.env.YELP_CONSUMER_KEY,
	  consumer_secret: process.env.YELP_CONSUMER_SECRET,
	  token: process.env.YELP_TOKEN,
	  token_secret: process.env.YELP_TOKEN_SECRET
	};
	var yelp = new _Yelp2.default(opts);
	
	describe('Yelp API access testing...', function () {
	
	  it('yelp search', function (done) {
	    yelp.search({
	      term: 'food',
	      location: 'Montreal'
	    }).then(function (data) {
	      expect(data.region).to.be.an('object');
	      done();
	    }).catch(function (err) {
	      done(err);
	    });
	  });
	
	  it('yelp business', function (done) {
	    yelp.business('yelp-san-francisco').then(function (data) {
	      expect(data.is_claimed).to.equal(true);
	      expect(data.rating).to.be.a('number');
	      expect(data.mobile_url).to.be.a('string');
	      expect(data.categories).to.be.an('array');
	      expect(data.reviews).to.be.an('array');
	      done();
	    }).catch(function (err) {
	      done(err);
	    });
	  });
	
	  it('yelp phone search', function (done) {
	    yelp.phoneSearch({ phone: '+15555555555' }).then(function (data) {
	      expect(data.total).to.be.a('number');
	      expect(data.businesses).to.be.an('array');
	      done();
	    }).catch(function (err) {
	      done(err);
	    });
	  });
	
	  it('yelp - callback', function (done) {
	    yelp.search({
	      term: 'food',
	      location: 'Montreal'
	    }, function (err, data) {
	      if (err) return done(err);
	      expect(data.region).to.be.an('object');
	      expect(data.total).to.be.a('number');
	      expect(data.businesses).to.be.an('array');
	      done();
	    });
	  });
	});

/***/ },
/* 1 */
/*!*********************!*\
  !*** ./src/Yelp.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _querystring = __webpack_require__(/*! querystring */ 2);
	
	var _querystring2 = _interopRequireDefault(_querystring);
	
	var _oauth = __webpack_require__(/*! oauth */ 3);
	
	var _oauth2 = _interopRequireDefault(_oauth);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var OAuth = _oauth2.default.OAuth;
	
	var baseUrl = 'http://api.yelp.com/v2/';
	
	/**
	 * Yel class provides access to Yelp API
	 * @param {object} opts - The options, containing your Yelp credentials
	 * @param {string} author - The author of the book.
	 *
	 */
	
	var Yelp = function () {
	  function Yelp(opts) {
	    _classCallCheck(this, Yelp);
	
	    this.oauthToken = opts.token;
	    this.oauthTokenSecret = opts.token_secret;
	    this.oauth = new OAuth(null, null, opts.consumer_key, opts.consumer_secret, opts.version || '1.0', null, 'HMAC-SHA1');
	  }
	
	  _createClass(Yelp, [{
	    key: 'get',
	    value: function get(resource) {
	      var _this = this;
	
	      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var cb = arguments[2];
	
	      var promise = new Promise(function (resolve, reject) {
	        var debug = params.debug;
	        delete params.debug;
	
	        _this.oauth.get(baseUrl + resource + '?' + _querystring2.default.stringify(params), _this.oauthToken, _this.oauthTokenSecret, function (err, _data, response) {
	          if (err) return reject(err);
	          var data = JSON.parse(_data);
	          if (debug) return resolve([data, response]);
	          resolve(data);
	        });
	      });
	      if (typeof cb === 'function') {
	        promise.then(function (res) {
	          return cb(null, res);
	        }).catch(cb);
	        return null;
	      }
	      return promise;
	    }
	  }, {
	    key: 'search',
	    value: function search(params, callback) {
	      return this.get('search', params, callback);
	    }
	  }, {
	    key: 'business',
	    value: function business(id, callback) {
	      return this.get('business/' + id, undefined, callback);
	    }
	
	    /**
	     * Exampe:
	     * yelp.phone_search({phone: "+12223334444"}, function(error, data) {});
	     */
	
	  }, {
	    key: 'phoneSearch',
	    value: function phoneSearch(params, callback) {
	      return this.get('phone_search', params, callback);
	    }
	  }]);
	
	  return Yelp;
	}();

	exports.default = Yelp;

/***/ },
/* 2 */
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("querystring");

/***/ },
/* 3 */
/*!************************!*\
  !*** external "oauth" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("oauth");

/***/ },
/* 4 */
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ },
/* 5 */
/*!***********************!*\
  !*** external "chai" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("chai");

/***/ }
/******/ ]);
//# sourceMappingURL=Yelp.test.js.map