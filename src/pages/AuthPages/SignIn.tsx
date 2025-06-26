import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Info Tugas | Dashboard MahasiswaPamulangsa"
        description="Website pengingat tugas semester bagi mahasiswa Teknik Informatika Universitas Pamulang"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
