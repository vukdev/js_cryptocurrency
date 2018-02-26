import java.security.PublicKey;
import java.util.ArrayList;

public class TxHandler {

	private UTXOPool pool;
    /**
     * Creates a public ledger whose current UTXOPool (collection of unspent transaction outputs) is
     * {@code utxoPool}. This should make a copy of utxoPool by using the UTXOPool(UTXOPool uPool)
     * constructor.
     */
    public TxHandler(UTXOPool utxoPool) {
        this.pool = new UTXOPool(utxoPool);
    }

    /**
     * @return true if:
     * (1) all outputs claimed by {@code tx} are in the current UTXO pool, 
     * (2) the signatures on each input of {@code tx} are valid, 
     * (3) no UTXO is claimed multiple times by {@code tx},
     * (4) all of {@code tx}s output values are non-negative, and
     * (5) the sum of {@code tx}s input values is greater than or equal to the sum of its output
     *     values; and false otherwise.
     */
    public boolean isValidTx(Transaction tx) {
    	int index = 0;
    	double inputSum = 0;
    	double outputSum = 0;
    	ArrayList<UTXO> usedUTXOs = new ArrayList<>();

    	if (tx == null) {
    		return false;
    	}

    	for (Transaction.Input input : tx.getInputs()) {
    		index++;
    		if (input == null) {
    			continue;
    		}

    		UTXO utxo = new UTXO(input.prevTxHash, input.outputIndex);

    		if (!this.pool.contains(utxo)) {
    			return false;
    		}

    		PublicKey pubKey = this.pool.getTxOutput(utxo).address;
    		byte[] message = tx.getRawDataToSign(index - 1);
    		byte[] signature = input.signature;
    		
    		if (!Crypto.verifySignature(pubKey, message, signature)) {
    			return false;
    		}
    		
    		if (usedUTXOs.contains(utxo)) {
    			return false;
    		}
    		
    		inputSum += this.pool.getTxOutput(utxo).value;
    		
    		usedUTXOs.add(utxo);
    	}
    	
    	for (Transaction.Output output : tx.getOutputs()) {
    		if (output.value < 0) {
    			return false;
    		}
    		
    		outputSum += output.value;
    		
    		if (outputSum > inputSum) {
    			return false;
    		}
    	}
    	
    	return true;
    }

    /**
     * Handles each epoch by receiving an unordered array of proposed transactions, checking each
     * transaction for correctness, returning a mutually valid array of accepted transactions, and
     * updating the current UTXO pool as appropriate.
     */
    public Transaction[] handleTxs(Transaction[] possibleTxs) {
    	if (possibleTxs == null) {
    		return new Transaction[0];
    	}
    	
        ArrayList<Transaction> validTxs = new ArrayList<>();
    	
    	for (Transaction possibleTx : possibleTxs) {
    		if (!this.isValidTx(possibleTx)) {
    			continue;
    		}
    		
    		validTxs.add(possibleTx);
    		this.updateUTXOPool(possibleTx);
    	}
    	
    	return validTxs.toArray(new Transaction[validTxs.size()]);
    }
    
    private boolean updateUTXOPool(Transaction tx) {
    	for (Transaction.Input input : tx.getInputs()) {
    		if (input == null) {
    			continue;
    		}
    		
    		UTXO utxo = new UTXO(input.prevTxHash, input.outputIndex);
    		this.pool.removeUTXO(utxo);
    	}

    	int index = 0;
    	tx.finalize();
		byte[] txHash = tx.getHash();
		
    	for (Transaction.Output output : tx.getOutputs()) {
    		this.pool.addUTXO(new UTXO(txHash, index), output);
    		index++;
    	}

    	return true;
    }
}
