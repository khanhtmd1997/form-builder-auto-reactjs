

import React, { useState } from "react";
import { FormBuilder as FormBuilderIo, Formio } from "react-formio";

import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/css/index.css';
import "formiojs/dist/formio.full.css";
import 'antd/dist/antd.css';
import View from "./view";
import { formIoData, form } from "../core/data";
import { Button, Select } from "antd";

const { Option } = Select
const defaultData = [
  { id: 1, name: '' }
]
function ReportAuto() {
  const localForm = localStorage.getItem('form')
  const valueDefault = localStorage.getItem('defaultForm')
  const dataDefault = localStorage.getItem('dataDefault')
  const dataMasterDefault = localStorage.getItem('dataMasterDefault')
  const valueDataDefault = localStorage.getItem('valueDataDefault')

  const [add, setAdd] = useState(true)
  const [valueForm, setValueForm] = useState(valueDefault !== null && valueDefault !== 'null' ? parseInt(valueDefault) : 1);
  const [dataForm,] = useState(form);
  const [formData, setFormData] = useState(localForm ? JSON.parse(localForm) : formIoData);
  const [result, setResult] = useState([])
  const [isView, setIsView] = useState(false);
  const [getValue, setGetValue] = useState(valueDataDefault ? valueDataDefault : 1);
  const [getData, setGetData] = useState(dataDefault ? JSON.parse(dataDefault) : defaultData)
  const [getDataMaster, setGetDataMaster] = useState(dataMasterDefault ? JSON.parse(dataMasterDefault) : [])
  // const []

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

  const dataTable = [
    {
      id: 1,
      date: 'H29.6.1',
      userName: '小畑ための',
      content: '良眠',
      manager: '福島彩花 ',
    },
    {
      id: 2,
      date: 'H29.6.1 02:00',
      userName: '小畑ための',
      content: '良眠',
      manager: '福島彩花 ',
    },
    {
      id: 3,
      date: 'H29.6.1 04:00',
      userName: '小畑ための',
      content: '良眠',
      manager: '福島彩花 ',
    },
    {
      id: 4,
      date: 'H29.6.1 05:30',
      userName: '小畑ための',
      content: 'KT36.2 P71 BP167/67',
      manager: '福島彩花 ',
    },
    {
      id: 5,
      date: 'H29.6.1 06:30',
      userName: '小畑ための',
      content: 'KT36.2 P71 BP167/67',
      manager: '福島彩花 ',
    },
    {
      id: 6,
      date: 'H29.6.1 06:30',
      userName: '小畑ための',
      content: '',
      manager: '福島彩花 ',
    },
    {
      id: 7,
      date: 'H29.6.1 06:30',
      userName: '小畑ための',
      content: '',
      manager: '福島彩花 ',
    },
    {
      id: 8,
      date: 'H29.6.1 07:00',
      userName: '小畑ための',
      content: 'ポカリ(200) ',
      manager: '福島彩花 ',
    },
    {
      id: 9,
      date: 'H29.6.1 07:00',
      userName: '小畑ための',
      content: 'トイレ(+)',
      manager: '福島彩花 ',
    },
    {
      id: 10,
      date: 'H29.6.1 07:00',
      userName: '小畑ための',
      content: '朝(7/5)',
      manager: '福島彩花 ',
    }
  ]

  function changeForm(value) {
    setValueForm(value)
    // eslint-disable-next-line
    dataForm.map(item => {
      if (value === item.id) setFormData(JSON.parse(item.dataJson))
    })

    setIsView(false)
  }

  function addReport() {
    setAdd(true)
    setValueForm(1)
    setFormData(formIoData)
    setGetValue(1)
    setGetData(defaultData)
  }

  function changeData(value) {
    setGetValue(value)
    if (parseInt(value) === 2) setGetData(dataTable)
    else if (parseInt(value) === 3) {
      setGetDataMaster(dataMaster)
      setGetData(data)
    }
    else setGetData(defaultData)
  }

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
  localStorage.setItem('defaultForm', valueForm)
  localStorage.setItem('dataDefault', JSON.stringify(getData))
  localStorage.setItem('dataMasterDefault', JSON.stringify(getDataMaster))
  localStorage.setItem('valueDataDefault', getValue)

  // const width = window.innerWidth;
  return (
    // <Modal
    //     visible={props.viewReport}
    //     closable={false}
    //     onOk={props.closeReport}
    //     onCancel={props.closeReport}
    //     footer={[
    //         <Button key="back" onClick={props.closeReport}>Close</Button>,
    //         <Button
    //             key="submit"
    //             type="primary"
    //             onClick={props.closeReport}
    //         >
    //             OK
    //         </Button>,
    //     ]}
    //     width={1920}
    // >
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px', marginTop: '16px', alignItems: 'center' }}>
        <div style={{ flex: '0 0 6%' }}>Choice data</div>
        <div style={{ flex: '0 0 15%' }} onChange={changeData}>
          <Select placeholder="Choice data" defaultValue={getValue.toString()} value={getValue.toString()} onChange={changeData} style={{ width: "250px" }}>
            <Option value="1">Data default</Option>
            <Option value="2">Data table default</Option>
            <Option value="3">Data table screening care plan</Option>
          </Select>
        </div>
        <div style={{ flex: '0 0 6%' }}>Choice form</div>
        <div style={{ flex: '0 0 15%' }}>
          <Select defaultValue={valueForm} value={valueForm} onChange={changeForm} style={{ width: "250px" }}>
            {
              dataForm && dataForm.length > 0 ?
                dataForm.map((item, index) => {
                  return <Option value={item.id} key={index}>{item.name}</Option>
                }) : null
            }
          </Select>
        </div>

      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
        <div style={{ flex: '0 0 10%' }}>
          <Button className="btn-primary" type="success" onClick={addReport}>Add Report Form</Button>
        </div>
        <Button type="primary" onClick={printResult} style={{ marginRight: '24px' }}>
          Save Report Form
        </Button>
        <View dataTableReport={result} dataAPI={getData && getData.length > 0 ? getData : []} dataMaster={getDataMaster} isView={isView} />
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
    // <div>dfuwoiruewoiruewoiruewoiruewoiruewio</div>

  );
}

export default ReportAuto;
// const mapStateToProps = (state) => {
//     return {
//         tantoList: state.tantoMaster.data,
//         jokusoPlanList: state.jokusoPlan.jokusoPlanList,
//         lifeYougoNaiyou: state.jokusoPlan.lifeYougoNaiyou,
//         loading: state.jokusoPlan.loading,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         loadTantoMaster: () => dispatch(TantoMasterActions.getBySid()),
//         kobetsuCopy: (fromDate, toDate, createDate, createTantoId, fromDateCheck, toDateCheck, callback) => dispatch(LifeActions.kobetsuCopy(fromDate, toDate, createDate, createTantoId, fromDateCheck, toDateCheck, callback)),
//         jokusoPlanCopy: (fromDate, toDate, createDate, createTantoId, fromDateCheck, toDateCheck, callback) => dispatch(LifeActions.jokusoPlanCopy(fromDate, toDate, createDate, createTantoId, fromDateCheck, toDateCheck, callback)),
//         exportData: (fromDate, toDate, callback) => dispatch(LifeActions.exportData(fromDate, toDate, callback)),
//         downloadCsv: (type) => dispatch(LifeActions.downloadCsv(type)),
//         getJokusoPlanByIds: (data) => dispatch(JokusoPlan.getJokusoPlanByIds(data)),
//         getLifeYougoMaster: () => dispatch(JokusoPlan.getLifeYougoMaster()),
//     };
// };
// const ReportAutoContainer = connect(mapStateToProps, mapDispatchToProps)(ReportAuto);

// export { ReportAutoContainer as ReportAuto };
