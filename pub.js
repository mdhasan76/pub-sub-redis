const express = require("express");
const port = process.env.port || 3001;
const redis = require("redis");
const app = express();

const publisher = redis.createClient({
  url: "redis://localhost:6379",
});
publisher.on("error", (err) => console.log("Redis error"));
publisher.on("connect", (ok) => console.log("Redis connected"));

const connect = async () => {
  await publisher.connect();
};
connect();

app.listen(port, () => {
  console.log(`My redis practice server is running on ${port}`);
});

// ______________________ Route
app.get("/", async (req, res) => {
  res.send({ message: `Publisher active from ${port}` });
});

app.get("/publisher", async (req, res) => {
  const id = Math.floor(Math.random() * 10);
  const data = { id, message: `message - ${id}` };
  console.log(data, "THIS IS DATA");
  console.log(new Date());
  await publisher.publish("message", JSON.stringify(data));
  res.send({ message: "data published" });
});

app.get("/get-publisher", async (req, res) => {
  const result = await publisher.subscribe("message");
  console.log(result, "hello");
  res.send({ message: "Retrieve from redis", data: result });
});
