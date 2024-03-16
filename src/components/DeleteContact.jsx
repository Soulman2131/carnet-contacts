import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDeleteContactMutation } from "../features/Slices/contactApiSlice";
import { toast } from "react-toastify";

function DeleteContact({ id }) {
  const [deleteContact] = useDeleteContactMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Souhaitez-vous supprimer les coordonnées?")) {
      await deleteContact(id);
      toast.success("Le contact est supprimé avec succes");
    }
  };

  return (
    <div onClick={() => handleDelete(id)}>
      <FaTrash style={{ color: "white" }} />
    </div>
  );
}

export default DeleteContact;
