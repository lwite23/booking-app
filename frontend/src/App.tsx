import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";

const App = () => {
  const {isLoggedIn} = useAppContext();
  return(
    <Router>
      <Routes>
      {isLoggedIn && (
        <>
         <Route
         path="/add-hotel"
         element={
           <Layout>
             <AddHotel />
           </Layout>
         }
       />
       </>
       )}
        <Route path="/" element={<Layout><p>Гллавная</p></Layout>}/>
        <Route path="/search" element={<Layout><p>Поиск</p></Layout>} />
        <Route path="/register" element={<Layout><Register/></Layout>}/>
        <Route path="/sign-in" element={<Layout><SignIn/></Layout>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
  );
};

export default App;