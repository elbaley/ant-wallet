const CtaSkeleton = ({}) => {
  return (
    <div className="hidden animate-pulse md:flex gap-7 mt-10 bg-gray-300  max-w-3xl rounded-xl py-5 px-7 items-start shadow-md">
      <div>
        <div className="text-2xl text-white h-3"></div>
        <div className="h-[60px]"></div>
        <div className="h-[60px]"></div>
      </div>
    </div>
  );
};

export default CtaSkeleton;
