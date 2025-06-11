"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  HiOutlineChartPie,
  HiOutlineDocumentText,
  HiOutlineCog,
  HiHome,
} from "react-icons/hi";
import {
  HiOutlineBuildingOffice,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <section>
      <div className="mx-auto max-w-screen-xl bg-gray-50 px-4 py-8 2xl:px-0 dark:bg-gray-900">
        {/* Breadcrumb e título */}
        <div className="mb-6">
          <nav className="mb-2 flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="hover:text-primary-600 inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400 dark:hover:text-white"
                >
                  <HiHome className="me-2 h-4 w-4" />
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="mx-1 h-4 w-4 text-gray-400 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                  <span className="hover:text-primary-600 ms-1 text-sm font-medium text-gray-700 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                    Dashboard
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Visão Geral
          </h2>
        </div>
        <div className="gap-8 lg:flex">
          {/* Sidebar como card */}
          <aside className="hidden h-full w-80 shrink-0 overflow-y-auto border border-gray-200 bg-white p-3 shadow-sm lg:block lg:rounded-lg dark:border-gray-700 dark:bg-gray-800">
            {/* User dropdown button */}
            <div className="relative">
              <button
                type="button"
                className="mb-3 flex w-full items-center justify-between rounded-lg bg-white p-2 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <Image
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                      width={32}
                      height={32}
                      className="mr-3 h-8 w-8 rounded-md"
                      alt="Avatar"
                    />
                    <div className="text-left">
                      <div className="mb-0.5 leading-none font-semibold text-gray-900 dark:text-white">
                        Leonardo Pitton
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        leo@sidedoor.com.br
                      </div>
                    </div>
                  </div>
                  <svg
                    className={`h-5 w-5 text-gray-900 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""} dark:text-white`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m8 15 4 4 4-4m0-6-4-4-4 4"
                    />
                  </svg>
                </div>
              </button>
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 left-0 z-10 mt-2 w-full rounded-lg bg-white py-2 shadow-lg dark:bg-gray-800">
                  <Link
                    href="/dashboard/perfil"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <HiOutlineCog className="mr-2 h-5 w-5" />
                    Editar Perfil
                  </Link>
                  <button
                    onClick={() => {
                      // Add logout logic here
                      console.log("Logout clicked");
                    }}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-700"
                  >
                    <svg
                      className="mr-2 h-6 w-6 flex-shrink-0 text-red-600 transition duration-75 dark:text-red-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                      />
                    </svg>
                    Sair
                  </button>
                </div>
              )}
            </div>
            {/* Separator */}
            <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>
            {/* Main menu */}
            <ul className="mt-6 space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="group text-primary-700 bg-primary-50 dark:bg-primary-900 dark:text-primary-300 flex items-center rounded-lg p-2 text-base font-medium"
                >
                  <HiOutlineChartPie className="text-primary-700 dark:text-primary-300 h-6 w-6" />
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/visitas"
                  className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <HiOutlineDocumentText className="h-6 w-6 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3">Visitas</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/fornecedores"
                  className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <HiOutlineBuildingOffice className="h-6 w-6 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3">Fornecedores</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/relatorios"
                  className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <HiOutlineClipboardDocumentList className="h-6 w-6 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3">Relatórios</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/configuracoes"
                  className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <HiOutlineCog className="h-6 w-6 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3">Configurações</span>
                </Link>
              </li>
            </ul>
          </aside>
          {/* Conteúdo principal */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </section>
  );
}
