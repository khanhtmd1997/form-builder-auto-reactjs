import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useEffect, useState } from "react";
import {
  _CENTER,
  _COLUMNS,
  _HIDEBORDER,
  _HTMLELEMENT,
  _LEFT,
  // _NOTDISPLAY,
  _RIGHT,
  _TABLE,
  _TAGH1,
  _TAGH2,
  _TAGH3,
  _TAGH4,
  _TAGH5,
  _TAGHP,
  _TITLETABLE,
  // _TRUESTRING
} from '../contants/index';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function View(props) {
  const { dataTableReport, dataAPI, dataMaster, isView } = props;
  const [pdfData, setPDFData] = useState({});

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

  // const attributes = {
  //   margin: '0.5',
  //   width: '10%',
  //   selectbox: 'true',
  //   birthday: 'true',
  //   sex: 'true'
  // }

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

  function generateOption(options, field) {
    if (options && options[field]) {
      return options[field]
        .split(";")
        .filter((item) => !!item)
        .map((item) => {
          // let temp = (item && item.split(":")[0]) ?? item;
          let temp = item.includes(":") ? item.split(":")[0] : item;
          return { label: item, value: temp };
        });
    }
    return [];
  }

  function getMargin(rawItem) {
    let margin = []
    if (rawItem.attributes && rawItem.attributes.margin !== undefined) {
      margin = rawItem.attributes.margin.split(',').map(Number)
    } else margin = []
    return margin
  }

  function getWidthsTable(rawItem) {
    let widths = []
    if (rawItem.attributes && rawItem.attributes.widths !== undefined) {
      widths = rawItem.attributes.widths.split(',').map(item => {
        if (parseInt(item) >= 0) return item = parseInt(item)
        else return item = '*'
      });
    } else widths = []
    return widths
  }

  function renderDataColumns(rawItem, data, dataChildItem) {
    let columns = []
    data.map(item => {
      return columns.push(switchHtmlElement(dataChildItem, item))
    })
    return {
      columns: columns,
      margin: rawItem.margin
    }
  }

  function renderTable(data, dataChildItem, rawItem) {
    let header = [];
    let body = [];
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        header.push(data[0])
      }
      else {
        body.push(data[i])
      }
    }

    return {
      margin: getMargin(rawItem),
      table: {
        heights: 15,
        widths: getWidthsTable(rawItem),
        body: [
          ...header,
          ...body
        ],
      },
      layout: {
        hLineWidth: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 2 : 1;
        },
        vLineWidth: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 2 : 1;
        },
        hLineColor: function (i, node) {
          return rawItem.customClass === _HIDEBORDER ? 'white' : 'black';
        },
        vLineColor: function (i, node) {
          return rawItem.customClass === 'hideborder' ? 'white' : 'black';
        },
        // hLineStyle: function (i, node) {
        //   if (i === 0 || i === node.table.body.length) {
        //     return null;
        //   }
        //   //dọc
        //   return { dash: { length: 1, space: 1 } };
        // },
        // vLineStyle: function (i, node) {
        //   if (i === 0 || i === node.table.widths.length) {
        //     return null;
        //   }
        //   //ngang
        //   return { dash: { length: 1 } };
        // },
      }
    }
  }

  function convertDataColumns(x, alignment, width, textColumns) {
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
    if (unique[1].name === undefined) {
      unique[1].id = ''
      unique[1].name = ''
    }
    let result = {
      text: unique.length === 1 ? unique[0].name : (unique[0].name + ' ' + unique[1].name),
      width,
      alignment,
      textColumns,
      // propertyValue,
    };
    return result
  }

  function convertDataTable(x, dataChildItem, alignment, textColumns) {

    let result = {}
    if (x.content !== '') {

      if (dataChildItem[x.key] !== undefined && dataChildItem[x.key] !== null) {
        result = {
          text: x.content + ' ' + textColumns,
          alignment,
          fontSize: setFontSize(x.tag)
        }

      }

      else result = {
        text: x.content,
        alignment,
        fontSize: setFontSize(x.tag)
      }
    } else {
      if (dataChildItem[x.key] !== undefined && dataChildItem[x.key] !== null)
        result = {
          text: textColumns,
          alignment,
          fontSize: setFontSize(x.tag)
        }
      else result = {
        text: textColumns,
        alignment,
        fontSize: setFontSize(x.tag)
      }
    }

    if (x.attributes && x.attributes.rowspan) {
      if (parseInt(x.attributes.rowspan) > 0) {
        result = {
          ...result,
          rowSpan: parseInt(x.attributes.rowspan),
          layout: x.className && x.className.indexOf('hideborder') ? true : false,
          fontSize: setFontSize(x.tag)
        }
      } else {
        result = {}
      }
    }
    if (x.attributes && x.attributes.colspan) {
      if (parseInt(x.attributes.colspan) > 0) {
        result = {
          ...result,
          colSpan: parseInt(x.attributes.colspan),
          border: x.className && x.className === _TITLETABLE ? [false, false, false, false] : [true, true, true, true],
          fontSize: setFontSize(x.tag)
        }
      } else {
        result = {}
      }
    }
    return result
  }

  function switchDataTable(dataChildItem, rawItem, dataMaster) {
    for (let i = 0; i < rawItem.rows.length; i++) {
      //check content not value => content = ''
      // eslint-disable-next-line
      rawItem.rows[i]?.map(item => {
        if (item.components.length === 0) item.components.push({ content: '' })
      });
    }
    // eslint-disable-next-line
    const data = rawItem.rows.map(row => row.map(child => Array.from(child.components, x => {
      let alignment = x.className && x.className.indexOf(_CENTER) > -1 ? _CENTER : x.className && x.className.indexOf(_RIGHT) > -1 ? _RIGHT : _LEFT;
      let width = (x.attributes && x.attributes.width !== '') ? x.attributes.width : '*';
      let propertyValue;
      let textColumns;

      if (x.key !== 'listData') {
        propertyValue = (x.attributes && x.attributes.birthday === 'true') ? formatDateJapan(dataChildItem[x.key]) : dataChildItem[x.key];
        textColumns = (x.attributes && x.attributes.selectbox === 'true' && x.attributes.sex === 'true')
          ? generateCheckBoxString(genderOption, propertyValue) : (x.attributes && x.attributes.birthday === 'true')
            ? formatDateJapan(dataChildItem[x.key]) : dataChildItem[x.key];

      } else {
        propertyValue = ''
        let text;
        if (x.tags[2] === undefined) text = generateCheckBoxString(generateOption(dataMaster, x.tags[0]), dataChildItem[x.tags[1]])
        else text = generateCheckBoxString(generateOption(dataMaster, x.tags[0]), dataChildItem[x.tags[1]]) + ' ' + generateCheckBoxString(generateOption(dataMaster, x.tags[2]), dataChildItem[x.tags[3]])

        if (x.attributes && x.attributes.textbefore) {
          textColumns = x.content + ' ' + text + ' ' + x.attributes.textbefore;
        } else textColumns = x.content + ' ' + text;
      }
      if (rawItem.label === _COLUMNS) {
        return convertDataColumns(x, alignment, width, textColumns)
      } else if (rawItem.type === _TABLE) return convertDataTable(x, dataChildItem, alignment, textColumns, width)

    })).reduce((prev, next) => {
      return prev.concat(next);
    }))
    if (rawItem.label === _COLUMNS) {
      return renderDataColumns(rawItem, data[0], dataChildItem)
    } else if (rawItem.type === _TABLE) {
      return renderTable(data, dataChildItem, rawItem)
    }

  }

  function setFontSize(tag) {
    let fontSize = 14;
    if (tag === _TAGH1) fontSize = 32
    else if (tag === _TAGH2) fontSize = 24
    else if (tag === _TAGH3) fontSize = 18.72
    else if (tag === _TAGH4 || tag === _TAGHP) fontSize = 16
    else if (tag === _TAGH5) fontSize = 13.28
    else fontSize = 10.72;

    return fontSize
  }

  function switchHtmlElement(dataChildItem, rawItem, dataMaster) {
    const fontSize = setFontSize(rawItem.tag)
    let style = {
      fontSize: fontSize,
    }

    return {
      text: rawItem.text,
      alignment: rawItem.alignment,
      width: rawItem.width,
      ...style,
      margin: rawItem.margin
    }
  }

  function renderDataSwitch(dataChildItem, rawItem, dataMaster) {
    let type = rawItem.type;
    switch (type) {
      case _HTMLELEMENT:
        let rawElement = {
          text: rawItem.content,
          alignment: rawItem.className.indexOf(_CENTER) > -1 ? _CENTER : rawItem.className.indexOf(_RIGHT) > -1 ? _RIGHT : _LEFT,
          margin: getMargin(rawItem)
        }
        return switchHtmlElement(dataChildItem, rawElement, dataMaster)
      case _COLUMNS:
        const dataItem = {
          rows: [],
          label: _COLUMNS,
          margin: getMargin(rawItem)
        }
        dataItem.rows.push(rawItem.columns)
        return switchDataTable(dataChildItem, dataItem, dataMaster)
      case _TABLE:
        console.log(rawItem);
        return switchDataTable(dataChildItem, rawItem, dataMaster)
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
      return drawTable(dataChildItem, rawItem, dataMaster);
    });
  }


  function buildPDFDefination(rawData) {
    let dd = {
      content: dataAPI.map(dataChildItem => drawContent(dataChildItem, rawData, dataMaster[0])),
    }
    return dd;
  }

  useEffect(() => {
    const pdfDefination = buildPDFDefination(dataTableReport);

    const index = pdfDefination.content[0].indexOf(undefined)
    pdfDefination.content[0].splice(index, 1)

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