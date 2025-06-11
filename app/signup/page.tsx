"use client";

import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex flex-1">
      <section className="flex w-full items-center bg-gray-50 py-8 dark:bg-gray-900">
        <div className="mx-auto grid w-full max-w-screen-xl px-4 lg:grid-cols-12 lg:gap-20">
          <div className="w-full place-self-center lg:col-span-6">
            <div className="mx-auto rounded-lg bg-white p-6 shadow sm:max-w-xl sm:p-8 dark:bg-gray-800">
              <Link
                href="/"
                className="mb-4 inline-flex items-center text-xl font-semibold text-gray-900 dark:text-white"
              >
                <Image
                  className="mr-2"
                  src="/wise-home-menu-logotipo.png"
                  alt="Wise Home Logo"
                  width={120}
                  height={0}
                  style={{ height: "auto" }}
                />
              </Link>
              <h1 className="mb-2 text-2xl leading-tight font-bold tracking-tight text-gray-900 dark:text-white">
                Criar uma conta
              </h1>
              <p className="text-sm font-light text-gray-500 dark:text-gray-300">
                Já tem uma conta?{" "}
                <Link
                  href="/"
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Faça login
                </Link>
                .
              </p>
              <form className="mt-4 space-y-6 sm:mt-6" action="#">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="João"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Sobrenome
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Silva"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="nome@empresa.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Senha
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirmar senha
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="px-5 text-center text-gray-500 dark:text-gray-400">
                    ou
                  </div>
                  <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div className="space-y-3">
                  <button
                    type="button"
                    className="mr-2 mb-2 inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_13183_10121)">
                        <path
                          d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                          fill="#3F83F8"
                        />
                        <path
                          d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                          fill="#FBBC04"
                        />
                        <path
                          d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                          fill="#EA4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_13183_10121">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Cadastrar com Google
                  </button>
                </div>
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-3 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Eu concordo com os{" "}
                      <Link
                        href="#"
                        className="text-primary-600 dark:text-primary-500 hover:underline"
                      >
                        Termos e Condições
                      </Link>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/dashboard";
                  }}
                  className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4 focus:outline-none"
                >
                  Criar conta
                </button>
              </form>
            </div>
          </div>
          <div className="mr-auto place-self-center lg:col-span-6">
            <Image
              className="mx-auto hidden lg:flex"
              src="/illustration.png"
              alt="illustration"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
