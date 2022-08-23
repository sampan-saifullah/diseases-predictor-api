const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = process.env.PORT || 8080
var cors = require('cors')
app.use(express.json());
app.use(cors())
//models
const DiseasesModel = require('./models/diseases')
const SpecalistModel = require('./models/specialist')
const DoctorModel = require('./models/doctor')
const SymptoomModel = require('./models/symptom')

//routes
const specalist = require('./routes/specalist')
const diseases = require('./routes/diseases')
const doctor = require('./routes/doctor')
const symptom = require('./routes/symptom')

mongoose.connect('mongodb+srv://sampan:sampan_saifullah_uits_CSE@cluster0.jxe3qys.mongodb.net/backend-api?retryWrites=true&w=majority')
    .then((s) => {
        console.log('db success')
    })
app.use('/specialist', specalist)
app.use('/diseases', diseases)
app.use('/symptom', symptom)
app.use('/doctor', doctor)
app.get('/', (req, res) => {
    res.send('OKK')
})
app.post('/login', async (req, res) => {
    try {
        if (req.body.email === 'sampan@gmail.com' && req.body.password === '12345') {
            res.json({
                msg: 'Success'
            })
        } else {
            res.json({
                msg: 'Error'
            })
        }
    } catch (error) {
        throw new Error('Save error')
    }
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})