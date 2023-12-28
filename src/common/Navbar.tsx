import { Link, NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function Navbar() {
  return (
    <nav className="flex p-page py-4">
      <Link to="/" className="flex h-10 group duration-300">
        <img
          src="/logo.png"
          alt="logo"
          className="duration-inherit group-hover:scale-110 group-hover:translate-x-3"
        />
        <img
          src="/branding.png"
          alt="logo"
          className="duration-inherit scale-75 -translate-x-2 group-hover:brightness-0"
        />
      </Link>

      <div className="flex-1 flex items-center justify-center gap-x-10">
        <CustomNavbarLink to="/" title="Home" />
        <CustomNavbarLink to="/about" title="About Us" />
      </div>

      <div className="flex gap-x-5">
        <Link
          to="/vote"
          className="bg-primary text-back px-6 rounded-full flex justify-center items-center"
        >
          Cast Vote
        </Link>
        <Link
          to="/new"
          className="bg-black text-white px-6 rounded-full flex justify-center items-center"
        >
          Start Event
        </Link>
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
