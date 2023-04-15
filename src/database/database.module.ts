import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cartItem.entity';
import { Order } from './entities/order.entity';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: +process.env.DB_PORT,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: ['dist/database/entities/*.entity{.ts,.js}'],
			/**
			 * Flag to show all generated sql queries on each interaction with DB.
			 * Should be omitted for production production.
			 */
			logging: true,
			connectTimeoutMS: 5000
			/**
			 * This naming strategy will map field_name from database to fieldName inside application.
			 */
			//   namingStrategy: new SnakeNamingStrategy(),
		}),
		TypeOrmModule.forFeature([Cart, CartItem, Order]),
	],
	exports: [TypeOrmModule],
})
export class DatabaseModule { }