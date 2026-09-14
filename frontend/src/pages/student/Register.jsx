import AuthForm from "./AuthForm";

// Step 2 of Member 1's flow: POST /api/auth/register happens in onSubmit,
// wired by the parent (StudentApp) — this component only collects the form.
function Register({ onRegister, onSwitchToLogin, onBack }) {
  return (
    <AuthForm
      mode="register"
      onSubmit={onRegister}
      onSwitch={onSwitchToLogin}
      onBack={onBack}
    />
  );
}

export default Register;
