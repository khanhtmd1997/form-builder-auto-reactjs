import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useEffect, useState } from "react";
import { _NUMBER, _PASSWORD, _TABLE, _TEXTAREA, _TEXTFIELD } from './contants';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function Print(props) {

  const { dataTableReport, isView } = props;

  function pdfTable(dataTable) {
    //
    let header = [];
    let body = [];
    let configWidth = [];
    for (let i = 0; i < dataTable.rows.length; i++) {
      //check content not value => content = ''
      // eslint-disable-next-line
      dataTable.rows[i]?.map(item => {
        if (item.components.length === 0) item.components.push({ content: '' })
      });
    }

    //convert array
    const data = dataTable.rows.map(row => row.map(child => Array.from(child.components, x => {
      let result = { text: x.content }
      if (x.attributes?.rowspan) {
        if (parseInt(x.attributes.rowspan) > 0) {
          result = {
            ...result,
            rowSpan: parseInt(x.attributes.rowspan),
          }
        } else {
          result = {}
        }
      }
      if (x.attributes?.colspan) {
        if (parseInt(x.attributes.colspan) > 0) {
          result = {
            ...result,
            colSpan: parseInt(x.attributes.colspan),
            border: x.className === 'titleTable' ? [false, false, false, false] : [true, true, true, true]
          }
        } else {
          result = {}
        }
      }
      if (x.attributes?.header) {
        if (x.attributes?.header === "true") {
          if (x.className !== 'hideBorder') {
            result = {
              ...result,
              border: [false, false, false, true],
            }
          } else {
            result = {
              ...result,
              border: [false, false, false, false],
            }
          }

        } else {
          result = {}
        }
      }

      return result
    }
    )).reduce((prev, next) => {
      return prev.concat(next);
    }))


    for (let i = 0; i < data.length; i++) {
      //header table
      if (i === 0) {
        header.push(data[0])
      }
      // //body table
      else {
        body.push(data[i])
      }
    }
    let lengthWidth = data[0]?.length
    for (let j = 0; j < lengthWidth; j++) {
      configWidth.push('*')

    }
    // if (lengthWidth <= 3) body.pop();
    return {
      table: {
        heights: 15,
        widths: configWidth,
        body: [
          ...header,
          ...body
        ]
      },
    }
  }

  // function dataContent(value) {
  //   // eslint-disable-next-line
  //   value.map(items => {
  //     switch (items.label) {
  //       case 'HTML':
  //         let fontSize = 14

  //         if (items.tag === 'h1') fontSize = 32
  //         else if (items.tag === 'h2') fontSize = 24
  //         else if (items.tag === 'h3') fontSize = 18.72
  //         else if (items.tag === 'h4') fontSize = 16
  //         else if (items.tag === 'h5') fontSize = 13.28
  //         else fontSize = 10.72

  //         return dd.content.push({
  //           text: items.className.indexOf('header') > -1 ? items.content + '\n\n' : items.content,
  //           style: {
  //             fontSize: fontSize,
  //             alignment: items.className.indexOf('center') > -1 ? 'center' : items.className.indexOf('left') > -1 ? 'left' : 'right'
  //           }
  //         })

  //       case _TABLE:
  //         //

  //         let header = [];
  //         let body = [];
  //         let configWidth = [];

  //         for (let i = 0; i < items.rows.length; i++) {
  //           //check content not value => content = ''
  //           // eslint-disable-next-line
  //           items.rows[i]?.map(item => {
  //             if (item.components.length === 0) item.components.push({ content: '' })
  //           });
  //         }

  //         //convert array
  //         const data = items.rows.map(row => row.map(child => Array.from(child.components, x => {
  //           let result = { text: x.content }
  //           if (x.attributes?.rowspan) {
  //             if (parseInt(x.attributes.rowspan) > 0) {
  //               result = {
  //                 ...result,
  //                 rowSpan: parseInt(x.attributes.rowspan),
  //               }
  //             } else {
  //               result = {}
  //             }
  //           }
  //           if (x.attributes?.colspan) {
  //             if (parseInt(x.attributes.colspan) > 0) {
  //               result = {
  //                 ...result,
  //                 colSpan: parseInt(x.attributes.colspan),
  //                 border: x.className === 'titleTable' ? [false, false, false, false] : [true, true, true, true]
  //               }
  //             } else {
  //               result = {}
  //             }
  //           }
  //           if (x.attributes?.header) {
  //             if (x.attributes?.header === "true") {
  //               if (x.className !== 'hideBorder') {
  //                 result = {
  //                   ...result,
  //                   border: [false, false, false, true],
  //                 }
  //               } else {
  //                 result = {
  //                   ...result,
  //                   border: [false, false, false, false],
  //                 }
  //               }

  //             } else {
  //               result = {}
  //             }
  //           }

  //           return result
  //         }
  //         )).reduce((prev, next) => {
  //           return prev.concat(next);
  //         }))

  //         for (let i = 0; i < data.length; i++) {

  //           //header table
  //           if (i === 0) {
  //             header.push(data[0])
  //           }
  //           // //body table
  //           else {
  //             body.push(data[i])
  //           }
  //         }

  //         let lengthWidth = data[0]?.length
  //         for (let j = 0; j < lengthWidth; j++) {
  //           configWidth.push('*')

  //         }

  //         // if (lengthWidth <= 3) body.pop();
  //         return dd.content.push({
  //           table: {
  //             heights: 15,
  //             widths: configWidth,
  //             body: [
  //               ...header,
  //               ...body
  //             ]
  //           },
  //         })

  //       case 'Columns':
  //         let textColumns = [];
  //         for (let i = 0; i < items.columns.length; i++) {
  //           textColumns = items.columns.map(row => Array.from(row.components, x => x.content)).reduce((prev, next) => {
  //             return prev.concat(next);
  //           })

  //         }
  //         // return dd.content.push({
  //         //   style: '',
  //         //   text: textColumns,
  //         //   layout: {
  //         //     vLineStyle: function (i, node) {
  //         //       console.log(i, node);
  //         //       if (i === 0 || i === node.table.widths.length) {
  //         //         return null;
  //         //       }
  //         //       //ngang
  //         //       return { dash: { length: 1 } };
  //         //     },
  //         //   }
  //         // })
  //         break

  //       case _TEXTFIELD:
  //         if (items.placeholder !== '' || items.placeholder !== undefined) return dd.content.push(items.placeholder)
  //         break;
  //       case _TEXTAREA:
  //         if (items.placeholder !== '' || items.placeholder !== undefined) return dd.content.push(items.placeholder)
  //         break;
  //       case _NUMBER:
  //         if (items.placeholder !== '' || items.placeholder !== undefined) return dd.content.push(items.placeholder)
  //         break;
  //       case _PASSWORD:
  //         if (items.placeholder !== '' || items.placeholder !== undefined) return dd.content.push(items.placeholder)
  //         break;
  //       // case "Checkbox":
  //       //     if (item.label !== '' || item.label !== undefined) return dd.content.push(item.label)
  //       //     break;


  //       // case "selectBoxes":
  //       //map item value 
  //       //     item.value
  //       //     if (item.label !== '' || item.label !== undefined) return dd.content.push(item.label)
  //       //     break;


  //       //     case 'HTML':
  //       //         if (item.content !== '' || item.content !== undefined) {
  //       //             if (value[0].label === 'HTML') {
  //       //                 object.alignment = 'center';
  //       //             } else if (value[1].label === 'HTML') {
  //       //                 object.alignment = 'right';
  //       //             }
  //       //             object.text = item.content;
  //       //         }
  //       //         console.log(object);
  //       //         return dd.content.push(object)
  //       //     // case 'content':
  //       //     //     if (item.content !== '' || item.content !== undefined) return dd.content.push(item.content)
  //       default:
  //         break;
  //     }
  //   })
  // }

  function drawChildItem(rawItem) {
    let type = rawItem.type;
    switch (type) {
      case "table":
        return pdfTable(rawItem);
      case 'htmlelement':
        let fontSize = 14

        if (rawItem.tag === 'h1') fontSize = 32
        else if (rawItem.tag === 'h2') fontSize = 24
        else if (rawItem.tag === 'h3') fontSize = 18.72
        else if (rawItem.tag === 'h4' || rawItem.tag === 'p') fontSize = 16
        else if (rawItem.tag === 'h5') fontSize = 13.28
        else fontSize = 10.72

        return {
          text: rawItem.content + '\n\n',
          style: {
            fontSize: fontSize,
            alignment: rawItem.className === 'center' ? 'center' : rawItem.className === 'left' ? 'left' : 'right'
          }
        }

      default:
        return "";
    }
  }

  function drawTable(rawData) {
    const body = rawData.rows.map((row) => {
      return row.map((rowItem) => {
        return rowItem.components?.map((component) => {
          console.log(component);
          if (component.rows.length >= 3) {
            if (component.rows[0].length !== component.rows[2].length) {
              if (component.rows[0].length !== component.rows[1].length) {
                component.rows.pop()
                component.rows.pop()
              } else component.rows.pop()
            }
          }
          return drawChildItem(component);
        })
      })
    });


    const widths = [];
    for (let i = 0; i < body[0].length; i++) {
      widths.push('*')
    }

    return {
      table: {
        body,
        widths,
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
          return { dash: { length: 1, space: 1 } };
        },
        vLineStyle: function (i, node) {
          if (i === 0 || i === node.table.widths.length) {
            return null;
          }
          //ngang
          return { dash: { length: 1 } };
        },
      }
    }
  }

  function drawContent(rawData) {
    return rawData.map((rawItem) => {
      if (rawItem.class === 'notDisplay' || rawItem.type !== "table") return
      else return drawTable(rawItem);
    });
  }

  const [pdfData, setPDFData] = useState({})

  function buildPDFDefination(rawData) {
    let dd = {
      content: drawContent(rawData),
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