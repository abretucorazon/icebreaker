import * as React from 'react';
import {DataGrid}  from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'id', width:70},  
  { field: 'duration_second', type: 'number', headerName: 'Duration', width: 70 },
  { field: 'game_type', headerName: 'Type', width: 130 },
  { field: 'emoji', headerName: 'Emoji', width: 130 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'question_md', headerName: 'Question', width: 130 },
  { field: 'random_card_order', headerName: 'Random Order', type: 'boolean', width: 130 },
  { field: 'tags', headerName: 'Tags', width: 130 },
  {
    field: 'weight',
    headerName: 'Weight',
    type: 'number',
    width: 90,
  },
];



export default function DataTable({rows, onSelect}) {  
  return (
    <div style={{ height: 350, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection 
                disableMultipleSelection={true} onRowSelected={onSelect}/>
    </div>
  );
}

