const addBinary = (b1, b2) => {
    if (b2.length > b1.length) return addBinary(b2, b1);

    b1 = Array.from(b1).reverse();
    b2 = Array.from(b2).reverse();

    const binary = [];
    let carry = 0;

    b1.map((d, i) => {
        const d1 = +d;
        const d2 = +b2[i] || 0;
        const added = d1 + d2 + carry;

        let toCarry = 0
        let toAdd = 0;

        if (added === 1) toAdd = 1;
        else if (added === 2) toAdd = 0, toCarry = 1;
        else if (added === 3) toAdd = 1, toCarry = 1;

        carry = toCarry;
        binary.unshift(toAdd);
    });

    return binary.join('');
};

module.exports = { addBinary };