const express = require('express');
const route =express.Router();
const controller= require('../controller/controller')

const axios= require("axios")


// route.post('/api/change-password', async (req, res) => {
// 	const { token, newpassword: plainTextPassword } = req.body

// 	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
// 		return res.json({ status: 'error', error: 'Invalid password' })
// 	}

// 	if (plainTextPassword.length < 5) {
// 		return res.json({
// 			status: 'error',
// 			error: 'Password too small. Should be atleast 6 characters'
// 		})
// 	}

// 	try {
// 		const user = jwt.verify(token, JWT_SECRET)

// 		const _id = user.id

// 		const password = await bcrypt.hash(plainTextPassword, 10)

// 		await User.updateOne(
// 			{ _id },
// 			{
// 				$set: { password }
// 			}
// 		)
// 		res.json({ status: 'ok' })
// 	} catch (error) {
// 		console.log(error)
// 		res.json({ status: 'error', error: ';))' })
// 	}
// })

// route.post('/api/login', async (req, res) => {
// 	const { username, password } = req.body
// 	const user = await User.findOne({ username }).lean()

// 	if (!user) {
// 		return res.json({ status: 'error', error: 'Invalid username/password' })
// 	}

// 	if (await bcrypt.compare(password, user.password)) {
// 		// the username, password combination is successful

// 		const token = jwt.sign(
// 			{
// 				id: user._id,
// 				username: user.username
// 			},
// 			JWT_SECRET
// 		)

// 		return res.json({ status: 'ok', data: token })
// 	}

// 	res.json({ status: 'error', error: 'Invalid username/password' })
// })

// route.post('/api/register', async (req, res) => {
// 	const { username, password: plainTextPassword } = req.body

// 	if (!username || typeof username !== 'string') {
// 		return res.json({ status: 'error', error: 'Invalid username' })
// 	}

// 	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
// 		return res.json({ status: 'error', error: 'Invalid password' })
// 	}

// 	if (plainTextPassword.length < 5) {
// 		return res.json({
// 			status: 'error',
// 			error: 'Password too small. Should be atleast 6 characters'
// 		})
// 	}

// 	const password = await bcrypt.hash(plainTextPassword, 10)

// 	try {
// 		const response = await User.create({
// 			username,
// 			password
// 			// res.redirect('http://localhost:3000/')
// 		})
// 		console.log('User created successfully: ', response)
// 	} catch (error) {
// 		if (error.code === 11000) {
// 			// duplicate key
// 			return res.json({ status: 'error', error: 'Username already in use' })
// 		}
// 		throw error
// 	}

// 	res.json({ status: 'ok' })
// 	// if(res.status==200){res.redirect('http://localhost:3000')}
// })


route.get('/list', (req, res)=>{
    // make a get request to trhe api/items
    axios.get('http://localhost:3000/api/items')
    .then(function(response){
        // console.log(response.data)
        // alert("Item added successfully")

        res.status(200).render('list',{items:response.data});

    })
    .catch(err=>{
        res.send({message:"Error in fetching."})
    })
})
route.get('/add-item', (req, res)=>{
    res.status(200).render('add_item');
})
route.get('/update-item', (req, res)=>{
    axios.get('http://localhost:3000/api/items',{params:{id:req.query.id}})
     .then(function(itemdata){
        res.render("update_item",{item:itemdata.data})
     })
     .catch(err=>{
         res.send(err);
     })
})

//api
route.post('/api/items', controller.create)
route.get('/api/items', controller.find)
route.put('/api/items/:id', controller.update)
route.delete('/api/items/:id', controller.delete)

module.exports=route