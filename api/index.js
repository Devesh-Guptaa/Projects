var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');
const UserModel = require('./models/User');
var app = express();
require('dotenv').config();
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Mongoose connected successfully!!');
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.send('ALL is WELL');
});

app.post('/register', async (req, res) => {
  const { Name, Email, Password } = req.body;
  console.log(Name, Email, Password);
  try {
    const user = await UserModel.create({
      Name,
      Email,
      Password,
    });
    console.log('Registration Successful!!');
    res.sendStatus(201);
  } catch (err) {
    console.log('Please try again from server ', err);
    res.sendStatus(422);
  }
});

app.post('/login', async (req, res) => {
  const { Email, Password } = req.body;
  console.log(req.body);
  console.log(Email, Password);

  try {
    const userDoc = await UserModel.findOne({ Email });
    if (userDoc) {
      if (userDoc.Password !== Password) {
        return res.status(400).json('Password is incorrect');
      } else {
        await jwt.sign(
          { email: userDoc.Email, id: userDoc._id },
          process.env.JWT_SECRET_KEY,
          {},
          (err, token) => {
            if (err) {
              console.log(err);
            } else {
              res
                .cookie('token', token, {
                  secure: true, // Set to true if served over HTTPS
                  sameSite: 'None',
                })
                .json(userDoc);
            }
          }
        );
      }
    } else console.log('No such user registered');
  } catch (err) {
    console.log(err);
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err);
      } else {
        console.log('Decoded token:', decoded);
        const { email, id } = decoded;

        const { Name, Email, _id } = await UserModel.findById({ _id: id });
        res.send({ Name, Email, _id });
      }
    });
  } else {
    res.send(null);
    console.log('No token found');
  }
});

app.listen(process.env.PORT, () => {
  console.log('Server started on port', process.env.PORT);
});
