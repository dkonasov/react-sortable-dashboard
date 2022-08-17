import { FC } from "react";
import { Map as OLMap, View } from "ol";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { useEffect } from "react";
import { useRef } from "react";
import { fromLonLat } from "ol/proj";
import styles from "./map.module.css";

export const Map: FC = () => {
  const mapRef = useRef<OLMap>();
  const widgetRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (widgetRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (mapRef.current) {
          mapRef.current.dispose();
        }

        if (entries[0].contentBoxSize[0].blockSize > 0) {
          mapRef.current = new OLMap({
            target: widgetRef.current,
            layers: [
              new TileLayer({
                source: new OSM(),
              }),
            ],
            view: new View({
              center: fromLonLat([37.41, 8.82]),
              zoom: 4,
            }),
          });
        }
      });

      resizeObserver.observe(widgetRef.current);
      return () => {
        if (mapRef.current) {
          mapRef.current.dispose();
        }
        if (widgetRef.current) {
          resizeObserver.unobserve(widgetRef.current);
        }
      };
    }
  });
  return <div className={styles.root} ref={widgetRef}></div>;
};
