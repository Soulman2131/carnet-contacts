import FormContainer from "./Details/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useAddContactMutation } from "../features/Slices/contactApiSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "./Details/Loader";

function AddContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const [AddContact, { isLoading }] = useAddContactMutation();

  //
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  // HANDLE ADD
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name && !email && !contact) {
      toast.error("Veuillez renseigner vos coordonnées");
    } else {
      try {
        await AddContact({ name, email, contact }).unwrap();
        toast.success("Contact ajouté avec succes");
        navigate(redirect);
        setName("");
        setEmail("");
        setContact("");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1>Ajouter un contact</h1>

      <Form onSubmit={handleAdd}>
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
        {isLoading && <Loader />}
        <Form.Group className="d-flex justify-content-between mt-3 ">
          <Button
            type="submit"
            disabled={isLoading}
            variant="primary"
            className="mt-3"
          >
            Valider
          </Button>

          <Link to="/">
            <Button className="mt-3 btn-success"> Retour aux contacts</Button>
          </Link>
        </Form.Group>
      </Form>
    </FormContainer>
  );
}

export default AddContact;
