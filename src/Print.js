import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useEffect } from "react";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function Print(props) {

  const { data, isView } = props;
  const dd = {
    content: []
  }

  function dataContent(value) {

    // eslint-disable-next-line
    value.map(item => {
      switch (item.label) {
        case 'Table':
          let header = [];
          let body = [];
          for (let i = 0; i < item.numRows; i++) {
            if (i === 0) {
              // eslint-disable-next-line
              item.rows[0].map(item => {
                if (item.components.length === 0) item.components.push({ content: '' })
                // eslint-disable-next-line
                item.components.map(el => {
                  header.push(el.content)
                })
              })
            } else {
              // eslint-disable-next-line
              item.rows[i].map(item => {
                if (item.components.length === 0) item.components.push({ content: '' })
                // eslint-disable-next-line
                item.components.map((el) => {
                  body.push(el.content)
                })
              })
            }
          }

          return dd.content.push({
            style: '',
            table: {
              widths: [100, '*', 200, '*'],
              body: [
                header,
                body
              ]
            },
            layout: {
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return 'black';
              },
              vLineColor: function (i, node) {
                return 'black';
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
          })
        case "Text Field":
          if (item.placeholder !== '' || item.placeholder !== undefined) return dd.content.push(item.placeholder)
          break;
        case "Text Area":
          if (item.placeholder !== '' || item.placeholder !== undefined) return dd.content.push(item.placeholder)
          break;
        case "Number":
          if (item.placeholder !== '' || item.placeholder !== undefined) return dd.content.push(item.placeholder)
          break;
        case "Password":
          if (item.placeholder !== '' || item.placeholder !== undefined) return dd.content.push(item.placeholder)
          break;
        // case "Checkbox":
        //     if (item.label !== '' || item.label !== undefined) return dd.content.push(item.label)
        //     break;


        // case "selectBoxes":
        //map item value 
        //     item.value
        //     if (item.label !== '' || item.label !== undefined) return dd.content.push(item.label)
        //     break;


        //     case 'HTML':
        //         if (item.content !== '' || item.content !== undefined) {
        //             if (value[0].label === 'HTML') {
        //                 object.alignment = 'center';
        //             } else if (value[1].label === 'HTML') {
        //                 console.log(1231232131);
        //                 object.alignment = 'right';
        //             }
        //             object.text = item.content;
        //         }
        //         console.log(object);
        //         return dd.content.push(object)
        //     // case 'content':
        //     //     if (item.content !== '' || item.content !== undefined) return dd.content.push(item.content)
        default:
          break;
      }
    })
  }

  useEffect(() => {
    dataContent(data);
    // eslint-disable-next-line
  }, [data])

  const onClickPdfMakeHandler = async (data) => {
    pdfMake.createPdf(data).open();
  }

  return (
    <div>
      {
        isView ? <button onClick={() => onClickPdfMakeHandler(dd)} >View PDF</button>
          : null
      }
    </div>

  )
}