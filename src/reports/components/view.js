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
  _TAGH6,
  _TAGHP,
  _TITLETABLE,
  // _TRUESTRING
} from '../contants/index';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function View(props) {
  const { dataTableReport, dataAPI, dataMaster, isView } = props;
  const [pdfData, setPDFData] = useState({});

  //option giới tính
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

  //tính tuổi
  function calculateAge(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  //format date kiểu nhật
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

  //format date - thành /
  function formatDate(dateStr) {
    return dateStr ? dateStr.replaceAll("-", "/") : "";
  }

  //nối chuỗi checkbox
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

  function generateOptionArray(options, field, firstPosition, endPosition) {
    if (options && options[field]) {
      let optionsArr = options[field].split(";").filter((item) => !!item);
      const startIndex = firstPosition || 0;
      const endIndex = endPosition || optionsArr.length;
      let resultOptions = [];
      for (let i = startIndex; i < endIndex; i++) {
        let temp = optionsArr[i].includes(":")
          ? optionsArr[i].split(":")[0]
          : optionsArr[i];
        resultOptions.push({ label: optionsArr[i], value: temp });
      }
      return resultOptions;
    }
    return [];
  }

  function generateCheckBoxArray(options, optionSelected) {
    return options.map(item => {
      if (item.value === optionSelected)
        return " ■" + item.label;
      else
        return " □" + item.label;
    })
  }

  //return margin
  function getMargin(rawItem) {
    let margin = []
    if (rawItem.attributes && rawItem.attributes.margin !== undefined) {
      margin = rawItem.attributes.margin.split(',').map(Number)
    } else margin = []
    return margin
  }

  //return sang trang
  function getBreakPage(rawItem) {
    let pagebreak = ''
    if (rawItem.attributes && rawItem.attributes.pagebreak !== undefined) {
      pagebreak = rawItem.attributes.pagebreak
    } else pagebreak = ''
    return pagebreak
  }

  //widths table
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

  //widths table
  function getHeightsTable(rawItem) {
    let heights = []
    if (rawItem.attributes && rawItem.attributes.heights !== undefined) {
      heights = rawItem.attributes.heights.split(',').map(item => {
        if (parseInt(item) >= 0) return item = parseInt(item)
        else return item = '*'
      });
    } else heights = []
    return heights
  }

  //render data cho columns
  function renderDataColumns(rawItem, data, dataChildItem) {
    let columns = []
    data.map(item => {
      return columns.push(switchHtmlElement(dataChildItem, item))
    })
    return {
      columns: columns,
      margin: rawItem.margin,
      pageBreak: rawItem.pageBreak
    }
  }

  //render data cho table
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
        heights: getHeightsTable(rawItem),
        widths: getWidthsTable(rawItem),
        body: [
          ...header,
          ...body
        ],
      },
      pageBreak: getBreakPage(rawItem),
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

  //convert data columns
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
    if (unique[1] !== undefined && unique[1].name === undefined) {
      unique[1].id = ''
      unique[1].name = ''
    }
    let result = {
      text: unique.length === 1 ? unique[0].name : (unique[0].name + ' ' + unique[1].name),
      width,
      alignment,
      textColumns,
      margin: getMargin(x)
      // propertyValue,
    };
    return result
  }

  //convert data table
  function convertDataTable(x, dataChildItem, alignment, textColumns, listArr) {
    let result = {};

    if (x.content !== '') {
      if (dataChildItem[x.key] !== undefined && dataChildItem[x.key] !== null) {
        result = {
          text: x.content + ' ' + textColumns,
          alignment,
          fontSize: setFontSize(x.tag),
          margin: getMargin(x)
        }

      }

      else result = {
        text: x.content,
        alignment,
        fontSize: setFontSize(x.tag),
        margin: getMargin(x)
      }
    } else {
      if (dataChildItem[x.key] !== undefined && dataChildItem[x.key] !== null)
        result = {
          text: textColumns,
          alignment,
          fontSize: setFontSize(x.tag),
          margin: getMargin(x)
        }
      else result = {
        text: textColumns,
        alignment,
        fontSize: setFontSize(x.tag),
        margin: getMargin(x)
      }
    }

    if (x.attributes && x.attributes.rowspan) {
      if (parseInt(x.attributes.rowspan) > 0) {
        result = {
          ...result,
          rowSpan: parseInt(x.attributes.rowspan),
          layout: x.className && x.className.indexOf('hideborder') ? true : false,
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
          // fontSize: setFontSize(x.tag)
        }
      } else {
        result = {}
      }
    }

    if (listArr) {
      result = {
        ...result,
        text: '',
        type: "none",
        ol: listArr ? textColumns : []
      }
    }

    return result
  }

  //switch type data
  function switchDataTable(dataChildItem, rawItem, dataMaster) {
    for (let i = 0; i < rawItem.rows.length; i++) {
      //check content not value => content = ''
      // eslint-disable-next-line
      rawItem.rows[i].map(item => {
        if (item.components.length === 0) item.components.push({ content: '' })
      });
    }
    // eslint-disable-next-line
    const data = rawItem.rows.map(row => row.map(child => Array.from(child.components, x => {
      let alignment = x.className && x.className.indexOf(_CENTER) > -1 ? _CENTER : x.className && x.className.indexOf(_RIGHT) > -1 ? _RIGHT : x.className && x.className.indexOf('justify') > -1 ? 'justify' : _LEFT;
      let width = (x.attributes && x.attributes.width !== '') ? x.attributes.width : '*';
      let textColumns;
      let listArr = false;
      if (x.key !== 'listData') {
        // propertyValue = (x.attributes && x.attributes.birthday === 'true') ? formatDateJapan(dataChildItem[x.key]) : dataChildItem[x.key];
        textColumns = (x.attributes && x.attributes.selectbox === 'true' && x.attributes.sex === 'true')
          ? generateCheckBoxString(genderOption, dataChildItem[x.key]) : (x.attributes && x.attributes.birthday === 'true')
            ? formatDateJapan(dataChildItem[x.key]) : (x.attributes && x.attributes.formatdate === 'true')
              ? formatDate(dataChildItem[x.key])
              : (x.attributes && x.attributes.birthday === 'true') ? formatDateJapan(dataChildItem[x.key]) : dataChildItem[x.key];

      } else {
        let text;
        if (x.attributes && x.attributes.listitem === undefined) {
          listArr = false;
          if (x.tags[2] === undefined) text = generateCheckBoxString(generateOption(dataMaster, x.tags[0]), dataChildItem[x.tags[1]])
          else text = generateCheckBoxString(generateOption(dataMaster, x.tags[0]), dataChildItem[x.tags[1]]) + ' ' + generateCheckBoxString(generateOption(dataMaster, x.tags[2]), dataChildItem[x.tags[3]])

          if (x.attributes && x.attributes.textbefore) {
            textColumns = text + ' ' + x.attributes.textbefore;
          } else textColumns = x.content + ' ' + text;

        } else {
          listArr = true;
          if (x.tags[2] === undefined) text = generateCheckBoxArray(generateOptionArray(dataMaster, x.tags[0], x.attributes.first, x.attributes.last), dataChildItem[x.tags[1]])
          else text = generateCheckBoxArray(generateOptionArray(dataMaster, x.tags[0], x.attributes.first, x.attributes.last), dataChildItem[x.tags[1]]) + ' ' + generateCheckBoxArray(generateOptionArray(dataMaster, x.tags[2], x.attributes.first, x.attributes.last), dataChildItem[x.tags[3]])
          textColumns = text
        }

      }

      if (rawItem.label === _COLUMNS) {
        return convertDataColumns(x, alignment, width, textColumns)
      } else if (rawItem.type === _TABLE) return convertDataTable(x, dataChildItem, alignment, textColumns, listArr)

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
    else if (tag === _TAGH6) fontSize = 8;
    else fontSize = 7
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

  function setFieldElement(item) {
    return {
      text: item.content,
      alignment: item.className && item.className.indexOf(_CENTER) > -1 ? _CENTER : item.className && item.className.indexOf(_RIGHT) > -1 ? _RIGHT : item.className && item.className.indexOf('justify') > -1 ? 'justify' : _LEFT,
      margin: getMargin(item),
      pageBreak: getBreakPage(item),
    }


  }

  function drawManyTable(dataChildItem, rawItem, dataMaster) {
    const body = rawItem.rows.map((row) => {
      return row.map((rowItem) => {
        return rowItem.components?.map((component) => {
          if (component.rows?.length >= 3) {
            if (component.rows[0]?.length !== component.rows[2]?.length) {
              if (component.rows[0]?.length !== component.rows[1]?.length) {
                component.rows.pop()
                component.rows.pop()
              } else component.rows.pop()
            }
          }

          if (component.numRows !== component.rows?.length) {
            component.rows.pop()
          }
          if (component.type === _HTMLELEMENT) {
            let rawElement = setFieldElement(component)
            return switchHtmlElement(dataChildItem, rawElement, dataMaster);
          }
          else return switchDataTable(dataChildItem, component, dataMaster);
        })
      })
    });

    return {
      table: {
        body,
        widths: getWidthsTable(rawItem),
      },
      layout: {
        hLineWidth: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 2 : 1;
        },
        vLineWidth: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 2 : 1;
        },
        hLineColor: function (i, node) {
          return 'white';
        },
        vLineColor: function (i, node) {
          return 'white';
        },
        hLineStyle: function (i, node) {
          if (i === 0 || i === node.table.body.length) {
            return null;
          }
          //dọc
          return { dash: { length: 1, space: 4 } };
        },
        vLineStyle: function (i, node) {
          if (i === 0 || i === node.table.widths.length) {
            return null;
          }
          //ngang
          return { dash: { length: 4 } };
        },
      }
    }
  }

  function renderDataSwitch(dataChildItem, rawItem, dataMaster) {
    let type = rawItem.type;
    switch (type) {
      case _HTMLELEMENT:
        let rawElement = setFieldElement(rawItem)

        return switchHtmlElement(dataChildItem, rawElement, dataMaster)
      case _COLUMNS:
        const dataItem = {
          rows: [],
          label: _COLUMNS,
          margin: getMargin(rawItem),
          pageBreak: getBreakPage(rawItem),
        }

        dataItem.rows.push(rawItem.columns)
        return switchDataTable(dataChildItem, dataItem, dataMaster)
      case _TABLE:
        if (rawItem.attributes && rawItem.attributes.manytable !== undefined) {
          return drawManyTable(dataChildItem, rawItem, dataMaster)
        }
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
    pdfMake.fonts = {
      ipagp: {
        normal: "ipagp.ttf",
        bold: "ipagp.ttf",
        italics: "ipagp.ttf",
        bolditalics: "ipagp.ttf",
      }
    };
    let dd = {
      content: dataAPI.map(dataChildItem => drawContent(dataChildItem, rawData, dataMaster[0])),
      defaultStyle: {
        font: 'ipagp'
      }
    }
    return dd;
  }

  useEffect(() => {
    const pdfDefination = buildPDFDefination(dataTableReport);

    // const index = pdfDefination.content[0].indexOf(undefined)
    // pdfDefination.content[0].splice(index, 1)
    console.log(pdfDefination);
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