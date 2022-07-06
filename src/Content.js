
class Content {
    content = [];
    rawContent = [];

    constructor(rawContent = []) {
        this.rawContent = rawContent;
    }

    toJson() {
        return {"content": this.content, "rawContent": this.rawContent};
    }

}

export default Content;