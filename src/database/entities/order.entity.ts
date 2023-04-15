import {
	Column,
	PrimaryGeneratedColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne
} from 'typeorm';
// import { Cart } from './cart.entity';

export enum Order_Statuses {
	IN_PROGRESS = 'IN_PROGRESS',
	CLOSED = 'CLOSED'
}

@Entity('orders')
export class Order {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'uuid' })
	user_id: string;

	@Column({ type: 'uuid' })
	cart_id: string;

	@Column({ type: 'json' })
	payment: {
		date: Date,
    	transactionId: string
	};

	@Column({ type: 'json' })
	delivery: {
		address: string
	};

	@Column({ type: 'text' })
	comments: string;

	@Column({ type: 'enum', enum: Order_Statuses })
	status: Order_Statuses;

	@Column({ type: 'integer' })
	total: number;

	// @OneToOne(() => Cart, (cart) => cart.items)
	// @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
	// cart: Cart;
}