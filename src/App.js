import {useState,useEffect} from 'react';
import './App.css';
//import {listGames} from './dataSource.js';
import DataTable from './gridComponent';
import FormPropsTextFields from './form';
import { Grid, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const seedData = [
  { id: 1, duration_second: 600, game_type: 'answer question', emoji: '😎', name: 'Test Game', 
  question_md: 'multiline text one line per card', random_card_order: true, 
  tags: 'tag 1, tag 2', weight: 1000},
  { id: 2, duration_second: 300, game_type: 'guess question', emoji: '😎😎', name: 'Test Game', 
  question_md: 'multiline text one line per card', random_card_order: false, 
  tags: 'tag 3, tag 4', weight: 1000},
];

const emptyRow = { id: '', duration_second: '', game_type: '', emoji: '', name: '', 
question_md: '', random_card_order: '', 
tags: '', weight: ''};



function App() {
  const [rows,setRows] = useState(seedData);
  const [selRow,setSelRow] = useState(Object.assign({},emptyRow));
  

  const onSelect = (sel) => {
    //console.log('onSelectionChange: ',sel);
    setSelRow(sel.isSelected ? sel.data : Object.assign({},emptyRow));
  };


  // Return a new array with one item  updated 
  const updateRowItem = (rows,item) => {
    const index = rows.findIndex(row => row.id === item.id);
    if (index >= 0) {
      return rows.slice(0,index).concat([item],rows.slice(index+1,rows.length));
    }
    return [].concat(rows);
  }

  // Return a new arry with one specified item deleted
  const deleteRowItem = (rows,item) => {
    const index = rows.findIndex(row => row.id === item.id);
    if (index >= 0) {
      return rows.slice(0,index).concat(rows.slice(index+1,rows.length));
    }
    return [].concat(rows);
  }

  // Update an existing row / Create a new row
  const onSave = (newRowData) => {
    // Update a row
    if (selRow.id !== '') {
      //submitData.tags = submitData.tags.split(',');
      newRowData.random_card_order = (newRowData.random_card_order === 'true' ? true : false);
      newRowData.id = selRow.id;
      setSelRow(newRowData);
      setRows(updateRowItem(rows,newRowData));
      console.log("onSave: ",rows);
    }
    else{
      // Create new row
      const newRow = Object.assign({},newRowData);
      newRow.id = rows.length + 1;
      const newRowsData = rows.concat([newRow]);
      console.log("new row data: ", newRowsData);
      setRows(newRowsData);
    }
  }

  const newButtonClick = (event) => {
    console.log('New Button');
    const newRow = Object.assign({},emptyRow);
    newRow.id = rows.length +  1;
    setSelRow(Object.assign({},emptyRow));
  }
  
  const deleteButtonClick = (event) => {
    console.log('Delete Button');
    if (selRow.id !== '') {
      const newRows = deleteRowItem(rows,selRow);
      setSelRow(Object.assign({},emptyRow));
      setRows(newRows);
    }
  }

  //const formProps = Object.assign(selRow,{onSave});


  //const classes = useStyles();

  return (
    <Grid container direction="column" justify="space-between" alignItems="stretch" >
        <DataTable {...{rows, onSelect}}/>
        <div style={{ display: 'flex', width: '20%', height: '7%', 
                    flexDirection:'row', marginTop: '8%', marginLeft: '2%', marginBottom: '0px'}}>   
          <Button variant="contained" color="primary" onClick={newButtonClick}>
            New
          </Button>
          <span style={{display: 'inline-block', width: '20px'}}></span>
          <Button variant="contained" color="secondary" onClick={deleteButtonClick} >
            Delete
          </Button>
        </div>
        <p></p>
        <FormPropsTextFields {...{...selRow,onSave}} />
    </Grid>
  );
}

export default App;
