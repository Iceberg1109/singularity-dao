const formatAddress = account => {
  if (!account) return '';
  const first = account.substring(0, 6);
  const last = account.substring(account.length - 4);
  return `${first}...${last}`;
};

export default formatAddress;
