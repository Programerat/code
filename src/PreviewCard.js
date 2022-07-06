import Html2ReactParser from "html-to-react/lib/parser";
import Code from "./Highlighter";

const PreviewCard = ({content, code, icon, language, theme}) => {
    let htmlParser = new Html2ReactParser();

    return (
        <div>
            { htmlParser.parse(content) }
            { code && <Code code={code} language={language} theme={theme} />}
        </div>
    );
};

export default PreviewCard;