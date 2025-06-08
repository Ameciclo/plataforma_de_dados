import React, { useState, useEffect } from "react";

type CausaSecundaria = {
  codigo: string;
  count: number;
};

type CausasSecundariasData = {
  filtrosAplicados: {
    cidade?: number;
    tipoLocal: string;
    periodoAnos: {
      inicio: number;
      fim: number;
    };
    modoTransporte?: {
      codigo: string;
      descricao: string;
    };
    localOcorrenciaObito?: {
      codigo: string;
      descricao: string;
    };
  };
  totalRegistros: number;
  causasSecundarias: {
    linhaa: CausaSecundaria[];
    linhab: CausaSecundaria[];
    linhac: CausaSecundaria[];
    linhad: CausaSecundaria[];
    linhaii: CausaSecundaria[];
  };
  descricao: string;
};

type CausasSecundariasProps = {
  data: CausasSecundariasData | null;
  isLoading: boolean;
  title: string;
  subtitle: string;
};

export const CausasSecundarias: React.FC<CausasSecundariasProps> = ({
  data,
  isLoading,
  title,
  subtitle,
}) => {
  const [activeTab, setActiveTab] = useState<string>("linhaa");

  if (isLoading) {
    return <div className="text-center py-8">Carregando causas secundárias...</div>;
  }

  if (!data) {
    return null;
  }

  const linhas = [
    { id: "linhaa", label: "Linha A", description: "Causa direta da morte" },
    { id: "linhab", label: "Linha B", description: "Estado mórbido que causou a morte" },
    { id: "linhac", label: "Linha C", description: "Estado mórbido que causou o anterior" },
    { id: "linhad", label: "Linha D", description: "Estado mórbido que causou o anterior" },
    { id: "linhaii", label: "Parte II", description: "Outras condições significativas" },
  ];

  const causas = data.causasSecundarias[activeTab as keyof typeof data.causasSecundarias] || [];
  const totalCausas = causas.reduce((sum, causa) => sum + causa.count, 0);

  return (
    <div className="mx-auto container my-12">
      <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>
      <h3 className="text-xl text-center mb-8">{subtitle}</h3>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {linhas.map((linha) => (
          <button
            key={linha.id}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeTab === linha.id
                ? "bg-[#008888] text-white"
                : "bg-white text-gray-800 hover:bg-[#008888] hover:text-white"
            }`}
            onClick={() => setActiveTab(linha.id)}
          >
            {linha.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h4 className="text-lg font-semibold mb-2">
          {linhas.find((l) => l.id === activeTab)?.label} - {linhas.find((l) => l.id === activeTab)?.description}
        </h4>
        
        {causas.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">Código CID</th>
                  <th className="py-2 px-4 text-left">Quantidade</th>
                  <th className="py-2 px-4 text-left">Percentual</th>
                </tr>
              </thead>
              <tbody>
                {causas
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 10)
                  .map((causa, index) => (
                    <tr key={causa.codigo} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="py-2 px-4">{causa.codigo}</td>
                      <td className="py-2 px-4">{causa.count}</td>
                      <td className="py-2 px-4">
                        {((causa.count / totalCausas) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">Não há dados disponíveis para esta linha.</p>
        )}
      </div>

      <div className="text-center text-sm text-gray-600 mt-4">
        <p>Total de registros: {data.totalRegistros}</p>
        <p className="mt-2">
          As causas secundárias são extraídas das linhas A, B, C, D e Parte II da Declaração de Óbito.
        </p>
      </div>
    </div>
  );
};

export default CausasSecundarias;