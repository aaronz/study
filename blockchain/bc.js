const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mine(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log('blocked mined: ', this.hash);
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(Date.parse('2018-01-01'), [], '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mine(this.difficulty);
        console.log('block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const t of block.transactions) {
                if (t.fromAddress === address) {
                    balance -= t.amount;
                }

                if (t.toAddress === address) {
                    balance += t.amount;
                }
            }
        }
        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const previous = this.chain[i - 1];
            if (current.hash !== current.calculateHash()) {
                return false;
            }
            if (current.previousHash !== previous.hash) {
                return false;
            }
        }
        return true;
    }
}

let chain = new BlockChain();
chain.createTransaction(new Transaction('address1', 'address2', 100));
chain.createTransaction(new Transaction('address2', 'address1', 50));

console.log('start miner..');
chain.minePendingTransactions('aaron');

console.log('balance of aaron is', chain.getBalanceOfAddress('aaron'));

console.log('start miner again..');
chain.minePendingTransactions('aaron');

console.log('balance of aaron is', chain.getBalanceOfAddress('aaron'));