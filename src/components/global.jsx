// All Components

import {
  Outlet,
  NavLink,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import AuthConsumer from "../hooks/auth";
import "./global.css";

export const Home = () => {
  const [authed, dispatch] = AuthConsumer();
  console.log(authed);
  return (
    <main>
      <h1>Authentication App</h1>
      <Nav />
      <div className="page__content">
        <Outlet></Outlet>
      </div>
    </main>
  );
};

export const HomeContent = () => {
  return (
    <div>
      <div className="card">
        <h2>Home Content Component</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio ex
          asperiores atque dignissimos modi, consectetur numquam possimus culpa
          non voluptatibus amet, recusandae porro, quo ipsum excepturi minima.
          Omnis, in! Eius.
        </p>
      </div>
    </div>
  );
};

export const Nav = () => {
  // Create a Function to make the active navigation links visible
  const [{ auth }] = AuthConsumer();

  function ActiveLink(props) {
    return (
      <NavLink
        style={({ isActive }) => {
          return {
            color: isActive ? "black" : "grey",
          };
        }}
        {...props}
      />
    );
  }

  return (
    <nav>
      <ActiveLink className="link" to={"/"}>
        Home
      </ActiveLink>
      <ActiveLink className="link" to={"/login"}>
        Login
      </ActiveLink>

      {auth ? (
        <>
          <ActiveLink className="link" to={"/dashboard"}>
            Dashboard
          </ActiveLink>
          <ActiveLink className="link" to={"/settings"}>
            Settings
          </ActiveLink>
        </>
      ) : (
        <></>
      )}
    </nav>
  );
};

export const Login = () => {
  const [authed, dispatch] = AuthConsumer();
  let navigate = useNavigate();
  return (
    <div>
      <div className="card">
        <h2>Login Component</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, sequi
          ducimus facilis maxime, sed ex, incidunt aliquid obcaecati rerum ullam
          soluta doloremque?
        </p>
      </div>
      <button
        onClick={() => {
          dispatch({ type: "login" });
          navigate("/dashboard", { replace: true });
        }}
      >
        Login
      </button>
    </div>
  );
};

export const Dashboard = () => {
  const [, dispatch] = AuthConsumer();
  let navigate = useNavigate();
  return (
    <div>
      <div className="card dashboard">
        <h2>Dashboard Component</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
          doloribus nobis veritatis amet perspiciatis hic iste commodi quas!
          Possimus quas ea ab veniam aliquam a? Eos, delectus?
        </p>
      </div>
      <button
        onClick={() => {
          dispatch({ type: "logout" });
          navigate("/login", { replace: true });
        }}
      >
        Logout
      </button>
    </div>
  );
};

export const Settings = () => {
  const [, dispatch] = AuthConsumer();
  let navigate = useNavigate();
  return (
    <div>
      <div className="card settings">
        <h2>Settings Component</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
          explicabo, blanditiis impedit eius maxime dicta tenetur necessitatibus
          nostrum doloremque nesciunt unde iure placeat error nemo corporis
          earum accusamus possimus quos velit! Commodi, necessitatibus harum?
        </p>
      </div>
      <button
        onClick={() => {
          dispatch({ type: "logout" });
          navigate("/login", { replace: true });
        }}
      >
        Logout
      </button>
    </div>
  );
};

export function RequireAuth({ children }) {
  const [authed] = AuthConsumer();
  const location = useLocation();
  return authed.auth === true ? (
    children
  ) : (
    <Navigate
      to={"/login"}
      replace
      state={{ path: location.pathname }}
    ></Navigate>
  );
}
