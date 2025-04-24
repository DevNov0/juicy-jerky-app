import { isNotNil } from "@/app/utils/is-not-nil";
import clsx from "clsx";
import { AnchorHTMLAttributes } from "react";
import { useSimulatedButton } from "./use-simulated-button";

export interface UseAnchorProps {
    analyticsCallback?: () => void;
    isDisabled?: boolean;
    type?: "submit";
}

export function useAnchorProps<T extends AnchorHTMLAttributes<HTMLAnchorElement>>({
    ["aria-busy"]: ariaBusy,
    ["aria-disabled"]: ariaDisabled,
    analyticsCallback,
    className,
    isDisabled,
    download,
    href,
    hrefLang,
    media,
    onClick,
    onKeyDown,
    onKeyUp,
    ping,
    referrerPolicy,
    rel,
    role,
    tabIndex,
    target,
    type,
    ...restProps
}: UseAnchorProps & T): T {
    const isBusy = Boolean(ariaBusy);
    const isDisabledOrAriaDisabled = Boolean(isDisabled || ariaDisabled);
    const isBusyOrDisabled = isBusy || isDisabledOrAriaDisabled;
    const isSubmitType = type === "submit";
    const isButton = isSubmitType || isNotNil(onClick);
    const tabIndexInteractive = isBusyOrDisabled ? -1 : tabIndex;

    const _className = [isBusy && "is-loading", isDisabledOrAriaDisabled && "is-disabled", className];

    const simulatedButton = useSimulatedButton({
        analyticsCallback,
        isClickable: !isBusyOrDisabled || isButton,
        isHyperlink: !isBusyOrDisabled || Boolean(href),
        onClick,
        onKeyDown,
        onKeyUp,
        isSubmitType,
    });

    if (href) {
        return {
            "aria-busy": isBusy,
            "aria-disabled": isDisabledOrAriaDisabled,
            className: clsx(!isBusyOrDisabled && "is-hoverable", ..._className),
            download,
            href,
            hrefLang,
            media,
            onClick: simulatedButton.onClick,
            onKeyDown: simulatedButton.onKeyDown,
            onKeyUp: simulatedButton.onKeyUp,
            ping,
            referrerPolicy,
            rel: target === "_blank" ? (rel ? `noopener noreferrer ${rel}` : "noopener noreferrer") : rel,
            role: role || (isButton ? "button" : undefined),
            tabIndex: tabIndexInteractive,
            target,
            ...restProps,
        } as T;
    }

    if (isButton) {
        return {
            "aria-busy": isBusy,
            "aria-disabled": isDisabledOrAriaDisabled,
            className: clsx(!isBusyOrDisabled && "is-hoverable", ..._className),
            onClick: simulatedButton.onClick,
            onKeyDown: simulatedButton.onKeyDown,
            onKeyUp: simulatedButton.onKeyUp,
            role: role || "button",
            tabIndex: tabIndexInteractive ?? 0,
            ...restProps,
        } as T;
    }

    return {
        className: clsx(..._className),
        role: role || "none",
        tabIndex,
        ...restProps,
    } as T;
}
