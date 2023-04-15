import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, Carts_Statuses } from '../../database/entities/cart.entity';
import { CartItem } from '../../database/entities/cartItem.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem) private readonly cartItemsRepository: Repository<CartItem>,
  ) {}

  async findByUserId(userId: string): Promise<Cart | undefined> { 
    const res =  await this.cartRepository.findOne({
      where: {
        user_id: userId,
        status: Carts_Statuses.OPEN
      },
      relations: ['items']
    })
    return res;
  }

  async createByUserId(userId: string) {
    const id = v4(v4());

    const createdCart = this.cartRepository.create({
      id,
      user_id: userId,
      status: Carts_Statuses.OPEN
    });

    await this.cartRepository.save(createdCart);

    return createdCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    // console.log('userId from findOrCreateByUserId: ', userId);
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    const createdCart = await this.createByUserId(userId);
    return createdCart;
  }

  async updateByUserId(userId: string, item: CartItem): Promise<void> {
    const cart = await this.findOrCreateByUserId(userId);
    const item_id = v4(v4());
    const newDbItem = await this.cartItemsRepository.create({
      item_id,
      cart_id: cart.id,
      product_id: item.product_id,
      count: item.count
    });

    this.cartItemsRepository.save(newDbItem);

    return;
  }

  async removeByUserId(userId): Promise<void> {
    const cart = await this.findByUserId(userId);

    await this.cartItemsRepository.delete({
      cart_id: cart.id
    });

    await this.cartRepository.delete({
      id: cart.id
    })

    return;
  }

  async setCartStatus(cartId: string, newStatus: Carts_Statuses) {
    await this.cartRepository.update({
      id: cartId
    }, {
      status: newStatus,
      updated_at: new Date()
    });
  }
}
