import PageGlow from "../components/common/PageGlow";

import RegistrationHeader from "../components/registration/RegistrationHeader";

import RegistrationForm from "../components/registration/RegistrationForm";

export default function RegisterPage() {
  return (
    <div className="
      min-h-screen
      bg-black
      text-white
      relative
      overflow-hidden
      px-4
      py-8
    ">

      <PageGlow />

      <div className="
        relative
        z-10
        max-w-md
        mx-auto
      ">

        <RegistrationHeader />

        <RegistrationForm />

      </div>
    </div>
  );
}