import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { FiEdit, FiMail, FiTrash2 } from "react-icons/fi";
import DeletePrepaidModal from "../../components/modals/DeletePrepaidModal";
import EditPrepaidModal from "../modals/EditPrepaidModal/Details";
import { useModal } from "@ebay/nice-modal-react";

export function PrepaidListItem({ prepaid, albumId }) {
  // const editPrepaid = useModal(EditPrepaidModal);
  const deletePrepaid = useModal(DeletePrepaidModal);

  return (
    <tr>
      <td className="text-center">{prepaid?.firstname}</td>

      <td className="text-center">{prepaid?.lastname}</td>
      <td className="text-center">{prepaid?.email}</td>
      <td className="text-center">{prepaid?.phone}</td>
      <td className="text-center">{prepaid?.tags?.tag}</td>
      <td className="text-center">{prepaid?.voucher}</td>
      <td className="text-center flex">
        <Link href={`/admin/tagger/${prepaid?.id}`}>
          <div className="tooltip" data-tip="Completar">
            <button className="btn btn-square btn-ghost ">
              <FiMail className="w-5" />
            </button>
          </div>
        </Link>

        <div className="tooltip" data-tip="Compartir por whaptsapp">
          <Link
            href={`https://api.whatsapp.com/send?phone=${prepaid.phone}&text=Hola!%20Puedes%20ver%20tus%20fotos%20en%20el%20siguiente%20link%3A%20http%3A%2F%2Fwww.fotoeventos.ar%2F%7B${prepaid.voucher}%7D`}>
            <button type="button" className="btn btn-square btn-ghost ">
              <FaWhatsapp className="w-5" />
            </button>
          </Link>
        </div>

        <div className="tooltip" data-tip="Editar">
          <button
            className="btn btn-square btn-ghost "
            //onClick={() => editPrepaid.show({ prepaid, albumId })}
          >
            <FiEdit className="w-5" />
          </button>
        </div>
        <div className="tooltip tooltip-left" data-tip="Eliminar">
          <button
            className="btn btn-square btn-ghost "
            onClick={() => deletePrepaid.show({ prepaid, albumId })}>
            <FiTrash2 className="w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
