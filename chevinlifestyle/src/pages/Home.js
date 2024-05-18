import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Carousal from "./Carousal";
import Aboutchevin from "./Aboutchevin";
import { useAuth } from "../context/auth";
 
const Home=()=>{
  const [auth,setAuth]=useAuth();
    return(
        <Layout title={"Chevin Lifetsyle"}>
      
        <h1>Home Page</h1>
        </Layout>
    )
}
export default Home;
