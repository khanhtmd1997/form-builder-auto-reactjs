import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useEffect } from "react";
import { _NUMBER, _PASSWORD, _TABLE, _TEXTAREA, _TEXTFIELD } from './contants';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function Print(props) {

  const { data, isView } = props;
  const dd = {
    content: [],
    styles: {}
  }

  function dataContent(value) {

    // eslint-disable-next-line
    value.map(items => {

      switch (items.label) {
        case 'HTML':
          let fontSize = 14

          if (items.tag === 'h1') fontSize = 32
          else if (items.tag === 'h2') fontSize = 24
          else if (items.tag === 'h3') fontSize = 18.72
          else if (items.tag === 'h4') fontSize = 16
          else if (items.tag === 'h5') fontSize = 13.28
          else fontSize = 10.72

          return dd.content.push({
            text: items.content,
            style: {
              fontSize: fontSize,
              alignment: items.className === 'center' ? 'center' : items.className === 'left' ? 'left' : 'right'
            }
          })

        case _TABLE:
          let header = [];
          let body = [];

          for (let i = 0; i < items.rows.length; i++) {
            //check content not value => content = ''
            // eslint-disable-next-line
            items.rows[i]?.map(item => {
              if (item.components.length === 0) item.components.push({ content: '' })
            });

            //convert array
            const data = items.rows.map(row => row.map(child => Array.from(child.components, x => x.content)).reduce((prev, next) => {
              return prev.concat(next);
            }))

            //header table
            if (i === 0) {
              header.push(data[0])
            }
            //body table
            else {
              body.push(data[i])
            }
          }

          //get data render pdf
          return dd.content.push({
            style: '',
            table: {
              heights: 15,
              widths: [100, '*', 200, '*'],
              body: [
                ...header,
                ...body
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

        case 'Columns':
          let textColumns = [];
          for (let i = 0; i < items.columns.length; i++) {
            textColumns = items.columns.map(row => Array.from(row.components, x => x.content)).reduce((prev, next) => {
              return prev.concat(next);
            })
            console.log(textColumns);

          }
          // return dd.content.push({
          //   style: '',
          //   text: textColumns,
          //   layout: {
          //     vLineStyle: function (i, node) {
          //       console.log(i, node);
          //       if (i === 0 || i === node.table.widths.length) {
          //         return null;
          //       }
          //       //ngang
          //       return { dash: { length: 1 } };
          //     },
          //   }
          // })
          break

        case _TEXTFIELD:
          if (items.placeholder !== '' || items.placeholder !== undefined) return dd.content.push(items.placeholder)
          break;
        case _TEXTAREA:
          if (items.placeholder !== '' || items.placeholder !== undefined) return dd.content.push(items.placeholder)
          break;
        case _NUMBER:
          if (items.placeholder !== '' || items.placeholder !== undefined) return dd.content.push(items.placeholder)
          break;
        case _PASSWORD:
          if (items.placeholder !== '' || items.placeholder !== undefined) return dd.content.push(items.placeholder)
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