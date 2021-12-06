
import React, { useState } from "react";
import { FormBuilder as FormBuilderIo, Formio } from "react-formio";
import '../assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import ViewPDF from "./viewPDF";
import { formIoData } from "../core/data";

export default function ReportAuto() {
  const localForm = localStorage.getItem('form')
  const [formData, setFormData] = useState(localForm ? JSON.parse(localForm) : formIoData);
  const [result, setResult] = useState([])
  const [isView, setIsView] = useState(false)
  const data = [
    {
      "id": 25,
      "riyousyaId": 270,
      "riyousyaName": "Name ACB",
      "riyousyaFurigana": "アアア",
      "riyousyaGender": 1,
      "riyousyaBirthDay": "1946-08-06",
      "sid": 59,
      "hyoukaDate": "2021-12-06",
      "makeDate": "2021-12-06",
      "tantoId": 34,
      "tantoName": "中本　峰子",
      "tantoFurigana": "ナカモトミネコ",
      "isBedsore": "1",
      "bedsorePartOther": "2",
      "bedsorePartFreeDescription": "fghfghfg",
      "bedsoreDateOfOnset": null,
      "isPastBedsore": null,
      "pastBedsorePart": "",
      "pastBedsorePartFreeDescription": null,
      "dailyDegree": null,
      "adlBathe": "1",
      "adlDietaryIntake": null,
      "adlDressingUpper": null,
      "adlDressingLower": "1",
      "kihonTurningOver": null,
      "kihonSittingContinuous": "0",
      "kihonTransfer": null,
      "kihonKeepStanding": null,
      "haisetuUrinationIncontinence": null,
      "haisetuDefecationIncontinence": null,
      "haisetuBalloonCatheter": null,
      "isBedsoreWithinThreeMonths": null,
      "depthEvaluation": "1",
      "leachateEvaluation": null,
      "sizeEvaluation": null,
      "infectionEvaluation": null,
      "granulationEvaluation": null,
      "necroticTissueEvaluation": null,
      "pocketSizeEvaluation": null,
      "mattersRelatedJobs": "fgh",
      "evaluationInterval": null,
      "removedPressureOnBed": null,
      "removedPressureOnChair": null,
      "skinCare": null,
      "improvedNutrition": null,
      "rehabilitation": null,
      "bedsoreOther": null,
      "kakuteif": 0,
      "table": {
        "rowOne": 'row 1',
        "rowTwo": 'row 2'
      }
    }
  ]
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
        <ViewPDF dataTableReport={result} dataAPI={data && data.length > 0 ? data : data === []} isView={isView} />
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
