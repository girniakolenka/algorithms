function multiplyKarazuba(x, y) {
	x = x + '';
	y = y + '';

    const n = x.length;

    if (x.length === 1 || y.length === 1) {
    	return x*y;
    }

	const a = +x.substring(0, n/2);
	const b = +x.substring(n/2);

	const c = +y.substring(0, n/2);
	const d = +y.substring(n/2);

	const ac = multiplyKarazuba(a,c);
	const bd = multiplyKarazuba(b,d);
	const abcd = multiplyKarazuba(a+b, c+d);
	const n210 = Math.pow(10, Math.ceil(n/2));
	const n10 = Math.pow(10, Math.ceil(n/2)*2);

	return n10*ac + n210*(abcd - ac - bd) + bd;
}