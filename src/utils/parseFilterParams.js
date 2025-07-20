const parseFilterParams = (query) => {
  const { name, phoneNumber, email, isFavourite, contactType } = query;
  
  const filter = {};

  if (name && typeof name === 'string') {
    filter.name = { $regex: name, $options: 'i' };
  }

  if (phoneNumber && typeof phoneNumber === 'string') {
    filter.phoneNumber = { $regex: phoneNumber, $options: 'i' };
  }

  if (email && typeof email === 'string') {
    filter.email = { $regex: email, $options: 'i' };
  }

  if (isFavourite !== undefined) {
    filter.isFavourite = isFavourite === 'true';
  }

  if (contactType && typeof contactType === 'string') {
    filter.contactType = contactType;
  }

  return filter;
};

export { parseFilterParams };