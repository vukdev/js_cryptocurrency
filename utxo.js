/* global define */
define(['hashcode'], function (hashCode) {
	'use strict';

	function UTXO(txH, ind) {
		var txHash = txH;
		var index = ind;

		this.getTxHash = function () {
			return txHash;
		};

		this.getIndex = function () {
			return index;
		};

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
	            if (otherHash[i] !== txHash[i]) {
                    return false;
				}
	        }

	        return true;
		};

		this.hashCode = function () {
			var hash = 1;
	        hash = hash * 17 + index;
	        hash = hash * 31 + hashCode().value(txHash);
	        return hash;
		};

		this.compareTo = function (utxo) {
			var utxoHash = utxo.getTxHash;
			var utxoIndex = utxo.getIndex;

			if (utxoIndex > index) {
				return -1;
			} else if (utxoIndex < index) {
				return 1;
			}  else {
				var len1 = txHash.length;
				var len2 = utxoHash.length;
				if (len2 > len1) {
					return -1;
				} else if (len2 < len1) {
					return 1;
				} else {
					for (var i = 0; i < len1; i++) {
						if (utxoHash[i] > txHash[i]) {
							return -1;
						} else if (utxoHash[i] < txHash[i]) {
							return 1;
						}

						return 0;
					}
				}
			}
		};
	}

	return UTXO;
});