import React, { useState, useRef } from 'react';

const BookEditPage = (props) =>{
    const flag = props.history.location.state?.isAddOrUpdate || null;

    return (
        <div>
            ##########################{flag}
        </div>
    )
}

export default BookEditPage;