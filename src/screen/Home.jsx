import { Button, Card, Container, Table } from "react-bootstrap";
import { useGetContactsQuery } from "../features/Slices/contactApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { FaEdit } from "react-icons/fa";
import { MdPreview } from "react-icons/md";
import Loader from "../components/Details/Loader";
import Message from "../components/Details/Message";
import DeleteContact from "../components/DeleteContact";

function Home() {
  const { data: contacts, isLoading, error } = useGetContactsQuery();

  let content = contacts?.map((contact, index) => (
    <tr key={index}>
      <th scope="row"> {index + 1} </th>
      <td> {contact.name} </td>
      <td>
        <a className="text-success" href={`mailto: ${contact.email} `}>
          {contact.email}{" "}
        </a>
      </td>
      <td> {contact.contact} </td>
      <td>
        <LinkContainer
          to={`/edit/${contact.id}`}
          style={{ marginRight: "10px" }}
        >
          <Button className=" btn-info btn-sm" variant="outline-light">
            <FaEdit />
          </Button>
        </LinkContainer>

        <LinkContainer
          to={`/info/${contact.id}`}
          style={{ marginRight: "10px" }}
        >
          <Button className=" btn-warning btn-sm" variant="outline-light">
            <MdPreview />
          </Button>
        </LinkContainer>

        <Button variant="danger" className="btn-sm">
          <DeleteContact id={contact.id} />
        </Button>
      </td>
    </tr>
  ));

  return (
    <div className="py-5">
      <Container>
        <Card>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message />
          ) : (
            <Table
              striped
              hover
              responsive
              bordered
              className="table-sm styled-table h6"
            >
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{content}</tbody>
            </Table>
          )}
        </Card>
      </Container>
    </div>
  );
}

export default Home;
