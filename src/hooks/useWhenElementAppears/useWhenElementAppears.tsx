import { useEffect } from 'react'
import isElementInViewport from "./isElementInViewport";

export interface AppearingOptions {
    fullAppearing?: boolean
    scrollElementId?: string
}

export default function useWhenElementAppears(elementId: string, callback: () => void, options?: AppearingOptions): void {

    function appearingMonitor() {
        const targetElement = document.getElementById(elementId);
        if (targetElement && isElementInViewport(targetElement, options?.fullAppearing)) {
            callback();
            targetElement.removeAttribute("id");
        }
    }

    useEffect(() => {
        let scrollElement: HTMLElement | Document = document;
        if (options?.scrollElementId) {
            const customScrollElement = document.getElementById(options.scrollElementId);
            if (customScrollElement) {
                scrollElement = customScrollElement;
            }
        }

        scrollElement.addEventListener('scroll', appearingMonitor);
        scrollElement.addEventListener('resize', appearingMonitor);
        appearingMonitor();

        return () => {
            scrollElement.removeEventListener('scroll', appearingMonitor);
            scrollElement.removeEventListener('resize', appearingMonitor);
        }
    }, [elementId])
}