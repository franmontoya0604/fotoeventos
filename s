import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
FiBook,
FiCreditCard,
FiEyeOff,
FiGrid,
FiHelpCircle,
FiInbox,
FiLayers,
FiLogOut,
FiPlus,
FiSettings,
FiShoppingCart,
FiThumbsDown,
FiTool,
} from "react-icons/fi";
import { AlbumListItem } from "../../components/admin/AlbumListItem";
import { useGetAlbums, getAlbums } from "../../hooks/albums";
import { authOptions } from "../api/auth/[...nextauth]";
import Layout from "./layout/index";
import { dehydrate, QueryClient } from "react-query";

const prisma = new PrismaClient();

const MenuLink = ({ title, icon }) => {
return (

<li>
<Link
        href="/admin"
        className="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group active-link">
<span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
{icon}
<span>{title}</span>
</Link>
</li>
);
};
export default function Home() {
const { data: session, status } = useSession();
const { data, isLoading } = useGetAlbums();
const [albums, setAlbums] = useState(data);

// TODO Mover esta lógica a un externo / redireccionar el unauthorized al login
if (status === "loading") {
return <p>Loading...</p>;
}

if (
status === "unauthenticated" &&
(session?.user?.isAdmin != true || session?.user?.isPhotographer != true)
) {
return <p>Access Denied</p>;
}
return (
<>

<Head>
<title>Panel Foto Eventos</title>
<meta name="description" content="Generated by create next app" />
<link rel="icon" href="/favicon.ico" />
</Head>
<div className="w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex">
<aside className="py-6 px-10 w-64 border-r border-gray-200">
<Image
            src="/vercel.svg"
            className="w-28"
            width={100}
            height={100}
            alt="Fotoeventos"
          />
<ul className="flex flex-col gap-y-6 pt-20">
<MenuLink title="Inicio" icon={<FiGrid className="w-6 h-6" />} />
<MenuLink title="Albums" icon={<FiBook className="w-6 h-6" />} />
<MenuLink
title="Ventas"
icon={<FiShoppingCart className="w-6 h-6" />}
/>
<MenuLink
title="Prepagos"
icon={<FiCreditCard className="w-6 h-6" />}
/>
</ul>
<ul className="flex flex-col gap-y-6 pt-20">
<MenuLink
title="Ayuda"
icon={<FiHelpCircle className="w-6 h-6" />}
/>
<MenuLink
title="Configuración"
icon={<FiSettings className="w-6 h-6" />}
/>
<MenuLink title="Salir" icon={<FiLogOut className="w-6 h-6" />} />
</ul>
</aside>
<main className="flex-1">
<div className="flex items-center justify-between py-7 px-10">
<div>
<h1 className="text-2xl font-semibold leading-relaxed text-gray-800">
Albums
</h1>
<p className="text-sm font-medium text-gray-500">
Albums del usuario
</p>
</div>
<button className="inline-flex ga-x-2 items-center py-2.5 px-6 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-1">
<FiPlus className="w-6 h-6" />
<span className="text-sm font-semibold tracking-wide">
Crear Album
</span>
</button>
</div>

          <ul className="flex gap-x-24 items-center px-4 border border-gray-200 border-y">
            <li>
              <button className="flex gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-indigo-600 relative group">
                <FiLayers className="w-6 h-6" />
                <span className="font-medium">Publicados</span>
                <span className="absolute w-full h-0.5 left-3 bg-indigo-600 rounded bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out" />
              </button>
            </li>
            <li>
              <button className="flex gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-indigo-600 relative group">
                <FiInbox className="w-6 h-6" />
                <span className="font-medium">Borradores</span>
                <span className="absolute w-full h-0.5 left-3 bg-indigo-600 rounded bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out" />
              </button>
            </li>
            <li>
              <button className="flex gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-indigo-600 relative group">
                <FiEyeOff className="w-6 h-6" />
                <span className="font-medium">Ocultos</span>
                <span className="absolute w-full h-0.5 left-3 bg-indigo-600 rounded bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out" />
              </button>
            </li>
            <li>
              <button className="flex gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-indigo-600 relative group">
                <FiThumbsDown className="w-6 h-6" />
                <span className="font-medium">Publicados</span>
                <span className="absolute w-full h-0.5 left-3 bg-indigo-600 rounded bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out" />
              </button>
            </li>
          </ul>
          {console.log(albums)}
          <table className="w-full ">
            <thead>
              <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                <td className="pl-10">Nombre del album</td>
                <td className="py-4 px-4 text-center">Fecha</td>
                <td className="py-4 px-4 text-center">Precio</td>
                <td className="py-4 px-4 text-center">Rendimiento</td>
                <td className="py-4 pr-10 pl-4 text-center">
                  <FiTool className="w-6 h-6" />
                </td>
              </tr>
            </thead>
            <tbody>{/* //listitem */}</tbody>
            {console.log(albums)}
            {albums.map((album, key) => (
              <AlbumListItem
                album={album}
                key={key}
                onRemove={handleRemove}
                setAlbums={setAlbums}
              />
            ))}
          </table>
        </main>
      </div>
    </>

);
}

Home.getLayout = function getLayout(page) {
return <Layout>{page}</Layout>;
};
export async function getServerSideProps(context) {
const queryClient = new QueryClient();

const session = await getServerSession(context.req, context.res, authOptions);
if (!session) {
//TODO redirect
}
dayjs.extend(utc);

await queryClient.prefetchQuery(["Albums"], () => getAlbums());

/_ const albums = albumsQry.map((album) => {
album.eventDate = dayjs(album.eventDate).utc().format("DD-MM-YYYY");
album.created = "";
album.updated = "";
return album;
});_/
return {
// Passed to the page component as props
props: {
// dehydrate query cache
dehydratedState: dehydrate(queryClient),
},
};
}
