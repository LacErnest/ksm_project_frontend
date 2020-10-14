import React, { Component,Fragment } from "react";
import NewTaxeModal from "./NewTaxeModal";
import DeleteTaxations from "./DeleteTaxations";
import { MDBTooltip, MDBBtn} from 'mdbreact';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider , {Search} from 'react-bootstrap-table2-toolkit';

import './homeTaxe.css';
import '../../index.css';

const { SearchBar } = Search;


function rowStyleFormat(row, rowIdx) {
  return {margin:'0px', backgroundColor: rowIdx % 2 === 0 ? 'white' : '#DCDCDC', height: 20 ,width:20 , padding: '2px 0',border: '9px solid red'};
}

class TaxesList extends Component {
  render() {
   

    const taxes = this.props.taxes;

    const datatable={
     
        columns: [
          {
            dataField: 'name',
            text: 'Name',
            sort:true,
            headerStyle: {
              backgroundColor: '#FC7206'
            },
          
          },
          {
            dataField: 'value',
            text: 'Value',
            sort:true,
            headerStyle: {
              backgroundColor: '#FC7206'
            },
            
          },
          {
            dataField: 'description',
            text: 'Description',
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
          
          ...taxes.map(taxe=> {

            return{
                name:taxe.name,
                value:taxe.value,
                description:taxe.description,
                actions:<Fragment>
                <Fragment>
                    <MDBTooltip placement="bottom">
                        <MDBBtn
                           id ="infos"
                       
                          color="deep-orange"
                          onClick={()=>{
                                this.props.onClick(taxe)
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
                <NewTaxeModal
                    create={false}
                    taxe={taxe}
                    resetState={this.props.resetState}
                />
                {" "}
                <DeleteTaxations
                     pk={taxe.id}
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
            style={{ bgColor: '	FFFF00' }, {height:100} }
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
                        noDataIndication="Liste des Taxes vide"
                        hover
                        filter={ filterFactory() }
                        pagination={ paginationFactory(options) }  { ...props.baseProps } 
                       
                      
              
                         />
                       
                </div>
            }
        </ToolkitProvider>




      
    );
  }
}

export default TaxesList;