import React from 'react';
import Typography from '@material-ui/core/Typography';

const ArrayTextRenderer = ({text}) => (
  text.map((paragraph, ind) => (paragraph === '' ? <Typography key={ind}>&nbsp; </Typography> :
    <Typography component={'p'} variant='body2' key={ind}> {paragraph} </Typography>)
  ));

const SimpleTextRenderer = ({text}) => (
  <Typography component={'p'} variant='body2'> {text} </Typography>
);

const TextRenderer = ({text}) => (
  Array.isArray(text) ?
    <ArrayTextRenderer text={text}/> :
    <SimpleTextRenderer text={text}/>
);

export default TextRenderer;
