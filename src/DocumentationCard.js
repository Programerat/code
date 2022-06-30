import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}


import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Chip, Paper } from '@mui/material';
import { Container } from '@mui/system';

export default function DocsCard() {
    //select text from div and copy
    const copyText = (text) => {
        let textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
    }
  return (
    <Container>
        <Card>
            <CardContent style={{background: '#eee'}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    How to
                </Typography>
                <Typography variant="h6" component="div">
                    There are types of text that you can add and code.
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    To add a type with some value you need to do in the following format:
                </Typography>
                <Typography variant="body2">
                    Format:
                </Typography>
                <Chip label="Type" /> 
                <Chip label=":" /> 
                <Chip label="Content" />
                <h4>Allowed types are:</h4>
                <ul>
                    <li>h1,h2,h3,h4,h5,h6</li>
                    <li>p</li>
                    <li>icon</li>
                    <li>div.class</li>
                </ul>
                
                <h4>Example, try writing the following:</h4>
                <pre
                    style={ {background: '#eee', color: '#333', padding: '5px'}}
                    onClick={(e) => copyText(e.target.textContent)}
                >
                    h1: Hello World <br />
                    p: This is a paragraph<br />
                    ```<br />
                    {"<?php echo 'code here '; ?>"}<br />
                    ```<br />
                    icon:code <br />
                    div.white card: Super content
                </pre>
                <br />
                All the icons you can use from the <a href="https://fonts.google.com/icons">Material fonts</a>.
                <br />
                <Typography color={"text.primary"}>
                    To export you can simply click the top right buttons (PNG or SVG)
                </Typography>
            </CardContent>
        </Card>
    </Container>
  );
}
