
class ContentLocalStorage {
    storageKey = 'content_local_storage';
    savedContents = [];
    activeContent = 0;

    constructor() {
        if (localStorage.getItem(this.storageKey) === null) {
            localStorage.setItem(this.storageKey, '[]');
        }

        this.savedContents = JSON.parse(localStorage.getItem(this.storageKey));
        this.activeContent = this.savedContents.length;
    }

    addNewContent(content) {
        this.savedContents.push(content);
        localStorage.setItem(this.storageKey, JSON.stringify(this.savedContents));
    }

    get(item) {
        return this.savedContents[item];
    }

    getCurrentItem() {
        return this.savedContents[this.activeContent];
    }

    getPreviousContent() {
        if (this.activeContent === 0) {
            return this.getCurrentItem();
        }

        this.activeContent --;
        return this.getCurrentItem();
    }

    getNextContent() {
        if (this.activeContent === this.savedContents.length) {
            return this.getCurrentItem();
        }

        this.activeContent ++;
        return this.getCurrentItem();
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