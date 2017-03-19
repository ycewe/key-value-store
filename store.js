var redis = require('redis');
var config = process.env.REDIS_URL || null;  // add your redis configuration here

class Store {
  constructor() {
    this.client = {};
  }

  /**
   * Creates a connection to the Database.
   */
  static initialize() {
    this.client = (config !== null) ? redis.createClient(config) : redis.createClient();
  }

  /**
   * Add a given object into the database mapped to a key.
   *
   * @param {String} key: A unique identifier for the value.
   * @param {String} value: Input to be stored
   * @param {function} callback: A function that is executed once the operation has completed.
   */
  static add(key = null, value = null, callback) {
    Store.initialize(config);

    if (key === null) {
      callback(null, 'A key is required');
    }
    if (value === null) {
      callback(null, 'A value is required');
    }

    var redisKey = 'store:' + key;
    var redisValue = JSON.stringify(value);
    var timestampKey = new Date().getTime() + redisKey;

    this.client.set(timestampKey, redisValue);
    this.client.set(redisKey, redisValue, function(err, res) {
      Store.quit();
      if (err) {
        callback(null, err)
      }
      callback(res, null)
    });
  }

  /**
   * Retrieve a specific value with the given key.
   * If a timestamp is given, retrives the value with the key at the given timestamp.
   *
   * @param {String} key: A unique identifier for the value.
   * @param {String} timestamp: A unique identifier for the value
   * @param {function} callback: A function that is executed once the operation has completed.
   */
  static find(key, timestamp = null, callback) {
    Store.initialize(config);

    var redisKey = 'store:' + key;

    if (timestamp !== null) {
      var timestampKey = timestamp + redisKey;

      this.client.get(timestampKey, function(err, value) {
        Store.quit();
        if (err) {
          callback(null, err);
        }
        callback(JSON.parse(value), null);
      });

    } else {
      this.client.get(redisKey, function(err, value) {
        Store.quit();
        if (err) {
          callback(null, err);
        }
        callback(JSON.parse(value), null);
      });
    }
  }

  /**
   * Exits Database.
   */
  static quit() {
    this.client.quit();
  }
}

module.exports = Store;
