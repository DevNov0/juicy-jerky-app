import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface SidebarItemProps {
    href: string;
    icon: IconDefinition;
    text: string;
    active?: boolean;
}

export function SidebarItem({ href, icon, text, active }: SidebarItemProps) {
    return (
        <li>
            <Link href={href}>
                <div
                    className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${active ? "bg-indigo-100 text-indigo-800" : "text-gray-700 hover:bg-gray-100"}`}
                >
                    <FontAwesomeIcon icon={icon} className="h-5 w-5" />
                    <span className="text-sm">{text}</span>
                </div>
            </Link>
        </li>
    );
}
