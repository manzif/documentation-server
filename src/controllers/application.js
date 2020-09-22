import model from '../db/models';
import { dataUri } from '../middleware/multer';
import { uploader } from '../db/config/cloudinaryConfig';

const { Application } = model;

class ApplicationManager {

    static async viewApplication(req, res) {
        try {
            const application = await Application.findOne({ where: { id: req.params.id } });
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


    static async getAllApplications(req, res) {
        try {
            const findApplications = await Application.findAll();
            if (findApplications) {
                return res.status(200).json({ total: findApplications.length, applications: findApplications });
            }
            return res.status(400).json({ message: "No Application Found" });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    static async addApplication(req, res) {
        const { title, description, userId, userName } = req.body

        try {
            const findApplication = await Application.findOne({
                where: { title }
            });
            if (findApplication) {
                return res.status(400).json({
                    message: 'Application already exists.'
                });
            }
            await Application
                .create({
                    title,
                    description,
                    userId,
                    userName
                })
            return res.status(201).send({ message: 'Application successfully created', title, description, userId, userName });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error,
            });
        }
    }

    static async deleteApplication(req, res) {
            try {
                const id = req.params.id
                const application = await Application.findOne({ where: { id } });
                if (application) {
                    await Application.destroy({ where: { id } })
                    return res.status(200).json({
                        message: 'Application deleted successfuly'
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

}

export default ApplicationManager;