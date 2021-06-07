const express = require("express");
const next = require("next");

require("./db/db-connection");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const mongoose = require("mongoose");

const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
AdminBro.registerAdapter(AdminBroMongoose);

const meetups = mongoose.model("Meetups", {
  data: { title: String, image: String, address: String, description: String },
});

const pageResourceOptions = {
  properties: {
    data: {
      description: {
        type: "richtext",
      },
    },
  },
};

const adminBro = new AdminBro({
  resources: [{ resource: meetups, options: pageResourceOptions }],
  rootPath: "/admin",
});
const router = AdminBroExpress.buildRouter(adminBro);

app.prepare().then(() => {
  const server = express();

  server.use(adminBro.options.rootPath, router);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
