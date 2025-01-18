import EditUserForm from "@/components/edit-user-form";
import { Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/transilation";
import { authOptions } from "@/server/auth";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AdminPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;
  const translations = await getTrans(locale);
  const session = await getServerSession(authOptions);

  if (session && session.user.role !== UserRole.ADMIN) {
    redirect(`/${locale}/${Routes.PROFILE}`);
  }
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          {session?.user && (
            <EditUserForm user={session.user} translations={translations} />
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminPage;
