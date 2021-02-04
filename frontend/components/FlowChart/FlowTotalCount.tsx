import React from "react";

function FlowTotalCount({ totalCount }) {
  return (
    <g>
      <path
        fill="#008081"
        d="M119.011 141.815H199.52499999999998V175.971H119.011z"
      />
      <text
        fill="#fff"
        fontFamily="Helvetica"
        fontSize="30"
        transform="translate(127.704 168.905)"
      >
        {totalCount}
      </text>
    </g>
  );
}

export default FlowTotalCount;
