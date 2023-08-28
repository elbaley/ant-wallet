import AuthForm from "@/components/AuthForm";

interface ProfilePageProps {}

const ProfilePage = ({}: ProfilePageProps) => {
  return (
    <main className="px-3 sm:pl-10 ">
      <h1 className="pb-3">Profile</h1>
      <div className="max-w-lg">
        <AuthForm mode="profileupdate" />
      </div>
    </main>
  );
};

export default ProfilePage;
