define(['node_modules/hashmap/hashmap'], function (HashMap) {

	function UTXOPool(uPool) {
		var H;

		if (uPool instanceof UTXOPool) {
			H = new HashMap(uPool.getHashMap());
		} else {
			H = new HashMap();
		}

		this.getHashMap = function () {
			return H;
		}

		this.addUTXO = function (utxo, txOut) {
			
		}

	}

});