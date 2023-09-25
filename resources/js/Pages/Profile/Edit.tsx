import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Container from "@/Components/Container";

export default function Edit({
  auth,
  mustVerifyEmail,
  status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
  return (
    <>
      <Head title="Profile" />

      <div className="h-full w-full overflow-y-scroll py-6 flex flex-col items-center space-y-6 task-scroll">
        <Container className="w-[95%] p-4 sm:p-8">
          <UpdateProfileInformationForm
            mustVerifyEmail={mustVerifyEmail}
            status={status}
          />
        </Container>

        <Container className="w-[95%] p-4 sm:p-8">
          <UpdatePasswordForm />
        </Container>

        <Container className="w-[95%] p-4 sm:p-8">
          <DeleteUserForm />
        </Container>
      </div>
    </>
  );
}
