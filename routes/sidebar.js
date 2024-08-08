/** Icons are imported separatly to reduce build time */
import BookOpenIcon from "@heroicons/react/24/outline/BookOpenIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import ShoppingCartIcon from "@heroicons/react/24/outline/ShoppingCartIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/admin/",
    icon: <Squares2X2Icon className={iconClasses} />,

    name: "Inicio",
  },
  {
    path: "/admin/albums",

    icon: <BookOpenIcon className={iconClasses} />,
    name: "Albums",
  },
  {
    path: "/app/icons",
    icon: <ShoppingCartIcon className={iconClasses} />,
    name: "Ventas",
  },
  {
    path: "/admin/prepaid",
    icon: <CreditCardIcon className={iconClasses} />,
    name: "Prepagos",
  },
  // {
  //   path: "/app/notifications",
  //   icon: <BellIcon className={iconClasses} />,
  //   name: "Notifications",
  // },
  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <Square2StackIcon className={`${iconClasses} inline`} />, // icon component
  //   name: "Pages", // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: "/register", //url
  //       icon: <UserCircleIcon className={submenuIconClasses} />, // icon component
  //       name: "Register", // name that appear in Sidebar
  //     },
  //     {
  //       path: "/forgot-password",
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: "Forgot Password",
  //     },
  //     {
  //       path: "/app/blank",
  //       icon: <DocumentIcon className={submenuIconClasses} />,
  //       name: "Blank Page",
  //     },
  //     {
  //       path: "/app/404",
  //       icon: <ExclamationTriangleIcon className={submenuIconClasses} />,
  //       name: "404",
  //     },
  //   ],
  // },
];

export default routes;
