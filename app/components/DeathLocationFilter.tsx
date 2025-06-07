import React from "react";

export type DeathLocationType = "all" | "health" | "public" | "other";

interface DeathLocationFilterProps {
  selectedLocation: DeathLocationType;
  onChange: (location: DeathLocationType) => void;
}

export const DeathLocationFilter: React.FC<DeathLocationFilterProps> = ({
  selectedLocation,
  onChange,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      <button
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
          selectedLocation === "all"
            ? "bg-[#008888] text-white"
            : "bg-gray-200 text-gray-800 hover:bg-[#008888] hover:text-white"
        }`}
        onClick={() => onChange("all")}
      >
        Todos os locais
      </button>
      <button
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
          selectedLocation === "health"
            ? "bg-[#008888] text-white"
            : "bg-gray-200 text-gray-800 hover:bg-[#008888] hover:text-white"
        }`}
        onClick={() => onChange("health")}
      >
        Hospital/Estabelecimento de saúde
      </button>
      <button
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
          selectedLocation === "public"
            ? "bg-[#008888] text-white"
            : "bg-gray-200 text-gray-800 hover:bg-[#008888] hover:text-white"
        }`}
        onClick={() => onChange("public")}
      >
        Via pública
      </button>
      <button
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
          selectedLocation === "other"
            ? "bg-[#008888] text-white"
            : "bg-gray-200 text-gray-800 hover:bg-[#008888] hover:text-white"
        }`}
        onClick={() => onChange("other")}
      >
        Outros locais e ignorados
      </button>
    </div>
  );
};

export default DeathLocationFilter;