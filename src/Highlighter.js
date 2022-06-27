import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import md from 'react-syntax-highlighter/dist/esm/languages/hljs/markdown';
import docco from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark';

SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', md);

const Code = ({language, code}) => {
  return (
    <div className='code'>
        <SyntaxHighlighter language={language} className='tbg' style={docco}>
        {code}
        </SyntaxHighlighter>
    </div>
  );
};

export default Code;