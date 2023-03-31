import * as express from "express";
import Chirps from "../db/chirps";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const chirps = await Chirps.GetChirps();
        res.json(chirps);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong.", error });
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const [chirp] = await Chirps.GetChirp(id);
        res.json(chirp);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong.", error });
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const { content } = req.body;

        if (!content || typeof content !== "string" || content.length > 280) {
            return res.status(400).json({ message: "Sorry, chirps must be between 1 and 280 characters." });
        }

        const results = await Chirps.CreateChirp({ userid: 420420420, content });

        res.status(201).json({ message: "Successfully created chirp!" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
        console.log(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { content } = req.body;

        if (!content || typeof content !== "string" || content.length > 280) {
            return res.status(400).json({ message: "Sorry, chirps must be between 1 and 280 characters." });
        };

        await Chirps.UpdateChirp(id, { userid: 420420420, content });
        res.status(201).json({ message: "Updated successfully!" })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await Chirps.DeleteChirp(id);
        res.status(200).json({ message: "Successfully deleted chirp." });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
        console.log(error);
    }
});

export default router;