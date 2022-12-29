import { blue } from '@mui/material/colors';

const _color = {
    gray_900: '#f2f3f5',
    gray_800: '#e2e3e5',
    gray_700: '#d2d3d5',
    gray_500: '#a2a3a5',
    gray_400: '#828385',
    gray_300: '#626365',
    // gray_300: '#323335',
    gray_200: '#424345',
    gray_100: '#181313',
    blue_50: blue[50],
    blue_700: blue[700],
};

export const color = {
    border_layout: _color.gray_500,
    bg_light: _color.gray_900,
    grad_dark_light: _color.gray_400,
    grad_dark_medium: _color.gray_300,
    grad_dark_dark: _color.gray_200,
    ..._color,
}

export const shadow = {
    medium: '0 0 8px 1px rgba(0, 0, 0, .25)',
};

const shadow_line = {
    below: {
        background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)'
    },
    above: {
        background: 'linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)'
    }
} 

// export const scroll_signifier = {
//     // boxShadow: shadow.medium,
//     ...shadow_line.below,
//     position: 'relative',
//     zIndex: '1'
// };

const scroll_signifier_height = '8px';
const scroll_signifier_base = {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    opacity: 1,
    transition: 'opacity 150ms ease',
    height: scroll_signifier_height,
};
export const scroll_signifier = {
    below: {
        position: 'relative',
        '&:before': {
            ...scroll_signifier_base,
            ...shadow_line.below,
            bottom: `-${scroll_signifier_height}`,
        }
    },
    below_hidden: {
        position: 'relative',
        '&:before': {
            ...scroll_signifier_base,
            ...shadow_line.below,
            bottom: `-${scroll_signifier_height}`,
            opacity: 0,
        }
    },
    above: {
        position: 'relative',
        '&:before': {
            ...scroll_signifier_base,
            ...shadow_line.above,
            top: `-${scroll_signifier_height}`,
        }
    },
    above_hidden: {
        position: 'relative',
        '&:before': {
            ...scroll_signifier_base,
            ...shadow_line.above,
            top: `-${scroll_signifier_height}`,
            opacity: 0,
        }
    }

};