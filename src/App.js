
import React, { useState } from "react";
import { FormBuilder as FormBuilderIo, Formio } from "react-formio";
import { formIoData } from "./consts";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Print } from "./Print";
export default function App() {
  const localForm = localStorage.getItem('form')
  const [formData, setFormData] = useState(localForm ? JSON.parse(localForm) : formIoData);
  const [result, setResult] = useState([])
  const [isView, setIsView] = useState(false)

  const printResult = () => {
    if (formData.components[0].class === 'notDisplay' && formData.components.length === 1) setIsView(false)
    else setIsView(true)

    Formio.createForm(document.getElementById("formio-result"), {
      components: formData.components
    }).then((form) => {
      if (form.component.components && form.component.components.length > 0) {
        setResult(form.component.components)

      }
    });
  };
  localStorage.setItem('form', JSON.stringify(formData))
  return (
    <div className="App">
      <h2>Form builder playground: NGUYỄN VĂN KHÁNH</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="green" onClick={printResult} style={{ marginRight: '20px' }}>
          Save Form
        </button>
        <Print dataTableReport={result} isView={isView} />
      </div>
      <div>
        <FormBuilderIo
          form={formData}
          onSubmit={(data) => {
            // console.log(data);
          }}
          saveForm={(data) => setFormData(data)}
          saveText="Save Form"
          onSubmitDone={(data) => {
            // console.log(data)
          }}
        />
        <div style={{ display: "none" }}>
          <div id="formio-result" />
        </div>
      </div>
    </div>
  );
}
