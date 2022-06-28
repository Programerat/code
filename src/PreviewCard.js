import Html2ReactParser from "html-to-react/lib/parser";
import Code from "./Highlighter";

const PreviewCard = ({beforeCodeText, afterCodeText, code, icon, language, theme}) => {
    let htmlParser = new Html2ReactParser();

    return (
        <>
            { htmlParser.parse(beforeCodeText) }
            <div className='icon'>
                { icon && <span class="representing-icon material-icons">{icon}</span> }
            </div>
            { code && <Code code={code} language={language} theme={theme} /> }
            { htmlParser.parse(afterCodeText) }
        </>
    );
};

export default PreviewCard;