import React from "react"
import Image from "next/image";
import Link from "next/link";

const SponsorsSession = ({ sponsors = []}) => {
    return (
        <section className="bg-ameciclo">
            {sponsors.map((sponsor : any) => (
                <div className="flex-1 container mx-auto p-10 text-center">
                    <h3 className="font-bold text-3xl text-white py-8">{sponsor.title}</h3>
                        {sponsor.orgs.map((organization : any) => (
                            <div className="flex gap-4 items-center" >
                                <Link href={organization.url}>
                                    <Image src={organization.logo} alt={organization.name} width={organization.width ? organization.width : 48} height={organization.height ? organization.height : 48} />
                                </Link>                    
                            </div>                            
                        ))}
                </div>
            ))}
        </section> 
    )
 
}

export default SponsorsSession