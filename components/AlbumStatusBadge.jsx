const AlbumStatusBadge = ({ status }) => {
  switch (status) {
    case "DRAFT":
      return <div className="badge  badge-lg">Borrador</div>;
    case "PUBLISHED":
      return <div className="badge  badge-lg badge-success">Publicado</div>;
    case "HIDDEN":
      return <div className="badge badge-lg badge-info">Oculto</div>;
    case "DELETED":
      return <div className="badge badge-lg badge-error">Eiminado</div>;
    default:
      return <div className="badge badge-lg">Borrador</div>;
  }
};

export default AlbumStatusBadge;
