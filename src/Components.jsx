import React, { cloneElement, useEffect, useRef, useState } from 'react';
import { Box, Typography, Grid, Slider, Input, IconButton } from '@mui/material';
import { useApp } from './App';
import { color, overflow_shadow, scroll_signifier, scroll_signifier_base, scroll_signifier_height, shadow_line } from './styles';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export const InputSlider = ({label = "Slider label", value = 0, callback}) => {
	const [tempValue, setTempValue] = React.useState(value);
	const timeoutId = useRef(null);

	useEffect(() => {
		return () => {
			clearTimeout(timeoutId.current);	
			timeoutId.current = null;
		}
	}, []);

	const handleChange = (newValue, immediate) => {
		setTempValue(newValue);
		clearTimeout(timeoutId.current);
		timeoutId.current = setTimeout(() => {
			callback(newValue);
		}, immediate ? 0 : 750);
	}

	const handleSliderChange = (event, newValue) => {
		handleChange(newValue);
	};

	const handleInputChange = (event) => {
		handleChange(event.target.value === '' ? '' : Number(event.target.value));
	};

	const handleBlur = () => {
		if (tempValue < 0) {
			handleChange(0, true);
		} else if (tempValue > 100) {
			handleChange(100, true)
		}
	};
	const valueToUse = tempValue !== value ? tempValue : value;
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
						value={valueToUse}
						onChange={handleSliderChange}
						aria-labelledby="input-slider"
					/>
				</Grid>
				<Grid item>
					<Input
						value={valueToUse}
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

export const ColumnHeader = ({ children, sx, index}) => {
	const {state, dispatch} = useApp();
	const {expanded, collapsable} = state.expandedData.columns[index];
	const ref = useRef();
	const border = {borderBlockEnd: `solid 1px ${color.border_layout}`}
	const content = (
		<Box
			sx={{
				...(!collapsable &&  {
					backgroundColor: color.bg_light,
					...border
				}),
				padding: "8px 16px",
				position: 'relative',
				zIndex: 1,
				height: '48px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-start',
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
	if (collapsable) {
		return (
			<Box
				ref={ref}
				sx={{
					...(collapsable &&  {
						backgroundColor: color.bg_light,
						...border,
						padding: '0 8px'
					}),
					position: 'relative',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					overflow: 'auto'
				}}
			>
				{expanded && (
					<Box>{content}</Box>
				)}
				<Box sx={{padding: '4px 0', width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
					<IconButton
						variant=""
						aria-label="delete"
						onClick={() => {
							dispatch({
								type: 'TOGGLE_EXPANDED',
								value: index,
							})
						}}
					>
						{expanded ? <ChevronLeft /> : <ChevronRight />}
					</IconButton>
				</Box>
			</Box>
		)
	}
	return content;
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



export const Column = ({ header, children, footer, sx, outerSx, onToggleExpanded, isExpanded, index }) => {
	const { state, dispatch } = useApp();
	const {columns} = state.expandedData;
	const {expanded, width} = columns[index];
	const [topIntersecting, setTopIntersecting] = useState(false);
	const [bottomIntersecting, setBottomIntersecting] = useState(false);
	const ref = useRef(null);
	const refTop = useRef(null);
	const refBottom = useRef(null);
	const callback = (entries, observer) => {
		entries.forEach(entry => {
			// console.log(entry);
			entry.target === refTop.current
				? setTopIntersecting(entry.isIntersecting)
				: setBottomIntersecting(entry.isIntersecting)
		});
	}
	useEffect(() => {
		const options = { root: ref.current, margin: 0 };
		const observerTop = new IntersectionObserver(callback, options);
		const observerBottom = new IntersectionObserver(callback, options);
		refTop.current && observerTop.observe(refTop.current);
		refBottom.current && observerTop.observe(refBottom.current);
		return () => {
			observerTop.disconnect();
			observerBottom.disconnect();
		}
	}, []);
	const hiddenStyle = {
		visibility: 'hidden',
		pointerEvents: 'none'
	};
	return (
		<Box
			sx={{
				height: '100%',
				overflowX: 'hidden',
				overflowY: 'auto',
				display: 'flex',
				flexDirection: 'column',
				width,
				...(index < columns.length - 1 && {borderInlineEnd: `1px solid ${color.border_layout}`}),
				...(sx && sx)
			}}
		>
			
			{header && (
				<Box>
					{header ? (
						cloneElement(header, {index, index})
					) : null
					}
				</Box>
			)}
			<Box ref={ref}
				sx={{
					overflow: 'hidden',
					flexGrow: 1,
					position: 'relative',
					...(topIntersecting ? overflow_shadow.top_hidden : overflow_shadow.top),
					...(bottomIntersecting ? overflow_shadow.bottom_hidden : overflow_shadow.bottom),
					...(!expanded && hiddenStyle)
				}}
			>
				<Box
					sx={{
						overflow: 'auto',
						padding: '0 16px',
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
					}}
				>
					<Box ref={refTop}/>
						<Box sx={{padding: '16px 0'}}>
							{children}
						</Box>
					<Box ref={refBottom}/>
				</Box>
			</Box>
			{footer && (
				<Box
					sx={{
						...(!expanded && hiddenStyle)
					}}
				>
					{footer}
				</Box>
			)}
		</Box>
	)
}
