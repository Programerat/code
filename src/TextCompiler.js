
class TextCompiler {

    APP_COMPILER_RULES = {
        "h1": "<h1>{__content__}</h1>",
        "h2": "<h2>{__content__}</h2>",
        "h3": "<h3>{__content__}</h3>",
        "h4": "<h4>{__content__}</h4>",
        "h5": "<h5>{__content__}</h5>",
        "p": "<p>{__content__}</p>",
        "li": "<li>{__content__}</li>",
        ">": "<quote>{__content__}</quote>",
        "card": "<div class='card white'>{__content__}</div>",
        "logo": "<img src={__content__} className='tr' alt='logo' />",

    };
    APP_COMPILER_CODE_BLOCK_START = '```';

    codeBlockOpen = false;
    codeBlockContent = '';
    content = [];

    compile(rows = []) {
        //reset
        this.content = [];
        this.codeBlockContent = '';

        rows.map((row) => this.process(row));
        return this.content.join('\n');
    }

    getCode() {
        return this.codeBlockContent;
    }

    getContent() {
        return this.content;
    }

    process(text) {

        if (text === undefined) {
            return false;
        }

        if (this.isCode(text)) {
            this.codeBlockOpen = !this.codeBlockOpen;
            return false;
        }

        if (this.codeBlockOpen) {
            this.codeBlockContent += text + '\n';
            console.log(this.codeBlockContent);
            return false;
        }

        let rule = this.findRule(text);
        if (text === undefined || rule === false) {
            return false;
        }

        this.content.push(this.prepareContent(rule, text, this.getContentForRule(rule)));
    }

    isCode(text) {
        return text.startsWith(this.APP_COMPILER_CODE_BLOCK_START);
    }

    prepareContent(rule, content, template) {
        if (content.startsWith(rule+':') === false) {
            return '';
        }

        content = content.replace(rule+':', '');

        return template.replace('{__content__}', content);
    }

    findRule(text) {
        for(const [code, content] of Object.entries(this.APP_COMPILER_RULES)) {
            if (text.startsWith(code)) {
                return code;
            }
        }
        return false;
    }

    getContentForRule(rule) {
        return this.APP_COMPILER_RULES[rule];
    }
}

export default TextCompiler;