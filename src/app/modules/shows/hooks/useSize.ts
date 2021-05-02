import { useEffect, useRef, useState } from 'react';

export const useSize = () => {
    const elementRef = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(elementRef.current.clientWidth);
    }, [elementRef.current]);

    return { width, elementRef };
};
