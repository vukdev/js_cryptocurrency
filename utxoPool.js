function UTXOPool(uPool) {
	var H;

	if (uPool instanceof UTXOPool) {
		H = uPool.map(function (item) {
			return Object.assign({}, item);
		});
	} else {
		H = [];
	}
}