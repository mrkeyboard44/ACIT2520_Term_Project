const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    console.log("using userModel to look for user by email!!!")
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};

module.exports = { userModel };
