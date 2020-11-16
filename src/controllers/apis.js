import model from '../db/models';

const { Api } = model;

class ApiManager {

    static async viewApi(req, res) {
        try {
            const api = await Api.findOne({ where: { id: req.params.id } });
            if (api) {
                return res.status(200).json({
                    message: 'Api retrieved successfuly',
                    Api: api
                });
            }
            return res.status(404).json({
                message: 'Api does not exist'
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }

    }


    static async updateApi(req, res) {
        try {
            const data = await Api.findOne({ where: { id: req.params.id } });
            const updated = await data.update({
              name: req.body.name || data.dataValues.name,
              description: req.body.description || data.dataValues.description,
              url: req.body.url || data.dataValues.url,
              type: req.body.type || data.dataValues.type,
              headers: req.body.headers,
              query: req.body.query,
              body: req.body.body,
              bodyDescription: req.body.bodyDescription,
              success: req.body.success,
              successDescription: req.body.successDescription,
              failure: req.body.failure,
              failureDescription: req.body.failureDescription
            });
            return res.status(200).json({
              message: 'Api successfuly updated',  
              Api: updated
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }


    static async getAllApis(req, res) {
        try {
            const findApis = await Api.findAll();
            if (findApis) {
                return res.status(200).json({ total: findApis.length, Apis: findApis });
            }
            return res.status(400).json({ message: "No Api Found" });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    static async addApi(req, res) {
        const { name, description, url, type, headers, query, body, bodyDescription, success, successDescription, failure, failureDescription } = req.body

        try {
            const findApi = await Api.findOne({
                where: { url }
            });
            if (findApi && findApi.dataValues.url === url && findApi.dataValues.type === type) {
                return res.status(400).json({
                    message: 'Api already exists.'
                });
            }
            await Api
                .create({
                    name,
                    description,
                    url,
                    type,
                    headers,
                    query,
                    body,
                    bodyDescription,
                    success,
                    successDescription,
                    failure,
                    failureDescription
                })
            return res.status(201).send({ message: 'Api successfully created', name, description, url, type, headers, query, body, bodyDescription, success, successDescription, failure, failureDescription });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: error.message
            });
        }
    }

    static async deleteApi(req, res) {
            try {
                const id = req.params.id
                const api = await Api.findOne({ where: { id } });
                if (api) {
                    await Api.destroy({ where: { id } })
                    return res.status(200).json({
                        message: 'Api deleted successfuly'
                    });
                }
                return res.status(404).json({
                    message: 'Api does not exist'
                });
            } catch (error) {
                return res.status(400).json({
                    message: error.message
                });
            }
    }

}

export default ApiManager;