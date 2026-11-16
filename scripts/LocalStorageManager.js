class LocalStorageManager {
    /**
     * Save data to localStorage.
     * @param {string} key - The key under which to store the data.
     * @param {any} value - The data to store.
     */
    saveData(key, value) {
        try {
            localStorage.setItem("hability"+key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving data to localStorage:', e);
        }
    }

    /**
     * Load data from localStorage.
     * @param {string} key - The key from which to load the data.
     * @returns {any} The loaded data, or null if the key does not exist.
     */
    loadData(key) {
        try {
            const data = localStorage.getItem("hability"+key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error loading data from localStorage:', e);
            return null;
        }
    }

    /**
     * Remove data from localStorage.
     * @param {string} key - The key of the data to remove.
     */
    removeData(key) {
        try {
            localStorage.removeItem("hability"+key);
        } catch (e) {
            console.error('Error removing data from localStorage:', e);
        }
    }

    /**
     * Clear all data from localStorage.
     */
    clearData() {
        try {
            localStorage.clear();
        } catch (e) {
            console.error('Error clearing localStorage:', e);
        }
    }
}

let localStorageManager = new LocalStorageManager();