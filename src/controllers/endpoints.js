import model from '../db/models';
import { dataUri } from '../middleware/multer';
import { uploader } from '../db/config/cloudinaryConfig';

const { Endpoint } = model;

class EndpointsManager {

    static async viewApplication(req, res) {
        try {
            const application = await Application.findOne({ where: { id: req.body.id } });
            if (application) {
                return res.status(200).json({
                    application: application
                });
            }
            return res.status(404).json({
                message: 'Application does not exist'
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }

    }


    static async updateApplication(req, res) {
        try {
            if (req.file) {
                const file = dataUri(req).content;
                const result = await uploader.upload(file);
                req.body.profile = result.url;
            }
            console.log('\n\n\n\n\n\n', req.body.profile)
            // const data = await User.findOne({ where: { username: req.params.username } });
            // console.log('\n\n\n\n\n\n', req.body.profile)
            // const updated = await data.update({
            //   firstname: req.body.firstname || data.dataValues.firstname,
            //   lastname: req.body.lastname || data.lastname,
            //   email: req.body.email || data.email,
            //   username: req.body.username || data.username,
            //   profile: req.body.profile || data.dataValues.profile
            // });
            // updated.password = undefined;
            // return res.status(200).json({
            //   user: updated
            // });
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }


    static async getAllEndpoints(req, res) {
        try {
            const findEndpoints = await Endpoint.findAll();
            if (findEndpoints) {
                return res.status(200).json({ total: findEndpoints.length, Endpoints: findEndpoints });
            }
            return res.status(400).json({ message: "No Endpoint Found" });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    static async addEndpoint(req, res) {
        const { name, description, url, type, query, body, success, failure } = req.body

        try {
            const findEndpoint = await Endpoint.findOne({
                where: { url }
            });
            if (findEndpoint) {
                return res.status(400).json({
                    message: 'endpoint already exists.'
                });
            }
            await Endpoint
                .create({
                    name,
                    description,
                    url,
                    type,
                    query,
                    body,
                    success,
                    failure
                })
            return res.status(201).send({ message: 'Endpoint successfully created', name, description, url, type, query, body, success, failure });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: error.message
            });
        }
    }

}

export default EndpointsManager;