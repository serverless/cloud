import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const Input = styled('input')({
    display: 'none',
});

export const UploadButton = (props) => {
    return (
        <label htmlFor="icon-button-file">
            <Input onChange={props.onFileChange} accept="image/*" id="icon-button-file" type="file" />
            <IconButton size='large' style={{ justifyContent: 'center', minWidth: '50px', minHeight: '50px', color: '#fd5750', backgroundColor: 'black'}} aria-label="upload picture" component="span">
                <PhotoCamera />
            </IconButton>
        </label>
    )
}
