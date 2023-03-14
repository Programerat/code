import {React, useState, useCallback, createRef, useEffect} from 'react';
import Button from '@mui/material/Button';
import {AppBar, Box, ButtonGroup, Grid, IconButton, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import "../node_modules/highlight.js/styles/tomorrow-night-bright.css";
import { toPng, toSvg } from 'html-to-image';
import 'material-icons/iconfont/material-icons.css';
import { codeThemes } from './Highlighter';
import PreviewCard from './PreviewCard';
import ContentLocalStorage from "./ContentLocalStorage";
import Content from "./Content";
import TextCompiler from "./TextCompiler";
import PreviewBadge from "./PreviewBadge";

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
let contentLocalStorage = new ContentLocalStorage();
let compiler = new TextCompiler();

const App = () => {
  const [theme, setTheme] = useState('ad');
  const [content, setContent] = useState(undefined);
  const [language, setLanguage] = useState('php');
  const [code, setCode] = useState('');
  const [writtenContent, setWrittenContent] = useState('');
  const [background, setBackground] = useState('first');
  const [textContent, setTextContent] = useState('');
  const ref = createRef();
  const badgeRef = createRef();
  const [title, setTitle] = useState('');

  const handleChange = (event) => {
    setBackground(event.target.value);
  };

  useEffect(() => {
    updateContent(content);
  }, [content]);

  useEffect(() => {
    updateView(textContent);
  }, [textContent]);
  
  useEffect(() => {
      updateBadge(title);
      }, [title]);

  const updateContent = (c) => {
    if (c === undefined){
      return;
    }

    setTextContent(new Content(c.split(/\n/gm)));
  }
    
    const updateBadge = (c) => {
  }

  const updateView = (content) => {
    setWrittenContent(compiler.compile(content.rawContent));
    setCode(compiler.getCode());
  }

  const getPreviousItemContent = () => {
    updateView(contentLocalStorage.getPreviousContent());
  }

  const getNextItemContent = () => {
    updateView(contentLocalStorage.getNextContent());
  }

  const cleanUpSavedContents = () => {
    contentLocalStorage.cleanUp();
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
  
    const handleTitleChange = (event) => {
      event.preventDefault();
      setTitle(event.target.value);
      
  }

  const saveSvgImage = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    contentLocalStorage.addNewContent(textContent.toJson());
    toSvg(ref.current, {})
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = fileName+'.svg';
      link.href = dataUrl;
      link.click();
    }, [ref]);
  });

  const savePngBadge = useCallback(() => {
      toPng(badgeRef.current, {})
      .then((dataUrl) => {

          const link = document.createElement('a')
          link.download = fileName+'.png';
          link.href = dataUrl
          link.click()
      })
      .catch((err) => {

      })
  }, [badgeRef]);
  
  const savePngImage = useCallback(() => {
    if (ref.current === null) {
      return
    }
    
    contentLocalStorage.addNewContent(textContent.toJson());

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
                      <img src="/logo.png" width='50px' alt="logo" />
                  </IconButton>
                  <Typography variant="h6" color="inherit" component="div">
                      Programerat
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
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
                  <Box sx={{ margin: '0px 5px' }}>
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
              <Grid item xs={6} md={6}>
                  <br />
                  <Box style={{margin: '0px 5px'}}>
                      <ButtonGroup variant="outlined" aria-label="outlined button group" label="Size">
                          <Button onClick={getPreviousItemContent}><span className='material-icons'>arrow_left</span></Button>
                          <Button onClick={getNextItemContent}><span className='material-icons'>arrow_right</span></Button>
                      </ButtonGroup>
                      <ButtonGroup variant="outlined" aria-label="outlined button group" label="Size">
                          <Button onClick={cleanUpSavedContents}><span className='material-icons'>cleaning_services</span></Button>
                      </ButtonGroup>
                      <ButtonGroup variant="outlined" aria-label="outlined button group" label="Size">
                          <Button><span className='material-icons'>edit_note</span></Button>
                      </ButtonGroup>
                  </Box>
                  <br />
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
              </Grid>
              <Grid 
                  item 
                  xs={6}
                  md={6}
                  >
                  <br />
                  <div ref={ref} className={background + ' small'} style={{width: '445px'}} height="100%">
                      <PreviewCard content={writtenContent} code={code} language={language} theme={theme} />
                  </div>
              </Grid>
          </Grid>
    </>
  );
}

export default App;
