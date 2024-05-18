import React from "react"
import Layout from "../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const Admindashboard=()=>{
    const [auth]=useAuth()
    return (
        <Layout title={"Dashboard-Admin"}>
         <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                    <div className="col-md-9">
                        <h1>Hello, {auth?.user?.name}</h1>
                    </div>
                
            </div>
         </div>
        </Layout>
    )
}
export default Admindashboard;