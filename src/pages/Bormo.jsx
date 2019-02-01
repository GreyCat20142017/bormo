import React from 'react';

const Bormo = ({content}) => (
	<div className='bormo__wrapper'>
    <ul>
      {content.map((item, ind) => <li key={ind}>{item.english}</li>)}
    </ul>

	</div>
);

export default Bormo;
