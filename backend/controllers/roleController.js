import role from "../models/role.js";

const registerRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });

  let schema = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  let result = await schema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register role" });

  res.status(200).send({ result });
};

const listRole = async (req, res) => {
  let roles = await role.find();
  if (roles.length === 0)
    return res.status(400).send({ message: "No search results" });

  return res.status(200).send({ roles });
};

const deleteRole = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  const roles = await role.findByIdAndDelete(req.params["_id"]);

  return !roles
    ? res.status(400).send({ message: "Error deleting role" })
    : res.status(200).send({ message: "Role deleted" });
};

const updateRole = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });

  const editRole = await role.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
    modifyDate: new Date(),
  });

  return !editRole
    ? res.status(500).send({ message: "Error editing role" })
    : res.status(200).send({ message: "Role updated" });
};

export default { registerRole, listRole, deleteRole, updateRole };
