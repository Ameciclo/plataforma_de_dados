import React from "react";
import Link from "next/link";

const baseCrumb = {
  label: "Plataforma de Dados",
  slug: "/",
  route: "/",
};

export const Breadcrumb = ({ routes, label, slug, customColor }) => {
  let crumb = routes.map((route, i) => {
    if (route === "/") return { ...baseCrumb, lastItem: false };
    if (i === routes.length - 1)
      return { route: route, label: label, slug: slug, lastItem: true };
    else return { route: route, label: route, slug: route, lastItem: false };
  });

  return (
    <div className={`p-4 items-center uppercase w-full ${customColor ? customColor : "bg-ameciclo"} text-white`}>
      <nav className="bg-grey-light rounded font-sans w-full">
        <ol className="inline-flex list-none p-0 max-w-full">
          {crumb.map((c, i) => (
            <Crumb {...c} key={i} />
          ))}
        </ol>
      </nav>
    </div>
  );
};

const Crumb = ({ slug, label, lastItem }) => {
  return (
    <li className={`flex items-center ${lastItem ? "" : "truncate"} `}>
      <Link className="truncate" href={slug}>
        {label.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")}
      </Link>
      {lastItem ? null : <Separator />}
    </li>
  );
};

function Separator() {
  return (
    <svg
      className="fill-current w-3 h-3 mx-3"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
    </svg>
  );
}
