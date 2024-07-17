const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cookieParser = require('cookie-parser');

dotenv.config();

const authRoutes = require("./routes/auth");
const paymentRoutes = require('./routes/payment')

const app = express();
const Port = process.env.PORT_NO || 3000;

app.use(express.json());
app.use(cookieParser());


const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Payment Gateway API",
        version: "1.0.0",
        description: "Payment Gateway API Information",
      },
      servers: [
        {
          url: `http://localhost:${Port}`,
        }
      ],
      components: {
        securitySchemes: {
          cookieAuth: {
            type: 'apiKey',
            in: 'cookie',
            name: 'token'
          }
        }
      },
      security: [
        {
          cookieAuth: []
        }
      ],
    },
    apis: ["./routes/*.js"],
  };
  

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

  app.use("/api/auth", authRoutes);
  app.use("/api/payments", paymentRoutes);
  
app.listen(Port, () => console.log(`Server running on port ${Port}`));
