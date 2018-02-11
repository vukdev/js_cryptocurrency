/*
Treba da se implementira primanje transakcija i kreiranje ledgera.
Scrooge prima transakcije (od koga => treba implementrirati kreiranje i prosledivanje transakcija )  proverava ih i objavljuje listu transakcija.
Pretpostavka: napravimo dva usera koji kreiraju transakcije, tj. u nekim vremensksim intervalima pozovu fju da se napravi transakcija. Takodje scrooge je treci user koji pravi transakcije gde dodeljuje novac. 

klasa Transaction: 
Klasa Transaction.Output: 
*/


function Output(val, addr) {
	// iznos koji se placa
	this.value = val;
	// type PublicKey
	// pk kome se placa
	this.address = addr;
}
/*
Klasa Transaction.Input:
*/
function Input(prevHash, index) {
    var that = this;
    this.signature = null;

    // prevHash pokazuje na prethodnu transakciju od koje poticu coin-i, koja 
    // sadrzi output odakle poticu coin-i
    // index je index outputa u toj prethodnoj transakciji
    // kada kaze transakcija da li misli na blok trans???
    if (prevHash == null) {
        this.prevTxHash = null;
    } else {
        this.prevTxHash = prevHash.slice(0, prevHash.length);
    }
    this.outputIndex = index;

    // Ubacivanje signature. Moze da se ne ubaci al nece biti validna transakcija
    this.addSignature = function(sig) {
        if (sig == null) {
            that.signature  = null;
        } else {
            that.signature  = sig.slice(0, sig.length);
        }
    }
}

// Izgleda da ce oni da prave public i secret key, bar su tako planirali
// Moze se ubaciti klasa koja ce to da radi

fja: getRawDataToSign(int index)
// pakuje podatke na odredjeni nacin i vraca to
Input in = inputs.get(index); //(bez potpisa)
	in.prevTxHash
	in.outputIndex
	for (Output op : outputs) { // all outputs
		op.value
		op.address

fja: public void addSignature(byte[] signature, int index)
// dodaje potpis na taj input

fja:  public byte[] getRawTx() 
// pakuje sve inpute(ukljucujuci potpise) i outpute na podatke na odredjeni nacin i vraca to
// prvo spakuje sve inpute ukljucujuci i signature u getRawTx
	in.prevTxHash
	in.outputIndex
	in.signature
// onda spakuje sve oupute

fja: public void finalize()
// izgeda kao da napravi hash od svih podataka i smesti u hash promenljivu

// ostalo geteri i seteri

// Unspent Transaction Output
public class UTXO implements Comparable<UTXO>
/** Hash of the transaction from which this UTXO originates */
private byte[] txHash;
/** Index of the corresponding output in said transaction */
private int index;



















