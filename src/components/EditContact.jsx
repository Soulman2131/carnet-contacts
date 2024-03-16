import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  useEditContactMutation,
  useGetContactQuery,
} from "../features/Slices/contactApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormContainer from "./Details/FormContainer";
import { Form, Button } from "react-bootstrap";
import Loader from "./Details/Loader";
import Message from "./Details/Message";

function EditContact() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  //
  const [editContact, { isLoading: updateLoading }] = useEditContactMutation();

  const {
    data: getContact,
    isLoading,
    refetch,
    error,
  } = useGetContactQuery(id);

  // USE EFFECT
  useEffect(() => {
    if (getContact) {
      setName(getContact.name);
      setEmail(getContact.email);
      setContact(getContact.contact);
    }
  }, [getContact]);

  // HANDLE EDIT
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await editContact({ id, name, email, contact }).unwrap();
      toast.success("Mise à jour avec succes");
      navigate(redirect);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Modifier le contact</h1>
      {updateLoading && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <Form onSubmit={handleEdit}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Saisissez votre prénom"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Saisissez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="contact">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="number"
              placeholder="Saisissez votre numéro de tél"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            disabled={isLoading}
            variant="primary"
            className="mt-3"
          >
            Valider
          </Button>
        </Form>
      )}
    </FormContainer>
  );
}

export default EditContact;
