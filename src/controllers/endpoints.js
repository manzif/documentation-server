import model from '../db/models';

const { Endpoint } = model;

class EndpointsManager {

    static async viewEndpoint(req, res) {
        try {
            const endpoint = await Endpoint.findOne({ where: { id: req.params.id } });
            if (endpoint) {
                return res.status(200).json({
                    message: 'Endpoint retrieved successfuly',
                    endpoint: endpoint
                });
            }
            return res.status(404).json({
                message: 'Endpoint does not exist'
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }

    }


    static async updateEndpoint(req, res) {
        try {
            const data = await Endpoint.findOne({ where: { id: req.params.id } });
            const updated = await data.update({
              name: req.body.name || data.dataValues.name,
              description: req.body.description || data.dataValues.description,
              url: req.body.url || data.dataValues.url,
              type: req.body.type || data.dataValues.type,
              headers: req.body.headers,
              query: req.body.query,
              body: req.body.body,
              success: req.body.success,
              failure: req.body.failure
            });
            return res.status(200).json({
              message: 'Endpoint successfuly updated',  
              Endpoint: updated
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }


    static async getAllEndpoints(req, res) {
        try {
            const findEndpoints = await Endpoint.findAll({ where: { applicationId: req.params.applicationId }});
            if (findEndpoints) {
                return res.status(200).json({ total: findEndpoints.length, Endpoints: findEndpoints });
            }
            return res.status(400).json({ message: "No Endpoint Found" });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    static async addEndpoint(req, res) {
        const { name, description, url, type, headers, query, body, bodyDescription, success, successDescription, failure, failureDescription } = req.body
        const { applicationId } =  req.params

        try {
            const findEndpoint = await Endpoint.findOne({
                where: { url }
            });
            if (findEndpoint && findEndpoint.dataValues.url === url && findEndpoint.dataValues.type === type && findEndpoint.dataValues.applicationId === applicationId) {
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
                    headers,
                    query,
                    body,
                    bodyDescription,
                    success,
                    successDescription,
                    failure,
                    failureDescription,
                    applicationId
                })
            return res.status(201).send({ message: 'Endpoint successfully created', name, description, url, type, headers, query, body, bodyDescription, success, successDescription, failure, failureDescription, applicationId });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: error.message
            });
        }
    }

    static async deleteEndpoint(req, res) {
            try {
                const id = req.params.id
                const endpoint = await Endpoint.findOne({ where: { id } });
                if (endpoint) {
                    await Endpoint.destroy({ where: { id } })
                    return res.status(200).json({
                        message: 'Endpoint deleted successfuly'
                    });
                }
                return res.status(404).json({
                    message: 'Endpoint does not exist'
                });
            } catch (error) {
                return res.status(400).json({
                    message: error.message
                });
            }
    }

}

export default EndpointsManager;