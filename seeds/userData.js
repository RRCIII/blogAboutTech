const { User } = require("../models");

const newUsers = [
  {
    username: "carolinaBoy_501",
    email: "fifteenBackwoods@yahoo.com",
    password: "qwer1234",
  },
  {
    username: "ChanelBags<3",
    email: "karenShmooves@gmail.com",
    password: "qwer1234",
  },
  {
    username: "bruce4Skin",
    email: "uncutwarriors@gmail.com",
    password: "qwer1234",
  },
  {
    username: "DungSlinger69",
    email: "cornboy23@icloud.com",
    password: "qwer1234",
  },
  {
    username: "conor_mcgregor",
    email: "uLitlf00knWeeZl@hotmail.com",
    password: "qwer1234",
  },
  {
    username: "deez_nodes",
    email: "Dizzy123@hotmail.com",
    password: "WhatWhat",
  },
];

const seedUsers = () => User.bulkCreate(newUsers);

module.exports = seedUsers;
