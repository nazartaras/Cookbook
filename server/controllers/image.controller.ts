import { Router } from "express";
import { uploadFile } from '../services/image.service'

const router = Router();

router
    .post('/upload', (req, res, next) => {
        uploadFile(req)
            .then(path => res.send({ imageUrl: path }))
            .catch(e => {
                console.log(e.message);
                res.send({ message: e.message });
            });
    });
export default router;