import { blue } from '@mui/material/colors';

const _color = {
    gray_900: '#f2f3f5',
    gray_800: '#e2e3e5',
    gray_700: '#d2d3d5',
    gray_500: '#a2a3a5',
    gray_400: '#828385',
    gray_300: '#626365',
    gray_200: '#424345',
    gray_100: '#181313',
    blue_50: blue[50],
    blue_700: blue[700],
};

export const card = {
    title: {
        fontSize: '16px'
    }
};

export const button = {
    footer: {
        backgroundColor: '#fff',
        width: '100%',
        '&:hover': {
            backgroundColor: '#fff',
        },
        '&:active': {
            backgroundColor: '#fff',
        }
    }
};

export const color = {
    border_layout: _color.gray_500,
    bg_light: _color.gray_900,
    grad_dark_light: _color.gray_400,
    grad_dark_medium: _color.gray_300,
    grad_dark_dark: _color.gray_200,
    column_primary: _color.gray_700,
    column_secondary: _color.gray_800,
    column_tertiary: _color.gray_900,
    ..._color,
}

export const shadow = {
    medium: '0 0 8px 1px rgba(0, 0, 0, .25)',
};

export const shadow_line = {
    below: {
        background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 20%, rgba(0,0,0,0) 100%)'
    },
    above: {
        background: 'linear-gradient(0deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 20%, rgba(0,0,0,0) 100%)'
    }
} 

export const scroll_signifier_height = '12px';
export const scroll_signifier_base = {
    content: '""',
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0,
    opacity: 1,
    transition: 'opacity 150ms ease',
    height: scroll_signifier_height,
};

// export const scroll_signifier = {
//     below: {
//         position: 'relative',
//         '&:before': {
//             ...scroll_signifier_base,
//             ...shadow_line.below,
//             bottom: `-${scroll_signifier_height}`,
//         }
//     },
//     below_hidden: {
//         position: 'relative',
//         '&:before': {
//             ...scroll_signifier_base,
//             ...shadow_line.below,
//             bottom: `-${scroll_signifier_height}`,
//             opacity: 0,
//         }
//     },
//     above: {
//         position: 'relative',
//         '&:before': {
//             ...scroll_signifier_base,
//             ...shadow_line.above,
//             top: `-${scroll_signifier_height}`,
//         }
//     },
//     above_hidden: {
//         position: 'relative',
//         '&:before': {
//             ...scroll_signifier_base,
//             ...shadow_line.above,
//             top: `-${scroll_signifier_height}`,
//             opacity: 0,
//         }
//     }
// };

export const overflow_shadow = {
	top: {
        position: 'relative',
        '&:before': {
            ...scroll_signifier_base,
            ...shadow_line.below,
            top: 0,
        }
    },
    top_hidden: {
        position: 'relative',
        '&:before': {
            ...scroll_signifier_base,
            ...shadow_line.below,
            top: 0,
            opacity: 0,
        }
    },
    bottom: {
        position: 'relative',
        '&:after': {
            ...scroll_signifier_base,
            ...shadow_line.above,
            bottom: 0,	
        }
    },
    bottom_hidden: {
        position: 'relative',
        '&:after': {
            ...scroll_signifier_base,
            ...shadow_line.above,
            bottom: 0,
            opacity: 0
        }
    },
}