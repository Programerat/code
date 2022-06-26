import {React, useState, useCallback, useRef, createRef} from 'react';
import Button from '@mui/material/Button';
import {AppBar, Box, ButtonGroup, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Toolbar, Typography } from '@mui/material';
import Highlight from 'react-highlight'
import "../node_modules/highlight.js/styles/atom-one-dark.css";
import { toPng, toSvg } from 'html-to-image';
import 'material-icons/iconfont/material-icons.css';
import DocsCard from './DocumentationCard';

const languages = [
  <MenuItem value="language-javascript">Javascript</MenuItem>,
  <MenuItem value="language-php">PHP</MenuItem>,
  <MenuItem value="language-css">CSS</MenuItem>,
];

const App = () => {
  const [language, setLanguage] = useState('language-php');
  const [icon, setIcon] = useState('');
  const [code, setCode] = useState('');
  const [beforeCodeText, setBeforeCodeText] = useState('');
  const [afterCodeText, setAfterCodeText] = useState('');

  const [background, setBackground] = useState('first');

  const ref = createRef();

  const handleChange = (event) => {
    setBackground(event.target.value);
  };

  const updateResult = (content) => {
    let beforeText = '';
    let allCode = '';
    let afterText = '';
    let texts = content.split(/\n/gm);

    let bfText = true;

    texts.forEach(text => {
      if (text === '') {
        return;
      }
      let textSplit = text.split(':');

      if(textSplit.length === 1 || textSplit.length > 2){
        allCode += text.trimEnd()+'\n';
      }

      if (textSplit.length === 2) {
        let tag = textSplit[0].trim();
        if (tag === 'code') {
          bfText = false;
          allCode += textSplit[1].trimEnd()+'\n';
        }

        if (tag === 'icon') {
          setIcon(textSplit[1].trimEnd());
        }

        if(bfText){
          beforeText += '<'+tag+'>'+textSplit[1].trim()+'</'+tag+'>';
        } else {
          afterText += '<'+tag+'>'+textSplit[1].trim()+'</'+tag+'>';
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
      link.download = 'image.svg';
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
        link.download = 'my-image-name.png'
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
            <img src="https://avatars.githubusercontent.com/u/37701908?s=400&u=769b3ec1ff8bcf66dbfaf207e6876dfd85ef4aa0&v=4" width='30px' alt="logo" />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Programerat
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
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

              <MenuItem className='second' value={'second'}>Secondary</MenuItem>
              <MenuItem className='third' value={'third'}>Third</MenuItem>
              <MenuItem className='fourth' value={'fourth'}>Fourth</MenuItem>
              <MenuItem className='fifth' value={'fifth'}>Fifth</MenuItem>
              <MenuItem className='sixth' value={'sixth'}>Sixth</MenuItem>
              <MenuItem className='seven' value={'seven'}>Seventh</MenuItem>
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
        <DocsCard />
      </Grid>
      <Grid 
        item 
        xs={10} 
        md={9}
        >
          <div ref={ref} className={background + ' small'} height="100%">
          <div
            dangerouslySetInnerHTML={{
              __html: beforeCodeText
            }}></div>
          <div
            className='icon'
            >
              { icon && <span class="representing-icon material-icons">{icon}</span> }
            </div>
          { code && <Highlight className={language + ' code'}>{code}</Highlight> }
          <div
            dangerouslySetInnerHTML={{
              __html: afterCodeText
            }}></div>
          </div>
          <Box mt={2}>
            <TextField
              multiline
              label="Your content here..."
              onKeyDown={handleKeyPress}
              onChange={(e) => {updateResult(e.target.value)}}
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
