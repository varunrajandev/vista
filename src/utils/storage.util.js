// Set the storage
export const setStorage = (key, value) => localStorage.setItem(key, value);
// Get the storage
export const getStorage = (key) => localStorage.getItem(key);
// Remove the storage
export const removeStorage = (key) => localStorage.removeItem(key);
// Has the storage
export const hasStorage = (key) => (getStorage(key) ? true : false);
