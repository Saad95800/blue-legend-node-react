import React from 'react';
import { Document, Page } from 'react-pdf';
import pdfFile from './../docs/sample.pdf';

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};

class Sample extends React.Component{

    constructor(props){
        super(props);
    
        let expressions = [];
        let id_serie = '';
        
        if(this.props.data.app == 'server'){ // AppServer
            expressions = this.props.data.expressions;
            id_serie = this.props.data.id_serie;
        }
        this.state = {
          expressions: expressions,
          id_serie: id_serie,
          numPages: null,
          pageNumber: 1,
          file: pdfFile,
          numPages: null,
        }
    
      }
    
      onFileChange(event){
        this.setState({
          file: event.target.files[0],
        });
      }
    
      onDocumentLoadSuccess({ numPages }){
        alert("succes");
        this.setState({ numPages });
      }
    
      render() {
        // const { pageNumber, numPages } = this.state;
        const { pageNumber, file, numPages } = this.state;
        return (
          <div className="expression-container">
    
              <div className="Example__container__document">
                <Document
                  file={file}
                  onLoadSuccess={this.onDocumentLoadSuccess}
                  options={options}
                >
                  {
                    Array.from(
                      new Array(numPages),
                      (el, index) => (
                        <Page
                          key={`page_${index + 1}`}
                          pageNumber={index + 1}
                        />
                      ),
                    )
                  }
                </Document>
              </div>
    
          </div>
        );
      }
}



ReactDOM.render(<Sample />, document.querySelector('react-pdf'));