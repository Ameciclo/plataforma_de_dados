import React from "react";

// Ranking das cidades 
export function MultipleSelectionFiltersIdeciclo({ title = "", filters }) {
  return (
    <section className="flex gap-2 relative justify-center mb-10 mx-auto w-full 2xl:w-3/4 ">
      <svg className="relative z-[1]" xmlns="http://www.w3.org/2000/svg" width="225" height="264" viewBox="0 0 225 264" fill="none">
        <path d="M217.255 111.903C209.361 106.913 201.28 101.892 192.762 97.2537C175.867 88.0527 157.942 79.726 140.47 71.0154C121.391 61.5052 102.202 52.0696 83.2635 42.4315C71.7817 36.6102 60.5962 30.5118 49.3796 24.4453C37.383 17.9524 25.8387 11.0543 13.4989 4.89183C7.58635 1.94922 3.71747 0.467246 0.207397 0.445923L0.207397 263.543C2.51437 263.198 4.65903 262.465 6.44752 261.411C22.0478 253.628 38.3034 246.282 52.1721 236.889C55.6509 234.544 71.9845 226.612 75.5725 224.33C107.179 204.147 139.097 184.189 170.937 164.166C175.29 161.437 179.783 158.782 184.01 155.967C195.601 148.238 207.239 140.54 218.534 132.629L218.674 132.522C220.581 131.111 222.059 129.455 223.021 127.651C223.983 125.846 224.411 123.928 224.279 122.01C224.147 120.091 223.458 118.209 222.252 116.474C221.046 114.739 219.347 113.185 217.255 111.903Z" fill="#EFC345"/>
      </svg>
      <div className="mx-auto flex flex-col justify-center align-middle gap-2 md:gap-5 relative z-[2]">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-700 pb-8 bg-[#F5BDBF] mx-auto px-7 py-6 rounded-[40px]">
          {title}
        </h1>
        <div className="flex flex-wrap align-baseline gap-0 md-gap-10 justify-center flex-grow mx-auto">
          {filters.length > 0 &&
            filters.map((filter: any, index) => (
              <SelectionFilterIdeciclo key={index} {...filter} />
            ))}
        </div>
      </div>
      <svg className="relative z-[1]" xmlns="http://www.w3.org/2000/svg" width="236" height="229" viewBox="0 0 236 229" fill="none">
        <path d="M236 229L236 14.1282C226.709 10.9305 217.347 7.94763 207.915 5.17949C182.03 -2.37835 155.574 -0.89542 129.658 4.69881C113.314 8.13405 97.9542 15.0096 84.6729 24.836C80.3447 28.0473 75.8155 30.9723 71.6354 34.3779C55.1376 47.6732 41.8886 63.2286 34.2481 82.9465C30.9441 91.7266 27.0558 100.291 22.6076 108.586C11.066 129.199 3.62167 151.719 0.659843 174.98C-0.0181506 179.902 -0.174172 184.878 0.194221 189.83C1.1572 200.61 2.87154 211.307 3.90861 222.097C4.13083 224.428 4.43772 226.719 4.80811 229L236 229Z" fill="#5AC2E1"/>
      </svg>
      {/* Background */}
      <div className="absolute lg:translate-y-[-65px] translate-y-[0] z-[0] ">
        <svg className="scale-y-[2] sm:scale-y-[1] w-full" xmlns="http://www.w3.org/2000/svg" width="847" height="373" viewBox="0 0 847 373" fill="none">
          <g filter="url(#filter0_d_36_344)">
            <path d="M103.281 309.45C103.281 309.45 152.031 354.45 218.401 356.64C246.931 357.58 354.301 353.83 370.021 354.43C385.741 355.03 409.101 353.65 427.961 352.83C446.821 352.01 570.141 353.96 583.021 354.43C607.191 355.33 641.131 360.28 668.741 356.79C692.371 353.79 711.351 351.07 740.301 324.35L777.581 294.11C786.558 283.956 794.037 272.571 799.791 260.3L817.211 214.77C830.881 185.6 840.211 162.99 838.051 130.85L833.291 98.3801C832.656 88.3983 829.957 78.6566 825.367 69.7702C820.777 60.8837 814.394 53.0454 806.621 46.7501C788.621 32.2501 760.561 15.0801 721.801 6.19009C646.971 -10.9599 432.001 31.5101 279.621 9.74009C170.621 -5.80991 89.0913 33.2401 51.5113 56.7301C37.1216 65.7505 26.5972 79.7961 21.9813 96.1401L21.7513 96.9401C14.5713 122.26 5.62128 145.94 8.58128 171.94C10.4813 188.61 8.00128 248.13 54.8113 282.15L103.281 309.45Z" fill="#E4E8EA"/>
          </g>
        </svg>
      </div>
    </section>
  );
}

// "por estado" e "por população"
export function SelectionFilterIdeciclo({ title, value, name, onChange, items }) {
  return (
    <div className="relative rounded-lg mx-4 m-4 xl:m-8 max-w-md">
      {/* SVG Background */}
      <div className="absolute inset-0 z-0">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="100%" 
          height="100%" 
          viewBox="0 0 288 101" 
          preserveAspectRatio="none" 
          fill="none"
          className="drop-shadow-lg"
          style={{ filter: 'drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.25))' }}
        >
          <path d="M285.958 85.6596C285.958 97.0472 264.411 99.8347 240.981 99.8347H232.428L172.037 99.7969C171.18 99.7969 170.316 99.7969 169.459 99.8313L127.684 100.664C113.961 101.411 93.838 100.743 81.8009 100.292L47.4172 100.141C46.3518 100.138 45.2877 100.103 44.2309 100.038L26.1893 98.9055C7.94247 98.3033 3.02849 93.3993 3.02849 84.3931L4.93319 52.808C5.01108 51.545 4.93319 50.2854 4.77742 49.0224L0.090017 16.219C-0.082714 15.1743 -0.00668366 14.1235 0.316598 13.0873C1.39526 9.91218 4.75836 7.0263 9.80661 4.94393C14.8549 2.86156 21.2603 1.71797 27.8816 1.71693L76.0301 0.182065C81.6947 0.00311224 87.3804 -0.0439203 93.0874 0.0409676L202.859 1.71693H265.962C270.357 1.71664 274.59 2.52244 277.815 3.97327C281.04 5.42411 283.02 7.41309 283.359 9.54268C283.451 10.1484 283.593 10.754 283.791 11.3529L285.582 16.7077C287.864 23.5415 288.534 30.4794 287.579 37.3871L284.619 58.9233C284.53 59.6116 284.504 60.2919 284.541 60.9641L285.958 85.6596Z" fill="#6DBFAC"/>
        </svg>
      </div>
      {/* Content */}
      <div className="relative z-10 text-white font-bold rounded px-4 pb-6 pt-2 mx-4">
        <label htmlFor={value}>{title}</label>
        <select
          className="block appearance-none text-black font-bold w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={value}
          name={name}
          onChange={onChange}
        >
          {items.map((s: any) => (
            <option value={s.value} key={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
