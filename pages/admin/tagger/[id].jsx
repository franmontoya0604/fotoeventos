import axios from "axios";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import ModPhotoCard from "../../../components/admin/ModPhotoCard";
import Layout from "../layout/index";

export default function Tagger({ id }) {
  const { ref, inView } = useInView();
  const router = useRouter();
  id = router.query.id;

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["photos", id],
    async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `/api/albums/${id}/photos?cursor=` + pageParam
      );
      return res.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    }
  );
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, id]);
  return (
    <div>
      {/* <div class="grid grid-flow-col gap-4 auto-cols-auto"> */}
      <div class="flex flex-wrap gap-3">
        {data?.pages.map((page) => (
          <Fragment key={page.nextId}>
            {page.photos.map((photo) => (
              <ModPhotoCard photo={photo} key={photo.id} />
              // <div key={photo.id}> {photo.id}</div>
            ))}
          </Fragment>
        ))}
      </div>
      <div>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Cargando..."
            : hasNextPage
              ? "Cargar nuevos"
              : "No hay mas para cargar"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Actualizando..." : null}</div>
    </div>
  );
}

Tagger.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: { id }, // will be passed to the page component as props
  };
}
