import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Pengingat Tugas - Teknik Informatika Universitas Pamulangsa"
        description="Website pengingat tugas semester bagi mahasiswa Teknik Informatika Universitas Pamulangsa"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
