import React from 'react';
import { useApp } from './App';

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
      padding: '16px',
    }}
  >
    {dummyItems.map((item, index) => (
      <div
        key={index}
        style= {{
          padding,
          borderRadius: '8px',
          backgroundColor: '#fff',
          display: 'flex',
          rowGap: '12px',
          flexDirection: 'column',
        }}
      >
        <div style={{fontSize: '20px'}}>{item.title}</div>
        <div style={{fontSize: '16px'}}>{item.body}</div>
      </div>
    ))}
  </div>
)

export const Column = ({header, children, footer, style}) => {
  const {state, dispatch} = useApp();
  const gridTemplateRows = `${header ? 'min-content ' : ''}1fr${footer ? ' min-content' : ''}`;
  return (
    <div
      style={{
        height: '100%',
        overflow: 'auto',
        display: 'grid',
        gridTemplateRows: `${header ? 'min-content ' : ''}1fr${footer ? ' min-content' : ''}`,
        ...(style && style)
      }}
    >
      {header && (
        <div>{header}</div>
      )}
      <div style={{overflow: 'auto'}}>
        {children}
      </div>
      {footer && (
        <div>{footer}</div>
      )}
    </div>
  )
}
