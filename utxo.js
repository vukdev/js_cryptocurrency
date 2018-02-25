function UTXO(txHash, index) {
	var txHash = txHash;
	var index = index;

	this.getTxHash = function () {
		return txHash;
	}

	this.getIndex = function () {
		return index;
	}

	/**
     * Compares this UTXO to the one specified by {@code other}, considering them equal if they have
     * {@code txHash} arrays with equal contents and equal {@code index} values
     */
	this.equals = function (other) {
		if (other == null) {
			return false;
		}
		if (!(other instanceof UTXO)) {
			return false;
		}

		otherHash = other.getTxHash();
		otherIndex = other.getIndex();
		if (otherHash.length !== txHash.length || ohterIndex !== index) {
            return false;
		}
	}
}