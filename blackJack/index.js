import { response } from "express";
import "./style.css";

async function getDeck(string) {
  let data = await fetch(string).then((response) => response.json);
  console.log(data);
}
