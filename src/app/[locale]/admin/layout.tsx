import { Locale } from "@/i18n.config";
import getTrans from "@/lib/transilation";
import AdminTaps from "./_components/AdminTaps";

const AdminLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;
  const translations = await getTrans(locale);
  return (
    <>
      <AdminTaps translations={translations} />
      {children}
    </>
  );
};

export default AdminLayout;
