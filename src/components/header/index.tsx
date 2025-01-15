import Link from "../link";
import NavBar from "./navbar";
import CartButton from "./cartButton";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/transilation";
import LanguageSwitcher from "./language-switcher";
import AuthButtons from "./auth-buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

const Header = async () => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
    const initialSession = await getServerSession(authOptions);
  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between gap-6 lg:gap-10">
        <Link
          href={`/${locale}`}
          className="text-primary font-semibold text-2xl"
        >
          🍕 {translations.logo}
        </Link>
        <NavBar initialSession={initialSession}  translations={translations}  />
        <div className="flex items-center gap-6 flex-1 justify-end">
          <div className="hidden lg:flex lg:items-center lg:gap-6 ">
            <AuthButtons initialSession={initialSession} translations={translations} />
            <LanguageSwitcher />
          </div>

          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
