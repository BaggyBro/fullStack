import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import EmployeeModel from "./models/Employee.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/Office");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

app.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;

  try {
    const hashedPassword = await hashPassword(pass);

    const newUser = new EmployeeModel({
      name,
      email,
      pass: hashedPassword,
    });

    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(pass, user.pass);

    if (isMatch) {
      const accessToken = jwt.sign(
        { email: user.email },
        "secret-key-jwt-access-token",
        { expiresIn: "1m" }
      );
      const refreshToken = jwt.sign(
        { email: user.email },
        "secret-key-jwt-refresh-token",
        { expiresIn: "5m" }
      );

      res.cookie("accessToken", accessToken, { maxAge: 60000 }); // 1 minute
      res.cookie("refreshToken", refreshToken, {
        maxAge: 300000,
        httpOnly: true,
        //secure: true,
        sameSite: "lax",
      });

      res.json({ Login: true });
    } else {
      res.json({ Login: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.json("Backend");
});

const verifyUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    if(renewToken(req,res)){
      next()
    }
  } else {
    jwt.verify(accessToken, "secret-key-jwt-refresh-token", (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "Invalid Token" });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

const renewToken = (req, res) => {
  const refreshToken = req.cookies.accessToken;
  if (!refreshToken) {
    return res.json({valid:false, message:"NO refresh token"})
  } else {
    jwt.verify(refreshToken, "secret-key-jwt-refresh-token", (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "Invalid Refresh Token" });
      } else {
        const accessToken = jwt.sign({email:user.email})
        res.cookie('accessToken',accessToken,{maxAge:60000})
        exist = true
      }
    });
  }
  return exist
};

app.get("/dashboard",verifyUser, (req, res) => {
  return res.json({ valid: true, message: "Authorized" });
});

app.listen(8001, () => {
  console.log("Backend ON!");
});
