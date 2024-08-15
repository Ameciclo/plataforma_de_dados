import Link from "next/link";
import React from "react";

export const StatisticsBoxIdeciclo = ({ title, boxes, subtitle = "" }) => {
  return (
    <section className="relative z-1 mx-auto container bg-transparent">
      <div className="mx-auto text-center my-12 md:my-24">
      <div className="relative inline-flex items-center justify-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="110%" height="57" viewBox="0 0 488 57"
          fill="none"
          className="absolute bottom-[-30px] left:0  transform scale-x-105 drop-shadow-lg flex-shrink-0"
          style={{ filter: 'drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.25))' }}
        >
          <path d="M10.9295 34.8977C9.75216 26.5786 9.27831 18.8556 8.12216 10.7625C7.99065 10.1091 8.08796 9.43045 8.39781 8.8404C8.70764 8.25036 9.21111 7.7849 9.82363 7.52221C11.8737 6.83873 13.9732 6.31343 16.1036 5.95093C21.0167 5.29817 25.9882 4.81445 30.944 4.65132C68.9323 3.38184 106.9 1.99948 144.952 3.23619C176.497 4.21817 208.104 3.78592 239.649 4.73021C277.643 5.89211 315.589 7.92151 353.549 9.42303C380.716 10.5058 407.881 11.4252 435.045 12.1813C446.716 12.5158 458.419 12.2468 470.088 12.3363C472.275 12.3142 474.464 12.5748 476.992 12.7943C477.683 12.9413 478.29 13.3521 478.683 13.9395C479.076 14.5269 479.225 15.2444 479.097 15.9396L477.217 36.9179C477.203 37.472 477.016 38.008 476.683 38.4507C476.349 38.8934 475.886 39.2208 475.357 39.387C474.369 39.6298 473.361 39.785 472.345 39.8509C431.394 40.7168 390.448 42.1292 349.507 42.2599C304.778 42.41 260.02 41.5049 215.283 40.8258C192.49 40.4905 169.708 39.4012 146.916 39.1224C120.901 38.8574 94.8576 39.535 68.823 39.2325C50.763 39.0379 32.0911 37.9824 13.083 37.232C12.5083 37.1548 11.9785 36.8793 11.5853 36.4531C11.192 36.0269 10.9601 35.4767 10.9295 34.8977Z" fill="#A5AEB8"/>
        </svg>
        <h1 className=" text-3xl sm:text-5xl font-bold bg-[#CE4831] text-white rounded-[2.5rem] shadow-[0px_6px_8px_rgba(0,0,0,0.25)] inline-flex items-center justify-center h-[6rem] px-[2.1875rem] py-[1rem] gap-[1rem] flex-shrink-0 relative z-10">
          {title}
        </h1>
      </div>
        {subtitle && (
          <h3 className="text-2xl md:text-3xl font-bold my-8">{subtitle}</h3>
        )}
        {/* Background Wrapper for NumberBox */}
        <div className="relative z-1 rounded-lg mx-4 md:mx-auto my-8 max-w-4xl">
          {/* SVG Background */}
          <div className="absolute inset-0 z-1">
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="100%" 
            height="100%" 
            viewBox="0 0 1149 208" 
            preserveAspectRatio="none" 
            fill="none"
            className=" drop-shadow-lg "
            style={{ filter: 'drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.25))' }}
            >
              
              <path opacity="1" d="M1126.03 193.311C1126.03 196.253 1119.59 199.073 1108.12 201.153C1096.65 203.233 1081.09 204.401 1064.87 204.401L892.017 206.573C836.194 207.271 780.371 207.271 759.995 208L362.477 202.969C302.327 201.223 274.862 202.741 250.161 203.131L76.2709 204.401C60.6238 204.401 45.5722 203.313 34.216 201.361C22.8599 199.409 16.064 196.742 15.2281 193.909L1.63507 148.243C-1.7472 136.762 0.119956 125.25 7.21741 113.825L8.44552 91.0475C13.1347 83.4551 12.4648 56.3808 8.44552 48.7733L18.7728 17.9331C18.5231 17.545 18.3926 17.1547 18.3821 16.7639C18.6891 9.40439 26.3648 3.5431 94.4414 3.5431L779.505 0C781.236 0 782.966 0 784.725 0L1068.34 2.94077C1083.93 3.09986 1098.6 4.33552 1109.33 6.39408C1120.06 8.45264 1126.03 11.1779 1126.03 14.0104L1148.36 117.14C1146.52 122.76 1146.73 128.395 1149 134.01L1126.03 193.311Z" fill="#E5E8E9"/>
            </svg>
          </div>
          {/* Content (calling NumberBox) */}
          <div className="relative z-10 flex flex-col align-baseline md:flex-row rounded-lg mx-4 md:mx-auto my-8 max-w-4xl divide-y md:divide-y-0 md:divide-x divide-gray-300">
            {boxes.map((box, index) =>
              box?.type == "LinksBox" ? (
                <LinksBox key={`links-box-${index}`} {...box} />
              ) : (
                <NumberBox key={`number-box-${index}`} {...box} />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const StatisticsBoxIdecicloDetalhes = ({ title, boxes, subtitle = "" }) => {
  return (
    <section className="relative z-1 mx-auto container bg-transparent">
      <div className="mx-auto text-center my-12 md:my-24">
      <div className="relative inline-flex items-center justify-center ">
        <svg className="absolute z-1 bottom-0 translate-y-6 drop-shadow-md" xmlns="http://www.w3.org/2000/svg" width="1358" height="42" viewBox="0 0 1358 62" fill="none">
          <g filter="url(#filter0_d_36_462)">
            <path d="M15.9387 42.8923C12.719 32.9575 11.4924 23.7252 8.32915 14.0604C7.96501 13.2808 8.25289 12.4674 9.14433 11.7569C10.0358 11.0464 11.4764 10.4821 13.2244 10.1587C19.0716 9.31065 25.0569 8.65106 31.1278 8.18577C45.1257 7.33193 59.2867 6.67946 73.3981 6.41074C181.568 4.32819 289.682 2.11088 397.992 3.02562C487.784 3.73218 577.772 2.74594 667.564 3.40742C775.711 4.2335 883.709 6.09812 991.753 7.33101C1069.08 8.2231 1146.4 8.91981 1223.72 9.42114C1256.95 9.64808 1290.27 9.15261 1323.49 9.08648C1329.71 9.02762 1335.94 9.30691 1343.13 9.53198C1345.1 9.69751 1346.82 10.18 1347.93 10.8769C1349.04 11.5737 1349.45 12.43 1349.08 13.2635L1343.39 38.3884C1343.34 39.0515 1342.8 39.6954 1341.85 40.23C1340.89 40.7646 1339.56 41.1631 1338.06 41.3698C1335.24 41.6749 1332.37 41.8756 1329.48 41.9695C1212.88 43.6132 1096.28 45.9107 979.727 46.6747C852.385 47.5181 724.975 47.0997 597.623 46.9512C532.739 46.8884 467.899 45.9233 403.016 45.9281C328.957 45.9972 254.802 47.1944 180.689 47.2189C129.276 47.2541 76.1355 46.2686 22.0328 45.653C20.3976 45.5692 18.8938 45.2475 17.7811 44.7434C16.6683 44.2394 16.0167 43.5846 15.9387 42.8923Z" fill="#CE4831"/>
          </g>
        </svg>
        <h1 className="text-3xl w-full m-0 mb-10 p-0 sm:text-5xl font-bold bg-transparent text-gray-700 inline-flex items-center justify-center py-[1rem] gap-[1rem] flex-shrink-0 relative z-10">
          {title}
        </h1>
      </div>
        {subtitle && (
          <h3 className="text-2xl md:text-3xl text-gray-700 font-bold my-8">{subtitle}</h3>
        )}
        {/* Background Wrapper for NumberBox */}
        <div className="relative z-1 rounded-lg mx-4 md:mx-auto my-8 max-w-4xl">
          {/* SVG Background */}
          <div className="absolute inset-0 z-1">
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="100%" 
            height="100%" 
            viewBox="0 0 1149 208" 
            preserveAspectRatio="none" 
            fill="none"
            className=" drop-shadow-lg "
            style={{ filter: 'drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.25))' }}
            >
              
              <path opacity="1" d="M1126.03 193.311C1126.03 196.253 1119.59 199.073 1108.12 201.153C1096.65 203.233 1081.09 204.401 1064.87 204.401L892.017 206.573C836.194 207.271 780.371 207.271 759.995 208L362.477 202.969C302.327 201.223 274.862 202.741 250.161 203.131L76.2709 204.401C60.6238 204.401 45.5722 203.313 34.216 201.361C22.8599 199.409 16.064 196.742 15.2281 193.909L1.63507 148.243C-1.7472 136.762 0.119956 125.25 7.21741 113.825L8.44552 91.0475C13.1347 83.4551 12.4648 56.3808 8.44552 48.7733L18.7728 17.9331C18.5231 17.545 18.3926 17.1547 18.3821 16.7639C18.6891 9.40439 26.3648 3.5431 94.4414 3.5431L779.505 0C781.236 0 782.966 0 784.725 0L1068.34 2.94077C1083.93 3.09986 1098.6 4.33552 1109.33 6.39408C1120.06 8.45264 1126.03 11.1779 1126.03 14.0104L1148.36 117.14C1146.52 122.76 1146.73 128.395 1149 134.01L1126.03 193.311Z" fill="#E5E8E9"/>
            </svg>
          </div>
          {/* Content (calling NumberBox) */}
          <div className="relative z-10 flex flex-col align-baseline md:flex-row rounded-lg mx-4 md:mx-auto my-8 max-w-4xl divide-y md:divide-y-0 md:divide-x divide-gray-300">
            {boxes.map((box, index) =>
              box?.type == "LinksBox" ? (
                <LinksBox key={`links-box-${index}`} {...box} />
              ) : (
                <NumberBox key={`number-box-${index}`} {...box} />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};


// estatisticas cada cidade
export const StatisticsBoxIdeciclo2 = ({ title, boxes, subtitle = "" }) => {
  return (
    <section className="mx-auto container">
      <div className="mx-auto text-center my-12 md:my-24">
        <div className="relative inline-flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl font-bold bg-[#6DBFAC] text-gray-800 rounded-[2.5rem] shadow-[0px_6px_8px_rgba(0,0,0,0.25)] inline-flex items-center justify-center px-[2rem] py-[.75rem] pb-4 lg:p-6 lg:pb-8 lg:px-8 gap-[1rem] flex-shrink-0 relative z-10 max-w-[95%] lg:max-w-full">
            {title}
          </h1>
        </div>
        {subtitle && (
          <h3 className="text-2xl md:text-3xl font-medium my-8 text-gray-800">{subtitle}</h3>
        )}
        {/* Background Wrapper for NumberBox */}
        <div className="relative rounded-lg mx-4 md:mx-auto my-8 max-w-4xl lg:max-w-6xl">
          {/* Content (calling NumberBox) */}
          <div className="flex flex-col gap-4 justify-between md:flex-row  rounded-lg text-gray-800 ">
            {boxes.map((box, index) => (
              <div key={`box-${index}`} className="relative flex-1">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="100%" 
                  height="100%" 
                  viewBox="0 0 1149 208" 
                  preserveAspectRatio="none" 
                  fill="none"
                  className="absolute inset-0 h-full drop-shadow-lg lg:px-6"
                  style={{ filter: 'drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.25))' }}
                >
                  <path opacity="1" d="M1126.03 193.311C1126.03 196.253 1119.59 199.073 1108.12 201.153C1096.65 203.233 1081.09 204.401 1064.87 204.401L892.017 206.573C836.194 207.271 780.371 207.271 759.995 208L362.477 202.969C302.327 201.223 274.862 202.741 250.161 203.131L76.2709 204.401C60.6238 204.401 45.5722 203.313 34.216 201.361C22.8599 199.409 16.064 196.742 15.2281 193.909L1.63507 148.243C-1.7472 136.762 0.119956 125.25 7.21741 113.825L8.44552 91.0475C13.1347 83.4551 12.4648 56.3808 8.44552 48.7733L18.7728 17.9331C18.5231 17.545 18.3926 17.1547 18.3821 16.7639C18.6891 9.40439 26.3648 3.5431 94.4414 3.5431L779.505 0C781.236 0 782.966 0 784.725 0L1068.34 2.94077C1083.93 3.09986 1098.6 4.33552 1109.33 6.39408C1120.06 8.45264 1126.03 11.1779 1126.03 14.0104L1148.36 117.14C1146.52 122.76 1146.73 128.395 1149 134.01L1126.03 193.311Z" fill="#E5E8E9"/>
                </svg>
                <div className="relative z-10">
                  {box?.type === "LinksBox" ? (
                    <LinksBox {...box} />
                  ) : (
                    <NumberBox {...box} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


// texto dentro das box de "estatísticas gerais"
function NumberBox({ title, value, unit = undefined }) {
  return (
    <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
      <h3>{title}</h3>
      <h3 className="text-3xl sm:text-5xl font-bold mt-2">{value}</h3>
      {unit && <p>{unit}</p>}
    </div>
  );
}

function LinksBox({ title, value }) {
  return (
    <div className="flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest">
      <h3>{title}</h3>
      {value.map((v) => (
        <Link
          href={v.url}
          className="border border-teal-500 bg-ameciclo text-white hover:bg-red-500 hover:border-red-300 rounded px-4 py-2 mt-2"
        >
          {v.label}
        </Link>
      ))}
    </div>
  );
}
