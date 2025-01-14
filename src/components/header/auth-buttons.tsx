"use client";
import { Button } from "../ui/button";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Pages, Routes } from "@/constants/enums";

function AuthButtons() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();
  return (
    <div>
      <div className="flex items-center gap-6">
        <Button
          className={`${
            pathname.startsWith(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
              ? "text-primary"
              : "text-accent"
          } hover:text-primary duration-200 transition-colors font-semibold hover:no-underline !px-0`}
          size="lg"
          variant="link"
          onClick={() =>
            router.push(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
          }
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default AuthButtons;
