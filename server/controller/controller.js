var itemdb = require('../model/model');

// create and save new item
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new item
    const item = new itemdb({
        name:req.body.name,
        id:req.body.id,
        price:req.body.price,
        stock:req.body.stock,
        sold:req.body.sold
    })

    // save item in the database
    item
        .save(item)
        .then(data => {
            res.redirect('/list')
            // alert("Item added successfully")
            // res.redirect('/add-item');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all items/ retrive and return a single item
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        itemdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found item with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving item with id " + id})
            })

    }else{
        itemdb.find()
            .then(item => {
                res.send(item)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving item information" })
            })
    }

    
}
//upadte a new identified item by item id
exports.update=(req, res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({meassage:"Data for update cannot be empty."})
    }
    const id=req.params.id;
    itemdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})  
      .then(data=>{
          if(!data){
              res.status(404).send({meassge:`Cannot Update item with ${id}, maybe item not fouond`})
          }else{
              res.send(data)
          }
      })
      .catch(err=>{
          res.status(500).send({message : "Error update item informations."})
      })
}
// Delete a item with specified item id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    itemdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "item was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete item with id=" + id
            });
        });
}