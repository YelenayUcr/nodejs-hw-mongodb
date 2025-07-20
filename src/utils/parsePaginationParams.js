const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseInt(page) || 1;
  const parsedPerPage = parseInt(perPage) || 10;

  return {
    page: parsedPage,
    perPage: parsedPerPage,
    skip: (parsedPage - 1) * parsedPerPage,
  };
};

export { parsePaginationParams };