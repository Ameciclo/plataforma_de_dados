import React from "react";

function NumberRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id },
  }) {
    const [min, max] = React.useMemo(() => {
      let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      preFilteredRows.forEach(row => {
        min = Math.min(row.values[id], min)
        max = Math.max(row.values[id], max)
      })
      return [min, max]
    }, [id, preFilteredRows])
  
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <input
          className="my-2 max-w-sm text-gray-600 border-2 border-gray-300 bg-white h-10 rounded-lg text-sl text-center focus:outline-none"
          value={filterValue[0] || ''}
          type="number"
          onChange={e => {
            let val = e.target.value
            setFilter((old = []) => {
              if(parseFloat(val) < min) val = ""+ min
              if(parseFloat(val) > max) val = ""+ max
               return [val ? parseFloat(val) : undefined, old[1]]
              })
          }}
          placeholder={`Mín(${min.toFixed(1)})`}
          style={{
            width: '70px',
            marginRight: '0.5rem',
          }}
        />
        <div className="my-5 max-w-sm text-gray-600  text-sl text-center">a</div>
        <input
        className="my-2 max-w-sm text-gray-600 border-2 border-gray-300 bg-white h-10 rounded-lg text-sl text-center focus:outline-none"
          value={filterValue[1] || ''}
          type="number"
          onChange={e => {
            let val = e.target.value
            setFilter((old = []) => {
              if(parseFloat(val) < min) val = ""+ min
              if(parseFloat(val) > max) val = ""+ max
               return [old[0], val ? parseFloat(val) : undefined]
              })
          }}
          placeholder={`Máx(${max.toFixed(1)})`}
          style={{
            width: '70px',
            marginLeft: '0.5rem',
          }}
        />
      </div>
    )
  }
  
export default NumberRangeColumnFilter;
