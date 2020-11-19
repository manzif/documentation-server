import model from '../db/models';
import Helper from '../helper/helper';

const { Application } = model;

class ApplicationManager {

    static async viewApplication(req, res) {
        try {
            const application = await Application.findOne({ where: { id: req.params.id } });
            if (application) {
                return res.status(200).json({
                    Application: application
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
            const data = await Application.findOne({ where: { id: req.params.id } });
            const header = req.headers['authorization'];
            const bearer = header.split(' ');
            const token = bearer[1];
            req.token = token;

            const { id, role } = await Helper.verifyToken(token);

            if (id === data.dataValues.userId || role === 'admin' ) {
                const updated = await data.update({
                title: req.body.title || data.dataValues.title,
                description: req.body.description || data.dataValues.description
                });
                return res.status(200).json({
                message: 'Application updated successfuly'  ,
                Application: updated
                });
            }
            return res.status(403).json({
                message: 'You are not allowed to access this route.'
            });
        } catch (error) {
          if (error.message === "Cannot read property 'split' of undefined") {
            return res.status(400).json({
             message: 'Please login'
          });
        } else {
                return res.status(400).json({
                message: error.message
                });
            }
        }
    }


    static async getAllApplications(req, res) {
        try {
            const header = req.headers['authorization'];
            const bearer = header.split(' ');
            const token = bearer[1];
            req.token = token;
            const { id, role, assignedItems } = await Helper.verifyToken(token);
            if (role === 'developer') {
                const findApplications = await Application.findAll({ where: { userId: id }});
                if (findApplications) {
                    return res.status(200).json({ total: findApplications.length, Applications: findApplications });
                }
                return res.status(400).json({ message: "No Application Found" });
            } else if (role === 'admin') {
                const findApplications = await Application.findAll();
                if (findApplications) {
                    return res.status(200).json({ total: findApplications.length, Applications: findApplications });
                }
                return res.status(400).json({ message: "No Application Found" });
            } else if(role === 'guest') {
                const findApplications = await Application.findAll();
                let receivedApplications= []
                const sweeterArray = findApplications.map(sweetItem => {
                    return sweetItem.dataValues
                })
                let bigCities = [];
                var arrayLength = assignedItems.length;
                for (let i = 0; i < arrayLength; i++) {
                    let assignedApplications =  sweeterArray.filter(x => x.id == assignedItems[i]);
                    bigCities.push(assignedApplications);
                }
                
                for(let i = 0; i < bigCities.length; i++) {
                    let bigCity = bigCities[i];
                    for(var j = 0; j < bigCity.length; j++) {
                        let bigCit = bigCity[j];
                        receivedApplications.push(bigCit)
                    }
                }
                return res.status(200).json({ total: receivedApplications.length, Applications: receivedApplications })
            }
        } catch (error) {
          if (error.message === "Cannot read property 'split' of undefined") {
            return res.status(400).json({
             message: 'Please login'
          });
       } else {
        return res.status(400).json({
          message: error.message
        });
      }
     }
    }

    static async addApplication(req, res) {
        const header = req.headers['authorization'];
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        const { id, firstname, lastname } = await Helper.verifyToken(token);
        const { title, description } = req.body

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
                    userId: id,
                    userName: firstname + " " + lastname
                })
            return res.status(201).send({ message: 'Application successfully created', title, description, userId: id, userName:  firstname + " " + lastname });
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