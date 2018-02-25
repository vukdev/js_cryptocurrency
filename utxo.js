

function UTXO(txHash, index) {
	var txHash = txHash;
	var index = index;

	this.getTxHash = function () {
		return txHash;
	}

	this.getIndex = function () {
		return index;
	}

	
}