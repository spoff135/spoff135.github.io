import React, { useState } from 'react';

const BikeForm = ({ onUpdate }) => {

  const [formValues, setFormValues] = useState({
    setup1: {
      headTubeAngle: 73, // Default values for setup 1
      stemLength: 100,
      stemAngle: 6,
      stemSpacerHeight: 0,
      handlebarRise: 30,
    },
    setup2: {
      headTubeAngle: 73, // Default values for setup 2
      stemLength: 100,
      stemAngle: 6,
      stemSpacerHeight: 0,
      handlebarRise: 30,
    }
  });

  const handleChange = (e, setup) => {
    const { name, value } = e.target;
    // Immediately update the parent component's state with the new formValues
    setFormValues(prevValues => {
      const updatedValues = {
        ...prevValues,
        [setup]: {
          ...prevValues[setup],
          [name]: parseFloat(value) || 0, // Ensure NaN is not set; fallback to 0 if parseFloat fails
        },
      };
      // Call onUpdate here to immediately reflect changes
      onUpdate(updatedValues);
      return updatedValues;
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
        </div>
      </form>
    </div>
  );
};

export default BikeForm;

/*          <BikePlot geometry={formValues} onUpdateEnds={handlePlotUpdates} />
*/