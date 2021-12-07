import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useEffect, useState } from "react";
import {
  _CENTER,
  _HIDEBORDER,
  _HTMLELEMENT,
  _LEFT,
  _NOTDISPLAY,
  _RIGHT,
  _TABLE,
  _TAGH1,
  _TAGH2,
  _TAGH3,
  _TAGH4,
  _TAGH5,
  _TAGHP,
  _TITLETABLE,
  _TRUESTRING
} from '../contants/index';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function View(props) {
  const { dataTableReport, dataAPI, dataMaster, isView } = props;
  const [pdfData, setPDFData] = useState({});

  const widthColumns = [
    'width5', 'width10', 'width15', 'width20', 'width25', 'width30', 'width35', 'width40', 'width45', 'width50',
  ];

  const genderOption = [
    {
      label: "男",
      value: 1,
    },
    {
      label: "女",
      value: 0,
    },
  ];

  const attributes = {
    margin: '0.5',
    width: '10%',
    selectbox: 'true',
    birthday: 'true',
    sex: 'true'
  }

  function calculateAge(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  function formatDateJapan(dateStr) {
    if (!dateStr) return "";

    let dob = new Date(dateStr);
    let age = calculateAge(dob);
    return (
      dob.getFullYear() +
      "年 " +
      (dob.getMonth() + 1) +
      "月 " +
      dob.getDate() +
      "日生（" +
      age +
      "歳）"
    );
  }

  function generateCheckBoxString(options, optionSelected) {
    let result = "";
    options.forEach(item => {
      if (item.value === optionSelected) {
        result += "■" + item.label;
      } else {
        result += "□" + item.label;
      }
    })
    return result;
  }

  function getMargin(rawItem) {
    let margin = []
    if (rawItem.attributes && rawItem.attributes.margin !== undefined) {
      margin = rawItem.attributes.margin.split(',').map(Number)
    } else margin = []
    return margin
  }

  function renderDataColumns(data, dataChildItem) {
    let columns = []
    data.map(item => {
      return columns.push(switchHtmlElement(dataChildItem, item))
    })

    return {
      columns: columns
    }
  }

  function convertData(x, dataChildItem) {
    let width = (x.attributes && x.attributes.width !== '') ? x.attributes.width : '*';
    let propertyValue = (x.attributes && x.attributes.birthday === 'true') ? formatDateJapan(dataChildItem[x.key]) : dataChildItem[x.key];
    let alignment = x.className && x.className.indexOf(_CENTER) > -1 ? _CENTER : x.className && x.className.indexOf(_RIGHT) > -1 ? _RIGHT : _LEFT;
    let textColumns = (x.attributes && x.attributes.selectbox === 'true' && x.attributes.sex === 'true') ? generateCheckBoxString(genderOption, propertyValue) : dataChildItem[x.key];
    let arr = [
      {
        id: x.content,
        name: x.content
      },
      {
        id: textColumns,
        name: textColumns
      }]
    const unique = arr.filter((v, i, a) => a.findIndex(t => (t.id === v.id && t.name === v.name)) === i)
    let result = {
      text: unique.length === 1 ? unique[0].name : (unique[0].name + ' ' + unique[1].name),
      width,
      alignment,
      textColumns,
      propertyValue
    };

    return result
  }

  function switchColumnsTable(dataChildItem, rawItem, dataMaster) {
    for (let i = 0; i < rawItem.rows.length; i++) {
      //check content not value => content = ''
      // eslint-disable-next-line
      rawItem.rows[i]?.map(item => {
        if (item.components.length === 0) item.components.push({ content: '' })
      });
    }
    const data = rawItem.rows.map(row => row.map(child => Array.from(child.components, x => {
      return convertData(x, dataChildItem)
      // let width = (x.attributes && x.attributes.width !== '') ? x.attributes.width : '*';
      // let propertyValue = (x.attributes && x.attributes.birthday === 'true') ? formatDateJapan(dataChildItem[x.key]) : dataChildItem[x.key];
      // let alignment = x.className && x.className.indexOf(_CENTER) > -1 ? _CENTER : x.className && x.className.indexOf(_RIGHT) > -1 ? _RIGHT : _LEFT;
      // let textColumns = (x.attributes && x.attributes.selectbox === 'true' && x.attributes.sex === 'true') ? generateCheckBoxString(genderOption, propertyValue) : dataChildItem[x.key];
      // let arr = [
      //   {
      //     id: x.content,
      //     name: x.content
      //   },
      //   {
      //     id: textColumns,
      //     name: textColumns
      //   }]
      // const unique = arr.filter((v, i, a) => a.findIndex(t => (t.id === v.id && t.name === v.name)) === i)
      // let result = {
      //   text: unique.length === 1 ? unique[0].name : (unique[0].name + ' ' + unique[1].name),
      //   width,
      //   alignment,
      //   textColumns,
      //   propertyValue
      // };

      // return result

    })).reduce((prev, next) => {
      return prev.concat(next);
    }))

    if (rawItem.label === 'columns') {
      return renderDataColumns(data[0], dataChildItem)
    }



  }

  function switchHtmlElement(dataChildItem, rawItem, dataMaster) {
    let fontSize = 14;
    if (rawItem.tag === _TAGH1) fontSize = 32
    else if (rawItem.tag === _TAGH2) fontSize = 24
    else if (rawItem.tag === _TAGH3) fontSize = 18.72
    else if (rawItem.tag === _TAGH4 || rawItem.tag === _TAGHP) fontSize = 16
    else if (rawItem.tag === _TAGH5) fontSize = 13.28
    else fontSize = 10.72;

    let style = {
      fontSize: fontSize,
    }

    return {
      text: rawItem.text,
      alignment: rawItem.alignment,
      width: rawItem.width,
      ...style
    }
  }

  function renderDataSwitch(dataChildItem, rawItem, dataMaster) {
    let type = rawItem.type;
    switch (type) {
      case "htmlelement":
        let rawElement = {
          text: rawItem.content,
          alignment: rawItem.className.indexOf(_CENTER) > -1 ? _CENTER : rawItem.className.indexOf(_RIGHT) > -1 === _RIGHT ? _RIGHT : _LEFT,
        }
        return switchHtmlElement(dataChildItem, rawElement, dataMaster)
      case 'columns':
        const dataItem = {
          rows: [],
          label: 'columns'
        }
        dataItem.rows.push(rawItem.columns)
        return switchColumnsTable(dataChildItem, dataItem, dataMaster)

      default:
        break;
    }
  }

  function drawTable(dataChildItem, rawData, dataMaster) {
    return renderDataSwitch(dataChildItem, rawData, dataMaster)
  }

  function drawContent(dataChildItem, rawData, dataMaster) {
    // eslint-disable-next-line
    return rawData.map((rawItem) => {
      // eslint-disable-next-line
      // if (rawItem.class === _NOTDISPLAY || (rawItem.type && rawItem.type !== _TABLE)) return
      return drawTable(dataChildItem, rawItem, dataMaster);
    });
  }


  function buildPDFDefination(rawData) {
    let dd = {
      content: dataAPI.map(dataChildItem => drawContent(dataChildItem, rawData, dataMaster)),
    }
    return dd;
  }

  useEffect(() => {
    const pdfDefination = buildPDFDefination(dataTableReport);
    setPDFData(pdfDefination)
    // eslint-disable-next-line
  }, [dataTableReport])

  const onClickPdfMakeHandler = async (pdfData) => {
    pdfMake.createPdf(pdfData).open();
  }

  return (
    <div>
      {
        isView ? <button onClick={() => onClickPdfMakeHandler(pdfData)} >View PDF</button>
          : null
      }
    </div>

  )
}