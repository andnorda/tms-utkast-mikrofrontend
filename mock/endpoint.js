export default [
  {
    url: "/api/endpoint/utkast",
    method: "get",
    response: () => {
      return [
        {
          utkastId: "124678",
          tittel: "Søknad om dagpenger, permittert",
          link: "https://www.dev.nav.no/minside/",
          opprettet: "2020-03-13T08:53:24.636Z",
          sistEndret: null,
        },
        {
          utkastId: "12467",
          tittel: "Søknad om foreldre- og svangerskapspenger",
          link: "https://www.dev.nav.no/minside/",
          opprettet: "2020-03-13T08:53:24.636Z",
          sistEndret: "2020-03-14T08:53:24.636Z",
        },
      ];
    },
  },
];
