import express, {Request, Response} from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const storage = multer.memoryStorage();

const router = express.Router();

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 5 * 1024 * 1024 
    }
})

router.post("/",
    verifyToken, [
        body("name").notEmpty().withMessage("Требуется указать имя"),
        body("city").notEmpty().withMessage("Требуется указать город"),
        body("country").notEmpty().withMessage("Требуется указать страну"),
        body("description").notEmpty().withMessage("Требуется описание"),
        body("type").notEmpty().withMessage("Требуется указать тип отеля"),
        body("pricePerNight")
          .notEmpty()
          .isNumeric()
          .withMessage("Указана обязательная цена за ночь, и в ней должно быть указано количество"),
        body("facilities")
          .notEmpty()
          .isArray()
          .withMessage("Требуются дополнительные удобства"),
    ],
    upload.array("imageFiles", 6), async (req: Request, res: Response)=> {
    try{
        const imageFiles = req.files as Express.Multer.File[]

        const newHotel: HotelType = req.body;
       

        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        })

        const imageUrls = await Promise.all(uploadPromises);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        const hotel = new Hotel(newHotel)
        await hotel.save();

        res.status(201).send(hotel);
    }catch (e){
        console.log("Error creating hotel: ", e);
        res.status(500).json({message: "Что-то пошло не так"})
    }
});
export default router;