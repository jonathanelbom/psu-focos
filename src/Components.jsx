import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Grid, Slider, Input } from '@mui/material';
import { useApp } from './App';
import { color, scroll_signifier, shadow } from './styles';

export const padding = '16px';

const dummyItems = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'.split('. ').map((item) => {
	const parts = item.split(' ');
	return {
		title: parts.slice(0, 3).join(' '),
		body: parts.slice(3).join(' '),
	}
});

export const DummyContent = () => (
	<div
		style={{
			display: 'flex',
			rowGap: '16px',
			flexDirection: 'column',
			// padding: '16px',
		}}
	>
		{dummyItems.map((item, index) => (
			<div
				key={index}
				style={{
					padding,
					borderRadius: '8px',
					backgroundColor: '#fff',
					display: 'flex',
					rowGap: '12px',
					flexDirection: 'column',
				}}
			>
				<div style={{ fontSize: '20px' }}>{item.title}</div>
				<div style={{ fontSize: '16px' }}>{item.body}</div>
			</div>
		))}
	</div>
)


export const InputSlider = ({label = "Slider label", _value = 0, callback}) => {
	const [value, setValue] = React.useState(_value);
	const doSetValue = (newValue) => {
		setValue(newValue);
	}
	const handleSliderChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleInputChange = (event) => {
		setValue(event.target.value === '' ? '' : Number(event.target.value));
	};

	const handleBlur = () => {
		let newValue = value;
		if (value < 0) {
			newValue = 0;
		} else if (value > 100) {
			newValue = 100;
		}
		doSetValue(newValue);
	};

	return (
		<Box
			sx={{
				padding: '8px 16px',
				backgroundColor: '#fff',
				borderRadius: '8px',
			}}
		>
			<Typography id="input-slider" gutterBottom variant='body2'>
				{label}
			</Typography>
			<Grid container spacing={2} alignItems="center">
				<Grid item xs>
					<Slider
						value={typeof value === 'number' ? value : 0}
						onChange={handleSliderChange}
						aria-labelledby="input-slider"
					/>
				</Grid>
				<Grid item>
					<Input
						value={value}
						size="small"
						onChange={handleInputChange}
						onBlur={handleBlur}
						inputProps={{
							step: 1,
							min: 0,
							max: 100,
							type: 'number',
							'aria-labelledby': 'input-slider',
						}}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}

export const TextArea = ({ value, callback, sx }) => {
	const [tempValue, setSetValue] = useState('');

	return (
		<Box
			contentEditable
			onBlur={() => { }}
		>

		</Box>
	)
}

export const ColumnHeader = ({ children, sx }) => {
	return (
		<Box
			sx={{
				backgroundColor: color.bg_light,
				padding: "8px 16px",
				position: 'relative',
				zIndex: 1,
				borderBlockEnd: `solid 1px ${color.border_layout}`,
				height: '48px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				textTransform: 'uppercase',
				fontSize: '14px',
				...(sx && sx)

			}}
		>
			{typeof children === 'string' && (
				<Typography variant='body'>{children}</Typography>
			)}
			{typeof children !== 'string' && children}
		</Box>
	);
}

export const ColumnFooter = ({ children, sx }) => {
	return (
		<Box
			sx={{
				backgroundColor: color.bg_light,
				borderBlockStart: `1px solid ${color.border_layout}`,
				padding: "12px 16px",
				position: 'relative',
				zIndex: 1,
				display: 'flex',
				justifyContent: 'center',
				...(sx && sx),

			}}
		>
			{children}
		</Box>
	);
}

export const Column = ({ header, children, footer, style }) => {
	// const gridTemplateRows = `${header ? 'min-content ' : ''}1fr${footer ? ' min-content' : ''}`;
	const { state, dispatch } = useApp();
	const [topIntersecting, setTopIntersecting] = useState(false);
	const [bottomIntersecting, setBottomIntersecting] = useState(false);
	const ref = useRef(null);
	const refTop = useRef(null);
	const refBottom = useRef(null);
	const callback = (entries, observer) => {
		entries.forEach(entry => {
			entry.target === refTop.current
				? setTopIntersecting(entry.isIntersecting)
				: setBottomIntersecting(entry.isIntersecting)
		});
	}
	useEffect(() => {
		const options = { root: ref.current };
		const observerTop = new IntersectionObserver(callback, options);
		const observerBottom = new IntersectionObserver(callback, options);
		refTop.current && observerTop.observe(refTop.current);
		refBottom.current && observerTop.observe(refBottom.current);
		return () => {
			observerTop.disconnect();
			observerBottom.disconnect();
		}
	}, []);
	return (
		<Box
			sx={{
				height: '100%',
				overflow: 'auto',
				display: 'flex',
				flexDirection: 'column',
				// display: 'grid',
				// gridTemplateRows: `${header ? 'min-content ' : ''}1fr${footer ? ' min-content' : ''}`,
				...(style && style)
			}}
		>
			{header && (
				<Box sx={{ ...(topIntersecting ? scroll_signifier.below_hidden : scroll_signifier.below) }}>
					{header}
				</Box>
			)}
			<Box ref={ref} style={{ overflow: 'auto', padding: '16px', flexGrow: 1 }}>
				<Box ref={refTop} />
				{children}
				<Box ref={refBottom} />
			</Box>
			{footer && (
				<Box sx={{ ...(bottomIntersecting ? scroll_signifier.above_hidden : scroll_signifier.above) }}>
					{footer}
				</Box>
			)}
		</Box>
	)
}
