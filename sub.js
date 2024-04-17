const redis = require("redis");
(async () => {
  const subscriber = redis.createClient({ url: "redis://localhost:6379" });
  //   console.log(subscriber, "subs");
  subscriber.on("error", (err) => console.log("Redis error"));
  subscriber.on("connect", (ok) => console.log("Redis connected"));
  console.log("hello");
  await subscriber.connect();

  await subscriber.subscribe("message", (data) => {
    const abc = JSON.parse(data);
    console.log(abc, new Date());
  });
})();
