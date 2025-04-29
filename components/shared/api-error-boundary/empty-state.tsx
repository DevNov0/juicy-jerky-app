import { Button } from "@/components/ui/button/button";
import Link from "next/link";

interface Props {
    className?: string;
    title: string;
    description?: string;
    buttonHref?: string;
    buttonText?: string;
}

export function EmptyState(props: Props) {
    return (
        <div className={`mx-auto max-w-sm text-center ${props.className ?? ""}`}>
            <p className="text-neutral text-xl font-semibold dark:text-white">{props.title}</p>
            {!!props.description && <p className="mt-3 text-base text-gray-500">{props.description}</p>}
            {props.buttonHref && props.buttonText && (
                <Link href={props.buttonHref} passHref legacyBehavior>
                    <Button className="mt-6" variant="secondary">
                        {props.buttonText}
                    </Button>
                </Link>
            )}
        </div>
    );
}
