import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import UpdateCurrencySymbol from "./UpdateCurrencySymbol";

interface SettingsPageProps {}

const SettingsPage = ({}: SettingsPageProps) => {
  return (
    <main className="px-3 sm:pl-10 ">
      <h1 className="pb-3">Settings</h1>
      <div className="max-w-lg">
        <div className="bg-white dark:bg-darkSecondary rounded-lg p-5 shadow-lg">
          <h2 className="font-semibold">Update Settings</h2>
          <UpdateCurrencySymbol />
          <ThemeSwitcher />
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
