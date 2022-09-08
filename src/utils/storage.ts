type LocalStorageKeys = "trivia-access-token";

export default class Storage {
  static get(key: LocalStorageKeys) {
    return localStorage.getItem(key);
  }

  static set(key: LocalStorageKeys, value: string) {
    return localStorage.setItem(key, value);
  }

  static remove(key: LocalStorageKeys) {
    return localStorage.removeItem(key);
  }
}
