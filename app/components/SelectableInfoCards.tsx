import React from 'react';

// Tipo para as propriedades do componente
interface SelectableInfoCardsProps {
  cards: Array<{
    label: string;
    icon: string;
    data: string;
    codigo: string;
  }>;
  selected: string | null;
  options?: {
    changeFunction: (codigo: string) => void;
  };
}

export const SelectableInfoCards: React.FC<SelectableInfoCardsProps> = ({
  cards,
  selected,
  options
}) => {
  if (!cards || cards.length === 0) {
    return null;
  }

  const handleCardClick = (codigo: string) => {
    if (options?.changeFunction) {
      options.changeFunction(codigo);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {cards.map((card) => (
        <div
          key={card.codigo}
          className={`flex flex-col items-center p-4 rounded-lg shadow cursor-pointer transition-all ${
            selected === card.codigo
              ? 'bg-ameciclo text-white scale-105'
              : 'bg-white text-gray-800 hover:bg-red-600 hover:text-white'
          }`}
          onClick={() => handleCardClick(card.codigo)}
        >
          <img
            src={card.icon}
            alt={card.label}
            className="w-12 h-12 mb-2"
            style={{
              filter: selected === card.codigo ? 'brightness(0) invert(1)' : 'none'
            }}
          />
          <div className="text-2xl font-bold">{card.data}</div>
          <div className="text-sm mt-1">{card.label}</div>
        </div>
      ))}
    </div>
  );
};