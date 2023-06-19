import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useApp } from './App';

const AddStrategyDialogContent = ({onCloseDialog}) => {
    const { state, dispatch } = useApp();
    const { dialogData } = state;
    const {isOpen, title, body, actions, componentName} = dialogData || {};
    const [name, setName] = useState('Strategy');
    const [description, setDescription] = useState('A description of this strategy');
    return (
        <>
            <DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection:'column',
                        paddingTop: '4px',
                        rowGap: '16px',
                        minWidth: '400px'
                    }}
                >
                    <TextField
                        id="outlined-multiline-static"
                        label="Name"
                        multiline
                        rows={1}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseDialog}>Cancel</Button>
                {actions && actions.map(({label, action}, i) => (
                    <Button
                        key={`${label}-${i}`}
                        autoFocus
                        onClick={(e) => {
                            onCloseDialog(e, label)
                            dispatch({
                                type: action.type,
                                value: {
                                    name,
                                    description,
                                }
                            });
                        }}
                    >
                        {label}
                    </Button>
                ))}
            </DialogActions>
        </>
    )
}

const AddModelDialogContent = ({onCloseDialog}) => {
    const { state, dispatch } = useApp();
    const { dialogData } = state;
    const {isOpen, title, body, actions, componentName} = dialogData || {};
    const [name, setName] = useState('Model');
    const [description, setDescription] = useState('A description of this model');
    return (
        <>
            <DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection:'column',
                        paddingTop: '4px',
                        rowGap: '16px',
                        minWidth: '400px'
                    }}
                >
                    <TextField
                        id="outlined-multiline-static"
                        label="Name"
                        multiline
                        rows={1}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseDialog}>Cancel</Button>
                {actions && actions.map(({label, action}, i) => (
                    <Button
                        key={`${label}-${i}`}
                        autoFocus
                        onClick={(e) => {
                            onCloseDialog(e, label)
                            dispatch({
                                type: action.type,
                                value: {
                                    name,
                                    description,
                                }
                            });
                        }}
                    >
                        {label}
                    </Button>
                ))}
            </DialogActions>
        </>
    )
}

export const MainDialog = () => {
    const { state, dispatch } = useApp();
    const { dialogData } = state;
    const {isOpen, title, body, actions, componentName} = dialogData || {};
    const CustomComponent = {
        addStrategy: AddStrategyDialogContent,
        addModel: AddModelDialogContent,
    }[componentName];
    const onCloseDialog = (e, reason) => {
        dispatch({
            type: 'SET_DIALOG_DATA',
            value: {
                ...dialogData,
                isOpen: false
            }
        });
    }
    return (
        <Dialog
            open={!!isOpen}
            onClose={onCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {title && (
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
            )}
            {body && (
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {body}
                    </DialogContentText>
                </DialogContent>
            )}
            {CustomComponent && (
                <CustomComponent onCloseDialog={onCloseDialog}/>
            )}
            {!CustomComponent && (
                <DialogActions>
                    <Button onClick={onCloseDialog}>Cancel</Button>
                    {actions && actions.map(({label, action}, i) => (
                        <Button
                            key={`${label}-${i}`}
                            autoFocus
                            onClick={(e) => {
                                onCloseDialog(e, label)
                                dispatch(action);
                            }}
                        >
                            {label}
                        </Button>
                    ))}
                </DialogActions>
            )}
        </Dialog>
    );
}