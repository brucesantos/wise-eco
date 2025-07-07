"use client";

import React, { useState } from "react";
import {
  Label,
  TextInput,
  FileInput,
  Select,
  Button,
  Modal,
  Datepicker,
} from "flowbite-react";

interface Step {
  label: string;
}

const steps: Step[] = [
  { label: "Fornecedor" },
  { label: "Produção" },
  { label: "Ambiental" },
  { label: "Documentos" },
  { label: "Social" },
  { label: "Infraestrutura" },
  { label: "Envio" },
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

export default function RelatorioVisitaAmpliado() {
  const [activeStep, setActiveStep] = useState(0);

  // Identificação do fornecedor states
  const [showFornecedorModal, setShowFornecedorModal] = useState(false);
  const [fornecedorBusca, setFornecedorBusca] = useState("");
  const [fornecedores] = useState([
    { nome: "Empresa De Exemplo Com Nome Longo", cnpj: "00.000.000/0001-00" },
  ]);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState<{
    nome: string;
    cnpj: string;
  } | null>(null);

  // Modal states
  const [classificacao, setClassificacao] = useState("");
  const [cpf, setCpf] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [fotoFachada, setFotoFachada] = useState<File | null>(null);
  const [dataVisita, setDataVisita] = useState(() =>
    new Date().toISOString().slice(0, 10),
  );
  const [recebidoPor, setRecebidoPor] = useState("");

  // Adicionar estados para a seção Produção
  const [volumeMaterial, setVolumeMaterial] = useState("");
  const [volumeMaterialUnidade, setVolumeMaterialUnidade] = useState("kg");
  const [materialMaiorVolume, setMaterialMaiorVolume] = useState<string[]>([]);
  const [novoMaterial, setNovoMaterial] = useState("");
  const [showNovoMaterial, setShowNovoMaterial] = useState(false);
  const [volumePEADPP, setVolumePEADPP] = useState("");
  const [volumePEADPPUnidade, setVolumePEADPPUnidade] = useState("kg");
  const [separacaoMaterial, setSeparacaoMaterial] = useState("");
  const [obsSeparacao, setObsSeparacao] = useState("");
  // Rastreabilidade
  const rastreabilidadeOpcoes = [
    "Coleta seletiva municipal",
    "Grandes geradores",
    "Shopping",
    "Escola",
    "Condomínio",
    "Comércio",
    "Doação pessoa física ou jurídica",
    "Indústria Pós - Industria",
    "Indústria Pós consumo industrial (coleta seletiva de empresa)",
    "Compra de sucateiros e Aparistas",
    "Compra de Pequenos Fornecedores (ferro velhos e depósitos de bairro)",
    "Compra direta de Catadores",
    "Compra de Cooperativas",
    "Material de Aterros",
    "Recebido em Pontos de Entrega Voluntária (PEV)",
  ];
  const [rastreabilidade, setRastreabilidade] = useState<
    { opcao: string; percentual: number; obs: string }[]
  >([]);

  // Adicionar estados para a seção Ambiental
  const [emiteMTR, setEmiteMTR] = useState<boolean | null>(null);
  const [rejeitosAterro, setRejeitosAterro] = useState<boolean | null>(null);
  const [nomeAterro, setNomeAterro] = useState("");
  const [areaQuimicos, setAreaQuimicos] = useState("");
  const [obsAreaQuimicos, setObsAreaQuimicos] = useState("");
  const [fotoAreaQuimicos, setFotoAreaQuimicos] = useState<File | null>(null);
  const [acidenteProdutos, setAcidenteProdutos] = useState("");
  const [planoEmergencia, setPlanoEmergencia] = useState<boolean | null>(null);
  const [obsAcidente, setObsAcidente] = useState("");
  const [fotoAcidente, setFotoAcidente] = useState<File | null>(null);
  const [indiciosEfluente, setIndiciosEfluente] = useState("");
  const [fotoEfluente, setFotoEfluente] = useState<File | null>(null);
  const [indiciosResiduos, setIndiciosResiduos] = useState("");
  const [fotoResiduos, setFotoResiduos] = useState<File | null>(null);
  const [estacaoTratamento, setEstacaoTratamento] = useState("");
  const [possuiLicenca, setPossuiLicenca] = useState<boolean | null>(null);
  const [fotoEstacao, setFotoEstacao] = useState<File | null>(null);
  const [materialHospitalar, setMaterialHospitalar] = useState("");
  const [tratativaHospitalar, setTratativaHospitalar] = useState("");
  const [obsHospitalar, setObsHospitalar] = useState("");
  const [fotoHospitalar, setFotoHospitalar] = useState<File | null>(null);

  // Adicionar estados para a seção Documentação
  const documentosOpcoes = [
    "Alvará",
    "AVCB",
    "Licença ambiental",
    "Controle de pragas",
    "Lista de colaboradores",
    "Ficha EPI",
  ];
  const [documentosSelecionados, setDocumentosSelecionados] = useState<
    {
      nome: string;
      foto: File | null;
      validade: string;
      infoAdicional: string;
    }[]
  >([]);

  // Adicionar estados para a seção Social
  const [redeCooperativas, setRedeCooperativas] = useState<boolean | null>(
    null,
  );
  const [nomeRede, setNomeRede] = useState("");
  const [infoRede, setInfoRede] = useState("");
  const [fotoRede, setFotoRede] = useState<File | null>(null);
  const [projetoSocial, setProjetoSocial] = useState<boolean | null>(null);
  const [nomeProjeto, setNomeProjeto] = useState("");
  const [infoProjeto, setInfoProjeto] = useState("");
  const [fotoProjeto, setFotoProjeto] = useState<File | null>(null);
  const [numHomens, setNumHomens] = useState(0);
  const [numMulheres, setNumMulheres] = useState(0);
  const [numRegressos, setNumRegressos] = useState(0);
  const [fotoCooperados, setFotoCooperados] = useState<File | null>(null);
  const [salarioMedio, setSalarioMedio] = useState(1000);
  const beneficiosOpcoes = [
    "Vale Alimentação",
    "Vale Refeição",
    "Oferece refeição no local",
    "Vale Transporte",
    "Plano de Saude",
    "Seguro de Vida",
    "Bolsa de auxílio de estudos",
    "Insalubridade",
  ];
  const [beneficiosSelecionados, setBeneficiosSelecionados] = useState<
    string[]
  >([]);
  const [fotoBeneficios, setFotoBeneficios] = useState<File | null>(null);
  const [obsBeneficios, setObsBeneficios] = useState("");

  // Adicionar estados para a seção Infraestrutura
  const [vestiario, setVestiario] = useState("");
  const [fotoVestiario, setFotoVestiario] = useState<File | null>(null);
  const [refeitorio, setRefeitorio] = useState("");
  const [fotoRefeitorio, setFotoRefeitorio] = useState<File | null>(null);
  const [layout, setLayout] = useState("");
  const [motivoLayout, setMotivoLayout] = useState("");
  const [fotoLayout, setFotoLayout] = useState<File | null>(null);
  const maquinarioOpcoes = [
    "Esteira",
    "Prensa",
    "Balança",
    "Pá carregadeira",
    "Moinho",
    "Caminhão",
  ];
  const [maquinarioSelecionado, setMaquinarioSelecionado] = useState<
    {
      nome: string;
      quantidade: number;
      fotos: File[];
    }[]
  >([]);

  // Adicionar estados para a seção Observações e Envio
  const [observacoesGerais, setObservacoesGerais] = useState("");
  const [observacoesEspecificas, setObservacoesEspecificas] = useState("");
  const [recomendacoes, setRecomendacoes] = useState("");
  const [proximosPassos, setProximosPassos] = useState("");
  const [anexosAdicionais, setAnexosAdicionais] = useState<File[]>([]);
  const [declaracaoVeracidade, setDeclaracaoVeracidade] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddMaterial = () => {
    if (novoMaterial && !materialMaiorVolume.includes(novoMaterial)) {
      setMaterialMaiorVolume([...materialMaiorVolume, novoMaterial]);
      setNovoMaterial("");
      setShowNovoMaterial(false);
    }
  };
  const handleRastreabilidadeChange = (
    idx: number,
    field: "percentual" | "obs",
    value: number | string,
  ) => {
    setRastreabilidade(
      rastreabilidade.map((r, i) => (i === idx ? { ...r, [field]: value } : r)),
    );
  };
  const handleRemoveRastreabilidade = (idx: number) => {
    setRastreabilidade(rastreabilidade.filter((_, i) => i !== idx));
  };
  const somaPercentual = rastreabilidade.reduce(
    (acc, r) => acc + r.percentual,
    0,
  );

  const handleAddDocumento = (nome: string) => {
    if (!documentosSelecionados.find((d) => d.nome === nome)) {
      setDocumentosSelecionados([
        ...documentosSelecionados,
        {
          nome,
          foto: null,
          validade: "",
          infoAdicional: "",
        },
      ]);
    }
  };

  const handleRemoveDocumento = (nome: string) => {
    setDocumentosSelecionados(
      documentosSelecionados.filter((d) => d.nome !== nome),
    );
  };

  const handleDocumentoChange = (
    nome: string,
    field: "foto" | "validade" | "infoAdicional",
    value: File | null | string,
  ) => {
    setDocumentosSelecionados(
      documentosSelecionados.map((d) =>
        d.nome === nome ? { ...d, [field]: value } : d,
      ),
    );
  };

  const handleBeneficioChange = (beneficio: string, checked: boolean) => {
    if (checked) {
      setBeneficiosSelecionados([...beneficiosSelecionados, beneficio]);
    } else {
      setBeneficiosSelecionados(
        beneficiosSelecionados.filter((b) => b !== beneficio),
      );
    }
  };

  const handleAddMaquinario = (nome: string) => {
    if (!maquinarioSelecionado.find((m) => m.nome === nome)) {
      setMaquinarioSelecionado([
        ...maquinarioSelecionado,
        {
          nome,
          quantidade: 1,
          fotos: [],
        },
      ]);
    }
  };

  const handleRemoveMaquinario = (nome: string) => {
    setMaquinarioSelecionado(
      maquinarioSelecionado.filter((m) => m.nome !== nome),
    );
  };

  const handleMaquinarioChange = (
    nome: string,
    field: "quantidade" | "fotos",
    value: number | File[],
  ) => {
    setMaquinarioSelecionado(
      maquinarioSelecionado.map((m) =>
        m.nome === nome ? { ...m, [field]: value } : m,
      ),
    );
  };

  const handleAddFotoMaquinario = (nome: string, file: File) => {
    const maquinario = maquinarioSelecionado.find((m) => m.nome === nome);
    if (maquinario) {
      handleMaquinarioChange(nome, "fotos", [...maquinario.fotos, file]);
    }
  };

  const handleRemoveFotoMaquinario = (nome: string, index: number) => {
    const maquinario = maquinarioSelecionado.find((m) => m.nome === nome);
    if (maquinario) {
      const novasFotos = maquinario.fotos.filter((_, i) => i !== index);
      handleMaquinarioChange(nome, "fotos", novasFotos);
    }
  };

  const handleAddAnexo = (file: File) => {
    setAnexosAdicionais([...anexosAdicionais, file]);
  };

  const handleRemoveAnexo = (index: number) => {
    setAnexosAdicionais(anexosAdicionais.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!declaracaoVeracidade) {
      alert(
        "É necessário aceitar a declaração de veracidade para enviar o relatório.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement form submission logic
      console.log({
        // Identificação do fornecedor
        fornecedorSelecionado,
        classificacao,
        cnpj,
        nomeFantasia,
        fotoFachada,
        dataVisita,
        recebidoPor,
        // Produção
        volumeMaterial,
        materialMaiorVolume,
        novoMaterial,
        volumePEADPP,
        separacaoMaterial,
        obsSeparacao,
        rastreabilidade,
        // Ambiental
        emiteMTR,
        nomeAterro,
        areaQuimicos,
        obsAreaQuimicos,
        fotoAreaQuimicos,
        acidenteProdutos,
        planoEmergencia,
        obsAcidente,
        fotoAcidente,
        estacaoTratamento,
        fotoEstacao,
        tratativaHospitalar,
        obsHospitalar,
        fotoHospitalar,
        // Documentação
        documentosSelecionados,
        // Social
        nomeRede,
        infoRede,
        fotoRede,
        nomeProjeto,
        infoProjeto,
        fotoProjeto,
        numHomens,
        numMulheres,
        fotoCooperados,
        salarioMedio,
        beneficiosSelecionados,
        fotoBeneficios,
        obsBeneficios,
        // Infraestrutura
        vestiario,
        fotoVestiario,
        refeitorio,
        fotoRefeitorio,
        layout,
        motivoLayout,
        fotoLayout,
        maquinarioSelecionado,
        // Observações e Envio
        observacoesGerais,
        observacoesEspecificas,
        recomendacoes,
        proximosPassos,
        anexosAdicionais,
        declaracaoVeracidade,
      });

      // Simular envio
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Relatório enviado com sucesso!");
      // Reset do formulário
      setActiveStep(0);
      // Reset todos os estados aqui...
    } catch (error) {
      console.error("Erro ao enviar relatório:", error);
      alert("Erro ao enviar relatório. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const identificacaoFornecedor = (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <Label htmlFor="fornecedor-busca">Fornecedor</Label>
          <TextInput
            id="fornecedor-busca"
            placeholder="Buscar por nome ou CNPJ/CPF"
            value={fornecedorBusca}
            onChange={(e) => setFornecedorBusca(e.target.value)}
          />
          {/* Lista de resultados */}
          {fornecedorBusca && (
            <div className="mt-2 max-h-40 overflow-auto rounded border bg-white dark:bg-gray-800">
              {fornecedores.filter(
                (f) =>
                  f.nome
                    .toLowerCase()
                    .includes(fornecedorBusca.toLowerCase()) ||
                  f.cnpj.includes(fornecedorBusca),
              ).length === 0 ? (
                <div className="flex items-center justify-between p-2 text-gray-500">
                  Nenhum fornecedor encontrado.
                  <Button
                    size="xs"
                    onClick={() => setShowFornecedorModal(true)}
                  >
                    Cadastrar novo
                  </Button>
                </div>
              ) : (
                fornecedores
                  .filter(
                    (f) =>
                      f.nome
                        .toLowerCase()
                        .includes(fornecedorBusca.toLowerCase()) ||
                      f.cnpj.includes(fornecedorBusca),
                  )
                  .map((f) => (
                    <div
                      key={f.cnpj}
                      className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setFornecedorSelecionado(f)}
                    >
                      {f.nome} — {f.cnpj}
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
        <Button onClick={() => setShowFornecedorModal(true)}>Novo</Button>
      </div>
      {/* Exibir dados do fornecedor selecionado, se houver */}
      {fornecedorSelecionado && (
        <div className="mt-4 rounded border bg-gray-50 p-4 dark:bg-gray-800">
          <div>
            <b>Nome:</b> {fornecedorSelecionado.nome}
          </div>
          <div>
            <b>CNPJ:</b> {fornecedorSelecionado.cnpj}
          </div>
        </div>
      )}
      {/* Modal de cadastro de fornecedor */}
      <Modal
        show={showFornecedorModal}
        onClose={() => setShowFornecedorModal(false)}
        size="lg"
      >
        <div className="p-6">
          <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Cadastrar novo fornecedor
          </h3>
          <div className="space-y-4">
            <div>
              <Label>Classificação do Fornecedor</Label>
              <Select
                value={classificacao}
                onChange={(e) => setClassificacao(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="cooperativa">Cooperativa/associação</option>
                <option value="rede-cooperativas">Rede de cooperativas</option>
                <option value="catador">Catador Autônomo</option>
                <option value="rede-catadores">Rede de Catadores</option>
                <option value="sucateiro">Sucateiro</option>
                <option value="pre-processador">Pré processador</option>
                <option value="aterro">Aterro</option>
                <option value="grande-gerenciador">Grande Gerenciador</option>
                <option value="aparista">Aparista</option>
                <option value="hub-plastico">Hub do plástico</option>
                <option value="ferro-velho">Ferro Velho</option>
              </Select>
            </div>
            {classificacao === "catador" && (
              <>
                <div>
                  <Label>CPF</Label>
                  <TextInput
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="000.000.000-00"
                  />
                </div>
                <div>
                  <Label>Nome completo</Label>
                  <TextInput
                    value={nomeCompleto}
                    onChange={(e) => setNomeCompleto(e.target.value)}
                    placeholder="Nome completo"
                  />
                </div>
              </>
            )}
            <div>
              <Label>CNPJ</Label>
              <TextInput
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                placeholder="00.000.000/0001-00"
              />
            </div>
            <div>
              <Label>Nome Fantasia</Label>
              <TextInput
                value={nomeFantasia}
                onChange={(e) => setNomeFantasia(e.target.value)}
                placeholder="Nome Fantasia"
              />
            </div>
            <div>
              <Label>Foto da fachada</Label>
              <FileInput
                onChange={(e) => setFotoFachada(e.target.files?.[0] || null)}
                accept="image/*"
              />
              {fotoFachada && (
                <div className="relative mt-2 inline-block">
                  <img
                    src={URL.createObjectURL(fotoFachada)}
                    alt="Fachada"
                    className="h-32 w-32 rounded object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 rounded-full bg-white p-1 shadow hover:bg-red-100"
                    onClick={() => setFotoFachada(null)}
                  >
                    <svg
                      className="h-5 w-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
              <div className="mt-1 text-xs text-gray-500">Limite de 10mb</div>
            </div>
            <div>
              <Label>Data da visita</Label>
              <Datepicker
                value={dataVisita ? new Date(dataVisita) : new Date()}
                onChange={(date) =>
                  setDataVisita(date ? date.toISOString().slice(0, 10) : "")
                }
              />
            </div>
            <div>
              <Label>Recebido por</Label>
              <TextInput
                value={recebidoPor}
                onChange={(e) => setRecebidoPor(e.target.value)}
                placeholder="Nome do responsável"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button onClick={() => setShowFornecedorModal(false)} color="light">
              Cancelar
            </Button>
            <Button onClick={() => setShowFornecedorModal(false)}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );

  const producaoSection = (
    <div className="space-y-6">
      <div>
        <Label>Volume de material movimentado / mês</Label>
        <div className="flex max-w-xs">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {/* Ícone de peso */}
              <svg
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17v-2a3 3 0 016 0v2M5 21h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z"
                />
              </svg>
            </div>
            <input
              type="number"
              min="0"
              className="block w-full rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
              placeholder="Ex: 1200"
              value={volumeMaterial}
              onChange={(e) => setVolumeMaterial(e.target.value)}
            />
          </div>
          <select
            className="rounded-r-lg border border-l-0 border-gray-300 bg-gray-100 p-2.5 text-sm font-medium text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
            value={volumeMaterialUnidade}
            onChange={(e) => setVolumeMaterialUnidade(e.target.value)}
          >
            <option value="kg">Kg</option>
            <option value="ton">Ton</option>
          </select>
        </div>
      </div>
      <div>
        <Label>Material com maior volume</Label>
        <div className="mb-2 flex flex-wrap gap-2">
          {materialMaiorVolume.map((mat) => (
            <span
              key={mat}
              className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100 flex items-center gap-1 rounded px-2 py-1 text-xs"
            >
              {mat}
              <button
                type="button"
                onClick={() =>
                  setMaterialMaiorVolume(
                    materialMaiorVolume.filter((m) => m !== mat),
                  )
                }
              >
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
        <Select
          value=""
          onChange={(e) => {
            if (e.target.value === "outro") setShowNovoMaterial(true);
            else if (
              e.target.value &&
              !materialMaiorVolume.includes(e.target.value)
            )
              setMaterialMaiorVolume([...materialMaiorVolume, e.target.value]);
          }}
        >
          <option value="">Selecione...</option>
          <option value="PET">PET</option>
          <option value="PEAD">PEAD</option>
          <option value="PP">PP</option>
          <option value="Papelão">Papelão</option>
          <option value="Papel">Papel</option>
          <option value="Ferro">Ferro</option>
          <option value="Vidro">Vidro</option>
          <option value="Latinha de Alumínio">Latinha de Alumínio</option>
          <option value="Óleo">Óleo</option>
          <option value="Eletrônico">Eletrônico</option>
          <option value="outro">Outro...</option>
        </Select>
        {showNovoMaterial && (
          <div className="mt-2 flex gap-2">
            <TextInput
              value={novoMaterial}
              onChange={(e) => setNovoMaterial(e.target.value)}
              placeholder="Novo material"
            />
            <Button size="sm" onClick={handleAddMaterial}>
              Adicionar
            </Button>
          </div>
        )}
      </div>
      <div>
        <Label>Volume de PEAD + PP / mês</Label>
        <div className="flex max-w-xs">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {/* Ícone de peso */}
              <svg
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17v-2a3 3 0 016 0v2M5 21h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z"
                />
              </svg>
            </div>
            <input
              type="number"
              min="0"
              className="block w-full rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
              placeholder="Ex: 500"
              value={volumePEADPP}
              onChange={(e) => setVolumePEADPP(e.target.value)}
            />
          </div>
          <select
            className="rounded-r-lg border border-l-0 border-gray-300 bg-gray-100 p-2.5 text-sm font-medium text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
            value={volumePEADPPUnidade}
            onChange={(e) => setVolumePEADPPUnidade(e.target.value)}
          >
            <option value="kg">Kg</option>
            <option value="ton">Ton</option>
          </select>
        </div>
      </div>
      <div>
        <Label>Separação de material</Label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="separacao"
              value="pead-pp"
              checked={separacaoMaterial === "pead-pp"}
              onChange={() => setSeparacaoMaterial("pead-pp")}
            />
            Separa PEAD de PP
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="separacao"
              value="cor"
              checked={separacaoMaterial === "cor"}
              onChange={() => setSeparacaoMaterial("cor")}
            />
            Separa por cor
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="separacao"
              value="nao"
              checked={separacaoMaterial === "nao"}
              onChange={() => setSeparacaoMaterial("nao")}
            />
            Não separa…
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="separacao"
              value="obs"
              checked={separacaoMaterial === "obs"}
              onChange={() => setSeparacaoMaterial("obs")}
            />
            Observação
          </label>
          {separacaoMaterial === "obs" && (
            <textarea
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={obsSeparacao}
              onChange={(e) => setObsSeparacao(e.target.value)}
              placeholder="Descreva a observação..."
            />
          )}
        </div>
      </div>
      <div>
        <Label>Rastreabilidade do material</Label>
        <Select
          className="mb-2"
          value=""
          onChange={(e) => {
            if (
              e.target.value &&
              !rastreabilidade.find((r) => r.opcao === e.target.value)
            ) {
              setRastreabilidade([
                ...rastreabilidade,
                { opcao: e.target.value, percentual: 0, obs: "" },
              ]);
            }
          }}
        >
          <option value="">Selecione uma origem...</option>
          {rastreabilidadeOpcoes
            .filter((op) => !rastreabilidade.find((r) => r.opcao === op))
            .map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
        </Select>
        <div className="space-y-4">
          {rastreabilidade.map((r, idx) => (
            <div
              key={r.opcao}
              className="w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between gap-2 p-4">
                <h4
                  className="max-w-[80%] truncate font-medium text-gray-900 dark:text-white"
                  title={r.opcao}
                >
                  {r.opcao}
                </h4>
                <button
                  type="button"
                  className="inline-block rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  onClick={() => handleRemoveRastreabilidade(idx)}
                >
                  <svg
                    className="h-4 w-4 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-4 pb-4">
                {/* Slider em linha separada, largura total */}
                <div className="mb-2 flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={r.percentual}
                    onChange={(e) =>
                      handleRastreabilidadeChange(
                        idx,
                        "percentual",
                        Number(e.target.value),
                      )
                    }
                    className="w-full"
                  />
                  <span className="w-12 text-center text-gray-900 dark:text-gray-100">
                    {r.percentual}%
                  </span>
                </div>
                {/* Label e campo de observação em linha separada */}
                <div className="flex flex-col gap-1">
                  <Label>Observação</Label>
                  <textarea
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    value={r.obs}
                    onChange={(e) =>
                      handleRastreabilidadeChange(idx, "obs", e.target.value)
                    }
                    placeholder="Observação (opcional)"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-900 dark:text-gray-100">
          <b>Total:</b> {somaPercentual}%{" "}
          {somaPercentual !== 100 && (
            <span className="text-red-600 dark:text-red-400">
              (deve somar 100%)
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const ambientalSection = (
    <div className="space-y-6">
      <div>
        <Label>Emite MTR?</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="emite-mtr"
              value="sim"
              checked={emiteMTR === true}
              onChange={() => setEmiteMTR(true)}
            />
            Sim
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="emite-mtr"
              value="nao"
              checked={emiteMTR === false}
              onChange={() => setEmiteMTR(false)}
            />
            Não
          </label>
        </div>
      </div>
      <div>
        <Label>Os rejeitos são enviados para aterro?</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="rejeitos-aterro"
              value="sim"
              checked={rejeitosAterro === true}
              onChange={() => setRejeitosAterro(true)}
            />
            Sim
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="rejeitos-aterro"
              value="nao"
              checked={rejeitosAterro === false}
              onChange={() => setRejeitosAterro(false)}
            />
            Não
          </label>
        </div>
        {rejeitosAterro && (
          <div className="mt-2">
            <Label>Nome do aterro</Label>
            <TextInput
              value={nomeAterro}
              onChange={(e) => setNomeAterro(e.target.value)}
              placeholder="Nome do aterro"
              className="text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
            />
          </div>
        )}
      </div>
      <div>
        <Label>
          Possui área reservada ou isolada para armazenagem de produtos químicos
          e contaminados?
        </Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="area-quimicos"
              value="sim"
              checked={areaQuimicos === "sim"}
              onChange={() => setAreaQuimicos("sim")}
            />
            Sim
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="area-quimicos"
              value="nao"
              checked={areaQuimicos === "nao"}
              onChange={() => setAreaQuimicos("nao")}
            />
            Não
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="area-quimicos"
              value="na"
              checked={areaQuimicos === "na"}
              onChange={() => setAreaQuimicos("na")}
            />
            Não se aplica
          </label>
        </div>
        <div className="mt-2">
          <Label>Observação (opcional)</Label>
          <textarea
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={obsAreaQuimicos}
            onChange={(e) => setObsAreaQuimicos(e.target.value)}
            placeholder="Observação..."
          />
        </div>
        <div className="mt-2">
          <Label>Foto</Label>
          <FileInput
            onChange={(e) => setFotoAreaQuimicos(e.target.files?.[0] || null)}
            accept="image/*"
          />
          {fotoAreaQuimicos && (
            <div className="relative mt-2 inline-block">
              <img
                src={URL.createObjectURL(fotoAreaQuimicos)}
                alt="Área químicos"
                className="h-32 w-32 rounded object-cover"
              />
              <button
                type="button"
                className="absolute top-0 right-0 rounded-full bg-white p-1 shadow hover:bg-red-100"
                onClick={() => setFotoAreaQuimicos(null)}
              >
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <Label>
          Já houve acidente com vazamento ou derramamento de produtos perigosos?
        </Label>
        <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
          Corrosivos, químicos, óleos, metais pesados...
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="acidente-produtos"
              value="sim"
              checked={acidenteProdutos === "sim"}
              onChange={() => setAcidenteProdutos("sim")}
            />
            Sim
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="acidente-produtos"
              value="nao"
              checked={acidenteProdutos === "nao"}
              onChange={() => setAcidenteProdutos("nao")}
            />
            Não
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="acidente-produtos"
              value="na"
              checked={acidenteProdutos === "na"}
              onChange={() => setAcidenteProdutos("na")}
            />
            Não se aplica
          </label>
        </div>
        {acidenteProdutos === "sim" && (
          <div className="mt-2">
            <Label>Possui plano de emergência?</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <input
                  type="radio"
                  name="plano-emergencia"
                  value="sim"
                  checked={planoEmergencia === true}
                  onChange={() => setPlanoEmergencia(true)}
                />
                Sim
              </label>
              <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <input
                  type="radio"
                  name="plano-emergencia"
                  value="nao"
                  checked={planoEmergencia === false}
                  onChange={() => setPlanoEmergencia(false)}
                />
                Não
              </label>
            </div>
          </div>
        )}
        <div className="mt-2">
          <Label>Observação (opcional)</Label>
          <textarea
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={obsAcidente}
            onChange={(e) => setObsAcidente(e.target.value)}
            placeholder="Observação..."
          />
        </div>
        <div className="mt-2">
          <Label>Foto</Label>
          <FileInput
            onChange={(e) => setFotoAcidente(e.target.files?.[0] || null)}
            accept="image/*"
          />
          {fotoAcidente && (
            <div className="relative mt-2 inline-block">
              <img
                src={URL.createObjectURL(fotoAcidente)}
                alt="Acidente"
                className="h-32 w-32 rounded object-cover"
              />
              <button
                type="button"
                className="absolute top-0 right-0 rounded-full bg-white p-1 shadow hover:bg-red-100"
                onClick={() => setFotoAcidente(null)}
              >
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <Label>Indícios de descarte de efluente inadequado?</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="indicios-efluente"
              value="sim"
              checked={indiciosEfluente === "sim"}
              onChange={() => setIndiciosEfluente("sim")}
            />
            Sim
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="indicios-efluente"
              value="nao"
              checked={indiciosEfluente === "nao"}
              onChange={() => setIndiciosEfluente("nao")}
            />
            Não
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="indicios-efluente"
              value="na"
              checked={indiciosEfluente === "na"}
              onChange={() => setIndiciosEfluente("na")}
            />
            Não se aplica
          </label>
        </div>
        <div className="mt-2">
          <Label>Foto</Label>
          <FileInput
            onChange={(e) => setFotoEfluente(e.target.files?.[0] || null)}
            accept="image/*"
          />
          {fotoEfluente && (
            <div className="relative mt-2 inline-block">
              <img
                src={URL.createObjectURL(fotoEfluente)}
                alt="Efluente"
                className="h-32 w-32 rounded object-cover"
              />
              <button
                type="button"
                className="absolute top-0 right-0 rounded-full bg-white p-1 shadow hover:bg-red-100"
                onClick={() => setFotoEfluente(null)}
              >
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <Label>Indícios de descarte de resíduos em local inadequado?</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="indicios-residuos"
              value="sim"
              checked={indiciosResiduos === "sim"}
              onChange={() => setIndiciosResiduos("sim")}
            />
            Sim
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="indicios-residuos"
              value="nao"
              checked={indiciosResiduos === "nao"}
              onChange={() => setIndiciosResiduos("nao")}
            />
            Não
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="indicios-residuos"
              value="na"
              checked={indiciosResiduos === "na"}
              onChange={() => setIndiciosResiduos("na")}
            />
            Não se aplica
          </label>
        </div>
        <div className="mt-2">
          <Label>Foto</Label>
          <FileInput
            onChange={(e) => setFotoResiduos(e.target.files?.[0] || null)}
            accept="image/*"
          />
          {fotoResiduos && (
            <div className="relative mt-2 inline-block">
              <img
                src={URL.createObjectURL(fotoResiduos)}
                alt="Resíduos"
                className="h-32 w-32 rounded object-cover"
              />
              <button
                type="button"
                className="absolute top-0 right-0 rounded-full bg-white p-1 shadow hover:bg-red-100"
                onClick={() => setFotoResiduos(null)}
              >
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <Label>Possui estação de tratamento de água?</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="estacao-tratamento"
              value="sim"
              checked={estacaoTratamento === "sim"}
              onChange={() => setEstacaoTratamento("sim")}
            />
            Sim
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="estacao-tratamento"
              value="nao"
              checked={estacaoTratamento === "nao"}
              onChange={() => setEstacaoTratamento("nao")}
            />
            Não
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="estacao-tratamento"
              value="na"
              checked={estacaoTratamento === "na"}
              onChange={() => setEstacaoTratamento("na")}
            />
            Não se aplica
          </label>
        </div>
        {estacaoTratamento === "sim" && (
          <div className="mt-2">
            <Label>Possui licença?</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <input
                  type="radio"
                  name="possui-licenca"
                  value="sim"
                  checked={possuiLicenca === true}
                  onChange={() => setPossuiLicenca(true)}
                />
                Sim
              </label>
              <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <input
                  type="radio"
                  name="possui-licenca"
                  value="nao"
                  checked={possuiLicenca === false}
                  onChange={() => setPossuiLicenca(false)}
                />
                Não
              </label>
            </div>
          </div>
        )}
        <div className="mt-2">
          <Label>Foto</Label>
          <FileInput
            onChange={(e) => setFotoEstacao(e.target.files?.[0] || null)}
            accept="image/*"
          />
          {fotoEstacao && (
            <div className="relative mt-2 inline-block">
              <img
                src={URL.createObjectURL(fotoEstacao)}
                alt="Estação"
                className="h-32 w-32 rounded object-cover"
              />
              <button
                type="button"
                className="absolute top-0 right-0 rounded-full bg-white p-1 shadow hover:bg-red-100"
                onClick={() => setFotoEstacao(null)}
              >
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <Label>Recebe material hospitalar?</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="material-hospitalar"
              value="sim"
              checked={materialHospitalar === "sim"}
              onChange={() => setMaterialHospitalar("sim")}
            />
            Sim
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="material-hospitalar"
              value="nao"
              checked={materialHospitalar === "nao"}
              onChange={() => setMaterialHospitalar("nao")}
            />
            Não
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="material-hospitalar"
              value="na"
              checked={materialHospitalar === "na"}
              onChange={() => setMaterialHospitalar("na")}
            />
            Não se aplica
          </label>
        </div>
        {materialHospitalar === "sim" && (
          <div className="mt-2">
            <Label>Qual a tratativa?</Label>
            <TextInput
              value={tratativaHospitalar}
              onChange={(e) => setTratativaHospitalar(e.target.value)}
              placeholder="Descreva a tratativa..."
              className="text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
            />
          </div>
        )}
        <div className="mt-2">
          <Label>Observação (opcional)</Label>
          <textarea
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={obsHospitalar}
            onChange={(e) => setObsHospitalar(e.target.value)}
            placeholder="Observação..."
          />
        </div>
        <div className="mt-2">
          <Label>Foto</Label>
          <FileInput
            onChange={(e) => setFotoHospitalar(e.target.files?.[0] || null)}
            accept="image/*"
          />
          {fotoHospitalar && (
            <div className="relative mt-2 inline-block">
              <img
                src={URL.createObjectURL(fotoHospitalar)}
                alt="Hospitalar"
                className="h-32 w-32 rounded object-cover"
              />
              <button
                type="button"
                className="absolute top-0 right-0 rounded-full bg-white p-1 shadow hover:bg-red-100"
                onClick={() => setFotoHospitalar(null)}
              >
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const documentacaoSection = (
    <div className="space-y-6">
      <div>
        <Label>Documentação disponível</Label>
        <Select
          value=""
          onChange={(e) => {
            if (e.target.value) {
              handleAddDocumento(e.target.value);
            }
          }}
        >
          <option value="">Selecione um documento...</option>
          {documentosOpcoes
            .filter(
              (doc) => !documentosSelecionados.find((d) => d.nome === doc),
            )
            .map((doc) => (
              <option key={doc} value={doc}>
                {doc}
              </option>
            ))}
        </Select>
      </div>
      <div className="space-y-4">
        {documentosSelecionados.map((doc) => (
          <div
            key={doc.nome}
            className="w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-center justify-between gap-2 p-4">
              <h4
                className="max-w-[80%] truncate font-medium text-gray-900 dark:text-white"
                title={doc.nome}
              >
                {doc.nome}
              </h4>
              <button
                type="button"
                className="inline-block rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={() => handleRemoveDocumento(doc.nome)}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
            <div className="px-4 pb-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label>Foto do documento</Label>
                  <FileInput
                    onChange={(e) =>
                      handleDocumentoChange(
                        doc.nome,
                        "foto",
                        e.target.files?.[0] || null,
                      )
                    }
                    accept="image/*"
                  />
                  {doc.foto && (
                    <div className="relative mt-2 inline-block">
                      <img
                        src={URL.createObjectURL(doc.foto)}
                        alt={doc.nome}
                        className="h-32 w-32 rounded object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 rounded-full bg-white p-1 shadow hover:bg-red-100"
                        onClick={() =>
                          handleDocumentoChange(doc.nome, "foto", null)
                        }
                      >
                        <svg
                          className="h-5 w-5 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <Label>Data de validade (opcional)</Label>
                  <Datepicker
                    value={doc.validade ? new Date(doc.validade) : undefined}
                    onChange={(date) =>
                      handleDocumentoChange(
                        doc.nome,
                        "validade",
                        date ? date.toISOString().slice(0, 10) : "",
                      )
                    }
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label>Informações adicionais (opcional)</Label>
                <textarea
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  value={doc.infoAdicional}
                  onChange={(e) =>
                    handleDocumentoChange(
                      doc.nome,
                      "infoAdicional",
                      e.target.value,
                    )
                  }
                  placeholder="Informações adicionais sobre o documento..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const socialSection = (
    <div className="space-y-6">
      <div>
        <Label>Faz parte de rede de cooperativas?</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="rede-cooperativas"
              value="sim"
              checked={redeCooperativas === true}
              onChange={() => setRedeCooperativas(true)}
            />
            Sim
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="rede-cooperativas"
              value="nao"
              checked={redeCooperativas === false}
              onChange={() => setRedeCooperativas(false)}
            />
            Não
          </label>
        </div>
        {redeCooperativas && (
          <>
            <div className="mt-2">
              <Label>Qual nome da rede?</Label>
              <TextInput
                value={nomeRede}
                onChange={(e) => setNomeRede(e.target.value)}
                placeholder="Nome da rede"
                className="text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
            <div className="mt-2">
              <Label>Mais informações sobre a rede (opcional)</Label>
              <textarea
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={infoRede}
                onChange={(e) => setInfoRede(e.target.value)}
                placeholder="Informações sobre a rede..."
              />
            </div>
            <div className="mt-2">
              <Label>Foto (opcional)</Label>
              <FileInput
                onChange={(e) => setFotoRede(e.target.files?.[0] || null)}
                accept="image/*"
              />
              {fotoRede && (
                <div className="relative mt-2 inline-block">
                  <img
                    src={URL.createObjectURL(fotoRede)}
                    alt="Rede"
                    className="h-32 w-32 rounded object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 rounded-full bg-white p-1 shadow hover:bg-red-100"
                    onClick={() => setFotoRede(null)}
                  >
                    <svg
                      className="h-5 w-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div>
        <Label>Faz parte de projeto social?</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="projeto-social"
              value="sim"
              checked={projetoSocial === true}
              onChange={() => setProjetoSocial(true)}
            />
            Sim
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="projeto-social"
              value="nao"
              checked={projetoSocial === false}
              onChange={() => setProjetoSocial(false)}
            />
            Não
          </label>
        </div>
        {projetoSocial && (
          <>
            <div className="mt-2">
              <Label>Qual nome do projeto?</Label>
              <TextInput
                value={nomeProjeto}
                onChange={(e) => setNomeProjeto(e.target.value)}
                placeholder="Nome do projeto"
                className="text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
            <div className="mt-2">
              <Label>Mais informações sobre o projeto (opcional)</Label>
              <textarea
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={infoProjeto}
                onChange={(e) => setInfoProjeto(e.target.value)}
                placeholder="Informações sobre o projeto..."
              />
            </div>
            <div className="mt-2">
              <Label>Foto (opcional)</Label>
              <FileInput
                onChange={(e) => setFotoProjeto(e.target.files?.[0] || null)}
                accept="image/*"
              />
              {fotoProjeto && (
                <div className="relative mt-2 inline-block">
                  <img
                    src={URL.createObjectURL(fotoProjeto)}
                    alt="Projeto"
                    className="h-32 w-32 rounded object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 rounded-full bg-white p-1 shadow hover:bg-red-100"
                    onClick={() => setFotoProjeto(null)}
                  >
                    <svg
                      className="h-5 w-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div>
        <Label>Nº de cooperados</Label>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <Label>Homens</Label>
            <div className="relative flex max-w-[8rem] items-center">
              <button
                type="button"
                onClick={() => setNumHomens(Math.max(0, numHomens - 1))}
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
                value={numHomens || ""}
                onChange={(e) => setNumHomens(parseInt(e.target.value) || 0)}
                className="block h-11 w-full border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setNumHomens(numHomens + 1)}
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
          <div>
            <Label>Mulheres</Label>
            <div className="relative flex max-w-[8rem] items-center">
              <button
                type="button"
                onClick={() => setNumMulheres(Math.max(0, numMulheres - 1))}
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
                value={numMulheres || ""}
                onChange={(e) => setNumMulheres(parseInt(e.target.value) || 0)}
                className="block h-11 w-full border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setNumMulheres(numMulheres + 1)}
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
          <div>
            <Label>Regressos/imigrantes</Label>
            <div className="relative flex max-w-[8rem] items-center">
              <button
                type="button"
                onClick={() => setNumRegressos(Math.max(0, numRegressos - 1))}
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
                value={numRegressos || ""}
                onChange={(e) => setNumRegressos(parseInt(e.target.value) || 0)}
                className="block h-11 w-full border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setNumRegressos(numRegressos + 1)}
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
        </div>
        <div className="mt-2">
          <Label>Foto</Label>
          <FileInput
            onChange={(e) => setFotoCooperados(e.target.files?.[0] || null)}
            accept="image/*"
          />
          {fotoCooperados && (
            <div className="relative mt-2 inline-block">
              <img
                src={URL.createObjectURL(fotoCooperados)}
                alt="Cooperados"
                className="h-32 w-32 rounded object-cover"
              />
              <button
                type="button"
                className="absolute top-0 right-0 rounded-full bg-white p-1 shadow hover:bg-red-100"
                onClick={() => setFotoCooperados(null)}
              >
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <Label>Salário médio</Label>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            R$
          </span>
          <TextInput
            type="number"
            min="0"
            step="0.01"
            value={salarioMedio}
            onChange={(e) => setSalarioMedio(Number(e.target.value))}
            placeholder="1000.00"
            className="text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
        </div>
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Valor em BRL
        </div>
      </div>
      <div>
        <Label>Benefícios</Label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {beneficiosOpcoes.map((beneficio) => (
            <label
              key={beneficio}
              className="flex items-center gap-2 text-gray-900 dark:text-gray-100"
            >
              <input
                type="checkbox"
                checked={beneficiosSelecionados.includes(beneficio)}
                onChange={(e) =>
                  handleBeneficioChange(beneficio, e.target.checked)
                }
              />
              {beneficio}
            </label>
          ))}
        </div>
        <div className="mt-4">
          <Label>Foto (opcional)</Label>
          <FileInput
            onChange={(e) => setFotoBeneficios(e.target.files?.[0] || null)}
            accept="image/*"
          />
          {fotoBeneficios && (
            <div className="relative mt-2 inline-block">
              <img
                src={URL.createObjectURL(fotoBeneficios)}
                alt="Benefícios"
                className="h-32 w-32 rounded object-cover"
              />
              <button
                type="button"
                className="absolute top-0 right-0 rounded-full bg-white p-1 shadow hover:bg-red-100"
                onClick={() => setFotoBeneficios(null)}
              >
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
        <div className="mt-2">
          <Label>Observação (opcional)</Label>
          <textarea
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={obsBeneficios}
            onChange={(e) => setObsBeneficios(e.target.value)}
            placeholder="Observação sobre benefícios..."
          />
        </div>
      </div>
    </div>
  );

  const infraestruturaSection = (
    <div className="space-y-6">
      <div>
        <Label>Vestiário</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="vestiario"
              value="adequado"
              checked={vestiario === "adequado"}
              onChange={() => setVestiario("adequado")}
            />
            Adequado
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="vestiario"
              value="inadequado"
              checked={vestiario === "inadequado"}
              onChange={() => setVestiario("inadequado")}
            />
            Inadequado
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="vestiario"
              value="nao-possui"
              checked={vestiario === "nao-possui"}
              onChange={() => setVestiario("nao-possui")}
            />
            Não possui
          </label>
        </div>
        <div className="mt-2">
          <Label>Foto (opcional)</Label>
          <FileInput
            onChange={(e) => setFotoVestiario(e.target.files?.[0] || null)}
            accept="image/*"
          />
          {fotoVestiario && (
            <div className="relative mt-2 inline-block">
              <img
                src={URL.createObjectURL(fotoVestiario)}
                alt="Vestiário"
                className="h-32 w-32 rounded object-cover"
              />
              <button
                type="button"
                className="absolute top-0 right-0 rounded-full bg-white p-1 shadow hover:bg-red-100"
                onClick={() => setFotoVestiario(null)}
              >
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <Label>Refeitório</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="refeitorio"
              value="adequado"
              checked={refeitorio === "adequado"}
              onChange={() => setRefeitorio("adequado")}
            />
            Adequado
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="refeitorio"
              value="inadequado"
              checked={refeitorio === "inadequado"}
              onChange={() => setRefeitorio("inadequado")}
            />
            Inadequado
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="refeitorio"
              value="nao-possui"
              checked={refeitorio === "nao-possui"}
              onChange={() => setRefeitorio("nao-possui")}
            />
            Não possui
          </label>
        </div>
        <div className="mt-2">
          <Label>Foto (opcional)</Label>
          <FileInput
            onChange={(e) => setFotoRefeitorio(e.target.files?.[0] || null)}
            accept="image/*"
          />
          {fotoRefeitorio && (
            <div className="relative mt-2 inline-block">
              <img
                src={URL.createObjectURL(fotoRefeitorio)}
                alt="Refeitório"
                className="h-32 w-32 rounded object-cover"
              />
              <button
                type="button"
                className="absolute top-0 right-0 rounded-full bg-white p-1 shadow hover:bg-red-100"
                onClick={() => setFotoRefeitorio(null)}
              >
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <Label>Layout</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="layout"
              value="organizado"
              checked={layout === "organizado"}
              onChange={() => setLayout("organizado")}
            />
            Organizado
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="layout"
              value="parcialmente"
              checked={layout === "parcialmente"}
              onChange={() => setLayout("parcialmente")}
            />
            Parcialmente
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="radio"
              name="layout"
              value="desorganizado"
              checked={layout === "desorganizado"}
              onChange={() => setLayout("desorganizado")}
            />
            Desorganizado
          </label>
        </div>
        {(layout === "parcialmente" || layout === "desorganizado") && (
          <div className="mt-2">
            <Label>Motivo/Observação</Label>
            <textarea
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={motivoLayout}
              onChange={(e) => setMotivoLayout(e.target.value)}
              placeholder="Descreva o motivo ou observação..."
            />
          </div>
        )}
        <div className="mt-2">
          <Label>Foto</Label>
          <FileInput
            onChange={(e) => setFotoLayout(e.target.files?.[0] || null)}
            accept="image/*"
          />
          {fotoLayout && (
            <div className="relative mt-2 inline-block">
              <img
                src={URL.createObjectURL(fotoLayout)}
                alt="Layout"
                className="h-32 w-32 rounded object-cover"
              />
              <button
                type="button"
                className="absolute top-0 right-0 rounded-full bg-white p-1 shadow hover:bg-red-100"
                onClick={() => setFotoLayout(null)}
              >
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <Label>Maquinário</Label>
        <div className="mb-4 flex w-full gap-2">
          <Select
            className="w-full"
            value=""
            onChange={(e) => {
              if (e.target.value) {
                handleAddMaquinario(e.target.value);
              }
            }}
          >
            <option value="">Adicionar maquinário...</option>
            {maquinarioOpcoes
              .filter((op) => !maquinarioSelecionado.find((m) => m.nome === op))
              .map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
          </Select>
        </div>
        <div className="space-y-4">
          {maquinarioSelecionado.map((maq) => (
            <div
              key={maq.nome}
              className="w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between gap-2 p-4">
                <h4
                  className="max-w-[80%] truncate font-medium text-gray-900 dark:text-white"
                  title={maq.nome}
                >
                  {maq.nome}
                </h4>
                <button
                  type="button"
                  className="inline-block rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  onClick={() => handleRemoveMaquinario(maq.nome)}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-4 pb-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label>Quantidade</Label>
                    <div className="relative flex max-w-[8rem] items-center">
                      <button
                        type="button"
                        onClick={() =>
                          handleMaquinarioChange(
                            maq.nome,
                            "quantidade",
                            Math.max(1, maq.quantidade - 1),
                          )
                        }
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
                        value={maq.quantidade || ""}
                        onChange={(e) =>
                          handleMaquinarioChange(
                            maq.nome,
                            "quantidade",
                            Math.max(1, parseInt(e.target.value) || 1),
                          )
                        }
                        className="block h-11 w-full border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleMaquinarioChange(
                            maq.nome,
                            "quantidade",
                            maq.quantidade + 1,
                          )
                        }
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
                  <div>
                    <Label>Fotos (múltiplas)</Label>
                    <FileInput
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleAddFotoMaquinario(maq.nome, file);
                        }
                      }}
                      accept="image/*"
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      {maq.fotos.map((foto, index) => (
                        <div key={index} className="relative inline-block">
                          <img
                            src={URL.createObjectURL(foto)}
                            alt={`${maq.nome} ${index + 1}`}
                            className="h-24 w-24 rounded object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-0 right-0 rounded-full bg-white p-1 shadow hover:bg-red-100"
                            onClick={() =>
                              handleRemoveFotoMaquinario(maq.nome, index)
                            }
                          >
                            <svg
                              className="h-4 w-4 text-red-600"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const observacoesEnvioSection = (
    <div className="space-y-6">
      <div>
        <Label>Observações Gerais</Label>
        <textarea
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          rows={4}
          value={observacoesGerais}
          onChange={(e) => setObservacoesGerais(e.target.value)}
          placeholder="Descreva observações gerais sobre a visita..."
        />
      </div>

      <div>
        <Label>Observações Específicas por Seção</Label>
        <textarea
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          rows={4}
          value={observacoesEspecificas}
          onChange={(e) => setObservacoesEspecificas(e.target.value)}
          placeholder="Descreva observações específicas para cada seção do relatório..."
        />
      </div>

      <div>
        <Label>Recomendações</Label>
        <textarea
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          rows={4}
          value={recomendacoes}
          onChange={(e) => setRecomendacoes(e.target.value)}
          placeholder="Liste as recomendações para o fornecedor..."
        />
      </div>

      <div>
        <Label>Próximos Passos</Label>
        <textarea
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          rows={4}
          value={proximosPassos}
          onChange={(e) => setProximosPassos(e.target.value)}
          placeholder="Descreva os próximos passos a serem tomados..."
        />
      </div>

      <div>
        <Label>Anexos Adicionais</Label>
        <FileInput
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleAddAnexo(file);
            }
          }}
          accept="image/*,.pdf,.doc,.docx"
          multiple
        />
        <p className="mt-1 text-xs text-gray-500">
          Formatos aceitos: imagens, PDF, DOC, DOCX
        </p>

        {anexosAdicionais.length > 0 && (
          <div className="mt-4 space-y-2">
            <Label>Anexos selecionados:</Label>
            {anexosAdicionais.map((anexo, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded border p-2"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  <span className="text-sm">{anexo.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(anexo.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  onClick={() => handleRemoveAnexo(index)}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="declaracao-veracidade"
            checked={declaracaoVeracidade}
            onChange={(e) => setDeclaracaoVeracidade(e.target.checked)}
            className="text-primary-600 focus:ring-primary-500 mt-1 h-4 w-4 rounded border-gray-300"
            required
          />
          <div>
            <Label htmlFor="declaracao-veracidade" className="font-medium">
              Declaração de Veracidade
            </Label>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Declaro que todas as informações fornecidas neste relatório são
              verdadeiras e foram coletadas durante a visita técnica realizada.
              Comprometo-me a fornecer informações adicionais caso seja
              necessário.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const stepContents = [
    identificacaoFornecedor,
    producaoSection,
    ambientalSection,
    documentacaoSection,
    socialSection,
    infraestruturaSection,
    observacoesEnvioSection,
  ];

  const navButtons = (
    <div className="mt-8 flex justify-end gap-4">
      {activeStep > 0 && (
        <Button
          type="button"
          color="light"
          className="hover:text-primary-700 w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none sm:w-auto dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
        >
          {`Ant: ${steps[activeStep - 1]?.label || ""}`}
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
          {`Prox: ${steps[activeStep + 1]?.label || ""}`}
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={isSubmitting || !declaracaoVeracidade}
          className="border-primary-700 bg-primary-700 hover:border-primary-800 hover:bg-primary-800 focus:ring-primary-300 dark:border-primary-600 dark:bg-primary-600 dark:hover:border-primary-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex w-full items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium text-white focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {isSubmitting ? (
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
          Relatório de Visita Ampliado
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
