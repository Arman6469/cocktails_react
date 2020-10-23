import React from "react";
import "./Home.css";
import Header from "../Header/Header";
import Content from './Content'

export default function Home() {
  return (
    <div className="main_div_home">
      <Header />
      <Content />
    </div>
  );
}
