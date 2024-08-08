import { useModal } from "@ebay/nice-modal-react";
import { useCreatePrepaid } from "@hooks/prepaids";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Formik } from "formik";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FiSave, FiTrash2 } from "react-icons/fi";
import { dehydrate, QueryClient } from "react-query";
import * as Yup from "yup";
import { PrepaidListItem } from "../../../components/admin/PrepaidListItem";
import TitleCard from "../../../components/Cards/TitleCard";
import CreateAlbumModal from "../../../components/modals/CreateAlbumModal";
import { getPrepaids, useGetPrepaids } from "../../../hooks/prepaids";
import { authOptions } from "../../api/auth/[...nextauth]";
import Layout from "../layout/index";

const prisma = new PrismaClient();

const TopSideButtons = () => {
  const CreateAlbum = useModal(CreateAlbumModal);

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => CreateAlbum.show()}>
        Crear nuevo
      </button>
    </div>
  );
};

const formSchema = Yup.object().shape({
  firstname: Yup.string().required("Campo Requerido").max(100, "Too Long!"),
  lastname: Yup.string().required("Campo Requerido").max(100, "Too Long!"),
  email: Yup.string()
    .email("Correo Electronico Invalido")
    .required("Campo Requerido")
    .max(255, "Maximo 255 Caracteres"),
  phone: Yup.string()
    .required("Campo Requerido")
    .matches(/[0-9]/, "Numero de telefono equivocado")
    .min(6, "Minimo 6 caracteres")
    .max(9, "Maximo 9 caracteres"),

  tagid: Yup.string()
    .required("Campo Requerido")
    .max(100, "Maximo 100 Caracteres"),
});

const initialValues = {
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  tagid: "",
};

export default function Prepaid({ name, id }) {
  const router = useRouter();

  const { createPrepaid, isLoading: isUpdating } = useCreatePrepaid(id);

  const { data: session, status } = useSession();
  const { data, isLoading } = useGetPrepaids(id);
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
      <TitleCard title={`Prepagos de album ${name}`} topMargin="mt-2">
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <Formik
            validationSchema={formSchema}
            enableReinitialize={true}
            initialValues={initialValues}
            validateOnMount={true}
            onSubmit={(values, actions) => {
              values.phone = `+549${values.phone}`;
              const prepaid = createPrepaid(values, {
                onSuccess: () => {
                  alert("Prepaid creado");
                },
                onError: () => {
                  console.info("ERROR");
                },
              });
              actions.resetForm();
            }}>
            {(props) => (
              <form className="mx-6" onSubmit={props.handleSubmit}>
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th className="text-center">Nombre</th>
                      <th className="text-center">Apellido</th>
                      <th className="text-center">E-mail</th>
                      <th className="text-center">Telefono</th>
                      <th className="text-center">Etiqueta</th>
                      <th className="text-center">Voucher</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center pb-2">
                        <input
                          type="text"
                          placeholder="Type here"
                          className={
                            props.errors.firstname && props.touched.firstname
                              ? "input input-bordered border-red-500 ring-red-500 w-full max-w-xs"
                              : "input input-bordered w-full max-w-xs"
                          }
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.firstname}
                          name="firstname"
                        />
                        {props.errors.firstname && props.touched.firstname ? (
                          <div className="text-red-600 text-left text-xs">
                            {props.errors.firstname}
                          </div>
                        ) : (
                          <div className="h-4"></div>
                        )}
                      </td>

                      <td className="text-center pb-2">
                        <input
                          type="text"
                          placeholder="Type here"
                          className={
                            props.errors.lastname && props.touched.lastname
                              ? "input input-bordered border-red-500 ring-red-500 w-full max-w-xs"
                              : "input input-bordered w-full max-w-xs"
                          }
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.lastname}
                          name="lastname"
                        />
                        {props.errors.lastname && props.touched.lastname ? (
                          <div className="text-red-600 text-left text-xs">
                            {props.errors.lastname}
                          </div>
                        ) : (
                          <div className="h-4"></div>
                        )}
                      </td>
                      <td className="text-center pb-2">
                        <input
                          type="email"
                          placeholder="Type here"
                          className={
                            props.errors.email && props.touched.email
                              ? "input input-bordered border-red-500 ring-red-500 w-full max-w-xs"
                              : "input input-bordered w-full max-w-xs"
                          }
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.email}
                          name="email"
                        />
                        {props.errors.email && props.touched.email ? (
                          <div className="text-red-600 text-left text-xs">
                            {props.errors.email}
                          </div>
                        ) : (
                          <div className="h-4"></div>
                        )}
                      </td>
                      <td className="text-center pb-2">
                        <div class="flex relative ">
                          <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                            +549
                          </span>
                          <input
                            type="text"
                            pattern="[0-9]{6,9}"
                            placeholder="Type here"
                            className={
                              props.errors.phone && props.touched.phone
                                ? "h-12 rounded-r-lg flex-1 appearance-none border focus:outline-none focus:ring-2 border-red-500 ring-red-500 w-full max-w-xs focus:border-transparent"
                                : "h-12 rounded-r-lg flex-1 appearance-none border focus:outline-none focus:ring-2 w-full border-gray-300 w-full focus:border-transparent"
                            }
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.phone}
                            name="phone"
                          />
                        </div>
                        {props.errors.phone && props.touched.phone ? (
                          <div className="text-red-600 text-left text-xs">
                            {props.errors.phone}
                          </div>
                        ) : (
                          <div className="h-4"></div>
                        )}
                      </td>
                      <td className="text-center pb-2">
                        <input
                          type="text"
                          placeholder="Type here"
                          className={
                            props.errors.tagid && props.touched.tagid
                              ? "input input-bordered border-red-500 ring-red-500 w-full max-w-xs"
                              : "input input-bordered w-full max-w-xs"
                          }
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.tagid}
                          name="tagid"
                        />
                        {props.errors.tagid && props.touched.tagid ? (
                          <div className="text-red-600 text-left text-xs">
                            {props.errors.tagid}
                          </div>
                        ) : (
                          <div className="h-4"></div>
                        )}
                      </td>
                      <td className="text-center pb-2"></td>
                      <td className="text-center flex pb-8">
                        <div className="tooltip" data-tip="Guardar">
                          <button
                            type="submit"
                            className={
                              isUpdating
                                ? "btn btn-square btn-ghost loading"
                                : "btn btn-square btn-ghost"
                            }
                            onClick={() => {
                              props.handleSubmit();
                            }}
                            disabled={isLoading || !props.isValid}>
                            {!isUpdating ? <FiSave className="w-5" /> : ""}
                          </button>
                          {/*TODO agregar loader y alerta de creado*/}
                        </div>
                        <div className="tooltip" data-tip="Borrar datos">
                          <button
                            type="button"
                            className="btn btn-square btn-ghost"
                            onClick={() => {
                              props.handleReset();
                            }}>
                            <FiTrash2 className="w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {data?.map((prepaid) => (
                      <PrepaidListItem
                        key={prepaid.id}
                        prepaid={prepaid}
                        albumId={id}
                      />
                    ))}
                  </tbody>
                </table>
              </form>
            )}
          </Formik>
        </div>
      </TitleCard>
    </>
  );
}

Prepaid.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    //TODO redirect
  }

  dayjs.extend(utc);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("prepaids", getPrepaids);

  //TODO Cargar prepagos - MOVER A UNA API EXTERNA

  // TODO necesitamos chequear que el album le pertenece al usuario logueado
  /*const prepaidsQry = await prisma.Prepaid.findMany({
    where: {
      albumid: parseInt(id),
      album: {
        is: {
          ownerId: session?.user.id,
        },
      },
    },
    include: {
      tags: true,
    },
  });

  const prepaids = prepaidsQry.map((prepaid) => {
    prepaid.created = "";
    prepaid.updated = "";
    return prepaid;
  });*/

  const { name } = await prisma.album.findFirst({
    where: {
      ownerId: session?.user.id,
      id: Number(id),
    },
  });
  return {
    props: {
      name,
      id,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
