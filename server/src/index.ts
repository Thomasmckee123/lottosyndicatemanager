import {app} from "./app";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

console.log(`Server listening on ${PORT} AWS ACCESS KEY${process.env.ACCESS_KEY} AWS SECRET${process.env.SECRET_ACCESS_KEY}`);
});