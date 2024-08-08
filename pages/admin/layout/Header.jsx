import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  const pageTitle = "Panel de fotógrafo";
  const currentTheme = "dark";
  const noOfNotifications = 1;
  return (
    <>
      <div className="navbar  flex justify-between bg-base-100  z-10 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}
        <div className="">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden">
            <Bars3Icon className="h-5 inline-block w-5" />
          </label>
          <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
        </div>

        <div className="order-last">
          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={session?.user?.image} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Perfil
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Configuración</a>
              </li>
              <div className="divider mt-0 mb-0"></div>
              <li>
                <a onClick={() => signOut({ callbackUrl: "/" })}>Salir</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
