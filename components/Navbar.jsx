import "@picocss/pico";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initFirebase } from "@/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

const Navbar = () => {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };
  return (
    <div>
      <nav>
        <ul>
          <li>
            <h2>
              <strong>The Movie Database</strong>
            </h2>
          </li>
          <li>
            <a href="/">Inicio</a>
          </li>
          <li>
            <a href="/movies?page=1">Movies</a>
          </li>
          <li>
            <a href="/series?page=1">Series</a>
          </li>
        </ul>
        <ul>
          <li>{user ? <button role="button">Favoritos</button> : ""}</li>
          <li>
            {user ? (
              <button onClick={() => auth.signOut()} role="button">
                Logout
              </button>
            ) : (
              <button onClick={login} role="button">
                Login
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
