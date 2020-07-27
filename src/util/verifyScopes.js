const verifyScopes = (s1, s2) => {
    if (s1.length !== s2.length) return false;

    return s1.every((s, i) => s2.indexOf(s) === i);
};

module.exports = { verifyScopes };