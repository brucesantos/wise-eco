"use client";

import React, { useState } from "react";
import { Label, TextInput, FileInput, Select, Button } from "flowbite-react";

interface Maquinario {
  esteira: number;
  empilhadeira: number;
  balanca: number;
  fotoMaquinario: File | null;
}

interface CounterProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

const Counter = ({ id, label, value, onChange, placeholder }: CounterProps) => {
  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  return (
    <div>
      <Label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </Label>
      <div className="relative flex max-w-[8rem] items-center">
        <button
          type="button"
          onClick={handleDecrement}
          className="h-11 rounded-s-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:ring-2 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            className="h-3 w-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          id={id}
          value={value || ""}
          onChange={(e) => {
            const newValue = parseInt(e.target.value) || 0;
            onChange(newValue);
          }}
          className="block h-11 w-full border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="h-11 rounded-e-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:ring-2 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            className="h-3 w-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

interface Step {
  label: string;
}

const steps: Step[] = [
  { label: "Fornecedor" },
  { label: "PNAE / PPE" },
  { label: "Materiais Separados" },
  { label: "Equipe / Layout" },
  { label: "Maquinário" },
];

const Stepper = ({
  steps,
  activeStep,
  onStepClick,
}: {
  steps: Step[];
  activeStep: number;
  onStepClick: (idx: number) => void;
}) => (
  <ol className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:justify-center md:flex-row md:items-center lg:gap-6 dark:border-gray-700 dark:bg-gray-800">
    {steps.map((step, idx) => {
      const completed = idx < activeStep;
      const active = idx === activeStep;
      return (
        <React.Fragment key={step.label}>
          <li
            className={`flex cursor-pointer items-center gap-2 select-none md:flex-1 md:flex-col md:gap-1.5 lg:flex-none ${active ? "" : "group"}`}
            onClick={() => onStepClick(idx)}
          >
            <svg
              className={`h-5 w-5 ${completed || active ? "text-primary-700 dark:text-primary-500" : "text-gray-500 dark:text-gray-400"}`}
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
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p
              className={`text-sm leading-tight font-medium ${completed || active ? "text-primary-700 dark:text-primary-500" : "text-gray-500 dark:text-gray-400"}`}
            >
              {step.label}
            </p>
          </li>
          {idx < steps.length - 1 && (
            <div className="hidden h-px w-4 shrink-0 bg-gray-200 md:block lg:w-16 dark:bg-gray-700"></div>
          )}
        </React.Fragment>
      );
    })}
  </ol>
);

export default function RelatorioVisita() {
  // Estados para lógica condicional
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCooperative, setIsCooperative] = useState(false);
  const [formType, setFormType] = useState<"analise" | "monitoramento" | "">(
    "",
  );
  const [receivesPNAE, setReceivesPNAE] = useState<boolean | null>(null);
  const [separaPorCor, setSeparaPorCor] = useState<boolean | null>(null);
  const [possuiSeparacao, setPossuiSeparacao] = useState(true);
  const [origemPEADPP, setOrigemPEADPP] = useState("");
  const [materiaisSeparados, setMateriaisSeparados] = useState<string[]>([]);
  const [realizaRemediacao, setRealizaRemediacao] = useState<boolean | null>(
    null,
  );
  const [enviaRejeitos, setEnviaRejeitos] = useState<boolean | null>(null);
  const [nomeAterro, setNomeAterro] = useState("");
  const [temRotaReciclagem, setTemRotaReciclagem] = useState<boolean | null>(
    null,
  );
  const [nomeRota, setNomeRota] = useState("");
  const [docsMarcados, setDocsMarcados] = useState<string[]>([]);
  const [layoutOrganizacao, setLayoutOrganizacao] = useState("");
  const [fotoLayout, setFotoLayout] = useState<File | null>(null);
  const [maquinario, setMaquinario] = useState<Maquinario>({
    esteira: 0,
    empilhadeira: 0,
    balanca: 0,
    fotoMaquinario: null,
  });
  const [numCooperados, setNumCooperados] = useState(0);
  const [numHomens, setNumHomens] = useState(0);
  const [numMulheres, setNumMulheres] = useState(0);
  const [salarioMedio, setSalarioMedio] = useState(1000);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Implement form submission logic
      console.log({
        isCooperative,
        formType,
        receivesPNAE,
        separaPorCor,
        possuiSeparacao,
        origemPEADPP,
        materiaisSeparados,
        realizaRemediacao,
        enviaRejeitos,
        nomeAterro,
        temRotaReciclagem,
        nomeRota,
        docsMarcados,
        layoutOrganizacao,
        fotoLayout,
        maquinario,
      });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="bg-white py-8 antialiased md:py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-green-100 p-3 text-green-500 dark:bg-green-900 dark:text-green-200">
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              Relatório Enviado com Sucesso!
            </h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              O relatório foi enviado e está sendo processado.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => {
                  setIsSuccess(false);
                  setActiveStep(0);
                  // Reset all form states here
                  setIsCooperative(false);
                  setFormType("");
                  setReceivesPNAE(null);
                  setSeparaPorCor(null);
                  setPossuiSeparacao(true);
                  setOrigemPEADPP("");
                  setMateriaisSeparados([]);
                  setRealizaRemediacao(null);
                  setEnviaRejeitos(null);
                  setNomeAterro("");
                  setTemRotaReciclagem(null);
                  setNomeRota("");
                  setDocsMarcados([]);
                  setLayoutOrganizacao("");
                  setFotoLayout(null);
                  setMaquinario({
                    esteira: 0,
                    empilhadeira: 0,
                    balanca: 0,
                    fotoMaquinario: null,
                  });
                  setNumCooperados(0);
                  setNumHomens(0);
                  setNumMulheres(0);
                  setSalarioMedio(1000);
                }}
                className="border-primary-700 bg-primary-700 hover:border-primary-800 hover:bg-primary-800 focus:ring-primary-300 dark:border-primary-600 dark:bg-primary-600 dark:hover:border-primary-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg border px-5 py-2.5 text-sm font-medium text-white focus:ring-4 focus:outline-none"
              >
                Preencher Novo Relatório
              </Button>
              <Button
                color="light"
                onClick={() => {
                  window.location.href = "/dashboard";
                }}
                className="border-primary-700 text-primary-700 hover:bg-primary-50 focus:ring-primary-300 border"
              >
                Ir para o Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Conteúdo de cada passo
  const stepContents = [
    // 1. Fornecedor
    <div className="space-y-6" key="fornecedor">
      <div>
        <Label
          htmlFor="tipo-fornecedor"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Estruturação do fornecedor
        </Label>
        <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-4">
          <label className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex h-5 items-center">
              <input
                id="cooperativa-checkbox"
                type="radio"
                name="tipo-fornecedor"
                checked={isCooperative}
                onChange={(e) => setIsCooperative(e.target.checked)}
                className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ms-4 text-sm leading-none font-medium text-gray-900 dark:text-white">
              Cooperativa
            </div>
          </label>

          <label className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex h-5 items-center">
              <input
                id="gerenciador-checkbox"
                type="radio"
                name="tipo-fornecedor"
                checked={!isCooperative}
                onChange={(e) => setIsCooperative(!e.target.checked)}
                className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ms-4 text-sm leading-none font-medium text-gray-900 dark:text-white">
              Gerenciador de Resíduos
            </div>
          </label>
        </div>
      </div>
      {isCooperative !== null && (
        <div>
          <Label htmlFor="formulario-tipo">
            Formulário para cooperativa/gerenciador
          </Label>
          <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-4">
            <label className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex h-5 items-center">
                <input
                  id="analise-option"
                  type="radio"
                  name="form-type"
                  value="analise"
                  checked={formType === "analise"}
                  onChange={() => setFormType("analise")}
                  className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                />
              </div>
              <div className="ms-4 text-sm">
                <span className="leading-none font-medium text-gray-900 dark:text-white">
                  Relatório de Análise
                </span>
                <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                  Quando é um novo fornecedor para a Wise
                </p>
              </div>
            </label>

            <label className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex h-5 items-center">
                <input
                  id="monitoramento-option"
                  type="radio"
                  name="form-type"
                  value="monitoramento"
                  checked={formType === "monitoramento"}
                  onChange={() => setFormType("monitoramento")}
                  className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                />
              </div>
              <div className="ms-4 text-sm">
                <span className="leading-none font-medium text-gray-900 dark:text-white">
                  Relatório de Monitoramento
                </span>
                <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                  Se já fornece para a Wise
                </p>
              </div>
            </label>
          </div>
        </div>
      )}
      <div>
        <Label
          htmlFor="cnpj"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          CNPJ
        </Label>
        <TextInput id="cnpj" type="text" placeholder="00.000.000/0001-00" />
      </div>
      <div>
        <Label
          htmlFor="nome-fantasia"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Nome Fantasia
        </Label>
        <TextInput
          id="nome-fantasia"
          type="text"
          placeholder="Nome Fantasia da empresa"
        />
      </div>
      <div>
        <Label
          htmlFor="cpf"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          CPF (responsável)
        </Label>
        <TextInput id="cpf" type="text" placeholder="000.000.000-00" />
      </div>
      <div>
        <Label
          htmlFor="nome-completo"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Nome Completo (responsável)
        </Label>
        <TextInput
          id="nome-completo"
          type="text"
          placeholder="Nome completo do responsável"
        />
      </div>
      <div>
        <Label
          htmlFor="localizacao-gps"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Localização por GPS
        </Label>
        <TextInput
          id="localizacao-gps"
          type="text"
          placeholder="Latitude, Longitude"
        />
      </div>
      <div>
        <Label
          htmlFor="foto-fachada"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Anexar Foto de Fachada
        </Label>
        <FileInput id="foto-fachada" />
      </div>
      <div>
        <Label
          htmlFor="volume-material"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Volume de material recebido por mês
        </Label>
        <TextInput
          id="volume-material"
          type="number"
          placeholder="Ex.: 1200 kg"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Informe o volume em quilogramas (kg)
        </p>
      </div>
    </div>,
    // 2. PNAE / PPE
    <div className="space-y-6" key="pnae">
      <div>
        <Label
          htmlFor="recebe-pnae"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Recebe PEAD e PP por mês?
        </Label>
        <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-4">
          <label className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex h-5 items-center">
              <input
                id="recebe-sim"
                type="radio"
                name="recebe-pnae"
                value="sim"
                checked={receivesPNAE === true}
                onChange={() => setReceivesPNAE(true)}
                className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ms-4 text-sm">
              <span className="leading-none font-medium text-gray-900 dark:text-white">
                Sim
              </span>
            </div>
          </label>

          <label className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex h-5 items-center">
              <input
                id="recebe-nao"
                type="radio"
                name="recebe-pnae"
                value="nao"
                checked={receivesPNAE === false}
                onChange={() => setReceivesPNAE(false)}
                className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ms-4 text-sm">
              <span className="leading-none font-medium text-gray-900 dark:text-white">
                Não
              </span>
            </div>
          </label>
        </div>
      </div>
      {receivesPNAE && (
        <>
          <div>
            <Label
              htmlFor="separa-por-cor"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Separa por cor?
            </Label>
            <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-4">
              <label className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex h-5 items-center">
                  <input
                    id="cor-sim"
                    type="radio"
                    name="separa-por-cor"
                    value="sim"
                    checked={separaPorCor === true}
                    onChange={() => setSeparaPorCor(true)}
                    className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ms-4 text-sm leading-none font-medium text-gray-900 dark:text-white">
                  Sim
                </div>
              </label>

              <label className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex h-5 items-center">
                  <input
                    id="cor-nao"
                    type="radio"
                    name="separa-por-cor"
                    value="nao"
                    checked={separaPorCor === false}
                    onChange={() => setSeparaPorCor(false)}
                    className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ms-4 text-sm leading-none font-medium text-gray-900 dark:text-white">
                  Não
                </div>
              </label>
            </div>
          </div>
          <div>
            <Label
              htmlFor="possui-separacao"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Existe possibilidade de realizar separação?
            </Label>
            <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-4">
              <label className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex h-5 items-center">
                  <input
                    id="possui-sim"
                    type="radio"
                    name="possui-separacao"
                    value="sim"
                    checked={possuiSeparacao === true}
                    onChange={() => setPossuiSeparacao(true)}
                    className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ms-4 text-sm leading-none font-medium text-gray-900 dark:text-white">
                  Sim
                </div>
              </label>

              <label className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex h-5 items-center">
                  <input
                    id="possui-nao"
                    type="radio"
                    name="possui-separacao"
                    value="nao"
                    checked={possuiSeparacao === false}
                    onChange={() => setPossuiSeparacao(false)}
                    className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ms-4 text-sm leading-none font-medium text-gray-900 dark:text-white">
                  Não
                </div>
              </label>
            </div>
          </div>
          {possuiSeparacao && (
            <div>
              <Label
                htmlFor="tipo-separacao"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Tipo de separação
              </Label>
              <div className="mt-2 flex justify-between gap-4">
                {[
                  { value: "interna", label: "Interna" },
                  { value: "coletiva", label: "Coletiva" },
                  { value: "coletiva-porta", label: "Coletiva em porta" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex flex-1 cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="flex h-5 items-center">
                      <input
                        id={`tipo-separacao-${option.value}`}
                        type="radio"
                        name="tipo-separacao"
                        value={option.value}
                        className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ms-4 text-sm leading-none font-medium text-gray-900 dark:text-white">
                      {option.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
          {!possuiSeparacao && (
            <div className="text-red-600 dark:text-red-400">
              Não existe possibilidade de realizar a separação.
            </div>
          )}
          <div>
            <Label
              htmlFor="origem-pead-pp"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Qual a origem do PEAD e PP?
            </Label>
            <Select
              id="origem-pead-pp"
              value={origemPEADPP}
              onChange={(e) => setOrigemPEADPP(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="vivo-coletor">Vivo (coletor)</option>
              <option value="troco-coletado">Troco coletado</option>
              <option value="grande-geradores">Grandes geradores</option>
              <option value="produtor-gar">
                Produtor (garantido pelo coletor)
              </option>
              <option value="cooperativa">Cooperativa</option>
              <option value="centro-coleta">Centro de Coleta</option>
              <option value="ponto-coleta">Ponto de Coleta</option>
              <option value="compras-catadores">Compras de catadores</option>
              <option value="servico-catadores">Serviço de catadores</option>
              <option value="embalagem-especifica">Embalagem específica</option>
              <option value="pilar-maternal">Pilar maternal</option>
            </Select>
          </div>
        </>
      )}
    </div>,
    // 3. Materiais Separados
    <div className="space-y-6" key="materiais">
      <div>
        <Label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          Quais materiais são separados? (orde-los do maior ao menor volume)
        </Label>
        <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-4">
          {[
            "PET",
            "PEAD",
            "PP",
            "Papelão",
            "Papel",
            "Ferro",
            "Vidro",
            "Latinha de Alumínio",
            "Óleo",
            "Eletrônico",
          ].map((mat) => (
            <label
              key={mat}
              className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex h-5 items-center">
                <input
                  id={`mat-${mat}`}
                  type="checkbox"
                  value={mat}
                  checked={materiaisSeparados.includes(mat)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setMateriaisSeparados((prev) =>
                      checked ? [...prev, mat] : prev.filter((m) => m !== mat),
                    );
                  }}
                  className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                />
              </div>
              <div className="ms-4 text-sm leading-none font-medium text-gray-900 dark:text-white">
                {mat}
              </div>
            </label>
          ))}
        </div>
      </div>
      <div>
        <Label
          htmlFor="remediacao-mt"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Realizam a remediação de MT?
        </Label>
        <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-4">
          <label className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex h-5 items-center">
              <input
                id="remediacao-sim"
                type="radio"
                name="remediacao-mt"
                value="sim"
                checked={realizaRemediacao === true}
                onChange={() => setRealizaRemediacao(true)}
                className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ms-4 text-sm leading-none font-medium text-gray-900 dark:text-white">
              Sim
            </div>
          </label>

          <label className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex h-5 items-center">
              <input
                id="remediacao-nao"
                type="radio"
                name="remediacao-mt"
                value="nao"
                checked={realizaRemediacao === false}
                onChange={() => setRealizaRemediacao(false)}
                className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ms-4 text-sm leading-none font-medium text-gray-900 dark:text-white">
              Não
            </div>
          </label>
        </div>
      </div>
      <div>
        <Label
          htmlFor="envia-rejeitos"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Os rejeitos são enviados para aterro?
        </Label>
        <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-4">
          <label className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex h-5 items-center">
              <input
                id="rejeitos-sim"
                type="radio"
                name="envia-rejeitos"
                value="sim"
                checked={enviaRejeitos === true}
                onChange={() => setEnviaRejeitos(true)}
                className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ms-4 text-sm leading-none font-medium text-gray-900 dark:text-white">
              Sim
            </div>
          </label>

          <label className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex h-5 items-center">
              <input
                id="rejeitos-nao"
                type="radio"
                name="envia-rejeitos"
                value="nao"
                checked={enviaRejeitos === false}
                onChange={() => setEnviaRejeitos(false)}
                className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ms-4 text-sm leading-none font-medium text-gray-900 dark:text-white">
              Não
            </div>
          </label>
        </div>
      </div>
      {enviaRejeitos && (
        <div>
          <Label
            htmlFor="nome-aterro"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Se sim, qual o nome do aterro?
          </Label>
          <TextInput
            id="nome-aterro"
            type="text"
            placeholder="Nome do aterro"
            value={nomeAterro}
            onChange={(e) => setNomeAterro(e.target.value)}
          />
        </div>
      )}
      <div>
        <Label
          htmlFor="rota-reciclagem"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Possui alguma rota de reciclagem?
        </Label>
        <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-4">
          <label className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex h-5 items-center">
              <input
                id="rota-sim"
                type="radio"
                name="rota-reciclagem"
                value="sim"
                checked={temRotaReciclagem === true}
                onChange={() => setTemRotaReciclagem(true)}
                className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ms-4 text-sm leading-none font-medium text-gray-900 dark:text-white">
              Sim
            </div>
          </label>

          <label className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex h-5 items-center">
              <input
                id="rota-nao"
                type="radio"
                name="rota-reciclagem"
                value="nao"
                checked={temRotaReciclagem === false}
                onChange={() => setTemRotaReciclagem(false)}
                className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ms-4 text-sm leading-none font-medium text-gray-900 dark:text-white">
              Não
            </div>
          </label>
        </div>
      </div>
      {temRotaReciclagem && (
        <div>
          <Label
            htmlFor="nome-rota"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Se sim, qual o nome da rota?
          </Label>
          <TextInput
            id="nome-rota"
            type="text"
            placeholder="Nome da rota"
            value={nomeRota}
            onChange={(e) => setNomeRota(e.target.value)}
          />
        </div>
      )}
      <div>
        <Label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          Documentação disponível (marque todas que se aplicam)
        </Label>
        <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-4">
          {[
            "Alvará de Funcionamento",
            "AIBAC",
            "Licença de Operação Ambiental",
            "Controle de Depósito",
            "Licença de Coleta e Transporte de Resíduos",
            "Livros de Controle",
            "Uso de colaboradores",
          ].map((doc) => (
            <label
              key={doc}
              className="flex w-full cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex h-5 items-center">
                <input
                  id={`doc-${doc}`}
                  type="checkbox"
                  value={doc}
                  checked={docsMarcados.includes(doc)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setDocsMarcados((prev) =>
                      checked ? [...prev, doc] : prev.filter((d) => d !== doc),
                    );
                  }}
                  className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                />
              </div>
              <div className="ms-4 text-sm leading-none font-medium text-gray-900 dark:text-white">
                {doc}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>,
    // 4. Equipe / Layout
    <div className="space-y-6" key="layout">
      <Counter
        id="num-cooperados"
        label="Número de cooperados"
        value={numCooperados}
        onChange={setNumCooperados}
        placeholder="Ex:10"
      />
      <Counter
        id="num-homens"
        label="Número de homens"
        value={numHomens}
        onChange={setNumHomens}
        placeholder="Ex:5"
      />
      <Counter
        id="num-mulheres"
        label="Número de mulheres"
        value={numMulheres}
        onChange={setNumMulheres}
        placeholder="Ex:5"
      />
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label
            htmlFor="salario-medio"
            className="text-sm font-medium text-gray-900 dark:text-white"
          >
            Salário médio mensal
          </Label>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            R$ {salarioMedio.toLocaleString("pt-BR")}
          </span>
        </div>
        <div className="relative mb-6">
          <input
            id="salario-medio"
            type="range"
            value={salarioMedio}
            min="1000"
            max="20000"
            onChange={(e) => setSalarioMedio(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
          />
          <span className="absolute start-0 -bottom-6 text-sm text-gray-500 dark:text-gray-400">
            R$ 1.000
          </span>
          <span className="absolute start-1/3 -bottom-6 -translate-x-1/2 text-sm text-gray-500 rtl:translate-x-1/2 dark:text-gray-400">
            R$ 7.000
          </span>
          <span className="absolute start-2/3 -bottom-6 -translate-x-1/2 text-sm text-gray-500 rtl:translate-x-1/2 dark:text-gray-400">
            R$ 13.000
          </span>
          <span className="absolute end-0 -bottom-6 text-sm text-gray-500 dark:text-gray-400">
            R$ 20.000
          </span>
        </div>
      </div>
      <div className="mt-10">
        <Label
          htmlFor="layout-organizacao"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Organização do layout
        </Label>
        <div className="mt-2 flex justify-between gap-4">
          {[
            { value: "organizado", label: "Organizado" },
            { value: "parcialmente", label: "Parcialmente organizado" },
            { value: "pouco", label: "Pouco organizado" },
            { value: "desorganizado", label: "Desorganizado" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex flex-1 cursor-pointer items-start rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex h-5 items-center">
                <input
                  id={`layout-${option.value}`}
                  type="radio"
                  name="layout-organizacao"
                  value={option.value}
                  checked={layoutOrganizacao === option.value}
                  onChange={(e) => setLayoutOrganizacao(e.target.value)}
                  className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                />
              </div>
              <div className="ms-4 text-sm leading-none font-medium text-gray-900 dark:text-white">
                {option.label}
              </div>
            </label>
          ))}
        </div>
      </div>
      <div>
        <Label
          htmlFor="foto-layout"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Campo para enviar foto do layout
        </Label>
        <FileInput
          id="foto-layout"
          onChange={(e) => setFotoLayout(e.target.files?.[0] || null)}
        />
      </div>
    </div>,
    // 5. Maquinário
    <div className="space-y-6" key="maquinario">
      <Counter
        id="esteira-qty"
        label="Esteira (quantidade)"
        value={maquinario.esteira}
        onChange={(value) =>
          setMaquinario({
            ...maquinario,
            esteira: value,
          })
        }
        placeholder="Ex.: 2"
      />
      <Counter
        id="empilhadeira-qty"
        label="Empilhadeira (quantidade)"
        value={maquinario.empilhadeira}
        onChange={(value) =>
          setMaquinario({
            ...maquinario,
            empilhadeira: value,
          })
        }
        placeholder="Ex.: 1"
      />
      <Counter
        id="balanca-qty"
        label="Balança (quantidade)"
        value={maquinario.balanca}
        onChange={(value) =>
          setMaquinario({
            ...maquinario,
            balanca: value,
          })
        }
        placeholder="Ex.: 1"
      />
      <div>
        <Label
          htmlFor="foto-maquinario"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Enviar foto do maquinário
        </Label>
        <FileInput
          id="foto-maquinario"
          onChange={(e) =>
            setMaquinario({
              ...maquinario,
              fotoMaquinario: e.target.files?.[0] || null,
            })
          }
        />
      </div>
    </div>,
  ];

  // Botões de navegação
  const navButtons = (
    <div className="mt-8 flex justify-end gap-4">
      {activeStep > 0 && (
        <Button
          type="button"
          color="light"
          className="hover:text-primary-700 w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none sm:w-auto dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
        >
          {`Ant: ${steps[activeStep - 1].label}`}
        </Button>
      )}
      {activeStep < steps.length - 1 ? (
        <Button
          type="button"
          className="border-primary-700 bg-primary-700 hover:border-primary-800 hover:bg-primary-800 focus:ring-primary-300 dark:border-primary-600 dark:bg-primary-600 dark:hover:border-primary-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex w-full items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium text-white focus:ring-4 focus:outline-none sm:w-auto"
          onClick={() =>
            setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))
          }
        >
          {`Prox: ${steps[activeStep + 1].label}`}
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={isLoading}
          className="border-primary-700 bg-primary-700 hover:border-primary-800 hover:bg-primary-800 focus:ring-primary-300 dark:border-primary-600 dark:bg-primary-600 dark:hover:border-primary-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex w-full items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium text-white focus:ring-4 focus:outline-none sm:w-auto"
        >
          {isLoading ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="me-3 inline h-4 w-4 animate-spin text-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Enviando...
            </>
          ) : (
            "Enviar Relatório"
          )}
        </Button>
      )}
    </div>
  );

  return (
    <section className="bg-white py-8 antialiased md:py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h1 className="mb-8 text-2xl font-semibold text-gray-900 dark:text-white">
          Relatório de Visita
        </h1>
        <form onSubmit={handleSubmit}>
          <Stepper
            steps={steps}
            activeStep={activeStep}
            onStepClick={setActiveStep}
          />
          <div className="mt-8">{stepContents[activeStep]}</div>
          {navButtons}
        </form>
      </div>
    </section>
  );
}
