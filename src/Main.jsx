import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useApp } from './App';
import { Strategies } from './Strategies';
import { color } from './styles';

const TopNav = () => {
    const { state, dispatch } = useApp();
    const { primaryNav } = state;
    const tabs = [
        { text: 'Explore', value: 'explore' },
        { text: 'Strategies', value: 'strategies' },
        { text: 'Compare', value: 'compare' }]
    return (
        <Box
            style={{
                position: 'relative',
                padding: '0 16px 0 0',
                zIndex: 2,
                backgroundColor: '#fff',
                display: 'flex',
                borderBlockEnd: `solid 1px ${color.border_layout}`,
            }}
        >
            <Typography
                variant="h6"
                onClick={() => {
                    dispatch({
                        type: 'LOG_STATE'
                    })
                }}
                sx={{
                    color: '#fff',
                    padding: '0px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    background: color.gray_300,
                    background: `linear-gradient(180deg, ${color.grad_dark_light} 0%, ${color.grad_dark_medium} 50%, ${color.grad_dark_dark} 50%, ${color.grad_dark_light} 100%)`,
                }}
            >
                FOCOS
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'flex-end',
                    // order: 0,
                }}
            >


                <Tabs
                    value={primaryNav}
                    onChange={() => { }}
                    aria-label="main navigation tabs"
                >
                    {tabs.map(({ text, value }) => (
                        <Tab
                            label={text}
                            key={text}
                            value={value}
                            {...(primaryNav !== value && {
                                onClick: () => {
                                    dispatch({
                                        type: 'SET_NAV',
                                        value: {
                                            primaryNav: value
                                        }
                                    })
                                }
                            })}
                        >
                            {text}
                        </Tab>
                    ))}
                </Tabs>
            </Box>
        </Box>
    )
}

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

const MainDialog = () => {
    const { state, dispatch } = useApp();
    const { dialogData } = state;
    const {isOpen, title, body, actions, componentName} = dialogData || {};
    const CustomComponent = {
        addStrategy: AddStrategyDialogContent,
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

export const Main = () => {
    const { state } = useApp();
    const { primaryNav } = state;
    const MainContent = {
        'explore': () => <Box sx={{ padding: '16px' }}><Typography><em>{'Explore flow goes here'}</em></Typography></Box>,
        'strategies': Strategies,
        'compare': () => <Box sx={{ padding: '16px' }}><Typography><em>{'Compare flow goes here'}</em></Typography></Box>,
    }[primaryNav];
    return (
        <div
            style={{
                height: '100vh',
                overflow: 'auto',
                display: 'grid',
                gridTemplateRows: 'min-content 1fr',
            }}
        >
            <TopNav />
            <div
                style={{
                    backgroundColor: '#ccc',
                    overflow: 'auto'
                }}
            >
                <MainContent />
            </div>
            <MainDialog />
        </div>
    );
}
