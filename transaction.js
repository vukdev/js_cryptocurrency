/* global define */
define(['hashcode'], function (hashCode) {
	'use strict';

	return function Transaction(tx) {

		this.Input = function (prevHash, index) {
            /** the signature produced to check validity */
            this.signature  = null;

            /** hash of the Transaction whose output is being used */
            if (prevHash === null) {
                this.prevTxHash = null;
            } else {
                this.prevTxHash = prevHash.slice(0, prevHash.length);
            }
            /** used output's index in the previous transaction */
            this.outputIndex = index;

            this.addSignature = function(sig) {
                if (sig === null) {
                    this.signature  = null;
                } else {
                    this.signature  = sig.slice(0, sig.length);
                }
            };
		};

		this.Output = function (v, addr) {
            /** value in bitcoins of the output */
			this.value = v;
            /** the address or public key of the recipient */
			this.address = addr;
		};

		var byte;
        var inputs;
        var outputs;

		// Transaction "constructor"

		if (tx === null) {
            inputs = [];
            outputs = [];
		} else if (tx instanceof Transaction) {
			// clone arrays
		}


	};
});