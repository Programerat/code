import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import docco from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark';


const Code = ({language, code}) => {
  return (
    <div className='code line-numbers'>
        <SyntaxHighlighter language={language} className='tbg' style={docco} highlighter={"prism" || "hljs"}>
        {code}
        </SyntaxHighlighter>
    </div>
  );
};

export default Code;