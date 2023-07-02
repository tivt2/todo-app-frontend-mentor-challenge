import app from "./index";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server UP now listening to PORT ${PORT}`);
});
