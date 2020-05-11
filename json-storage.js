/* eslint-disable require-await */
// Todo: Move to own library

/**
* @typedef {boolean|number|string|GenericArray|PlainObject} JSON
*/

/**
 * Get parsed default value for a preference.
 * @param {string} key Preference key
 * @returns {boolean|number|string}
 */
export class JsonStorage {
  constructor ({appNamespace}) {
    Object.assign(this, {appNamespace});
  }
  /**
   * Get parsed preference value; returns `Promise` in anticipation of
   * {@link https://domenic.github.io/async-local-storage/}.
   * @param {string} key Preference key (for Chrome-Compatibility, only `\w+`)
   * @returns {Promise<JSON>} Resolves to the parsed value (defaulting if
   *   necessary)
   */
  async get (key) {
    const result = localStorage.getItem(this.appNamespace + key);
    return result === null && this.getDefault
      ? this.getDefault(key)
      : JSON.parse(result);
  }

  /**
   * Set a stringifiable preference value; returns `Promise` in anticipation of
   * {@link https://domenic.github.io/async-local-storage/}.
   * @param {string} key Preference key (for Chrome-Compatibility, only `\w+`)
   * @param {JSON} val Stringifiable value
   * @returns {Promise<JSON>} Resolves to result of setting the item
   *   (Not currently in use)
   */
  async set (key, val) {
    return localStorage.setItem(this.appNamespace + key, JSON.stringify(val));
  }
}

export class JsonDefaultingStorage extends JsonStorage {
  constructor ({appNamespace, defaults}) {
    super({appNamespace});
    Object.assign(this, {defaults});
  }
  async getDefault (key) {
    return this.defaults[key];
  }
}
