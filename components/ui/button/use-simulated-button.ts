import { KeyboardEventHandler, MouseEventHandler, useCallback } from "react";

interface Props<T extends HTMLElement> {
    analyticsCallback?: () => void;
    isClickable: boolean;
    isHyperlink: boolean;
    onClick?: MouseEventHandler<T>;
    onKeyDown?: KeyboardEventHandler<T>;
    onKeyUp?: KeyboardEventHandler<T>;
    isSubmitType?: boolean;
}

export function useSimulatedButton<T extends HTMLElement>({
    analyticsCallback,
    isClickable,
    isHyperlink,
    onClick,
    onKeyDown,
    onKeyUp,
    isSubmitType,
}: Props<T>) {
    const _onClick = useCallback<MouseEventHandler<T>>(
        (e) => {
            if ((isClickable || isHyperlink) && analyticsCallback) {
                analyticsCallback();
            }
            if (isClickable) {
                if (isSubmitType) {
                    const closestForm = document.activeElement?.closest("form");
                    if (closestForm) {
                        closestForm.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
                    }
                }
                if (onClick) {
                    onClick(e);
                }
            } else {
                e.preventDefault();
            }
        },
        [analyticsCallback, isClickable, isHyperlink, onClick, isSubmitType],
    );

    const _onKeyUp = useCallback<KeyboardEventHandler<T>>(
        (e) => {
            if (isClickable && (e.key === "Enter" || e.key === " ")) {
                e.target.dispatchEvent(
                    new MouseEvent("click", {
                        bubbles: true,
                        buttons: 1,
                        cancelable: true,
                        view: window,
                    }),
                );

                if (onKeyUp) {
                    onKeyUp(e);
                }
            }
        },
        [isClickable, onKeyUp],
    );

    const _onKeyDown = useCallback<KeyboardEventHandler<T>>(
        (e) => {
            if (isClickable && e.key === " ") {
                e.preventDefault();

                if (onKeyDown) {
                    onKeyDown(e);
                }
            }
        },
        [isClickable, onKeyDown],
    );

    return {
        onClick: _onClick,
        onKeyDown: _onKeyDown,
        onKeyUp: _onKeyUp,
    };
}
