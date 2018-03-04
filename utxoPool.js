/* global define */
define(['node_modules/hashmap/hashmap'], function (HashMap) {
    'use strict';
	
	return function UTXOPool(uPool) {
		var H;

		if (uPool instanceof UTXOPool) {
			H = new HashMap(uPool.getHashMap());
		} else {
			H = new HashMap();
		}

		this.getHashMap = function () {
			return H;
		};

		this.addUTXO = function (utxo, txOut) {
		    if (this.contains(utxo)) {
		        return false;
            }

            this.getHashMap().set(utxo, txOut);
		    return this;
		};

		this.removeUTXO = function (utxo) {
		    H.forEach(function (value, key) {
		       if (key.equals(utxo)) {
                   H.remove(key);
               }
            });
        };

        this.getTxOutput = function (utxo) {
            var output = false;

            H.forEach(function (value, key) {
                if (key.equals(utxo)) {
                    output = H.get(key);
                }
            });

            return output;
        };

        this.contains = function (utxo) {
            var contains = false;

            H.forEach(function (value, key) {
                if (key.equals(utxo)) {
                    contains = true;
                }
            });

            return contains;
        };

        this.getAllUTXO = function () {
            var allUTXO = [];

            H.forEach(function (key, value) {
                allUTXO.push(value);
            });

            return allUTXO;
        };
	};

});