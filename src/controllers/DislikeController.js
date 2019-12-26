/* eslint-disable no-underscore-dangle */
import Dev from '../models/Dev';

class DislikeController {
    async store(req, res) {
        const { devId } = req.params;
        const { user } = req.headers;

        const targetDev = await Dev.findById(devId);
        const loggedDev = await Dev.findById(user);

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev does not exists' });
        }

        loggedDev.dislikes.push(targetDev._id);
        await loggedDev.save();

        return res.json(loggedDev);
    }
}
export default new DislikeController();
