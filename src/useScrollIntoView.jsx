import {useEffect} from 'react';

export const useScrollIntoView = (scrollRef, dataId, length) => {
    useEffect(() => {
        const elem = scrollRef.current && scrollRef.current.querySelector(`[data-id='${dataId}']`);
        if (elem) {
            elem.scrollIntoView({
                behavior: 'instant',
                block: 'center',
                inline: 'nearest'
            });
        }
    }, [length]); // eslint-disable-line
}