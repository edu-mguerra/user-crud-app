import express, { Router } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const router = Router()



router.post('/users', async (req, res) => {
  const { name, age, email } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      age,
      email
    }
  });

  res.status(201).json(user);
});



router.get('/users', async (req, res) => {

  const result = await prisma.user.findMany()

  res.status(200).json({ Usuarios: result })
})


router.put('/users/:email', async (req, res) => {


  await prisma.user.update({
    where: {
      email: 'edduansbbs@gmail.com'
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    }
  })

  res.status(201).json(req.body)
})


router.delete('/users/:id', async (req, res) => {
  const { id } = req.params; // pega o id da URL

  await prisma.user.delete({
    where: {
      id: id
    }
  });

  res.status(200).json({ message: 'Usuário deletado com sucesso' });
});



