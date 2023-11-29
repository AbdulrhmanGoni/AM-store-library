export default function isElementInViewport(element: HTMLElement, fullAppearing?: boolean): boolean {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect[fullAppearing ? "bottom" : "top"] <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}