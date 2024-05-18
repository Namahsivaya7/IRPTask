import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import { HiLogout } from "react-icons/hi";
import { FaHouseUser } from "react-icons/fa";
import toast from "react-hot-toast";
import useCategory from "../../hooks/useCategory";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../context/cart";
import { Badge, Col, Row } from "antd";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success(" Account Logout successfully");
  };
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <div className="header">
      
      <div className="header-2" style={{margin:"10px 0"}}>
        <nav className="navbar navbar-expand-lg bg-secondary-subtle">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/cart">
              <Badge size="small" count={cart?.length} showZero>
                <FaShoppingCart />
              </Badge>
            </Link>
            <Link className="navbar-brand" to="/">
              <FaHeart />
            </Link>
            {!auth.user ? (
              <Link className="navbar-brand" to="/register">
                <FaUser />
              </Link>
            ) : (
              <>
                <Link
                  onClick={handleLogout}
                  className="navbar-brand"
                  to="/register"
                >
                  <HiLogout />
                </Link>
                <Link
                  className="navbar-brand"
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                >
                  <FaHouseUser />
                </Link>
                <h4 className="heyuser">Hi {auth?.user?.name},</h4>
              </>
            )}

<button
        className="navbar-toggler"
        type="button"
        onClick={toggleNavbar}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className={`collapse navbar-collapse ${navbarOpen ? 'show'  : ''}`} id="navbarSupportedContent"
      style={{}}
      //  style={{backdropFilter: navbarOpen ? 'blur(80px)' : 0 ,backgroundColor:navbarOpen ? 'rgba(161,159,159,0.5)' : 0}}
       >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0" id="header22" 
              style={{ zIndex: 1000,marginTop:10,padding:"0px",background:"transparent" }}
              >
                {/* <li className="nav-item" style={{ width:"100%",maxWidth:300 }}>
                  <SearchInput />
                </li> */}
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </NavLink>
                  <ul className="dropdown-menu" style={{ minWidth: "200px" }}>
                    {categories?.map((c) => (
                      <li key={c.slug}>
                        <Link
                          className="dropdown-item"
                          to={`/category/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                   
                  </ul>
                </li>
                <li className="nav-item dropdown">
                 
                </li>
                
              </ul>
            </div>
            
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
