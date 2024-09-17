const addnewmenumodel = require("../models/addnewmenumodel");

//crud_get all data
module.exports.getmenu = async (req, res) => {
  try {
    const menu = await addnewmenumodel.find();
    res.send(menu);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};


//crud_save data
module.exports.addmenu= async (req, res) => {
  try {
    const menu = new addnewmenumodel(req.body);
    await menu.save();
    res.status(201).json({
      status: 201,
      message: "Created Successfully",
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "Not successful",
      error: err
    });
  }
};


//crud_update data
module.exports.updatemenu = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRoom = {
      menu,
      menucat,
      price,
      menunumber,
      description
    }=req.body

    await addnewmenumodel.findByIdAndUpdate(id, updatedRoom);
    res.send("Updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};


// crud_delete data
module.exports.deletemenu = async (req, res) => {
  try {
    const { id } = req.params;

    await addnewmenumodel.findByIdAndDelete(id);
    //console.log("Item deleted successfully");
    res.send("Item deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};
//crud_get one data
module.exports.getmenuById = async (req, res) => {
  try {
    const id = req.params.id;

    const menu = await addnewmenumodel.findById(id);
    if (!menu) {
      return res.status(404).send("Vehicle not found");
    }
    res.send(menu);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

