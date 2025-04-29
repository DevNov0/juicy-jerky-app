"use client";

import { SidebarItem } from "@/components/shared/sidebar/sidebar-item";
import { SIDEBAR_ITEMS } from "@/components/shared/sidebar/sidebar-items";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";

export function SidebarComponent() {
    const pathname = usePathname();

    return (
        <Sidebar>
            {SIDEBAR_ITEMS.map((item) => (
                <SidebarItem
                    key={item.id}
                    href={item.href}
                    text={item.text}
                    icon={item.icon}
                    active={pathname.startsWith(item.href)}
                />
            ))}
        </Sidebar>
    );
}
