import { Locale } from "@/i18n.config";
import getTrans from "@/lib/transilation";
import { getCategories } from "@/server/db/categories";
import Form from "./_components/Form";
import CategoryItem from "./_components/CategoryItem";

const CategoriesPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const categories = await getCategories();
  const { locale } = await params;
  const translations = await getTrans(locale);

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <div className="sm:max-w-[625px] mx-auto space-y-6">
            <Form translations={translations} />
            {categories.length > 0 ? (
              <ul className="flex flex-col gap-4">
                {categories.map((category) => (
                  <CategoryItem category={category} key={category.id} />
                ))}
              </ul>
            ) : (
              <p className="text-accent text-center py-10">
                {translations.noCategoriesFound}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoriesPage;
