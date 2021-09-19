import OpenSeaDragon from "openseadragon";
import React, { useEffect, useRef, useState } from "react";
import * as Annotorious from "@recogito/annotorious-openseadragon";
import "@recogito/annotorious-openseadragon/dist/annotorious.min.css";

const OpenSeaDragonViewer = ({ image }) => {
  const [viewer, setViewer] = useState(null);
  const [anno, setAnno] = useState(null);

  useEffect(() => {
    if (image && viewer) {
      viewer.open(image.source);
      //overlay = this.viewer.fabricjsOverlay(options);
    }
  }, [image, viewer]);

  var initViewer = undefined;
  const InitOpenseadragon = () => {
    viewer && viewer.destroy();

    initViewer = OpenSeaDragon({
      id: "openSeaDragon",
      prefixUrl: "openseadragon-images/",
      animationTime: 0.5,
      blendTime: 0.1,
      constrainDuringPan: true,
      maxZoomPixelRatio: 2,
      minZoomLevel: 1,
      visibilityRatio: 1,
      zoomPerScroll: 2,
    });
    setViewer(initViewer);
    const config = {};
    const annotate = Annotorious(initViewer, config);
    setAnno(annotate);
  };

  //const annotations = new OpenSeaDragon.Annotations({ initViewer });

  useEffect(() => {
    InitOpenseadragon();
    return () => {
      viewer && viewer.destroy();
    };
  }, []);

  return (
    <div
      id="openSeaDragon"
      style={{
        height: "1080px",
        width: "1920px",
      }}
    ></div>
  );
};

export { OpenSeaDragonViewer };
