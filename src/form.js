import {useState,useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function FormField (props) {

    const [state, setState] = useState(props.value);
    const onChange = (e) => {
        setState(e.target.value);

        //console.log(e.target);
    }

    useEffect(
        () => setState(props.value),
        [props]
      );

    const newProps = {...props, value: state, onChange: onChange};

    //console.log("RENDER field");

    return (
        <TextField {...newProps} />)

}


function FormCheckField (props) {

  //console.log ("props: ", props);
   
  const [state, setState] = useState(props.value);

  const onChange = (e) => {
      setState(e.target.checked);
  }
  
  
  useEffect(
      () => setState(props.value),
      [props]
    );


  //console.log("RENDER check field");

  return (
    <FormControlLabel
    control={<Checkbox checked={state} onChange={onChange} name={props.name} />}
    label={props.label}
    />      
      )
}



export default function FormPropsTextFields(props) {
  //const [state,setState] = useState(props);

  const classes = useStyles();
  const bReadOnly = false;

  const onSubmit = (event) => {
      event.preventDefault();
      let formData = new FormData(document.getElementById("MyForm"));
      const submitData = {};
      for(let [key,value] of formData.entries()) {
        submitData[key] = value;
     }

     submitData.random_card_order = (submitData.random_card_order !== undefined) ? true : false;
     submitData.duration_second = Number(submitData.duration_second);
     submitData.weight = Number(submitData.weight);

     //console.log('SubmitData: ',submitData);

     props.onSave(submitData);
  }



  /*
  useEffect(
    () => {
      //setState(props); 
      //setRandomOrder(props.random_card_order);
    },
    [props]
  );
*/

  //console.log("RENDER FORM");

  return (
    <form id="MyForm" className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
       <div>
        <FormField
          required
          type="number"
          name="duration_second"
          label="Duration"
          value={props.duration_second}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: bReadOnly,
          }}
        />
        <FormField
          required
          name="game_type"
          label="Type"
          value={props.game_type}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: bReadOnly,
          }}
        />
        <FormField
          required
          name="emoji"
          label="emoji"
          value={props.emoji}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: bReadOnly,
          }}
        />
        <FormField
          required
          name="name"
          label="name"
          value={props.name}
          InputProps={{
            readOnly: bReadOnly,
          }}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormField
          required
          name="question_md"
          label="Question"
          multiline
          rowsMax={4}
          value={props.question_md}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          InputProps={{
            readOnly: bReadOnly,
          }}
        />
        <FormCheckField 
          name="random_card_order"
          label="Random Order"
          value={props.random_card_order}
        />      
        <FormField
          required
          name="tags"
          label="Tags"
          value={props.tags}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: bReadOnly,
          }}
          variant="outlined"
        />
        <FormField
          required
          type="number"
          name="weight"
          label="Weight"
          value={props.weight}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: bReadOnly,
          }}
          />
        </div>
      <input type='submit' value="Save" disabled={bReadOnly}/>
    </form>
  );
}
