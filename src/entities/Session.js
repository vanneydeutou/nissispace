const { EntitySchema } = require("typeorm");
const User = require("./User");

module.exports = new EntitySchema({
  name: "Session",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    ipAddress: {
      type: "varchar",
    },
  },
  relations: {
    sessions: {
      target: Session,
      type: "one-to-many",
      inverseSide: "user",
    },
  },
});
