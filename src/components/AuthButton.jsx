import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';

const SignInButton = () => (
  <button className="ms-auto btn btn-dark border border-2 border-dark" onClick={signInWithGoogle}>Sign in</button>
);

const SignOutButton = () => (
  <button className="ms-auto btn btn-dark border border-2" onClick={signOut}>Sign out</button>
);

const AuthButton = ({ user }) => {
  console.log(user);
  return user ? <SignOutButton /> : <SignInButton />;
};

export default AuthButton;