import { Button, Container, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetContactQuery } from "../features/Slices/contactApiSlice";
import Loader from "./Details/Loader";
import Message from "./Details/Message";

function InfoContact() {
  const { id } = useParams();
  const { data: contact, isLoading, error } = useGetContactQuery(id);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> {contact?.id} </td>
              <td> {contact?.name} </td>
              <td> {contact?.email} </td>
              <td> {contact?.contact} </td>
            </tr>
          </tbody>
        </Table>
      )}

      <Link to="/">
        <Button> Retour aux contacts</Button>
      </Link>
    </Container>
  );
}

export default InfoContact;
