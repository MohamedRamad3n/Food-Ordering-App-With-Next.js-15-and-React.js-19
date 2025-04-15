import MainHeading from "@/components/mainheading";
import Menu from "@/components/menu";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/transilation";
import { getBestSellers } from "@/server/db/products";

const BestSellers = async () => {
  const bestSellers = await getBestSellers(3);
  console.log(bestSellers);
  
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { bestSeller } = home;

  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
          <MainHeading
            subTitle={bestSeller.checkOut}
            title={bestSeller.OurBestSellers}
          />
        </div>
        <Menu items={bestSellers} />
      </div>
    </section>
  );
};

export default BestSellers;
