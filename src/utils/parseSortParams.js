const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  const parsedSortOrder = ['asc', 'desc'].includes(sortOrder) ? sortOrder : 'asc';

  const parsedSortBy = typeof sortBy === 'string' ? sortBy : '_id';

  return {
    [parsedSortBy]: parsedSortOrder === 'asc' ? 1 : -1,
  };
};

export { parseSortParams };