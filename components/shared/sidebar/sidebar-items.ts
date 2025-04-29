// constants/sidebar-items.ts
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faBox, faChartBar, faGear, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export type SidebarItemType = {
    id: string;
    text: string;
    href: string;
    icon: IconDefinition;
};

export const SIDEBAR_ITEMS: SidebarItemType[] = [
    {
        id: "dashboard",
        text: "Dashboard",
        href: "/admin/dashboard",
        icon: faChartBar,
    },
    {
        id: "products",
        text: "Produkty",
        href: "/admin/products",
        icon: faBox,
    },
    {
        id: "orders",
        text: "Objednávky",
        href: "/admin/orders",
        icon: faShoppingCart,
    },
    {
        id: "settings",
        text: "Nastavení",
        href: "/admin/settings",
        icon: faGear,
    },
];
