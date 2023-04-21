const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser')

const Hero = require('../models/Hero');
const About = require('../models/About');
const Education = require('../models/Education');
const Certification = require('../models/Certification');
const Volunteer = require('../models/Volunteer');
const Skill = require('../models/Skill');
const Course = require('../models/Course');
const Project = require('../models/Project');
const Award = require('../models/Award');


//********************************Hero*****************************************************

// Route: 1 add About using : POST "/api/details/addabout. Require login
router.post('/addhero', fetchuser, [
    // express validetor package used for validations
    body('image', 'Image not selected').isLength({ min: 5 }),
    body('line1', 'line1 must be at least 5 characters').isLength({ min: 5 }),
    body('line2', 'line2 must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { image, line1, line2 } = req.body;

        //check for errors from express validetor
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const details = new Hero({ image, line1, line2, user: req.user.id })
        const savedDetails = await details.save();
        res.json(savedDetails)

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }

})

// Route: 2 get all hero details using : GET "/api/notes/gethero. changed from Require login to not require login
router.get('/gethero', async (req, res) => {

    try {
        const details = await Hero.find({ req })
        res.json(details);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

// Route: 3 update an existing hero details using : POST "/api/auth/updatehero. Require login
router.put('/updatehero/:id', fetchuser, async (req, res) => {

    const { image, line1, line2 } = req.body;


    try {

        const newDescription = {};

        if (image) {
            newDescription.image = image;
        }
        if (line1) {
            newDescription.line1 = line1;
        }
        if (line2) {
            newDescription.line2 = line2;
        }

        // find the note to be updated and update it
        var details = await Hero.findById(req.params.id);
        if (!details) {
            return res.status(404).send("Not Found");
        }

        //allow deletion only if user is owner of this note
        // if (details.user.toString() !== req.user.id) {
        //     return res.status(401).send("Not Allowed");
        // }

        details = await Hero.findByIdAndUpdate(req.params.id, { $set: newDescription }, { new: true })
        res.json({ details });

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }
})

//********************************About*****************************************************

// Route: 1 add About using : POST "/api/details/addabout. Require login
router.post('/addabout', fetchuser, [
    // express validetor package used for validations
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { description } = req.body;

        //check for errors from express validetor
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const details = new About({ description, user: req.user.id })
        const savedDetails = await details.save();
        res.json(savedDetails)

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }

})

// Route: 2 get all about details using : GET "/api/notes/getallaboutdetails. changed from Require login to not require login
router.get('/getaboutdetails', async (req, res) => {

    try {
        const details = await About.find({ req })
        res.json(details);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

// Route: 3 update an existing about details using : POST "/api/auth/updateaboutdetails. Require login
router.put('/updateaboutdetails/:id', fetchuser, async (req, res) => {

    const { description } = req.body;


    try {

        const newDescription = {};

        if (description) {
            newDescription.description = description;
        }

        // find the note to be updated and update it
        var details = await About.findById(req.params.id);
        if (!details) {
            return res.status(404).send("Note Found");
        }

        //allow deletion only if user is owner of this note
        if (details.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        details = await About.findByIdAndUpdate(req.params.id, { $set: newDescription }, { new: true })
        res.json({ details });

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }
})


//********************************Education*****************************************************

// Route: 4 add Education using : POST "/api/details/addeducation. Require login
router.post('/addeducation', fetchuser, [
    // express validetor package used for validations
    body('image', 'Image not selected').isLength({ min: 5 }),
    body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
    body('subtitle', 'Subtitle must be at least 3 characters').isLength({ min: 3 }),
    body('date', 'Date must be at least 3 characters').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { image, title, subtitle, date, description } = req.body;

        //check for errors from express validetor
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const details = new Education({ image, title, subtitle, date, description, user: req.user.id })
        const savedDetails = await details.save();
        res.json(savedDetails)

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }

})

// Route: 5 get all education details using : GET "/api/details/getalleducationdetails. changed from Require login to not require login
router.get('/geteducationdetails', async (req, res) => {

    try {
        const details = await Education.find({ req })
        res.json(details);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

// Route: 6 update an education using : POST "/api/auth/updateeducation. Require login
router.put('/updateeducationdetails/:id', fetchuser, async (req, res) => {

    const { image, title, subtitle, date, description } = req.body;


    try {

        const newDetails = {};

        if (image) {
            newDetails.image = image;
        }
        if (title) {
            newDetails.title = title;
        }
        if (subtitle) {
            newDetails.subtitle = subtitle;
        }
        if (date) {
            newDetails.date = date;
        }
        if (description) {
            newDetails.description = description;
        }

        // find the note to be updated and update it
        var details = await Education.findById(req.params.id);
        if (!details) {
            return res.status(404).send("Note Found");
        }

        //allow deletion only if user is owner of this note
        if (details.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        details = await Education.findByIdAndUpdate(req.params.id, { $set: newDetails }, { new: true })
        res.json(details);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }
})

// Route: 7 delete an education using : POST "/api/auth/deleteeducation. Require login
router.delete('/deleteeducation/:id', fetchuser, async (req, res) => {

    try {

        // find the note to be deleted and delete it
        var details = await Education.findById(req.params.id);
        if (!details) {
            return res.status(404).send("Note Found");
        }

        //allow deletion only if user is owner of this note
        if (details.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        details = await Education.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", details: details });

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }
})


//********************************Certification*****************************************************

// Route: 8 add Certification using : POST "/api/details/addcertification. Require login
router.post('/addcertification', fetchuser, [
    // express validetor package used for validations
    body('image', 'Image not selected').isLength({ min: 5 }),
    body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
    body('subtitle', 'Subtitle must be at least 3 characters').isLength({ min: 3 }),
    body('date', 'Date must be at least 3 characters').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { image, title, subtitle, date, description } = req.body;

        //check for errors from express validetor
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const details = new Certification({ image, title, subtitle, date, description, user: req.user.id })
        const savedDetails = await details.save();
        res.json(savedDetails)

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }

})

// Route: 9 get all Certification details using : GET "/api/details/getallcertificationdetails. changed from Require login to not require login
router.get('/getallcertificationdetails', async (req, res) => {

    try {
        const details = await Certification.find({ req })
        res.json(details);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

// Route: 10 update an Certification using : POST "/api/auth/updatecertification. Require login
router.put('/updatecertification/:id', fetchuser, async (req, res) => {

    const { image, title, subtitle, date, description } = req.body;


    try {

        const newDetails = {};

        if (image) {
            newDetails.image = image;
        }
        if (title) {
            newDetails.title = title;
        }
        if (subtitle) {
            newDetails.subtitle = subtitle;
        }
        if (date) {
            newDetails.date = date;
        }
        if (description) {
            newDetails.description = description;
        }

        // find the note to be updated and update it
        var details = await Certification.findById(req.params.id);
        if (!details) {
            return res.status(404).send("Certification Found");
        }

        //allow deletion only if user is owner of this note
        if (details.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        details = await Certification.findByIdAndUpdate(req.params.id, { $set: newDetails }, { new: true })
        res.json(details);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }
})

// Route: 11 delete an Certification using : POST "/api/auth/deletecertification. Require login
router.delete('/deletecertification/:id', fetchuser, async (req, res) => {

    try {

        // find the note to be deleted and delete it
        var details = await Certification.findById(req.params.id);
        if (!details) {
            return res.status(404).send("Certification Found");
        }

        //allow deletion only if user is owner of this note
        if (details.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        details = await Certification.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Certification has been deleted", details: details });

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }
})

//********************************Volunteer*****************************************************

// Route: 12 add Volunteer using : POST "/api/details/addvolunteer. Require login
router.post('/addvolunteer', fetchuser, [
    // express validetor package used for validations
    body('image', 'Image not selected').isLength({ min: 3 }),
    body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
    body('subtitle', 'Subtitle must be at least 3 characters').isLength({ min: 3 }),
    body('date', 'Date must be at least 3 characters').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { image, title, subtitle, date, description } = req.body;

        //check for errors from express validetor
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const details = new Volunteer({ image, title, subtitle, date, description, user: req.user.id })
        const savedDetails = await details.save();
        res.json(savedDetails)

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }

})

// Route: 13 get all Volunteer details using : GET "/api/details/getallvolunteerdetails. changed from Require login to not require login
router.get('/getallvolunteerdetails', async (req, res) => {

    try {
        const details = await Volunteer.find({ req })
        res.json(details);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

// Route: 14 update an Volunteer using : POST "/api/auth/updatevolunteer. Require login
router.put('/updatevolunteer/:id', fetchuser, async (req, res) => {

    const { image, title, subtitle, date, description } = req.body;


    try {

        const newDetails = {};

        if (image) {
            newDetails.image = image;
        }
        if (title) {
            newDetails.title = title;
        }
        if (subtitle) {
            newDetails.subtitle = subtitle;
        }
        if (date) {
            newDetails.date = date;
        }
        if (description) {
            newDetails.description = description;
        }

        // find the note to be updated and update it
        var details = await Volunteer.findById(req.params.id);
        if (!details) {
            return res.status(404).send("Volunteer Found");
        }

        //allow deletion only if user is owner of this note
        if (details.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        details = await Volunteer.findByIdAndUpdate(req.params.id, { $set: newDetails }, { new: true })
        res.json(details);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }
})

// Route: 15 delete an Volunteer using : POST "/api/auth/deletevolunteer. Require login
router.delete('/deletevolunteer/:id', fetchuser, async (req, res) => {

    try {

        // find the note to be deleted and delete it
        var details = await Volunteer.findById(req.params.id);
        if (!details) {
            return res.status(404).send("Volunteer Found");
        }

        //allow deletion only if user is owner of this note
        if (details.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        details = await Volunteer.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Volunteer has been deleted", details: details });

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }
})


//********************************Skill*****************************************************

// Route: 16 add Skill using : POST "/api/details/addskill. Require login
router.post('/addskill', fetchuser, [
    // express validetor package used for validations
    body('image', 'Image not selected').isLength({ min: 3 }),
    body('skill', 'Skill must be at least 1 characters').isLength({ min: 1 }),
], async (req, res) => {

    try {
        const { image, skill } = req.body;

        //check for errors from express validetor
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const details = new Skill({ image, skill, user: req.user.id })
        const savedDetails = await details.save();
        res.json(savedDetails)

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }

})

// Route: 17 get all Skill details using : GET "/api/details/getallskilldetails. changed from Require login to not require login
router.get('/getallskilldetails', async (req, res) => {

    try {
        const details = await Skill.find({ req })
        res.json(details);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

// Route: 18 update an Skill using : POST "/api/auth/updateskill. Require login
router.put('/updateskill/:id', fetchuser, async (req, res) => {

    const { image, skill } = req.body;


    try {

        const newDetails = {};
        if (image) {
            newDetails.image = image;
        }
        if (skill) {
            newDetails.skill = skill;
        }

        // find the note to be updated and update it
        var details = await Skill.findById(req.params.id);
        if (!details) {
            return res.status(404).send("skill Found");
        }

        //allow deletion only if user is owner of this note
        if (details.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        details = await Skill.findByIdAndUpdate(req.params.id, { $set: newDetails }, { new: true })
        res.json(details);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }
})

// Route: 19 delete an Skill using : POST "/api/auth/deleteskill. Require login
router.delete('/deleteskill/:id', fetchuser, async (req, res) => {

    try {

        // find the note to be deleted and delete it
        var details = await Skill.findById(req.params.id);
        if (!details) {
            return res.status(404).send("Skill Found");
        }

        //allow deletion only if user is owner of this note
        if (details.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        details = await Skill.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Skill has been deleted", details: details });

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }
})


//********************************Course*****************************************************

// Route: 20 add Course using : POST "/api/details/addcourse. Require login
router.post('/addcourse', fetchuser, [
    // express validetor package used for validations
    body('image', 'Image not selected').isLength({ min: 3 }),
    body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
    body('coursecode', 'Course code must be at least 3 characters').isLength({ min: 3 }),
    body('associatedwith', 'Associated with must be at least 3 characters').isLength({ min: 3 })
], async (req, res) => {

    try {
        const { image, title, coursecode, associatedwith } = req.body;

        //check for errors from express validetor
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const details = new Course({ image, title, coursecode, associatedwith, user: req.user.id })
        const savedDetails = await details.save();
        res.json(savedDetails)

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }

})

// Route: 21 get all Course details using : GET "/api/details/getallcoursedetails. changed from Require login to not require login
router.get('/getallcoursedetails', async (req, res) => {

    try {
        const details = await Course.find({ req })
        res.json(details);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

// Route: 22 update an Course using : POST "/api/auth/updatecourse. Require login
router.put('/updatecourse/:id', fetchuser, async (req, res) => {

    const { image, title, coursecode, associatedwith } = req.body;


    try {

        const newDetails = {};

        if (image) {
            newDetails.image = image;
        }
        if (title) {
            newDetails.title = title;
        }
        if (coursecode) {
            newDetails.coursecode = coursecode;
        }
        if (associatedwith) {
            newDetails.associatedwith = associatedwith;
        }

        // find the note to be updated and update it
        var details = await Course.findById(req.params.id);
        if (!details) {
            return res.status(404).send("Course Found");
        }

        //allow deletion only if user is owner of this note
        if (details.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        details = await Course.findByIdAndUpdate(req.params.id, { $set: newDetails }, { new: true })
        res.json(details);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }
})

// Route: 23 delete an Course using : POST "/api/auth/deletecourse. Require login
router.delete('/deletecourse/:id', fetchuser, async (req, res) => {

    try {

        // find the note to be deleted and delete it
        var details = await Course.findById(req.params.id);
        if (!details) {
            return res.status(404).send("Course Found");
        }

        //allow deletion only if user is owner of this note
        if (details.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        details = await Course.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Course has been deleted", details: details });

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }
})


//********************************Project*****************************************************

// Route: 24 add Project using : POST "/api/details/addproject. Require login
router.post('/addproject', fetchuser, [
    // express validetor package used for validations
    body('image', 'Image not selected').isLength({ min: 3 }),
    body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
    body('date', 'Date must be at least 3 characters').isLength({ min: 3 }),
    body('description', 'Associated with must be at least 3 characters').isLength({ min: 3 }),
], async (req, res) => {

    try {
        const { image, title, date, description } = req.body;

        //check for errors from express validetor
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const details = new Project({ image, title, date, description, user: req.user.id })
        const savedDetails = await details.save();
        res.json(savedDetails)

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }

})

// Route: 25 get all Project details using : GET "/api/details/getallprojectdetails. changed from Require login to not require login
router.get('/getallprojectdetails', async (req, res) => {

    try {
        const details = await Project.find({ req })
        res.json(details);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

// Route: 26 update an Project using : POST "/api/auth/updateproject. Require login
router.put('/updateproject/:id', fetchuser, async (req, res) => {

    const { image, title, date, description } = req.body;


    try {

        const newDetails = {};

        if (image) {
            newDetails.image = image;
        }
        if (title) {
            newDetails.title = title;
        }
        if (date) {
            newDetails.date = date;
        }
        if (description) {
            newDetails.description = description;
        }

        // find the note to be updated and update it
        var details = await Project.findById(req.params.id);
        if (!details) {
            return res.status(404).send("Project Found");
        }

        //allow deletion only if user is owner of this note
        if (details.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        details = await Project.findByIdAndUpdate(req.params.id, { $set: newDetails }, { new: true })
        res.json(details);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }
})

// Route: 27 delete an Project using : POST "/api/auth/deleteproject. Require login
router.delete('/deleteproject/:id', fetchuser, async (req, res) => {

    try {

        // find the note to be deleted and delete it
        var details = await Project.findById(req.params.id);
        if (!details) {
            return res.status(404).send("Project Found");
        }

        //allow deletion only if user is owner of this note
        if (details.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        details = await Project.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Project has been deleted", details: details });

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }
})


//********************************Award*****************************************************

// Route: 12 add Award using : POST "/api/details/addaward. Require login
router.post('/addaward', fetchuser, [
    // express validetor package used for validations
    body('image', 'Image not selected').isLength({ min: 3 }),
    body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
    body('subtitle', 'Subtitle must be at least 3 characters').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
    body('associatedwith', 'Associated with must be at least 3 characters').isLength({ min: 3 })
], async (req, res) => {

    try {
        const { image, title, subtitle, description, associatedwith } = req.body;

        //check for errors from express validetor
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const details = new Award({ image, title, subtitle, description, associatedwith, user: req.user.id })
        const savedDetails = await details.save();
        res.json(savedDetails)

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }

})

// Route: 13 get all Award details using : GET "/api/details/getallawarddetails. changed from Require login to not require login
router.get('/getallawarddetails', async (req, res) => {

    try {
        const details = await Award.find({ req })
        res.json(details);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

// Route: 14 update an Award using : POST "/api/auth/updateaward. Require login
router.put('/updateaward/:id', fetchuser, async (req, res) => {

    const { image, title, subtitle, description, associatedwith } = req.body;


    try {

        const newDetails = {};

        if (image) {
            newDetails.image = image;
        }
        if (title) {
            newDetails.title = title;
        }
        if (subtitle) {
            newDetails.subtitle = subtitle;
        }
        if (description) {
            newDetails.description = description;
        }
        if (associatedwith) {
            newDetails.date = associatedwith;
        }

        // find the note to be updated and update it
        var details = await Award.findById(req.params.id);
        if (!details) {
            return res.status(404).send("Award Found");
        }

        //allow deletion only if user is owner of this note
        if (details.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        details = await Award.findByIdAndUpdate(req.params.id, { $set: newDetails }, { new: true })
        res.json(details);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }
})

// Route: 15 delete an Award using : POST "/api/auth/deleteaward. Require login
router.delete('/deleteaward/:id', fetchuser, async (req, res) => {

    try {

        // find the note to be deleted and delete it
        var details = await Award.findById(req.params.id);
        if (!details) {
            return res.status(404).send("Award Found");
        }

        //allow deletion only if user is owner of this note
        if (details.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        details = await Award.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Award has been deleted", details: details });

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error occured");

    }
})
module.exports = router