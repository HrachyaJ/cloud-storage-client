// app/dashboard/profile/page.tsx
import Header from "@/components/shared/Header";
import LogoutButton from "@/components/shared/LogoutButton";
import { getCurrentUser } from "@/lib/authHelper";

export default async function ProfilePage() {
  const userData = await getCurrentUser();

  return (
    <div>
      <Header user={userData} />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Мой профиль</h1>

        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">ID</p>
            <p className="text-lg font-semibold">{userData.id}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Полное имя</p>
            <p className="text-lg font-semibold">{userData.fullName}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">E-Mail</p>
            <p className="text-lg font-semibold">{userData.email}</p>
          </div>

          <div className="pt-4">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
