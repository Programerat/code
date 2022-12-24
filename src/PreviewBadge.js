import Html2ReactParser from "html-to-react/lib/parser";
import Code from "./Highlighter";
import Badge from "./Badge";

const PreviewBadge = ({title, icon}) => {
    let htmlParser = new Html2ReactParser();

    return (
            <div>
                { title && <Badge title={title} icon={icon} />}
            </div>
            );
};

export default PreviewBadge;