import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
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
                padding: '0 16px',
                zIndex: 2,
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'flex-end',
                borderBlockEnd: `solid 1px ${color.border_layout}`,
            }}
        >
            <Typography
                variant="h6"
                style={{
                    color: '#fff',
                    padding: '0px 10px',
                    borderRadius: '16px',
                    margin: '8px 0',
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
                    justifyContent: 'flex-end'
                }}
            >

                <Tabs
                    value={primaryNav}
                    onChange={() => {}}
                    aria-label="main navigation tabs"
                >
                    {tabs.map(({text, value}) => (
                        <Tab
                            label={text}
                            key={text}
                            value={value}
                            disabled={['explore', 'compare'].includes(value)}
                            {...(primaryNav !== value && {onClick: () => {
                                dispatch({
                                    type: 'SET_NAV',
                                    value: {
                                        primaryNav: value
                                    }
                                })
                            }})}
                        >
                            {text}
                        </Tab>
                    ))}
                </Tabs>
            </Box>
        </Box>
    )
}

export const Main = () => {
    const { state, dispatch } = useApp();
    const { primaryNav } = state;
    const MainContent = {
        'explore': () => <div>{'Explore'}</div>,
        'strategies': Strategies,
        'compare': () => <div>{'Compare'}</div>,
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
        </div>
    );
}
