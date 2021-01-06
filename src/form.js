import {useState,useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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
    return (
        <TextField {...newProps} />)

}

export default function FormPropsTextFields(props) {
  const [state,setState] = useState(props);

  const classes = useStyles();
  const bReadOnly = false;

  const onSubmit = (event) => {
      event.preventDefault();
      let formData = new FormData(document.getElementById("MyForm"));
      const submitData = {};
      for(let [key,value] of formData.entries()) {
        submitData[key] = value;
     }
     console.log('SubmitData: ',submitData);
     submitData.duration_second = Number(submitData.duration_second);
     submitData.weight = Number(submitData.weight);
     props.onSave(submitData);
  }

  useEffect(
    () => setState(props),
    [props]
  );


  return (
    <form id="MyForm" className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
       <div>
        <FormField
          required
          type="number"
          name="duration_second"
          label="Duration"
          value={state.duration_second}
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
          value={state.game_type}
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
          value={state.emoji}
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
          value={state.name}
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
          value={state.question_md}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          InputProps={{
            readOnly: bReadOnly,
          }}
        />
        <FormField
          name="random_card_order"
          label="Random Order?"
          value={(state.random_card_order === '') ? '' : (state.random_card_order) ? "true" : "false"}
          helperText=""
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
          name="tags"
          label="Tags"
          value={state.tags}
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
          value={state.weight}
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
