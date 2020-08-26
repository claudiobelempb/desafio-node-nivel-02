import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private _transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this._transactionsRepository = transactionsRepository;
  }

  public execute({title, type, value}: Request): Transaction {

    if (type === 'outcome') {
      const balance = this._transactionsRepository.getBalance();
      if (balance.total < value) {
        throw Error('Você não tem saldo suficiente');
      }
    }

    const transaction = this._transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
