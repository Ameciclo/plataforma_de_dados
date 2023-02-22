import React from "react";
import Link from "next/link";

const Breadcrumb = ({ label, slug, routes }) => {
  return (
    <div className="bg-ameciclo text-white p-4 items-center uppercase flex">
     <div className="container mx-auto">
        <nav className="bg-grey-light rounded font-sans w-full">
          <ol className="list-none p-0 inline-flex max-w-full">
            {routes.map((route, i) => {
              if (route === "/") {
                return (
                  <BreadcrumbItem
                    slug="/"
                    label="Plataforma de Dados"
                    lastItem={false}
                    key={i}
                  />
                );
              }
              if (i === routes.length - 1) {
                return (
                  <BreadcrumbItem
                    slug={slug}
                    label={label}
                    lastItem={true}
                    key={i}
                  />
                );
              }
              return (
                <BreadcrumbItem
                  slug={route}
                  label={route}
                  lastItem={false}
                  key={i}
                />
              );
            })}
          </ol>
        </nav>
    </div>
  </div>
  );
};

const BreadcrumbItem = ({ slug, label, lastItem }) => {
  return (
    <li className={`flex items-center ${lastItem ? "last-breadcrumb" : ""}`}>
      <Link href={slug}>
        <a className="truncate">
          {label.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")}
        </a>
      </Link>
      {lastItem ? null : (
        <svg
          className="fill-current w-3 h-3 mx-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
        </svg>
      )}
    </li>
  );
};

export default Breadcrumb;
