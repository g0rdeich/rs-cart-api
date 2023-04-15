import {
	Column,
	PrimaryColumn,
	PrimaryGeneratedColumn,
	Entity,
	JoinColumn,
	ManyToOne
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem {
	@PrimaryGeneratedColumn('uuid')
	item_id: string;

	@ManyToOne(() => Cart, (cart) => cart.items)
	@JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
	cart_id: string;

	@PrimaryColumn({ type: 'uuid' })
	product_id: string;

	@Column({ type: 'integer' })
	count: number;
}