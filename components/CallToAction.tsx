interface CallToActionProps {}

const CallToAction = ({}: CallToActionProps) => {
  return (
    <div className="hidden md:flex gap-7 mt-10 bg-actions-primary max-w-3xl rounded-xl py-5 px-7 items-start shadow-md">
      <img src="cta.png" />
      <div>
        <h3 className="text-2xl text-white">Add your transactions!</h3>
        <p className="text-white text-sm ">
          Add your expenses to track where does your money go. All you have to
          do is Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
          sint cillum sint consectetur cupidatat.
        </p>
        <button className="bg-white rounded-xl text-actions-primary py-4 px-8 mt-3 hover:bg-opacity-80">
          Get started
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
