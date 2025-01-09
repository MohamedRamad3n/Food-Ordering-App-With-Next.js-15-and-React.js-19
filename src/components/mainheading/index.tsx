const MainHeading = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <>
      <span className="uppercase text-accent font-semibold leading-4">
        {title}
      </span>
      <h2 className="text-primary font-bold text-4xl italic">{subTitle}</h2>
    </>
  );
};

export default MainHeading;
