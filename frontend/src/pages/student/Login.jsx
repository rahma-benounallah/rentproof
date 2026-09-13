import AuthForm from "./AuthForm";

function Login({ onLogin, onSwitchToRegister, onBack }) {
  return (
    <AuthForm
      mode="login"
      onSubmit={onLogin}
      onSwitch={onSwitchToRegister}
      onBack={onBack}
    />
  );
}

export default Login;
