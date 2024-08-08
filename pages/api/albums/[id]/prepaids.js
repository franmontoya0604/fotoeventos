import { PrismaClient } from "@prisma/client";
import { customAlphabet } from "nanoid";
import { getServerSession } from "next-auth/next";
import nc from "next-connect";
import { authOptions } from "../../auth/[...nextauth]";
// const { PrismaClient } = require('@prisma/client');
const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXY", 5);
const prisma = new PrismaClient();

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .get(async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    // TODO agregar verificacion de que sea admin o fotografo
    if (!session) {
      res.status(401);
      res.end();
    }
    const { id } = req.query;
    // TODO necesitamos chequear que el album le pertenece al usuario logueado
    const prepaids = await prisma.Prepaid.findMany({
      where: {
        albumid: parseInt(id),
        album: {
          is: {
            ownerId: session.user.id,
          },
        },
      },
      include: {
        tags: true,
      },
    });
    // TODO formatear fechas en modo dd-mm-yyyy
    res.json(prepaids);
  })
  .post(async (req, res) => {
    
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401);
      res.end();
    }

     const tag = await prisma.Tags.findFirst({
        where: {
            tag: req.body.tagid,
          
        },
       
    });

    if(tag === null){const response = await prisma.tags.create({
          data: {
            albumid: Number(req.query.id),
            tag: req.body.tagid,
             userid: null,
             phone:req.body.phone,
             email:req.body.email,
          },
        })
        req.body.tagid=response.id}else{req.body.tagid=tag.id
        ;}
    
    //TODO cambiar datos del bucket fijos ,con los datos del bucket de cada usuario //cada usuario va a tener su bucket con todos su album
    const prepaid = await prisma.Prepaid.create({
      data: {
        userid: null,
        albumid: Number(req.query.id),
        voucher: nanoid(5),
        ...req.body,
      },
    });

    res.json({ created: true, prepaid });
  })
 .patch(async (req, res) => { 
      const {firstname,lastname,email,phone} = req.body;
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.email(401);
      res.end();
    }
 
    const prepaid = await prisma.prepaid.update({
      where:{id:req.body.id},
      data: {
        firstname,
        lastname,
        email,
        phone
       
      },
    });
    res.json({ edited: true,prepaid});})
 .delete(async (req, res) => { 
 
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401);
      res.end();
    }
  
    const prepaid = await prisma.Prepaid.delete({
      where:{id:req.body.id},
      
    });
    res.json({ deleted: true,prepaid});})

export default handler;
