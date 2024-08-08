import { useModal } from "@ebay/nice-modal-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { dehydrate, QueryClient } from "react-query";
import { AlbumListItem } from "../../components/admin/AlbumListItem";
import TitleCard from "../../components/Cards/TitleCard";
import CreateAlbumModal from "../../components/modals/CreateAlbumModal";
import { getAlbums, useGetAlbums } from "../../hooks/albums";
import { authOptions } from "../api/auth/[...nextauth]";
import Layout from "./layout/index";

//const prisma = new PrismaClient();

const TopSideButtons = () => {
  const CreateAlbum = useModal(CreateAlbumModal);

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => CreateAlbum.show()}
      >
        Crear nuevo
      </button>
    </div>
  );
};

export default function Home() {
  const { data: session, status } = useSession();
  const { data, isLoading } = useGetAlbums();
  //const [albums, setAlbums] = useState(data);
  //const data = useQuery("albums", getAlbums);

  /* const handleRemove = ({ id }) => {
    const newAlbums = albums.filter((item) => item.id !== id);
    //queryClient.setQueryData("albums", newAlbums);
    setAlbums(newAlbums);
  };

  const handleEdit = (album) => {
    const newAlbums = albums.map((item) => {
      if (item.id == album.id) {
        item = album;
        item.eventDate = dayjs(item.eventDate).format("DD/MM/YYYY");
      }
      return item;
    });
    //queryClient.setQueryData("albums", newAlbums);
    setAlbums(newAlbums);
  };

  const handleCreate = (album) => {
    album.eventDate = dayjs(album.eventDate).format("DD/MM/YYYY");

    const newAlbums = albums.map((item) => {
      return item;
    });
    newAlbums.push(album);
    setAlbums(newAlbums);
  };*/

  // TODO Mover esta lógica a un externo / redireccionar el unauthorized al login
  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (
    status === "unauthenticated" &&
    (session?.user?.isAdmin != true || session?.user?.isPhotographer != true)
  ) {
    return <p>Access Denied</p>;
  }
  return (
    <>
      <TitleCard
        title="Albums"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call  */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center">Nombre</th>
                <th className="text-center">Fecha del evento</th>
                <th className="text-center">Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <div>loading...</div>
              ) : (
                data?.map((album, key) => (
                  <AlbumListItem album={album} key={key} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    //TODO redirect
  }

  dayjs.extend(utc);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("albums", getAlbums);

  /*
  const albumsQry = await prisma.album.findMany({
    where: {
      ownerId: session.user.id,
      status: {
        not: "DELETED",
      },
    },
  });

  const albums = albumsQry.map((album) => {
    album.eventDate = dayjs(album.eventDate).utc().format("DD/MM/YYYY");
    album.created = "";
    album.updated = "";
    return album;
  });*/
  return {
    // Passed to the page component as props
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
