import UpdateCurrencySymbol from "./UpdateCurrencySymbol";

interface SettingsPageProps {}

const SettingsPage = ({}: SettingsPageProps) => {
  return (
    <main className="px-3 sm:pl-10 ">
      <h1 className="pb-3">Settings</h1>
      <div className="max-w-lg">
        <div className="bg-white rounded-lg p-5 shadow-lg">
          <h2 className="font-semibold">Update Settings</h2>
          <UpdateCurrencySymbol />
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
