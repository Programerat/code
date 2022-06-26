import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Paper } from '@mui/material';
import { Container } from '@mui/system';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function DocsCard() {
  return (
    <Container>
        <br />
        <Card>
        <CardContent>
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
                <Chip label="Type" /> 
                <Chip label=":" /> 
                <Chip label="Content" />
                <h4>Allowed types are:</h4>
                <ul>
                <li>h1,h2,h3,h4,h5,h6</li>
                <li>p</li>
                <li>code</li>
                <li>icon</li>
                </ul>
            </Typography>
            <Typography color="text">
                <h4>Example, try writing the following:</h4>
                <code>
                    h1: Hello World <br />
                    p: This is a paragraph <br />
                    code: {"<?php echo 'code here '; ?>"}<br />
                    icon:code
                </code>
                
            </Typography>
            <Typography color={"text.secondary"}>
                To export you can simply click the top right buttons (PNG or SVG)
            </Typography>
        </CardContent>
        </Card>
    </Container>
  );
}
