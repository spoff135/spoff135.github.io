import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BikePlot = ({ geometry }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (geometry && d3Container.current) {
      const { setup1, setup2 } = geometry;
      const svg = d3.select(d3Container.current);
      
      // Clear the SVG to redraw
      svg.selectAll("*").remove();

      const width = +svg.attr("width");
      const height = +svg.attr("height");

      // Function to draw a setup
      const drawSetup = (setup, color) => {
        const { headTubeAngle, stemLength, stemAngle, stemSpacerHeight, handlebarRise, handlebarRiseAngle } = setup;

        // Convert angle from degrees to radians for trig functions
        const headTubeAngleRad = headTubeAngle * (Math.PI / 180);
        const stemAngleRad = (stemAngle + 90) * (Math.PI / 180) - headTubeAngleRad;

        // Create Head tube top position
        const headTubeStartX = width / 4;
        const headTubeStartY = height / 2;

        const headTubeEndX = headTubeStartX + 150 * Math.cos(headTubeAngleRad);
        const headTubeEndY = headTubeStartY + 150 * Math.sin(headTubeAngleRad); 
        
        const stemStartX = headTubeStartX - stemSpacerHeight * Math.cos(headTubeAngleRad);
        const stemStartY = headTubeStartY - stemSpacerHeight * Math.sin(headTubeAngleRad);

        const stemEndX = stemStartX + stemLength * Math.cos(-stemAngleRad);
        const stemEndY = stemStartY + stemLength * Math.sin(-stemAngleRad);        

        const hbarEndX = stemEndX - handlebarRise * Math.sin(handlebarRiseAngle * (Math.PI / 180));;
        const hbarEndY = stemEndY - handlebarRise * Math.cos(handlebarRiseAngle * (Math.PI / 180));

        // Draw head tube
        svg.append("line")
          .attr("x1", headTubeStartX)
          .attr("y1", headTubeStartY)
          .attr("x2", headTubeEndX)
          .attr("y2", headTubeEndY)
          .attr("stroke", color)
          .attr("stroke-width", 2);
        
        // Draw stem 
        svg.append("line") // Example of drawing the head tube
          .attr("x1", stemStartX)
          .attr("y1", stemStartY)
          .attr("x2", stemEndX) // Simplified example; adjust with actual calculations
          .attr("y2", stemEndY)
          .attr("stroke", color)
          .attr("stroke-width", 2);
        
        // Draw handlebar
        svg.append("line") // Example of drawing the head tube
          .attr("x1", stemEndX)
          .attr("y1", stemEndY)
          .attr("x2", hbarEndX) // Simplified example; adjust with actual calculations
          .attr("y2", hbarEndY)
          .attr("stroke", color)
          .attr("stroke-width", 2);

        // Add a border
        svg.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", width)
          .attr("height", height)
          .attr("fill", "none")
          .attr("stroke", "black") // Border color
          .attr("stroke-width", 2); // Border width

        // Add more elements based on your calculations
        return { hbarEndX, hbarEndY };
      }
      // Draw both setups with different colors
      const endsSetup1 = drawSetup(setup1, "blue");
      const endsSetup2 = drawSetup(setup2, "red");      
      drawSetup(setup1, "blue");
      drawSetup(setup2, "red");

      // Calculate the differences
      const riseDifference = endsSetup1.hbarEndY - endsSetup2.hbarEndY;
      const reachDifference = endsSetup1.hbarEndX - endsSetup2.hbarEndX;

      // Draw Rise difference line
      const riseDiffX = Math.min(endsSetup1.hbarEndX, endsSetup2.hbarEndX);
      svg.append("line")
        .attr("x1", riseDiffX)
        .attr("y1", endsSetup1.hbarEndY)
        .attr("x2", riseDiffX)
        .attr("y2", endsSetup2.hbarEndY)
        .attr("stroke", "gray")
        .attr("stroke-width", 1 );

      // Draw Reach difference line
      const reachDiffY = Math.max(endsSetup1.hbarEndY, endsSetup2.hbarEndY);
      svg.append("line")
        .attr("x1", endsSetup1.hbarEndX)
        .attr("y1", reachDiffY)
        .attr("x2", endsSetup2.hbarEndX)
        .attr("y2", reachDiffY)
        .attr("stroke", "gray")
        .attr("stroke-width", 1);        

      // Display the differences as text in the SVG
      svg.selectAll(".difference-text").remove(); // Clear previous text if any

      svg.append("text")
        .attr("class", "difference-text")
        .attr("x", riseDiffX + 5) // Adjust as necessary for positioning
        .attr("y", Math.min(endsSetup1.hbarEndY, endsSetup2.hbarEndY)) // Positioning from the bottom
        .attr("fill", "gray")
        .text(`Rise Difference = ${Math.abs(riseDifference.toFixed(0))} mm (${Math.abs((riseDifference / 25.4).toFixed(1))} in)`);

      svg.append("text")
        .attr("class", "difference-text")
        .attr("x", Math.max(endsSetup1.hbarEndX, endsSetup2.hbarEndX)) // Adjust as necessary for positioning
        .attr("y", reachDiffY + 15) // A bit lower than the first text
        .attr("fill", "gray")
        .text(`Reach Difference = ${Math.abs(reachDifference.toFixed(0))} mm (${Math.abs((reachDifference / 25.4).toFixed(1))} in)`);
      
    }
  }, [geometry]); // Redraw when geometry changes

  return (
    <svg
      className="d3-component"
      width="600"
      height="400"
      ref={d3Container}
    />
  );
};

export default BikePlot;
