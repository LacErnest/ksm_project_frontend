import React, { Component,Fragment } from "react";
import NewLanguageModal from "./NewLanguageModal";
import DeleteLanguage from "./DeleteLanguage";
import { MDBTooltip, MDBBtn,MDBIcon } from 'mdbreact';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider , {Search} from 'react-bootstrap-table2-toolkit';

import './homeLangue.css';
import '../../index.css';

const { SearchBar } = Search;

const headerSortingStyle = { backgroundColor: '#c8e6c9' };


function rowStyleFormat(row, rowIdx) {
  return {margin:'0px', backgroundColor: rowIdx % 2 === 0 ? 'white' : '#DCDCDC', height: 20 ,width:20 , padding: '2px 0',border: '9px solid red'};
}

class LanguesList extends Component {
  render() {
    console.log(this.props.langues)
    const langues = this.props.langues;

    const datatable={
        columns: [
          {
            dataField: 'code',
            text: 'Code',
            sort:true,
            headerStyle: {
              backgroundColor: '#FC7206'
            },
          },
          {
            dataField: 'name',
            text: 'Name',
            sort:true,
            headerStyle: {
              backgroundColor: '#FC7206'
            },
          },
          
          {
            dataField: 'is_default',
            text: 'Is_Default',
            sort:true,
            headerStyle: {
              backgroundColor: '#FC7206'
            },
          },
          {
            dataField: 'actions',
            text: 'Actions',
            headerStyle: {
              backgroundColor: '#FC7206'
            },
          },
        ],
        rows: [
          ...langues.map(langue=> {

            return{
                code:langue.code,
                name:langue.name,
                is_default:langue.is_default,
                actions:<Fragment>
                <Fragment>
                    <MDBTooltip placement="bottom">
                        <MDBBtn
                          id ="infos"
                          color="deep-orange"
                          className="btn-primary"
                          onClick={()=>{
                                this.props.onClick(langue)
                                var element_with_id_table=document.getElementById("table");
                                element_with_id_table.className="resizable-content-custom";

                            }
                          }
                        >
                        <i className="menu-item-icon icon ion-clipboard tx-14"></i>
                        </MDBBtn>
                        <div>Infos</div>
                    </MDBTooltip>
                </Fragment>
                {" "}
                <NewLanguageModal
                    create={false}
                    langue={langue}
                    resetState={this.props.resetState}
                />
                {" "}
                <DeleteLanguage
                     pk={langue.id}
                     resetState={this.props.resetState}
                />
                </Fragment>
            }
          }),
        ],
      };

    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
              Affichage de { from } à { to } sur { size } Résultats
        </span>
    );
    const options = {
                //page: 1,
                sizePerPageList: [ {
                        text: '3', value: 3
                        }, {
                        text: '5', value: 5
                        }, {
                        text: 'All', value: datatable.rows.length
                        } ],
                sizePerPage: 10,
                pageStartIndex: 1,
                paginationSize: 4,
                prePage: 'Prev',
                nextPage: 'Next',
                firstPage: 'First',
                lastPage: 'Last',
                nextPageTitle:'Suivant',
                prePageTitle:'Précédent',
                firstPageTitle:'Premier',
                lastPageTitle:'Dernier',
                paginationPosition: 'top',
                showTotal:true,
                paginationTotalRenderer: customTotal,
                //disablePageTitle: true,
        };

    console.log("datatable:  "+datatable.rows[0]);

    return (

        <ToolkitProvider
            keyField="code"
            data={ datatable.rows }
            columns={ datatable.columns }
            search
        >
            {
                props =>
                <div>
                    <SearchBar { ...props.searchProps } className='.searchbar' placeholder='Rechercher...'/>

                    <BootstrapTable
                      version="4"
                      size="sm"
                      trClassName="customClass"
                         rowStyle={rowStyleFormat}
                        responsive
                        striped
                        noDataIndication="Liste des Langues est vide"
                        hover
                        filter={ filterFactory() }//*/
                        pagination={ paginationFactory(options) }  { ...props.baseProps }  />
                </div>
            }
        </ToolkitProvider>




      
    );
  }
}

export default LanguesList;