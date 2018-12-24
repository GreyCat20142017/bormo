import React from 'react';
import Button from '@material-ui/core/Button';

const BormoButtons = ({onModalSwitch}) => (
	<div>	
		 <Button variant='contained' color='primary'>  Primary </Button>
		 <Button variant='outlined' onClick={onModalSwitch}> Open Modal</Button>
		 <Button  variant='contained' color='secondary'>Secondary</Button>
	 </div>
);

export default BormoButtons;