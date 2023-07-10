import React from "react";
import FlowStreetBackground from "./FlowStreetBackground";
import FlowTotalCount from "./FlowTotalCount";

interface Session {
  start_time: string;
  end_time: string;
  total_cyclists: number;
  characteristics: {
    [key: string]: number;
  };
  quantitative: {
    [key: string]: number;
  };
}

interface FlowContainerProps {
  data: {
    summary: {
      total_cyclists: number;
    };
    sessions: {
      [key: string]: Session;
    };
    directions: {
      [key: string]: {
        origin: string;
        destin: string;
        origin_cardinal: string;
        destin_cardinal: string;
      };
    };
  };
}

interface FlowProps {
  direction: string;
  rotation: number;
  count: number;
}

const directionRotations: { [key: string]: number } = {
  north: -90,
  east: 0,
  south: 90,
  west: 180,
};

const Flow = ({ direction, rotation, count }: FlowProps) => (
  <>
    <g transform={`rotate(${rotation} 159.172 159.194)`}>
      <path
        fill="#e7e6e6"
        d="M108.5 159.162L101.174 149.919 101.174 154.446 67.216 154.446 67.216 144.39 47.186 144.39 47.186 173.935 67.216 173.935 67.216 163.879 101.174 163.879 101.174 168.406 108.5 159.162z"
      />
      {/* Restante do código para o fluxo */}
    </g>
    <text
      fill="#008080"
      fontFamily="Helvetica"
      fontSize="14.173"
      letterSpacing="-.03em"
      transform={`rotate(${rotation} 159.172 159.194)`}
    >
      {count}
    </text>
  </>
);

export function FlowContainerGeneric({ data }: FlowContainerProps) {
  const names = Object.values(data.directions).reduce(
    (result: { [key: string]: string }, direction) => {
      result[direction.origin_cardinal] = direction.origin;
      return result;
    },
    {}
  );

  const totalsByDirection = Object.entries(data.sessions).reduce(
    (result: { [key: string]: number }, [, session]) => {
      Object.entries(session.quantitative).forEach(([key, value]) => {
        result[key] = (result[key] || 0) + value;
      });
      return result;
    },
    {}
  );

  const totalsByOrigin = Object.entries(data.sessions).reduce(
    (result: { [key: string]: number }, [, session]) => {
      Object.entries(session.quantitative).forEach(([key, value]) => {
        const origin = key.split("_")[0];
        result[origin] = (result[origin] || 0) + value;
      });
      return result;
    },
    {}
  );

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="400px"
        viewBox="0 0 318.345 318.388"
        preserveAspectRatio="xMidYMid meet"
      >
        <g>
          <FlowStreetBackground />
          {Object.entries(data.directions).map(([directionKey, direction]) => {
            const flow = `${direction.origin_cardinal}_${direction.destin_cardinal}`;
            const rotation = directionRotations[direction.origin_cardinal];
            const count = totalsByDirection[flow] || 0;

            return (
              <Flow
                key={directionKey}
                direction={direction.origin_cardinal}
                rotation={rotation}
                count={count}
              />
            );
          })}
          // Restante do código para renderizar os totais por origin_cardinal //
          Restante do código para renderizar os totais por origin_cardinal
          {Object.entries(totalsByOrigin).map(([originCardinal, total]) => {
            let transform = "";

            if (originCardinal === "north") {
              transform = "translate(144.403 36.145)";
            } else if (originCardinal === "east") {
              transform = "rotate(90 68.876 213.325)";
            } else if (originCardinal === "south") {
              transform = "translate(144.403 296.096)";
            } else if (originCardinal === "west") {
              transform = "rotate(-90 105.064 68.92)";
            }

            return (
              <text
                key={originCardinal}
                fill="#fff"
                fontFamily="Helvetica"
                fontSize="20"
                transform={transform}
              >
                {total}
              </text>
            );
          })}
        </g>
      </svg>
    </>
  );
}
