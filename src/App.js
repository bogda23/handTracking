import "./App.css";
import constants from "./constants";

import React, { useRef, useState, Component } from "react";

import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";
import PicsLoader from "./picsLoader";

function App() {
  // useRef - USE REFERENCES THAT are in the webpage/DOM
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const picsRef = useRef(null);

  const runHandPose = async () => {
    // wait for handpose to load
    const net = await handpose.load();
    console.log("Handpose model successfully loaded");

    // loop used to continiously try and detect a hand within the frame

    setInterval(() => {
      detect(net);
    }, 10);
  };

  // pass handpose model into detect function

  const detect = async (net) => {
    // check if video feed is being received
    if (
      //check that data is not undefined, not null
      // and check the video ready state to make sure data is being received
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // set video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // make hand detection by passing in the video frame
      const hand = await net.estimateHands(video);

      console.log(hand.length);
      // console log the hand and all of it's properties

      // landmark represents a different point in your hand
      console.log(hand);

      // grab canvas in 2d
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  runHandPose();

  return (
    <div className="App">
      <h1>The Purple Hand Tracker</h1>
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "0px",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: constants.CAM_WEIGHT,
            height: constants.CAM_HEIGHT,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "0px",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: constants.CAM_WEIGHT,
            height: constants.CAM_HEIGHT,
          }}
        />

        <PicsLoader />
      </header>

      {/* <p>{formatTime()}</p> {/* here we will show timer */}
      {/* <div className="buttons">
        {!isActive && !isPaused ? (
          <button onClick={handleStart}>Start</button>
        ) : isPaused ? (
          <button onClick={handlePause}>Pause</button>
        ) : (
          <button onClick={handleResume}>Resume</button>
        )}
        <button onClick={handleReset} disabled={!isActive}>
          Reset
        </button> 
      </div> */}
    </div>
  );
}

export default App;
