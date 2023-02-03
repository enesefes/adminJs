const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const express = require("express");

const mongoose = require("mongoose");
const AdminJSMongoose = require("@adminjs/mongoose");
const { Book, Library } = require("./book.model.js");

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const PORT = 3000;

const startAdminJS = async () => {
  const app = express();

  const mongooseDB = await mongoose
    .connect(
      "mongodb+srv://enes_efes:Enes_158@cluster0.xigd8xa.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));

  const BookResourceOptions = {
    databases: [mongooseDB],
    resource: Book,
  };

  const LibraryResourceOptions = {
    databases: [mongooseDB],
    resource: Library,
  };

  const adminOptions = {
    rootPath: "/admin",
    resources: [BookResourceOptions, LibraryResourceOptions],
  };

  const admin = new AdminJS(adminOptions);

  const adminRouter = AdminJSExpress.buildRouter(admin);

  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(
      `Listening on port ${PORT}, AdminJS server started on URL: http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

startAdminJS();
