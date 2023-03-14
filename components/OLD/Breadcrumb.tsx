import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const generateBreadcrumbs = (router) => {
  // Remove any query parameters, as those aren't included in breadcrumbs
  const asPathWithoutQuery = router.asPath.split("?")[0];

  // Break down the path between "/"s, removing empty entities
  // Ex:"/my/nested/path" --> ["my", "nested", "path"]
  const asPathNestedRoutes = asPathWithoutQuery.split("/")
                                               .filter(v => v.length > 0);

  // Iterate over the list of nested route parts and build
  // a "crumb" object for each one.
  const crumblist = asPathNestedRoutes.map((subpath, idx) => {
    // We can get the partial nested route for the crumb
    // by joining together the path parts up to this point.
    const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
    // The title will just be the route string for now
    const title = subpath;
    return { href, title }; 
  })

  // Add in a default "Home" crumb for the top-level
  return [{ href: "/", text: "Home" }, ...crumblist, router];
}


const baseItem = {
    label:"Plataforma de Dados",
    slug:"/",
    routes: ["/"]
  }
  

export const Breadcrumb = ({ conf }) => {

  const router = useRouter();

  return (
    <div className="bg-ameciclo text-white p-4 items-center uppercase w-full">
      <nav className="bg-grey-light rounded font-sans w-full">
        <ol className="list-none p-0 inline-flex max-w-full">
          {conf.routes.map((route, i) => {
            console.log(JSON.stringify(generateBreadcrumbs(router)))
            if (route === "/") {
              return (
                <Crumb
                  slug={baseItem.slug}
                  label={baseItem.label}
                  lastItem={false}
                  key={i}
                />
              );
            }
            if (i === conf.routes.length - 1) {
              return (
                <Crumb
                  slug={conf.slug}
                  label={conf.label}
                  lastItem={true}
                  key={i}
                />
              );
            }
            return (
              <Crumb
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
  );
};

const Crumb = ({ slug, label, lastItem }) => {
  return (
    <li className={`flex items-center ${lastItem ? "last-breadcrumb" : ""}`}>
      <Link className="truncate" href={slug}>
          {label.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")}
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