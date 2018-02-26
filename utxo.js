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
		if (other == null || !(other instanceof UTXO)) {
			return false;
		}

		var otherHash = other.getTxHash();
		var otherIndex = other.getIndex();
		if (otherHash.length !== txHash.length || otherIndex !== ind) {
            return false;
		}

		for (var i = 0; i < otherHash.length; i++) {
            if (otherHash[i] !== txHash[i])
                return false;
        }

        return true;
	}

	this.hashCode = function () {
		
	}
}