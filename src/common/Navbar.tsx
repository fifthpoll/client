import { Link, NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon";
import useWeb5 from "../contexts/web5context";

export default function Navbar() {
  const web5 = useWeb5();

  return (
    <nav className="flex p-page py-4">
      <Link to="/" className="flex h-10 group duration-300">
        {/* <img
          src="/logo.png"
          alt="logo"
          className="duration-inherit group-hover:scale-110 group-hover:translate-x-3"
        /> */}
        <img
          src="/branding.png"
          alt="logo"
          className="duration-inherit scale-75 -translate-x-2 group-hover:brightness-0"
        />
      </Link>

      <div className="flex-1 flex items-center justify-center gap-x-10">
        <CustomNavbarLink to="/" title="Home" />
        <CustomNavbarLink to="/profile" title="Dashboard" />
        <CustomNavbarLink to="/about" title="About Us" />
      </div>

      <div className="flex gap-x-5">
        <Link
          to="/actions"
          className="bg-foreground text-back px-6 rounded-full flex justify-center items-center"
        >
          Get Started
        </Link>
        <button
          onClick={() => {
            if (web5 && web5.userId) {
              navigator.clipboard.writeText(web5.userId);
              alert("Did copied to clipboard");
            } else {
              alert("Error, please try again");
            }
          }}
          className="border border-foreground px-5 gap-x-2 rounded-full flex justify-center items-center group duration-300 hover:bg-foreground hover:text-back"
        >
          <Icon
            icon="copyContent"
            className="group-hover:scale-150 duration-200 group-hover:text-back"
          />
          Copy Did
        </button>
      </div>
    </nav>
  );
}

function CustomNavbarLink(props: Parameters<typeof Link>[0]) {
  return (
    <NavLink
      to={props.to}
      className={({ isActive, isPending }) =>
        twMerge(
          "text-front text-opacity-60 text-lg hover",
          isActive
            ? "text-opacity-100"
            : "hover:underline hover:underline-offset-4",
          props.className
        )
      }
    >
      {props.title}
    </NavLink>
  );
}
