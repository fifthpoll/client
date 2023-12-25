import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Modal from "../common/Modal";
import useWeb5 from "../contexts/web5context";

export default function Default() {
  const web5 = useWeb5();

  return web5.loading ? (
    <main className="h-screen flex justify-center items-center">
      <h2 className="text-3xl italic font-extralight">Loading...</h2>
    </main>
  ) : (
    <main className="relative">
      <Modal />
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
