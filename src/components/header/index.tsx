import { Routes } from "@/constants/enums";
import Link from "../link";
import NavBar from "./navbar";
import CartButton from "./cartButton";

const Header = () => {
  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between">
        <Link className="text-primary font-semibold text-2xl" href={Routes.ROOT}>🍕 Pizza</Link>
        <NavBar />
        <CartButton />
      </div>
    </header>
  );
};

export default Header;
