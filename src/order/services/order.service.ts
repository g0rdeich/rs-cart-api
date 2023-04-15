import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Order, Order_Statuses } from '../../database/entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>
  ) {}
  // private orders: Record<string, Order> = {}

  // findById(orderId: string): Order {
  //   return this.orders[ orderId ];
  // }

  async create(data: Record<string, any>): Promise<Order> {
    const id = v4(v4());

    const mockPayment = {
      date: new Date(),
      transactionId: v4(v4())
    };
    const mockDelivery = {
      address: 'mock address'
    };
    const mockComments = 'mock comments';

    const createdOrder = this.orderRepository.create({
      id,
      user_id: data.userId,
      cart_id: data.cartId,
      payment: mockPayment,
      delivery: mockDelivery,
      comments: mockComments,
      status: Order_Statuses.IN_PROGRESS,
      total: 1
    });

    await this.orderRepository.save(createdOrder);

    return createdOrder;
  }

  // update(orderId, data) {
  //   const order = this.findById(orderId);

  //   if (!order) {
  //     throw new Error('Order does not exist.');
  //   }

  //   this.orders[ orderId ] = {
  //     ...data,
  //     id: orderId,
  //   }
  // }
}
