import * as React from "react";
import { Container } from "react-dom";

export default function useScrollToBottomAction(
    container: Document ,
    callback: () => void,
    offset = 0
) {
    const callbackRef = React.useRef(callback);

    React.useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    React.useEffect(() => {
        if (!container) return;
        const handleScroll = () => {
        let scrollContainer  =
            (container === document ? document.scrollingElement : container) as HTMLElement

        if (
            scrollContainer &&
            scrollContainer.scrollTop + scrollContainer.clientHeight >=
            scrollContainer.scrollHeight - offset
        ) {
            callbackRef.current();
        }
        };

        container.addEventListener("scroll", handleScroll);

        return () => {
        container.removeEventListener("scroll", handleScroll);
        };
    }, [container, offset]);
}