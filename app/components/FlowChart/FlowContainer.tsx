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

export function FlowContainer({ data }: FlowContainerProps) {
  function getOriginNames(): { [key: string]: string } {
    const names: { [key: string]: string } = {};

    Object.values(data.directions).forEach((direction) => {
      names[direction.origin_cardinal] = direction.origin;
    });

    return names;
  }

  const names = getOriginNames();

  function sumQuantitativeByDirection(): { [key: string]: number } {
    const totals: { [key: string]: number } = {};
  
    Object.values(data.sessions).forEach((session) => {
      Object.entries(session.quantitative).forEach(([key, value]) => {
        const total = value;
        totals[key] = (totals[key] || 0) + total;
      });
    });
  
    return totals;
  }
  
  const totals = sumQuantitativeByDirection();

  function sumQuantitativeByOrigin(): { [key: string]: number } {
    const totals: { [key: string]: number } = {};
  
    Object.values(data.sessions).forEach((session) => {
      Object.entries(session.quantitative).forEach(([key, value]) => {
        const origin = key.split('_')[0];
        const total = value;
        totals[origin] = (totals[origin] || 0) + total;
      });
    });
  
    return totals;
  }
  
  const totalsOrigin = sumQuantitativeByOrigin();

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
          <path
            fill="#e7e6e6"
            d="M108.5 159.162L101.174 149.919 101.174 154.446 67.216 154.446 67.216 144.39 47.186 144.39 47.186 173.935 67.216 173.935 67.216 163.879 101.174 163.879 101.174 168.406 108.5 159.162z"
          />
          <path
            fill="#e7e6e6"
            d="M99.257 112.135L90.014 119.461 94.541 119.461 94.541 122.326 67.216 122.326 67.216 112.27 47.186 112.27 47.186 141.815 67.216 141.815 67.216 131.758 94.541 131.758 103.973 131.758 103.973 119.461 108.5 119.461 99.257 112.135z"
          />
          <path
            fill="#e7e6e6"
            d="M103.973 198.864L103.973 186.566 94.541 186.566 67.216 186.566 67.216 176.51 47.186 176.51 47.186 206.055 67.216 206.055 67.216 195.999 94.541 195.999 94.541 198.864 90.014 198.864 99.257 206.19 108.5 198.864 103.973 198.864z"
          />
          <path
            fill="#e7e6e6"
            d="M209.928 159.162L217.254 149.919 217.254 154.446 251.212 154.446 251.212 144.39 271.242 144.39 271.242 173.935 251.212 173.935 251.212 163.879 217.254 163.879 217.254 168.406 209.928 159.162z"
          />
          <path
            fill="#e7e6e6"
            d="M219.171 112.135L228.414 119.461 223.887 119.461 223.887 122.326 251.212 122.326 251.212 112.27 271.242 112.27 271.242 141.815 251.212 141.815 251.212 131.758 223.887 131.758 214.455 131.758 214.455 119.461 209.928 119.461 219.171 112.135z"
          />
          <path
            fill="#e7e6e6"
            d="M214.455 198.864L214.455 186.566 223.887 186.566 251.212 186.566 251.212 176.51 271.242 176.51 271.242 206.055 251.212 206.055 251.212 195.999 223.887 195.999 223.887 198.864 228.414 198.864 219.171 206.19 209.928 198.864 214.455 198.864z"
          />
          <path
            fill="#e7e6e6"
            d="M159.214 209.876L149.971 217.202 154.498 217.202 154.498 251.16 144.441 251.16 144.441 271.19 173.986 271.19 173.986 251.16 163.93 251.16 163.93 217.202 168.457 217.202 159.214 209.876z"
          />
          <path
            fill="#e7e6e6"
            d="M112.187 219.119L119.513 228.363 119.513 223.836 122.378 223.836 122.378 251.16 112.321 251.16 112.321 271.19 141.866 271.19 141.866 251.16 131.81 251.16 131.81 223.836 131.81 214.403 119.513 214.403 119.513 209.876 112.187 219.119z"
          />
          <path
            fill="#e7e6e6"
            d="M198.915 214.403L186.618 214.403 186.618 223.836 186.618 251.16 176.561 251.16 176.561 271.19 206.107 271.19 206.107 251.16 196.05 251.16 196.05 223.836 198.915 223.836 198.915 228.363 206.241 219.119 198.915 209.876 198.915 214.403z"
          />
          <path
            fill="#e7e6e6"
            d="M159.214 108.448L149.971 101.123 154.498 101.123 154.498 67.165 144.441 67.165 144.441 47.135 173.986 47.135 173.986 67.165 163.93 67.165 163.93 101.123 168.457 101.123 159.214 108.448z"
          />
          <path
            fill="#e7e6e6"
            d="M112.187 99.205L119.513 89.962 119.513 94.489 122.378 94.489 122.378 67.165 112.321 67.165 112.321 47.135 141.866 47.135 141.866 67.165 131.81 67.165 131.81 94.489 131.81 103.921 119.513 103.921 119.513 108.448 112.187 99.205z"
          />
          <path
            fill="#e7e6e6"
            d="M198.915 103.921L186.618 103.921 186.618 94.489 186.618 67.165 176.561 67.165 176.561 47.135 206.107 47.135 206.107 67.165 196.05 67.165 196.05 94.489 198.915 94.489 198.915 89.962 206.241 99.205 198.915 108.448 198.915 103.921z"
          />
          <FlowTotalCount totalCount={data.summary.total_cyclists} />
          <g clipPath="url(#clip-path)">
            <path fill="#e30613" d="M279.721 98.944H298.533V219.489H279.721z" />
          </g>
          <text
            fill="#fff"
            fontFamily="Helvetica"
            fontSize="20"
            transform="rotate(90 68.876 213.325)"
          >
            {totalsOrigin.east}
          </text>
          <g clipPath="url(#clip-path)">
            <path
              fill="#e30613"
              d="M98.898 279.764H219.44299999999998V298.576H98.898z"
            />
          </g>
          <text
            fill="#fff"
            fontFamily="Helvetica"
            fontSize="20"
            transform="translate(144.403 296.096)"
          >
            {totalsOrigin.south}
          </text>
          <g clipPath="url(#clip-path)">
            <path
              fill="#e30613"
              d="M19.811 98.946H38.623000000000005V219.49099999999999H19.811z"
            />
          </g>
          <text
            fill="#fff"
            fontFamily="Helvetica"
            fontSize="20"
            transform="rotate(-90 105.064 68.92)"
          >
            {totalsOrigin.west}
          </text>
          <g clipPath="url(#clip-path)">
            <path
              fill="#e30613"
              d="M98.898 19.812H219.44299999999998V38.623000000000005H98.898z"
            />
          </g>
          <text
            fill="#fff"
            fontFamily="Helvetica"
            fontSize="20"
            transform="translate(144.403 36.145)"
          >
            {totalsOrigin.north}
          </text>
          <g>
            <rect x="98" y="0" width="121" height="19" fill="#008080" />
            <text
              fill="#fff"
              fontFamily="Helvetica"
              fontSize="12"
              x="50%"
              y="3%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="uppercase"
            >
              {names.north}
            </text>
          </g>
          <g>
            <rect x="98" y="299" width="121" height="19" fill="#008080" />
            <text
              fill="#fff"
              fontFamily="Helvetica"
              fontSize="12"
              x="50%"
              y="97%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="uppercase"
            >
              {names.south}
            </text>
          </g>

          <g>
            <rect x="300" y="99" width="19" height="121" fill="#008080" />
            <text
              textAnchor="start"
              fill="#fff"
              fontFamily="Helvetica"
              fontSize="10"
              transform="rotate(90 85 221)"
              className="uppercase"
            >
              {names.east}
            </text>
          </g>
          <g clipPath="url(#clip-path)">
            <path fill="#008080" d="M0 98.946H18.811V219.49099999999999H0z" />
          </g>
          <text
            fill="#fff"
            fontFamily="Helvetica"
            fontSize="10"
            transform="rotate(-90 96.574 82.444)"
            className="uppercase"
          >
            {names.west}
          </text>
          <text
            fill="#008080"
            fontFamily="Helvetica"
            fontSize="14.173"
            letterSpacing="-.03em"
            transform="rotate(-90 132.225 69.606)"
          >
            {totals.west_south}
          </text>
          <text
            fill="#008080"
            fontFamily="Helvetica"
            fontSize="14.173"
            letterSpacing="-.09em"
            transform="rotate(-90 117.974 55.354)"
          >
            {totals.west_east}
          </text>
          <text
            fill="#008080"
            fontFamily="Helvetica"
            fontSize="14.173"
            letterSpacing="-.09em"
            transform="rotate(-90 100.325 37.705)"
          >
            {totals.west_north}
          </text>
          <text
            fill="#008080"
            fontFamily="Helvetica"
            fontSize="14.173"
            letterSpacing="-.03em"
            transform="rotate(90 70.33 186.597)"
          >
            {totals.east_north}
          </text>
          <text
            fill="#008080"
            fontFamily="Helvetica"
            fontSize="14.173"
            letterSpacing="-.03em"
            transform="rotate(90 52.868 204.058)"
          >
            {totals.east_west}
          </text>
          <text
            fill="#008080"
            fontFamily="Helvetica"
            fontSize="14.173"
            letterSpacing="-.03em"
            transform="rotate(90 36.43 220.496)"
          >
            {totals.east_south}
          </text>
          <text
            fill="#008080"
            fontFamily="Helvetica"
            fontSize="14.173"
            letterSpacing="-.03em"
            transform="translate(119.927 266.035)"
          >
            {totals.south_west}
          </text>
          <text
            fill="#008080"
            fontFamily="Helvetica"
            fontSize="14.173"
            letterSpacing="-.03em"
            transform="translate(151.428 266.035)"
          >
            {totals.south_north}
          </text>
          <text
            fill="#008080"
            fontFamily="Helvetica"
            fontSize="14.173"
            letterSpacing="-.03em"
            transform="translate(184.303 266.035)"
          >
            {totals.south_east}
          </text>
          <text
            fill="#008080"
            fontFamily="Helvetica"
            fontSize="14.173"
            letterSpacing="-.03em"
            transform="translate(116.497 62.48)"
          >
            {totals.north_west}
          </text>
          <text
            fill="#008080"
            fontFamily="Helvetica"
            fontSize="14.173"
            letterSpacing="-.03em"
            transform="translate(152.42 62.48)"
          >
            {totals.north_south}
          </text>
          <text
            fill="#008080"
            fontFamily="Helvetica"
            fontSize="14.173"
            letterSpacing="-.03em"
            transform="translate(184.294 62.48)"
          >
            {totals.north_east}
          </text>
        </g>
      </svg>
    </>
  );
}
