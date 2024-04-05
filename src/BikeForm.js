import React, { useEffect, useState } from 'react';
import handlebarOptions from './handlebarConfig';

const BikeForm = ({ onUpdate }) => {
  const [formValues, setFormValues] = useState({
    setup1: {
      headTubeAngle: 73,
      stemLength: 100,
      stemAngle: 6,
      stemSpacerHeight: 0,
      handlebarRise: 0,
      handlebarRiseAngle: 0,   
      handlebar: "No rise",
    },
    setup2: {
      headTubeAngle: 73,
      stemLength: 100,
      stemAngle: 6,
      stemSpacerHeight: 0,
      handlebarRise: 0,
      handlebarRiseAngle: 0,      
      handlebar: "No rise",
    }
  });

  const handleChange = (e, setup) => {
    const { name, value } = e.target;
    
    setFormValues(prevValues => {
      let updatedSetup;
      if (name === "handlebar") {
        // When handlebar changes, spread the selected option config and explicitly set the handlebar
        const selectedOptionConfig = handlebarOptions[value];
        updatedSetup = {
          ...prevValues[setup],
          ...selectedOptionConfig,
          handlebar: value, // Ensure handlebar value is explicitly updated
        };
      } else {
        // Handle updates for all other inputs
        const isNumberInput = e.target.type === 'number';
        updatedSetup = {
          ...prevValues[setup],
          [name]: isNumberInput ? parseFloat(value) || 0 : value,
        };
      }
  
      const newValues = {
        ...prevValues,
        [setup]: updatedSetup,
      };
      
      // Assuming onUpdate should be called with the latest values
      // It's placed here to use the most up-to-date state
      onUpdate(newValues);
  
      return newValues;
    });
  };  

  return (
    <div className="bike-form">    
      <form>
        <div style={{ color: 'blue' }}>
          <h2>Setup 1</h2>
          <div>
            <label>
              Head Tube Angle (deg):
              <input type="number" name="headTubeAngle" value={formValues.setup1.headTubeAngle} onChange={(e) => handleChange(e, 'setup1')} />
            </label>
          </div>
          <div>
            <label>
              Stem Length (mm):
              <input type="number" name="stemLength" value={formValues.setup1.stemLength} onChange={(e) => handleChange(e, 'setup1')} />
            </label>
          </div>
          <div>
            <label>
              Stem Angle (deg):
              <input type="number" name="stemAngle" value={formValues.setup1.stemAngle} onChange={(e) => handleChange(e, 'setup1')} />
            </label>
          </div>          
          <div>
            <label>
              Stem Spacer Height (mm):
              <input type="number" name="stemSpacerHeight" value={formValues.setup1.stemSpacerHeight} onChange={(e) => handleChange(e, 'setup1')} />
            </label>
          </div>
          <div>
            <label>
              Handlebar Rise (mm):
              <input type="number" name="handlebarRise" value={formValues.setup1.handlebarRise} onChange={(e) => handleChange(e, 'setup1')} />
            </label>
          </div>
          <div>
            <label>
              Handlebar:
              <select
                name="handlebar"
                value={formValues.setup1.handlebar}
                onChange={(e) => handleChange(e, 'setup1')}
              >
                <option value="No rise">No rise</option>
                <option value="Kitchen Sink Handlebar">Kitchen Sink Handlebar</option>
                <option value="Top Shelf Handlebar 50mm Rise">Top Shelf Handlebar 50mm Rise</option>
                <option value="Top Shelf Handlebar 70mm Rise">Top Shelf Handlebar 70mm Rise</option>
              </select>
            </label>
          </div>
        </div>
        
        <div style={{ color: 'red' }}>
          <h2>Setup 2</h2>
          <div>
            <label>
              Head Tube Angle (deg):
              <input type="number" name="headTubeAngle" value={formValues.setup2.headTubeAngle} onChange={(e) => handleChange(e, 'setup2')} />
            </label>
          </div>
          <div>
            <label>
              Stem Length (mm):
              <input type="number" name="stemLength" value={formValues.setup2.stemLength} onChange={(e) => handleChange(e, 'setup2')} />
            </label>
          </div>
          <div>
            <label>
              Stem Angle (deg):
              <input type="number" name="stemAngle" value={formValues.setup2.stemAngle} onChange={(e) => handleChange(e, 'setup2')} />
            </label>
          </div>
          <div>
            <label>
              Stem Spacer Height (mm):
              <input type="number" name="stemSpacerHeight" value={formValues.setup2.stemSpacerHeight} onChange={(e) => handleChange(e, 'setup2')} />
            </label>
          </div>
          <div>
            <label>
              Handlebar Rise (mm):
              <input type="number" name="handlebarRise" value={formValues.setup2.handlebarRise} onChange={(e) => handleChange(e, 'setup2')} />
            </label>
          </div>
          <div>
            <label>
              Handlebar:
              <select
                name="handlebar"
                value={formValues.setup2.handlebar}
                onChange={(e) => handleChange(e, 'setup2')}
              >
                <option value="No rise">No rise</option>
                <option value="Kitchen Sink Handlebar">Kitchen Sink Handlebar</option>
                <option value="Top Shelf Handlebar 50mm Rise">Top Shelf Handlebar 50mm Rise</option>
                <option value="Top Shelf Handlebar 70mm Rise">Top Shelf Handlebar 70mm Rise</option>
              </select>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BikeForm;