import { useModal } from "@ebay/nice-modal-react";
import Image from "next/image";
import Link from "next/link";
import {
  FiEdit,
  FiShare2,
  FiTag,
  FiTrash2,
  FiUploadCloud,
  FiCreditCard,
} from "react-icons/fi";
import AlbumStatusBadge from "../../components/AlbumStatusBadge";
import DeleteAlbumModal from "../../components/modals/DeleteAlbumModal";
import EditAlbumModal from "../../components/modals/EditAlbumModal";
import UploadPhotosModal from "../../components/modals/UploadPhotosModal";
import { getInitials } from "../../lib/strings";

export function AlbumListItem({ album }) {
  const editAlbum = useModal(EditAlbumModal);
  const deleteAlbum = useModal(DeleteAlbumModal);
  const uploadPhotos = useModal(UploadPhotosModal);

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            {album?.imageUrl ? (
              <div className="avatar">
                <div className="w-24 rounded">
                  <Image
                    src={album?.imageUrl}
                    alt={album?.name}
                    height={96}
                    width={96}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="aspect-square bg-neutral-focus text-neutral-content w-24 rounded flex justify-center items-center">
                  <span className="text-xl">{getInitials(album?.name)}</span>
                </div>
              </div>
            )}
            <div>
              <div className="font-bold">{album?.name}</div>
              <div className="text-sm opacity-50 truncate w-64">
                {album?.content}
              </div>
            </div>
          </div>
        </td>
        <td className="text-center">{album?.eventDate}</td>
        <td className="text-center">
          <AlbumStatusBadge status={album?.status} />
        </td>
        <td className="text-center">
          <div className="tooltip" data-tip="Subir fotos">
            <button
              className="btn btn-square btn-ghost"
              onClick={() => {
                uploadPhotos.show({ album });
              }}>
              <FiUploadCloud className="w-5" />
            </button>
          </div>
          <div className="tooltip" data-tip="Etiquetar fotos">
            <Link href={`/admin/tagger/${album?.id}`}>
              <button className="btn btn-square btn-ghost">
                <FiTag className="w-5" />
              </button>
            </Link>
          </div>
          <div className="tooltip" data-tip="Editar">
            <button className="btn btn-square btn-ghost">
              <FiEdit
                className="w-5"
                onClick={() => {
                  editAlbum.show({ album });
                }}
              />
            </button>
          </div>
          <div className="tooltip" data-tip="Compartir">
            <button className="btn btn-square btn-ghost">
              <FiShare2 className="w-5" />
            </button>
          </div>
          <div className="tooltip" data-tip="Ir a prepagos">
            <Link href={`/admin/prepaid/${album?.id}`}>
              <button className="btn btn-square btn-ghost">
                <FiCreditCard className="w-5" />
              </button>
            </Link>
          </div>
          <div className="tooltip" data-tip="Eliminar">
            <button
              className="btn btn-square btn-ghost"
              onClick={() => {
                deleteAlbum.show({ album });
              }}>
              <FiTrash2 className="w-5" />
            </button>
          </div>
        </td>
      </tr>
      {/*{" "}
      <tr className="hover:bg-gray-100 transition-colors">
        <td className="flex gap-x-4 items-center py-4 pl-6">
          <Image
            src={album?.imageUrl}
            alt={album?.name}
            height="200"
            width="200"
            className="w-40 aspect-[3/2]  rounded-lg object-cover object-top border border-gray-200"
          />
          <div className="w-60">
            <span className="text-lg font-semibold text-gray-700">
              {album?.name}
            </span>
            <div className="font-medium text-gray-400 truncate">
              {album?.content}
            </div>
          </div>
        </td>
        <td className="font-medium text-center">{album?.eventDate}</td>
        <td className="font-medium text-center">
          <div className="flex gap-x-2 items-center justify-center">
            <FiImage className="w-4 h-4" />
            <span>{album?.price}</span>
          </div>
          <div className="flex gap-x-2 items-center justify-center">
            <FiPrinter className="w-4 h-4" />
            <span>$1000</span>
          </div>
          <div className="flex gap-x-2 items-center justify-center">
            <IoImagesOutline className="w-4 h-4" />
            <span>$3000</span>
          </div>
        </td>
        <td className="font-medium text-center">
          <div className="flex gap-x-2 items-center justify-center">
            <FiImage className="w-4 h-4" />
            <span>2567</span>
          </div>
          <div className="flex gap-x-2 items-center justify-center">
            <FiPrinter className="w-4 h-4" />
            <span>43334</span>
          </div>
          <div className="flex gap-x-2 items-center justify-center">
            <IoImagesOutline className="w-4 h-4" />
            <span>2</span>
          </div>
        </td>
        <td className="font-medium text-center">
          <div className="flex items-center text-gray-500 gap-x-2 w-20">
            <button
              className="p-2 hover:rounded-md hover:bg-gray-200"
              onClick={() => {
                uploadPhotos.show({ album });
              }}>
              <FiUploadCloud className="w-6 h-6" />
            </button>
            <button className="p-2 hover:rounded-md hover:bg-gray-200">
              <FiShare2 className="w-6 h-6" />
            </button>
            <button className="p-2 hover:rounded-md hover:bg-gray-200">
              <FiEdit className="w-6 h-6" />
            </button>
            <button className="p-2 hover:rounded-md hover:bg-gray-200">
              <FiEyeOff className="w-6 h-6 text-red-500" />
            </button>
          </div>
        </td>
      </tr>{" "}
      */}
    </>
  );
}
