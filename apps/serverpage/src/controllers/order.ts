import { Request, Response } from "express";
import axios from "axios";
import prisma from "@repo/db/client"

interface PizzaOrder {
  pizzaId: string;
  quantity: number;
}

export const order = async (req: Request, res: Response) => {
  try {
    const orders: PizzaOrder[] = req.body;

    if (!orders || !Array.isArray(orders)) {
       res.status(400).json({ error: "Invalid order format", });
       return;
    }

    let totalPrice = 0;
    const orderDetails = [];

    for (const order of orders) {
      const response = await axios.get(`http://localhost:5000/api/v1/pizzas/${order.pizzaId}`);
      const pizza = response.data;

      if (!pizza) {
         res.status(404).json({ error: `Pizza with ID ${order.pizzaId} not found` });
         return;
      }

      const itemTotal = pizza.pizza_price * order.quantity;
      totalPrice += itemTotal;

      orderDetails.push({
        pizzaName: pizza.pizza_name,
        quantity: order.quantity,
        pricePerUnit: pizza.pizza_price,
        pizzaTag: pizza.pizza_tag,
        totalPrice
      });
    }

    const userId = (req as any).user.uid;
        const user = await prisma.user.findMany({
      where : {
        firbaseUid : userId
      },
      select : {
        email: true
      }
    })

    { /*const newOrder = await prisma.order.create({
      data: {
        userId: user.id,
        totalPrice: totalPrice,
        orderDetails: {
          create: orderDetails.map(order => ({
            pizzaName: order.pizzaName,
            quantity: order.quantity,
            pricePerUnit: order.pricePerUnit,
            pizzaTag: order.pizzaTag,
            itemTotal: order.itemTotal
          }))
        }
      }
    });*/}

    res.status(200).json({
      user,
      success: true,
      orderDetails,
      totalPrice
    });

    return;

  } catch (error) {
     res.status(500).json({ error: "one of your any order is not available" });
     return;
  }
};