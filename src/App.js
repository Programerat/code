import {React, useState, useCallback, createRef, useEffect} from 'react';
import Button from '@mui/material/Button';
import {AppBar, Box, ButtonGroup, Grid, IconButton, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import "../node_modules/highlight.js/styles/tomorrow-night-bright.css";
import { toPng, toSvg } from 'html-to-image';
import 'material-icons/iconfont/material-icons.css';
import DocsCard from './DocumentationCard';
import Code, { codeThemes } from './Highlighter';
import PreviewCard from './PreviewCard';

const languages = [
  <MenuItem value="javascript">Javascript</MenuItem>,
  <MenuItem value="go">GO</MenuItem>,
  <MenuItem value="php">PHP</MenuItem>,
  <MenuItem value="html">HTML</MenuItem>,
  <MenuItem value="css">CSS</MenuItem>,
  <MenuItem value="bash">BASH</MenuItem>,
  <MenuItem value="markdown">MD</MenuItem>,
];


const fileName = Math.random().toString(36).substr(2, 9);


const App = () => {
  const [theme, setTheme] = useState('ad');
  const [content, setContent] = useState(undefined);
  const [language, setLanguage] = useState('php');
  const [icon, setIcon] = useState('');
  const [logo, setLogo] = useState('');
  const [code, setCode] = useState('');
  const [beforeCodeText, setBeforeCodeText] = useState('');
  const [afterCodeText, setAfterCodeText] = useState('');
  const [background, setBackground] = useState('first');

  const ref = createRef();

  const handleChange = (event) => {
    setBackground(event.target.value);
  };

  const textAlign = (position) => {
    let result = document.getElementsByClassName('small');
    result[0].style.textAlign = position;
  }

  useEffect(() => {
    updateResult();
  }, [content]);

  const bringBackContent = (item = 'content') => {
    console.log(localStorage.getItem(item));
    if (localStorage.getItem(item).length > 0) {
      setContent(localStorage.getItem(item));
      document.getElementById('editor').value = localStorage.getItem(item);
    }
  }

  const generateHtml = (tag, content) => {
    let dotPosition = tag.indexOf('.');
    
    if (dotPosition >= 0) {
      let tagName = tag.substring(0, dotPosition);
      let className = tag.substring(dotPosition + 1);
      return '<'+ tagName + ' class="' + className + '">' + content + '</' + tagName + '>';
    }

    return '<'+ tag + '>' + content + '</' + tag + '>';
  }

  const updateResult = () => {
    let beforeText = '';
    let allCode = '';
    let afterText = '';
    let codeStarted = false;

    if (content === undefined){
      return;
    }    

    localStorage.setItem('content', content);
    let texts = content.split(/\n/gm);

    let bfText = true;

    texts.forEach(text => {
      if (text === '') {
        return;
      }

      if (text.includes('```')) {
        codeStarted = !codeStarted;
        bfText = false;
        return;
      }

      if (codeStarted) {
        allCode += text + '\n';
        return;
      }

      let commaPosition = text.indexOf(':');

      if (commaPosition >= 0) {
        let tag = text.substring(0, commaPosition);
        let content = text.substring(commaPosition + 1);

        if (tag === 'icon') {
          setIcon(content.trim());
          return;
        }

        if (tag === 'img') {
          setLogo(content.trim());
          return;
        }

        if(bfText){
          beforeText += generateHtml(tag, content);
        } else {
          afterText += generateHtml(tag, content);
        }
      }
    });

    setCode(allCode);
    setBeforeCodeText(beforeText);
    setAfterCodeText(afterText);
  }

  const handleKeyPress = (event) => {
    if(event.keyCode === 9){
      //prevent and add 4 spaces
      event.preventDefault();
      let text = event.target.value; 
      let newText = text.substring(0, event.target.selectionStart) + '    ' + text.substring(event.target.selectionStart);
      event.target.value = newText;
    }
  }

  const saveSvgImage = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toSvg(ref.current, {})
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = fileName+'.svg';
      link.href = dataUrl;
      link.click();
    }, [ref]);
  });

  const savePngImage = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current, {})
      .then((dataUrl) => {

        const link = document.createElement('a')
        link.download = fileName+'.png';
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {

      })
  }, [ref]);


  return (
    <>
    <AppBar position="static" sx={{ bgcolor: "#fff" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <img src="http://localhost:3000/logo.png" width='50px' alt="logo" />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Programerat
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box style={{margin: '0px 5px'}}>
            <ButtonGroup variant="outlined" aria-label="outlined button group" label="Size">
              <Button onClick={() => textAlign('left')} ><span className='material-icons'>format_align_left</span></Button>
              <Button onClick={() => textAlign('center')}><span className='material-icons'>format_align_center</span></Button>
              <Button onClick={() => textAlign('right')}><span className='material-icons'>format_align_right</span></Button>
              <Button onClick={() => bringBackContent()} title="Restore last content"><span className='material-icons'>content_paste</span></Button>
            </ButtonGroup>
          </Box>
          <Box>
            <Select 
              value={theme}
              label='Language'
              onChange={(event) => {setTheme(event.target.value)}}
            >
              {codeThemes}
            </Select>
          </Box>
          <Box>
            <Select 
              value={language}
              label='Language'
              onChange={(event) => {setLanguage(event.target.value)}}
            >
              {languages}
            </Select>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, margin: '0px 5px' }}>
            <Select
              value={background}
              label="Background"
              onChange={handleChange}
            >
              <MenuItem className='first' value={'first'}>Default 🎨</MenuItem>
              <MenuItem className='warm-flame' value={'warm-flame'}>Warm Flame 🔥</MenuItem>
              <MenuItem className='heavy-rain' value={'heavy-rain'}>Heavy Rain 🌧️</MenuItem>
              <MenuItem className='happy-fisher' value={'happy-fisher'}>Happy Fisher</MenuItem>
              <MenuItem className='clean-mirror' value={'clean-mirror'}>Clean Mirror 🪞</MenuItem>
              <MenuItem className='premium-dark' value={'premium-dark'}>Premium Dark 🌑</MenuItem>
              <MenuItem className='healthy-water' value={'healthy-water'}>Healthy water 🌊</MenuItem>
              <MenuItem className='sun-warm' value={'sun-warm'}>Sun Warm 🔆</MenuItem>
              <MenuItem className='material-dark' value={'material-dark'}>Material Dark</MenuItem>

              <MenuItem className='second' value={'second'}>Secondary</MenuItem>
              <MenuItem className='third' value={'third'}>Third</MenuItem>
              <MenuItem className='fourth' value={'fourth'}>Fourth</MenuItem>
              <MenuItem className='fifth' value={'fifth'}>Fifth</MenuItem>
              <MenuItem className='amazon-style' value={'amazon-style'}>Amazon Style</MenuItem>
              <MenuItem className='meta-curl' value={'meta-curl'}>Meta Curl</MenuItem>
              <MenuItem className='tailwind' value={'tailwind'}>Tail wind</MenuItem>
            </Select>
          </Box>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button onClick={savePngImage}>Png</Button>
              <Button onClick={saveSvgImage}>Svg</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    <Grid container 
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center" 
    >
      <Grid item xs={2} md={3}>
      </Grid>
      <Grid 
        item 
        xs={10} 
        md={9}
        >
          <br />
          <div ref={ref} className={background + ' small'} style={{width: '445px'}} height="100%">
            { logo && <img src={logo} className='tr' alt="logo" /> }
            <PreviewCard beforeCodeText={beforeCodeText} afterCodeText={afterCodeText} code={code} icon={icon} language={language} theme={theme} />
          </div>
          <Box mt={2}>
            <TextField
              multiline
              id="editor"
              label="Your content here..."
              onKeyDown={handleKeyPress}
              onChange={(e) => {setContent(e.target.value)}}
              aria-label="Code editor"
              minRows={7}
              placeholder="<?php echo 'code here';"
              style={{ width: 500 }}
            />
          </Box>
      </Grid>
    </Grid>
    </>
  );
}

export default App;
