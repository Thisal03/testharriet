interface HeaderProps {
  pageSubHeader: string;
  pageHeader: string;
}

const PageHeader: React.FC<HeaderProps> = ({
  pageHeader = "Header",
  pageSubHeader = "Sub Header",
}) => {
  return (
    <div
      className="flex justify-center p-6 md:p-10 2xl:p-8 relative bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage:
          "url(https://images.harrietshopping.com/front-web/images/cover/page-header.jpg)",
      }}
    >
      <div className="absolute top-0 ltr:left-0 rtl:right-0 bg-black w-full h-full opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
      <div className="w-full  items-center justify-center relative z-10 py-10 md:py-14 lg:py-20 xl:py-24 2xl:py-32">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center">
          {pageHeader}
        </h2>

        <p className="text-base md:text-base font-semibold text-white text-center mt-1.5">
          {pageSubHeader}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
