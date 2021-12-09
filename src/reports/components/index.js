
import React, { useState } from "react";
import { FormBuilder as FormBuilderIo, Formio } from "react-formio";
import '../assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import View from "./view";
import { formIoData } from "../core/data";

export default function ReportAuto() {
  const localForm = localStorage.getItem('form')
  const [formData, setFormData] = useState(localForm ? JSON.parse(localForm) : formIoData);
  const [result, setResult] = useState([])
  const [isView, setIsView] = useState(false)
  const data = [
    {
      adlBathe: '0',
      adlDietaryIntake: '0',
      adlDressingLower: '0',
      adlDressingUpper: '0',
      bedsoreDateOfOnset: "2021-12-07",
      bedsoreOther: null,
      bedsorePartFreeDescription: "ưerew",
      bedsorePartOther: '1',
      dailyDegree: 'J1',
      depthEvaluation: null,
      evaluationInterval: null,
      granulationEvaluation: null,
      haisetuBalloonCatheter: null,
      haisetuDefecationIncontinence: null,
      haisetuUrinationIncontinence: null,
      hyoukaDate: "2021-12-07",
      id: 31,
      improvedNutrition: null,
      infectionEvaluation: null,
      isBedsore: "1",
      isBedsoreWithinThreeMonths: null,
      isPastBedsore: "1",
      kakuteif: 0,
      kihonKeepStanding: null,
      kihonSittingContinuous: null,
      kihonTransfer: null,
      kihonTurningOver: '0',
      leachateEvaluation: null,
      makeDate: "2021-12-07",
      mattersRelatedJobs: null,
      necroticTissueEvaluation: null,
      pastBedsorePart: "",
      pastBedsorePartFreeDescription: null,
      pocketSizeEvaluation: null,
      rehabilitation: null,
      removedPressureOnBed: null,
      removedPressureOnChair: null,
      riyousyaBirthDay: "1946-08-06",
      riyousyaFurigana: "アアア",
      riyousyaGender: 1,
      riyousyaId: 270,
      riyousyaName: "あああ",
      sid: 59,
      sizeEvaluation: null,
      skinCare: null,
      tantoFurigana: "ナカモトミネコ",
      tantoId: 34,
      tantoName: "中本　峰子",
    },
    {
      adlBathe: '0',
      adlDietaryIntake: '0',
      adlDressingLower: '0',
      adlDressingUpper: '0',
      bedsoreDateOfOnset: "2021-12-07",
      bedsoreOther: null,
      bedsorePartFreeDescription: "ưerew",
      bedsorePartOther: '1',
      dailyDegree: 'J1',
      depthEvaluation: null,
      evaluationInterval: null,
      granulationEvaluation: null,
      haisetuBalloonCatheter: null,
      haisetuDefecationIncontinence: null,
      haisetuUrinationIncontinence: null,
      hyoukaDate: "2021-12-07",
      id: 31,
      improvedNutrition: null,
      infectionEvaluation: null,
      isBedsore: "1",
      isBedsoreWithinThreeMonths: null,
      isPastBedsore: "1",
      kakuteif: 0,
      kihonKeepStanding: null,
      kihonSittingContinuous: null,
      kihonTransfer: null,
      kihonTurningOver: '0',
      leachateEvaluation: null,
      makeDate: "2021-12-07",
      mattersRelatedJobs: null,
      necroticTissueEvaluation: null,
      pastBedsorePart: "",
      pastBedsorePartFreeDescription: null,
      pocketSizeEvaluation: null,
      rehabilitation: null,
      removedPressureOnBed: null,
      removedPressureOnChair: null,
      riyousyaBirthDay: "1946-08-06",
      riyousyaFurigana: "アアア",
      riyousyaGender: 1,
      riyousyaId: 270,
      riyousyaName: "あああ",
      sid: 59,
      sizeEvaluation: null,
      skinCare: null,
      tantoFurigana: "ナカモトミネコ",
      tantoId: 34,
      tantoName: "中本　峰子",
    }
  ]

  const dataMaster = [
    {
      adlnyuyoku: "0:自分で行っていない;1:自分で行っている",
      catheter: "0:無し;1:有り",
      enshou: "0:局所の炎症徴候なし（i0）;1:局所の炎症徴候あり(創周囲の発赤，腫脹，熱感，疼痛)（i1）;2:臨床的定着疑い（創面にぬめりがあり、浸出液が多い。肉芽があれば、浮腫性で脆弱など）（I3C）;3:局所の明らかな感染徴候あり(炎症徴候，膿，悪臭など) （I3）;4:全身的影響あり(発熱など)（I9）",
      esi: "0:壊死組織なし（n0）;1:柔らかい壊死組織あり（N3）;2:硬く厚い密着した壊死組織あり（N6）",
      jokusobui: "1:仙骨部;2:坐骨部;3:尾骨部;4:腸骨部;5:大転子部;6:踵部;7:その他",
      jokusohukasa: "0:皮膚損傷・発赤なし（d0）;1:持続する発赤（d1）;2:真皮までの損傷（d2）;3:皮下組織までの損傷（D3）;4:皮下組織を越える損傷 （D4）;5:関節腔，体腔に至る損傷 （D5）;6:深部損傷褥瘡（DTI)疑い（DDTI）;7:壊死組織で覆われ深さ判定が不能（DU）",
      jokusoookisa: "0:皮膚損傷なし（s0）;1:4未満（s3）;2:4以上16未満（s6）;3:16以上36未満（s8）;4:36以上64未満（s9）;5:64以上100未満（s12）;6:100以上（S15）",
      jokusopocket: "0:ポケットなし（p0）;1:4未満（P6）;2:4以上16未満（P9）;3:16以上36未満（P12）;4:36以上（P24）",
      jokusoumu: "0:無し;1:有り",
      kioreki: "0:無し;1:有り",
      koui: "0:自分で行っていない;1:自分で行っている",
      negaeri: "0:自分で行っていない;1:自分で行っている",
      nikuga: "0:創が治癒した場合、創の浅い場合、深部損傷褥瘡（DTI)疑いの場合（g0）;1:良性肉芽が創面の90%以上を占める（g1）;2:良性肉芽が創面の50%以上90%未満を占める（g3）;3:良性肉芽が創面の10%以上50%未満を占める（G4）;4:良性肉芽が創面の10%未満を占める（G5） ;5:良性肉芽が全く形成されていない（G6）",
      ritsui: "0:自分で行っていない;1:自分で行っている",
      shokuzisesshu: "0:自分で行っていない;1:自分で行っている;2:対象外",
      sikkin: "0:無し;1:有り;2:対象外",
      sinshutueki: "0:なし（e0）;1:少量：毎日のドレッシング交換を要しない（e1）;2:中等量：1日1回のドレッシング交換を要する（e3）;3:多量：1日2回以上のドレッシング交換を要する（E6）",
      zai: "0:自分で行っていない;1:自分で行っている",
      ziritsudo: ";自立;J1;J2;A1;A2;B1;B2;C1;C2",
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
        <View dataTableReport={result} dataAPI={data && data.length > 0 ? data : data === []} dataMaster={dataMaster} isView={isView} />
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
