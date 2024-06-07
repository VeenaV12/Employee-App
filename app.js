// Task1: initiate app and run server at 3000
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(express.json())
app.use(cors())

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://veenavidyanandan:LxluILEqJujfI8eb@cluster0.zog79h3.mongodb.net/')
  .then(() => console.log('Connected!'));


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below
//TODO: get data from db  using api '/api/employeelist'

const getData = async(req,res)=>{
  try{
      const allEmployeeData = await employee.find()
      res.status(200).json(allEmployeeData)
  }
  catch(error){
    console.log(error)
    res.status(500).json({error:'Internal Server error'})
  }
}

app.get('/api/employeelist',getData)

//TODO: get single data from db  using api '/api/employeelist/:id'

const getSingleData = async(req,res)=>{
  try{
      const employeeData = await employee.findById(req.params.id)
      res.status(200).json(employeeData)
  }
  catch(error){
    console.log(error)
    res.status(500).json({error:'Internal Server error'})
  }
}

app.get('/api/employeelist/:id',getSingleData)




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

const employeeSchema = mongoose.Schema({
    name:String,
    location:String,
    position:String,
    salary:Number
})

const employee = mongoose.model('employee',employeeSchema)

const sendData = async(req,res)=>{
  try{
    var postItem = {
      name:req.body.name,
      location:req.body.location,
      position:req.body.position,
      salary:req.body.salary
    }
    var post = new employee(postItem)
    await post.save()
    res.status(201).json(postItem)

  }
  catch(error){
    console.log(error)
    res.status(500).json({error:'Internal Server error'})
  }
}

app.post('/api/employeelist',sendData)


//TODO: delete a employee data from db by using api '/api/employeelist/:id'

const deleteData = async(req,res)=>{
  try{
      await employee.findByIdAndDelete(req.params.id)
      res.status(200).json({message:'Employee data deleted.'})
  }
  catch(error){
    console.log(error)
    res.status(500).json({error:'Internal Server error'})
  }
}

app.delete('/api/employeelist/:id',deleteData)


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
const updateData = async(req,res)=>{
  try{
      const {_id, ...updateData} = req.body
      const filter = {_id}
      await employee.updateOne(filter,updateData)
      res.status(200)
  }
  catch(error){
    console.log(error)
    res.status(500).json({error:'Internal Server error'})
  }
}

app.put('/api/employeelist',updateData)

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



