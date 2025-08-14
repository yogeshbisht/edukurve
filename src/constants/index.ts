import { HomeIcon, Layers2Icon, LayoutDashboardIcon } from "lucide-react";

const COMMON_MENU_ITEMS = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Courses",
    href: "/courses",
    icon: Layers2Icon,
  },
];

const USER_MENU_ITEMS = [
  ...COMMON_MENU_ITEMS,
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
];

const ADMIN_MENU_ITEMS = [
  ...COMMON_MENU_ITEMS,
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboardIcon,
  },
];

export { USER_MENU_ITEMS, ADMIN_MENU_ITEMS };
