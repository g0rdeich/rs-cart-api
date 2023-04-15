import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	OneToMany,
	JoinColumn,
	Timestamp,
	OneToOne,
} from 'typeorm';

import { CartItem } from './cartItem.entity';
// import { OrderItem } from './order.entity';

export enum Carts_Statuses {
	OPEN = 'OPEN',
	ORDERED = 'ORDERED',
}

@Entity('carts')
export class Cart {
	// @OneToOne(() => OrderItem, orderItem => orderItem.cart_id)
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'uuid', nullable: false })
	user_id: string;

	@Column({ type: 'timestamp', nullable: false })
	created_at: Timestamp;

	@Column({ type: 'timestamp', nullable: false })
	updated_at: Timestamp;

	@Column({ type: 'enum', enum: Carts_Statuses })
	status: Carts_Statuses;

	@OneToMany(
		() => CartItem,
		cartItem => cartItem.cart_id,
		{
			cascade: true,
		},
	)
	@JoinColumn({ name: 'item_id', referencedColumnName: 'cart_id' })
	items: CartItem[];
}