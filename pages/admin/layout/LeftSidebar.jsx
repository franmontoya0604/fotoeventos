import Link from "next/link";
import routes from "../../../routes/sidebar";
import SidebarSubmenu from "./SidebarSubmenu";

function LeftSidebar() {
    const location = {};
    return (
        <div className="drawer-side ">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="menu  pt-2 w-80 bg-base-100 text-base-content">
                <li className="mb-2 pl-4 pr-4 font-semibold text-xl">
                    <Link href={"/admin/"}>
                        <img className="w-full" src="/logo-red.png" alt="DashWind Logo" />
                    </Link>{" "}
                </li>
                {routes.map((route, k) => {
                    return (
                        <li className="" key={k}>
                            {route.submenu ? (
                                <SidebarSubmenu {...route} />
                            ) : (
                                <Link
                                    href={route.path}
                                    className={({ isActive }) =>
                                        `${isActive ? "font-semibold  bg-base-200 " : "font-normal"
                                        }`
                                    }
                                >
                                    {route.icon} {route.name}
                                    {location.pathname === route.path ? (
                                        <span
                                            className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                            aria-hidden="true"
                                        ></span>
                                    ) : null}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default LeftSidebar;
