const isTokenValid = (err) => {
  if (err.status === 200) return true;
  else if (err.status === 401) return false;
};

module.exports = isTokenValid;
