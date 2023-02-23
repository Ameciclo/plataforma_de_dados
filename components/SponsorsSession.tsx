import React from "react"
import Image from "next/image";

const SponsorsSession = ({ sponsors = []}) => {
    return (
        <section className="bg-ameciclo">
            {sponsors.map((s) => (
                <div className="flex-1 container mx-auto p-10 text-center">
                    <h3 className="font-bold text-3xl text-white py-8">{s.title}</h3>
                        {s.orgs.map((o) => (
                            <div className="flex gap-4 items-center" >
                                <a href={o.url}>
                                    <Image src={o.logo} alt={o.name} width={o.width ? o.width : 48} height={o.height ? o.height : 48} />
                                </a>                    
                            </div>                            
                        ))}
                </div>
            ))}
        </section> 
    )
 
}

export default SponsorsSession