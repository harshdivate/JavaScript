class Wallet {
    #balance = 0;
    #transactions = [];
    constructor(){
        this.#balance = 0;
        this.#transactions = []
    }


    deposit(amount){
        this.#processDeposit(amount)
        this.#balance +=amount;
    }

    withdraw(amount ){
        this.#processWithdraw(amount);
        this.#balance-=amount;
    }

    get balance(){
        return this.#balance;
    }

    #processDeposit(amount){
        console.log(`Depositing ${amount}`);
        this.#transactions.push({
            type : 'Deposit',
            amount
        });
    }

    #processWithdraw(amount){
        console.log(`Withdraw ${amount}`);
        this.#transactions.push({
            type : 'Withdraw',
            amount
        });
    }

    get transactions(){
        return this.#transactions;
    }
}

const w = new Wallet();
w.deposit(1000);
w.withdraw(300);
console.log(w.balance);