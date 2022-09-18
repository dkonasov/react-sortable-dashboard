import { useRef } from "react";
import { FC } from "react";
import {
  axisBottom,
  axisLeft,
  curveLinear,
  extent,
  line as d3Line,
  range,
  scaleLinear,
  scaleUtc,
  select,
} from "d3";
import { useEffect } from "react";
import styles from "./stonks.module.css";

const stonksData = [
  { date: new Date("2022-04-11"), close: 15.34 },
  { date: new Date("2022-04-12"), close: 19.21 },
  { date: new Date("2022-04-13"), close: 21.87 },
  { date: new Date("2022-04-14"), close: 52.52 },
  { date: new Date("2022-04-15"), close: 54.78 },
  { date: new Date("2022-04-16"), close: 60.2 },
  { date: new Date("2022-04-17"), close: 64.18 },
  { date: new Date("2022-04-18"), close: 70.14 },
  { date: new Date("2022-04-19"), close: 78.34 },
  { date: new Date("2022-04-20"), close: 82.21 },
  { date: new Date("2022-04-21"), close: 84.2 },
  { date: new Date("2022-04-22"), close: 90.21 },
  { date: new Date("2022-04-23"), close: 93.24 },
  { date: new Date("2022-04-24"), close: 96.25 },
  { date: new Date("2022-04-25"), close: 98.28 },
  { date: new Date("2022-04-26"), close: 100.14 },
];

const marginTop = 20;
const marginRight = 30;
const marginBottom = 30;
const marginLeft = 40;

const x = stonksData.map((val) => val.date);
const y = stonksData.map((val) => val.close);
const i = range(x.length);
const xDomain = extent(x);
const yDomain = extent([0, Math.max(...y)]);

export const Stonks: FC = () => {
  const ref = useRef<SVGSVGElement>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      if (!ref.current) {
        return;
      }

      ref.current.innerHTML = "";
      const resX = entries[0].contentRect.width;
      const resY = entries[0].contentRect.height;
      const svg = select(ref.current).attr("viewBox", [0, 0, resX, resY]);
      const xRange = [marginLeft, resX - marginRight];
      const yRange = [resY - marginBottom, marginTop];

      const xScale = scaleUtc(xDomain, xRange);
      const yScale = scaleLinear(yDomain, yRange);

      const xAxis = axisBottom(xScale)
        .ticks(resX / 100)
        .tickSizeOuter(0);
      const yAxis = axisLeft(yScale).ticks(resY / 100);

      const line = d3Line<number>()
        .curve(curveLinear)
        .x((i) => xScale(x[i]))
        .y((i) => yScale(y[i]));

      svg
        .append("g")
        .attr("transform", `translate(0,${resY - marginBottom})`)
        .style("font-size", "16px")
        .call(xAxis);

      svg
        .append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .style("font-size", "16px")
        .call(yAxis)
        .call((g) =>
          g
            .selectAll(".tick line")
            .clone()
            .attr("x2", resX - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1)
        )
        .call((g) =>
          g
            .append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("font-size", 12)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("Close")
        );

      svg
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "#00f")
        .attr("stroke-width", 2)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("d", line(i));
    });

    resizeObserver.observe(ref.current.parentElement);

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current.parentElement);
      }
    };
  }, [ref.current]);

  return <svg ref={ref} className={styles.root}></svg>;
};
