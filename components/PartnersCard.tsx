import React from "react";
import Link from "next/link";
import Tippy from "@tippyjs/react";

const PartnerCard = ({ partner }) => {
  return (
    <Tippy content={`${partner.name}`}>
      <div className="p-2 bg-white rounded-lg shadow">
        {partner.logo ? (
          <Link href={`${partner.url}`} passHref>
            <div className="bg-cover bg-no-repeat bg-center relative cursor-pointer"
              style={{
                backgroundImage: `url(${partner.logo.url})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                position: "relative",
                minHeight: "140px",
                minWidth: "140px",
                cursor: "pointer",
              }}
            />
          </Link>
        ) : (
          <div
            style={{
              minHeight: "140px",
            }}
          />
        )}
      </div>
    </Tippy>
  );
};


export const PartnersSession = ({ partners }) => {
    return (
        <section> 
            <div className="container flex justify-center pt-10 mx-4 border-gray-300 ">
                {partners && partners.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-10">
                        {partners.map((p) => (
                            <PartnerCard partner={p} key={p.id} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}