import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get} from "../config/requisitions";

import { v4 as uuid } from 'uuid';
import { Pane, Pagination, Table, Select, Text, SearchInput, Group, IconButton, AddIcon } from 'evergreen-ui'
import UpsertPopUp from './UpsertPopUp';


function ListRecord(props){
    
    const [isShown, setIsShown] = React.useState(false)
    const objectId = props.objectId

    const relatedFrom = (props.relatedFrom)
    const completeView = (props.completeView != undefined) ? props.completeView : true

    const fields = (props.configurations.fields.filter(field => {return field.f_hide_on_list !== true}))
    const objectName = props.configurations.o_name
    const objectPluralLabel = props.configurations.o_plural_label
    const endpoint_get_page = props.configurations.endpoints.get_page.replace('{id}', props.objectId)
    

    const [objectListSelected, setObjectListSelected] = useState([])
    const [objectListShow, setObjectListShow] = useState([])
    const [displayNum, setDisplayNum] = useState(props.displayNum ? props.displayNum: 10)
    const [pageNum, setPageNum] = useState(1)
    const [maxPages, setMaxPages] = useState(1)
    const [numberOfElements, setNumberOfElements] = useState(0)
    const showSearch = (props.showSearch != undefined? props.showSearch: true)
    const showNumPerPage = (props.showNumPerPage != undefined? props.showNumPerPage: true)
    
    const relatedListIndex = (props.relatedListIndex != undefined? props.relatedListIndex: 1)
    
    var pdd = objectId && !completeView ? '0px': '0px 30px 0px 30px'

    useEffect(() => {        
        updateData(pageNum, displayNum)
    }, []);

    const numOp = [
        5,
        10,
        15,
        20,
        50,
        100
    ]

    return (
        <div style={{padding: pdd}}>
            {
                objectId && !completeView ?
                <>
                    <Pane style={{backgroundColor:"#e6e6eb", height:"30px", display:"flex", alignItems:"center", justifyContent:'space-between'}} elevation={1}>
                        <div style={{marginLeft:'50px', display:"flex", alignItems:"center"}}>
                            <Text size={500}>Relacionados - {objectPluralLabel} ({numberOfElements})</Text>

                            
                        </div>
                        <div style={{float: 'right'}}>  
                            <Group  size="medium">
                                <IconButton  icon={AddIcon}  appearance="minimal"  marginRight={10} onClick={()=>{setIsShown(true)}}/>
                            </Group>
                        </div>  
                    </Pane>
                    <br></br>
                </>
                :<></>

            }
            <div style={{display: 'flex', justifyContent:'flex-end', alignItems:'center'}}>
                {showSearch ?
                    <SearchInput onChange={(e) => {
                    let val = e.target.value

                    if(!val || objectListShow.length === 0){
                        updateData(pageNum, displayNum)
                    }else{
                        setObjectListShow(filterListByName(objectListShow, val))
                    }
                    
                }}/>
                :<></>
                }   

                {showNumPerPage ? 
                <div className="show" style={{padding: '10px', paddingRight:'30px'}}>
                    <Text>Exibir:</Text>
                    &nbsp;
                    <Select 
                            value={displayNum}
                            onChange={(e) => {
                            let op = e.target.value
                            updateData(pageNum, op);
                            setDisplayNum(op)
                        }}>
                        {
                            numOp.map(op=>(
                                <option value={op}>{op}</option>
                            ))
                        }
                    </Select>
                </div>
                :<></>
                }
            </div>
            
            <Table key={()=>{uuid()}}>
                <Table.Head>
                    <Table.TextHeaderCell maxWidth={50}>#</Table.TextHeaderCell>
                    {fields.map(field=>(
                        <Table.TextHeaderCell >{field.f_label}</Table.TextHeaderCell>
                    ))}
                </Table.Head>

                <Table.Body >
                    {
                        objectListShow.map(element=>(
                            <Table.Row key={element.id} isSelectable height={35}>
                                <Table.Cell maxWidth={50}>
                                    <input class="form-check-input" type="checkbox" value={element.id} id="flexCheckDefault" onClick={e=>{
                                            setObjectListSelected([...objectListSelected, e.target.value])
                                        }}/>
                                </Table.Cell>

                                {fields.map(field=>(
                                    <Table.TextCell>{
                                            (field.f_main === true) ? 
                                            
                                            <Link class="link-opacity-100" to={"/"+objectName+"/view?id="+element.id} >
                                                {formatValue(element[field.f_name], field)}

                                            </Link>
                                            
                                            :
                                            formatValue(element[field.f_name], field)
                                        }</Table.TextCell>     
                                ))}
                            </Table.Row>
                        ))
                    }
                </Table.Body  >

            </Table>
            <br></br>
            <div style={{display: 'flex', flexDirection:'column', alignItems:'center', justifyContent: 'center'}}>
                {completeView ? 
                    <>
                        <br></br>
                        <Text size={13}>Páginas</Text>

                        <Pagination page={pageNum} totalPages={maxPages} onNextPage={()=>{
                            addPage()
                        }}
                        onPreviousPage={()=>{
                            removePage()
                        }}
                        onPageChange={(page)=>{
                            setPage(page)
                        }}
                        ></Pagination>
                    </>
                :
                    <>
                        <Link class="link-opacity-100" to={"/"+relatedFrom+"/"+objectName+"/list/view?id="+objectId+"&rli="+relatedListIndex} >Visualizar tudo</Link>
                    </>
                }
            </div>
            <UpsertPopUp existsObject={{[relatedFrom]:{id:objectId}}} isShown={isShown} setIsShown={setIsShown} configurations={props.configurations}/>

        </div>
    )
    
    function removePage(){
        let newPnum = pageNum-1 
        if(newPnum === 0) return;
        setPageNum(newPnum)
        updateData(newPnum, displayNum)
    }
    
    function setPage(pnum){
        let newPnum = pnum

        if(newPnum === 0) return;

        setPageNum(newPnum)

        updateData(newPnum, displayNum)        
    }

    function addPage(){
        let newPnum = pageNum+1
        if(maxPages < newPnum) return;

        setPageNum(newPnum)
        updateData(newPnum, displayNum)

    }

    function filterListByName(list, searchString) {
        const normalizedSearch = searchString
          .toLocaleLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      
        return list.filter(item => {
          const normalizedItemName = item.name
            .toLocaleLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
      
          return normalizedItemName.includes(normalizedSearch);
        });
      }

    function updateData(page, display){
        get(endpoint_get_page+'?size='+display+'&page='+(page-1)).then(result=>{
            setMaxPages(result.totalPages)
            setNumberOfElements(result.totalElements)

            setObjectListShow(result.content)
        }).catch(error=>[
            
        ])

    }

    function formatMoney(val){
        let money;

        money = val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        return money;
    }

    function formatDate(localDateTimeArray){
        if(!localDateTimeArray) return;
        let  date = new Date(localDateTimeArray[0], localDateTimeArray[1] - 1, localDateTimeArray[2], localDateTimeArray[3], localDateTimeArray[4], localDateTimeArray[5]);

        // Format the date as "dd/mm/aaaa hh:mm"
        return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
        });
    }

    function formatValue(value, f){
        let val=value;
        switch(f.f_format){
            case "datetime":
                val = formatDate(value)

                break;

            case "user":
                val = value.name

                break;
            case "lookup":
                val = value ? value.name :''

                break;
            case "money":
                val = formatMoney(value)

                break;

        } 
        
        return val;
    }
}

export default ListRecord;