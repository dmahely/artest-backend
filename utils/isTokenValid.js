const isTokenValid = (err) => {
    if (err.status === 200) return true;
    if (err.status === 401) return false;

    return false;
};

module.exports = isTokenValid;
