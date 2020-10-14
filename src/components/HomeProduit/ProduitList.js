import React, { Component,Fragment } from "react";
import { Table } from "reactstrap";
import NewProduitModal from "./NewProduitModal";
import TablePagination from '@material-ui/core/TablePagination';
import ConfirmRemovalModal from "./ConfirmRemovalModal";
import { MDBDataTable,MDBTooltip, MDBBtn,MDBIcon } from 'mdbreact';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider , {Search} from 'react-bootstrap-table2-toolkit';

import './homeProduit.css';

const { SearchBar } = Search;

const headerSortingStyle = { backgroundColor: '#c8e6c9' };



class ProduitList extends Component {
  render() {

    const produits = this.props.produits;

    const datatable={
        columns: [
          {
            dataField: 'code',
            text: 'Code',
            sort:true,
            headerSortingStyle
            //filter: textFilter()

          },
          {
            dataField: 'name',
            text: 'Nom',
            sort:true,
            headerSortingStyle
          },
          {
            dataField: 'category',
            text: 'Catégorie',
            sort:true,
            headerSortingStyle
          },
          {
            dataField: 'user',
            text: 'Auteur',
            sort:true,
            headerSortingStyle

          },
          {
            dataField: 'actions',
            text: 'Actions',
          },
        ],
        rows: [
          ...produits.map(product=> {

            return{
                code:product.code,
                name:product.name,
                category:product.category,
                user:product.user,
                actions:<Fragment>
                <Fragment>
                    <MDBTooltip placement="bottom">
                        <MDBBtn
                          id="infos"
                          size="sm"
                          color="deep-orange"
                          //className="btn"//"btn-primary"
                          /*onClick={()=>{
                                var element_with_id_infos= document.getElementById("infos");
                                var element_with_id_table=document.getElementById("table");
                                element_with_id_table.className="resizable-content-custom";
                                element_with_id_infos.textContent=product.id;
                                }
                          }*/
                          onClick={()=>{
                                this.props.onClick(product)
                                var element_with_id_table=document.getElementById("table");
                                element_with_id_table.className="resizable-content-custom";

                            }
                          }


                          //style={{ minWidth: "200px" }}
                        >

                            <i className="menu-item-icon icon ion-clipboard tx-14"></i>
                        </MDBBtn>
                        <div>Infos</div>
                    </MDBTooltip>
                </Fragment>
                {" "}
                <NewProduitModal
                    create={false}
                    produit={product}
                    resetState={this.props.resetState}
                />
                {" "}
                <ConfirmRemovalModal
                     pk={product.id}
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
                        },  {
                        text: '10', value: 10
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
                        /*striped
                        hover
                        keyField='code'
                        data={ datatable.rows }
                        columns={ datatable.columns }*/
                        responsive
                        className="table table-bordered"
                        //striped
                        //rowStyle={ { backgroundColor: 'white' } }
                        noDataIndication="Liste des Produits vide"
                        hover
                        filter={ filterFactory() }//*/
                        pagination={ paginationFactory(options) }  { ...props.baseProps }  />
                </div>
            }
        </ToolkitProvider>




      
    );
  }
}

export default ProduitList;
