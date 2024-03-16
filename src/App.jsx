import { Route, Routes } from "react-router-dom";
import Layout from "./screen/Head/Layout";
import Home from "./screen/Home";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import InfoContact from "./components/InfoContact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="add-contact" element={<AddContact />} />
        <Route path="edit/:id" element={<EditContact />} />
        <Route path="info/:id" element={<InfoContact />} />
      </Route>
    </Routes>
  );
}

export default App;
