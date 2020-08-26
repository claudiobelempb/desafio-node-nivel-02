import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private _transactions: Transaction[];

  constructor() {
    this._transactions = [];
  }

  public all(): Transaction[] {
    return this._transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    this._transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        balance.income += transaction.value;
        balance.total += transaction.value;
      } else {
        balance.outcome += transaction.value;
        balance.total -= transaction.value;
      }
    });

    return balance;
  }

  public create({title, type, value}: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this._transactions.push(transaction);

    return transaction;
  }

}

export default TransactionsRepository;
