"use client";

import { useLogErrorWithMessage } from "@/app/services/error-service/use-log-error-with-message";
import { EmptyState } from "@/components/shared/api-error-boundary/empty-state";
import { Loader } from "@/components/shared/api-error-boundary/loader";
import React, { ReactNode } from "react";

interface Props<T extends any[] | any> {
    children: (data: NonNullable<T>) => ReactNode;
    data: T;
    error: Error | null;
    loading: boolean;
    title?: string;
    className?: string;
    nested?: boolean;
}

export function ApiErrorBoundary<T extends any[] | any>({
    children,
    data,
    error,
    loading,
    title,
    className,
    nested = false,
}: Props<T>) {
    useLogErrorWithMessage(error);

    if (!data && loading) {
        return nested ? (
            <div className={`flex h-80 w-full items-center justify-center ${className ?? ""}`}>
                <Loader />
            </div>
        ) : (
            <div className={`flex justify-center py-20 ${className ?? ""}`}>
                <Loader />
            </div>
        );
    }

    if (error || !data) {
        return (
            <EmptyState
                className={className}
                title={title ?? "Nastala chyba"}
                description="Někde se něco pokazilo. Zkuste to znovu."
            />
        );
    }

    return children(data);
}
