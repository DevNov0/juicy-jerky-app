"use client";

import { UseAnchorProps, useAnchorProps } from "@/components/ui/button/use-anchor-props";
import { clsx } from "clsx";
import React, { AnchorHTMLAttributes, ElementType, forwardRef } from "react";
import "./button.css";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonColor = "default" | "danger" | "success";

export interface ButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "type">, UseAnchorProps {
    as?: ElementType;
    variant?: ButtonVariant;
    size?: ButtonSize;
    color?: ButtonColor;
    isFullWidth?: boolean;
    isIconButton?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    className?: string;
}

export const Button = forwardRef<HTMLAnchorElement, ButtonProps>((props, ref) => {
    const {
        as: Component = "a",
        variant,
        size,
        color,
        isFullWidth,
        isDisabled,
        className,
        children,
        ...restProps
    } = props;

    const anchorProps = useAnchorProps({
        ...restProps,
        isDisabled,
        ref,
        className: clsx(
            "button",
            `button--variant-${variant ?? "primary"}--color-${color ?? "default"}`,
            `button--size-${size ?? "md"}`,
            isDisabled && "button--is-disabled",
            isFullWidth && "button--full-width",
            className,
        ),
    });

    return (
        <Component {...anchorProps}>
            {typeof children === "string" ? <span className="button__text">{children}</span> : children}
        </Component>
    );
});

Button.displayName = "Button";
