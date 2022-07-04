
class ContentLocalStorage {
    storageKey = 'content_local_storage';
    savedContents = [];

    constructor() {
        if (localStorage.getItem(this.storageKey) === null) {
            localStorage.setItem(this.storageKey, '[]');
        }

        this.savedContents = JSON.parse(localStorage.getItem(this.storageKey));
    }

    addNewContent(content) {
        this.savedContents.push(content);
        localStorage.setItem(this.storageKey, JSON.stringify(this.savedContents));
    }

    get(item) {
        return this.savedContents[item];
    }

    count() {
        return this.savedContents.length;
    }

    cleanUp() {
        localStorage.setItem(this.storageKey, '[]');
        this.savedContents = [];
    }
}

export default ContentLocalStorage;