import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";

const Column = () => {
  const [result, setResult] = useState(null);

  const validationSchema = Yup.object().shape({
    diameter: Yup.number().required("Required").min(8, "Min 8mm"),
    height: Yup.number().required("Required").min(1, "Height ≥ 1ft"),
    barsPerColumn: Yup.number().required("Required").min(1),
    totalColumns: Yup.number().required("Required").min(1),
    rebarsPerBundle: Yup.number().required("Required").min(1),
  });

  const calculate = (values) => {
    const { diameter, height, barsPerColumn, totalColumns, rebarsPerBundle } = values;
    const totalRebars = barsPerColumn * totalColumns;
    const weightPerMeter = { 8: 0.395, 10: 0.617, 12: 0.888, 16: 1.58, 20: 2.47, 25: 3.85 }[diameter];
    const totalWeight = (height * 0.3048 * totalRebars * weightPerMeter).toFixed(2);
    const totalBundles = Math.ceil(totalRebars / rebarsPerBundle);
    setResult({ totalWeight, totalBundles });
  };

  return (
    <Card className="p-4">
      <h3>Column Rebar Calculator</h3>
      <Formik
        initialValues={{ diameter: 8, height: 14, barsPerColumn: 4, totalColumns: 12, rebarsPerBundle: 20 }}
        validationSchema={validationSchema}
        onSubmit={calculate}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Diameter (mm)</Form.Label>
              <Form.Select name="diameter" onChange={handleChange} value={values.diameter}>
                <option value={8}>8mm</option>
                <option value={10}>10mm</option>
                <option value={12}>12mm</option>
                <option value={16}>16mm</option>
                <option value={20}>20mm</option>
                <option value={25}>25mm</option>
              </Form.Select>
            </Form.Group>

            {/* Repeat for other fields: height, barsPerColumn, etc. */}

            <Button type="submit" variant="primary">Calculate</Button>
            
            {result && (
              <div className="mt-4">
                <Alert variant="success">
                  Total Weight: <strong>{result.totalWeight} kg</strong><br />
                  Bundles Required: <strong>{result.totalBundles}</strong>
                </Alert>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default Column;
