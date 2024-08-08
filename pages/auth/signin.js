import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import LandingIntroPhotographer from "../../components/LandingIntroPhotographer";
import ErrorText from "../../components/Typography/ErrorText";

export default function SignIn({ providers }) {
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntroPhotographer />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Iniciar sesión
            </h2>

            {Object.values(providers).map((provider) => (
              <div className="mb-4" key={provider.name}>
                <button
                  onClick={() => signIn(provider.id, { callbackUrl: "/admin" })}
                >
                  Iniciar sesion con {provider.name}
                </button>
              </div>
            ))}

            <ErrorText className="mt-8">{errorMessage}</ErrorText>

            <div className="text-center mt-4">
              ¿No tienes una cuenta aún?{" "}
              <Link href="/auth/register">
                <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                  Register
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
