import React from 'react';
import { Notification } from '@mantine/core';
import { IconCheck, } from '@tabler/icons-react';

const SuccessPopup = (props:{message:string}) => {
    return (
        <div>
        <Notification className="fixed top-20 right-4 p-4  text-white rounded-md shadow" icon={<IconCheck size="1.1rem" />} color="teal" title="Teal notification">
        {props.message}
      </Notification>
      </div>
    );
};

export default SuccessPopup;