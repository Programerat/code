import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import ml from 'react-syntax-highlighter/dist/esm/styles/prism/material-light';
import md from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark';
import ad from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark';
import { MenuItem } from '@mui/material';

export const codeThemes = [
  <MenuItem value='ml'>Material light</MenuItem>,
  <MenuItem value='md'>Material Dark</MenuItem>,
  <MenuItem value='ad'>Atom Dark</MenuItem>,
];

const codeToTheme = {'ml': ml, 'md': md, 'ad': ad};

const Code = ({language, code, theme}) => {

  return (
    <div className='code line-numbers'>
        <SyntaxHighlighter language={language} className='code_editor' style={codeToTheme[theme]} highlighter={"prism" || "hljs"}>
        {code}
        </SyntaxHighlighter>
    </div>
  );
};

export default Code;