import SwiftSlider from "react-swift-slider";
import constants from "./constants";

const data = [{ id: "1", src: "../public/assets/thumbs_up.png" }];

function PicsLoader(style) {





    //return ------------------
  return (
    <SwiftSlider
      height={900}
      showDots={true}
      data={data}
      style={{
        position: "absolute",
        marginLeft: "0px",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zindex: 9,
        width: 500,
        height: constants.CAM_HEIGHT,
      }}
    ></SwiftSlider>
  );
}

export default PicsLoader;
