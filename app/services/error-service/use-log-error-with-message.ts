import { useEffect, useRef } from "react";
import { ErrorService } from "./error-service";

export function useLogErrorWithMessage(error: any) {
    const reported = useRef("");

    useEffect(() => {
        if (error && reported.current !== JSON.stringify(error)) {
            ErrorService.logError(error);
            ErrorService.handleError(error);

            reported.current = JSON.stringify(error);
        }
    }, [error]);
}
