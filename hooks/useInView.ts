'use client'

import { useEffect, useRef, useState } from "react"

export default function useInView(options: IntersectionObserverInit) {
    const [inView, setInview] = useState<boolean>(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setInview(entry.isIntersecting);
        }, options);

        const currentElement = ref.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        //cleanup
        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        }

    }, [ref, options])

    return { ref, inView }
}