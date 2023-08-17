interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  return (
    <div className="h-full w-24 absolute bg-white rounded-tr-[1.25rem] rounded-br-[1.25rem] pt-10 flex flex-col items-center gap-2">
      <img
        className="h-9 aspect-square hover:opacity-80"
        src="./antwallet_logo.png"
      />
      <hr className="w-[70px] mx-auto bg-stone-300" />
    </div>
  );
};

export default Sidebar;
