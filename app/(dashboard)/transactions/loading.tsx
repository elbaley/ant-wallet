const Loading = ({}) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div
        className="animate-spin inline-block w-12 h-12 border-[3px] border-current border-t-transparent text-blue-600 dark:text-white rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
