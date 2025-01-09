import MainHeading from "@/components/mainheading";
import Menu from "@/components/menu";
import { getBestSellers} from "@/server/db/products";

const BestSellers = async () => {
  const bestSellers = await getBestSellers(3);
  console.log(bestSellers);
  
  return (
    <div className="container">
      <div className="text-center mb-4">
        <MainHeading title={"Check Out"} subTitle="Our Best Sellers" />
      </div>
      <Menu items={bestSellers} />
    </div>
  );
};

export default BestSellers;
