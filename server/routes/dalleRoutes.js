import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
});

router.route('/').get((req, res) => {
    res.send('Hello from DALL-E!');
})

router.route('/').post(async (req, res) => {
    try {
        const {prompt} = req.body;
        const aiResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: '1024x1024',
        });

        // Access the image URL from the response
        const imageUrl = aiResponse.data[0].url;

        console.log(imageUrl);

        return res.status(200).json({photo: imageUrl});
    } catch (error) {
        console.log(error);
        if (error.response) {
            res.status(500).send(error.response.data.error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
})

export default router;
