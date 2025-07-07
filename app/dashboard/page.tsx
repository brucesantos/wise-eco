"use client";

import { Card } from "flowbite-react";
import {
  HiOutlineDocumentText,
  HiOutlineBuildingOffice,
  HiOutlineCamera,
  HiOutlineClock,
  HiChevronRight,
} from "react-icons/hi2";

export default function DashboardPage() {
  return (
    <>
      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-100 dark:bg-blue-700">
            <HiOutlineDocumentText className="h-6 w-6 text-blue-600 dark:text-blue-200" />
          </div>
          <dl>
            <dt className="text-gray-500 dark:text-gray-400">
              Total de Visitas
            </dt>
            <dd className="text-xl font-bold text-gray-900 dark:text-white">
              156
            </dd>
          </dl>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded bg-green-100 dark:bg-green-700">
            <HiOutlineBuildingOffice className="h-6 w-6 text-green-600 dark:text-green-200" />
          </div>
          <dl>
            <dt className="text-gray-500 dark:text-gray-400">Fornecedores</dt>
            <dd className="text-xl font-bold text-gray-900 dark:text-white">
              45
            </dd>
          </dl>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded bg-yellow-100 dark:bg-yellow-700">
            <HiOutlineCamera className="h-6 w-6 text-yellow-600 dark:text-yellow-200" />
          </div>
          <dl>
            <dt className="text-gray-500 dark:text-gray-400">
              Fotos por visita
            </dt>
            <dd className="text-xl font-bold text-gray-900 dark:text-white">
              8.2
            </dd>
          </dl>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded bg-purple-100 dark:bg-purple-700">
            <HiOutlineClock className="h-6 w-6 text-purple-600 dark:text-purple-200" />
          </div>
          <dl>
            <dt className="text-gray-500 dark:text-gray-400">
              Tempo por visita
            </dt>
            <dd className="text-xl font-bold text-gray-900 dark:text-white">
              45 min
            </dd>
          </dl>
        </div>
      </div>
      {/* Recent Visits Table */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Últimas Visitas
        </h3>
        <button
          type="button"
          onClick={() => {
            window.location.href = "/relatorio-visita-ampliado";
          }}
          className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-500 inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:outline-none"
        >
          Nova Visita
        </button>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  ID
                </th>
                <th scope="col" className="px-4 py-3">
                  Data
                </th>
                <th scope="col" className="px-4 py-3">
                  Empresa
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="w-12 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="cursor-pointer border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50">
                <td className="px-4 py-3">#VIS-1024</td>
                <td className="px-4 py-3">10/06/2025</td>
                <td className="px-4 py-3">Fornecedor A</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800 dark:bg-green-900 dark:text-green-300">
                    Concluído
                  </span>
                </td>
                <td className="w-12 px-4 py-3">
                  <HiChevronRight className="h-4 w-4 text-gray-400" />
                </td>
              </tr>
              <tr className="cursor-pointer border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50">
                <td className="px-4 py-3">#VIS-1023</td>
                <td className="px-4 py-3">09/06/2025</td>
                <td className="px-4 py-3">Fornecedor B</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    Em Andamento
                  </span>
                </td>
                <td className="w-12 px-4 py-3">
                  <HiChevronRight className="h-4 w-4 text-gray-400" />
                </td>
              </tr>
              <tr className="cursor-pointer border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50">
                <td className="px-4 py-3">#VIS-1022</td>
                <td className="px-4 py-3">08/06/2025</td>
                <td className="px-4 py-3">Fornecedor C</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800 dark:bg-green-900 dark:text-green-300">
                    Concluído
                  </span>
                </td>
                <td className="w-12 px-4 py-3">
                  <HiChevronRight className="h-4 w-4 text-gray-400" />
                </td>
              </tr>
              <tr className="cursor-pointer border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50">
                <td className="px-4 py-3">#VIS-1021</td>
                <td className="px-4 py-3">07/06/2025</td>
                <td className="px-4 py-3">Fornecedor D</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800 dark:bg-red-900 dark:text-red-300">
                    Cancelado
                  </span>
                </td>
                <td className="w-12 px-4 py-3">
                  <HiChevronRight className="h-4 w-4 text-gray-400" />
                </td>
              </tr>
              <tr className="cursor-pointer border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50">
                <td className="px-4 py-3">#VIS-1020</td>
                <td className="px-4 py-3">06/06/2025</td>
                <td className="px-4 py-3">Fornecedor E</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800 dark:bg-green-900 dark:text-green-300">
                    Concluído
                  </span>
                </td>
                <td className="w-12 px-4 py-3">
                  <HiChevronRight className="h-4 w-4 text-gray-400" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
