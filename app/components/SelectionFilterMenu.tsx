import React, { useState } from 'react';

export type FilterBaseType = 'ocorrencia' | 'residencia';
export type FilterDeathLocationType = 'all' | 'health' | 'public' | 'other';
export type FilterYearType = number;

interface SelectionFilterMenuProps {
  baseType: FilterBaseType;
  onBaseTypeChange: (type: FilterBaseType) => void;
  
  deathLocation: FilterDeathLocationType;
  onDeathLocationChange: (location: FilterDeathLocationType) => void;
  
  selectedYear: FilterYearType;
  selectedEndYear: FilterYearType | null;
  availableYears: number[];
  onYearChange: (year: FilterYearType, endYear?: FilterYearType | null) => void;
  
  selectedCity: number | null;
  selectedCityName: string;
}

interface CityOption {
  id: number;
  nome?: string;
  name?: string;
}

export const SelectionFilterMenu: React.FC<SelectionFilterMenuProps & {
  citiesList?: CityOption[];
  onCityChange?: (cityId: number) => void;
}> = ({
  baseType,
  onBaseTypeChange,
  deathLocation,
  onDeathLocationChange,
  selectedYear,
  selectedEndYear,
  availableYears,
  onYearChange,
  selectedCity,
  selectedCityName,
  citiesList = [],
  onCityChange = () => {}
}) => {
  const [isOpen, setIsOpen] = useState<string | null>(null);
  
  const toggleFilter = (filterName: string) => {
    if (isOpen === filterName) {
      setIsOpen(null);
    } else {
      setIsOpen(filterName);
    }
  };

  const getDeathLocationLabel = () => {
    switch (deathLocation) {
      case 'all': return 'Todos os locais';
      case 'health': return 'Hospital/Estabelecimento de saúde';
      case 'public': return 'Via pública';
      case 'other': return 'Outros locais e ignorados';
      default: return 'Todos os locais';
    }
  };

  const getBaseTypeLabel = () => {
    return baseType === 'ocorrencia' 
      ? 'Local de Ocorrência da Morte' 
      : 'Local de Residência da Pessoa Morta';
  };

  const getYearLabel = () => {
    if (selectedEndYear) {
      return `${selectedYear} a ${selectedEndYear}`;
    }
    return `${selectedYear}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-ameciclo shadow-lg border-t border-gray-200 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap justify-between items-center">
          {/* Base Type Filter */}
          <div className="relative mb-1 flex-grow flex-shrink-0 basis-full sm:basis-auto">
            <button 
              onClick={() => toggleFilter('baseType')}
              className="w-full sm:w-auto flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium"
            >
              <span className="text-gray-500 mr-2">Base:</span>
              <span>{getBaseTypeLabel()}</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isOpen === 'baseType' && (
              <div className="absolute bottom-full left-0 mb-2 w-full bg-white shadow-lg rounded-lg border border-gray-100 p-2">
                <button 
                  className={`w-full text-left px-4 py-2 rounded-lg mb-1 ${baseType === 'ocorrencia' ? 'bg-[#008888] text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    onBaseTypeChange('ocorrencia');
                    setIsOpen(null);
                  }}
                >
                  Local de Ocorrência da Morte
                </button>
                <button 
                  className={`w-full text-left px-4 py-2 rounded-lg ${baseType === 'residencia' ? 'bg-[#008888] text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    onBaseTypeChange('residencia');
                    setIsOpen(null);
                  }}
                >
                  Local de Residência da Pessoa Morta
                </button>
              </div>
            )}
          </div>
          
          {/* Death Location Filter */}
          <div className="relative mb-1 flex-grow flex-shrink-0 basis-full sm:basis-auto">
            <button 
              onClick={() => toggleFilter('deathLocation')}
              className="w-full sm:w-auto flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium"
            >
              <span className="text-gray-500 mr-2">Local:</span>
              <span>{getDeathLocationLabel()}</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isOpen === 'deathLocation' && (
              <div className="absolute bottom-full left-0 mb-2 w-full bg-white shadow-lg rounded-lg border border-gray-100 p-2">
                <button 
                  className={`w-full text-left px-4 py-2 rounded-lg mb-1 ${deathLocation === 'all' ? 'bg-[#008888] text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    onDeathLocationChange('all');
                    setIsOpen(null);
                  }}
                >
                  Todos os locais
                </button>
                <button 
                  className={`w-full text-left px-4 py-2 rounded-lg mb-1 ${deathLocation === 'health' ? 'bg-[#008888] text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    onDeathLocationChange('health');
                    setIsOpen(null);
                  }}
                >
                  Hospital/Estabelecimento de saúde
                </button>
                <button 
                  className={`w-full text-left px-4 py-2 rounded-lg mb-1 ${deathLocation === 'public' ? 'bg-[#008888] text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    onDeathLocationChange('public');
                    setIsOpen(null);
                  }}
                >
                  Via pública
                </button>
                <button 
                  className={`w-full text-left px-4 py-2 rounded-lg ${deathLocation === 'other' ? 'bg-[#008888] text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    onDeathLocationChange('other');
                    setIsOpen(null);
                  }}
                >
                  Outros locais e ignorados
                </button>
              </div>
            )}
          </div>
          
          {/* Year Filter */}
          <div className="relative mb-1 flex-grow flex-shrink-0 basis-full sm:basis-auto">
            <button 
              onClick={() => toggleFilter('year')}
              className="w-full sm:w-auto flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium"
            >
              <span className="text-gray-500 mr-2">Ano:</span>
              <span>{getYearLabel()}</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isOpen === 'year' && (
              <div className="absolute bottom-full left-0 mb-2 w-full max-w-xs sm:max-w-md bg-white shadow-lg rounded-lg border border-gray-200 p-2">
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1">
                  {availableYears.map(year => (
                    <button 
                      key={year}
                      className={`px-2 py-1 text-sm rounded-lg ${
                        (selectedEndYear 
                          ? year >= selectedYear && year <= selectedEndYear 
                          : year === selectedYear)
                          ? 'bg-[#008888] text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        if (!selectedYear) {
                          onYearChange(year, null);
                        } else if (selectedEndYear) {
                          onYearChange(year, null);
                        } else if (year === selectedYear) {
                          // Manter seleção
                        } else if (year < selectedYear) {
                          onYearChange(year, selectedYear);
                        } else {
                          onYearChange(selectedYear, year);
                        }
                        setIsOpen(null);
                      }}
                    >
                      {year}
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {selectedEndYear 
                    ? "Clique em um ano para iniciar nova seleção" 
                    : "Clique em outro ano para selecionar um intervalo"}
                </div>
              </div>
            )}
          </div>
          
          {/* City Filter */}
          <div className="relative mb-1 flex-grow flex-shrink-0 basis-full sm:basis-auto">
            <button 
              onClick={() => toggleFilter('city')}
              className="w-full sm:w-auto flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium"
            >
              <span className="text-gray-500 mr-2">Cidade:</span>
              <span>{selectedCityName}</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isOpen === 'city' && (
              <div className="absolute bottom-full left-0 mb-2 w-full max-h-60 overflow-y-auto bg-white shadow-lg rounded-lg border border-gray-200 p-2">
                {citiesList.length > 0 ? (
                  <div className="grid grid-cols-1 gap-1">
                    {citiesList.map(city => (
                      <button 
                        key={city.id}
                        className={`w-full text-left px-4 py-2 rounded-lg ${city.id === selectedCity ? 'bg-[#008888] text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => {
                          onCityChange(city.id);
                          setIsOpen(null);
                        }}
                      >
                        {city.name || city.nome || `Cidade ${city.id}`}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <p className="text-sm text-gray-600">Selecione uma cidade nos cards acima</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionFilterMenu;