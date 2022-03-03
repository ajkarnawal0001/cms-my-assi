import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { GetData } from "../../../Utils/LocalStorage";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Basic information", "Contact Information", "Vlog", "image"];
}
const BasicForm = () => {
  const { control } = useFormContext();
  <Typography variant="h3">
    All field is necessary.
  </Typography>
  return (
    <>
      <Controller
        control={control}
        name="fullname"
        render={({ field }) => (
          <TextField
            id="fullname"
            label="Name"
            variant="outlined"
            placeholder="Enter Your Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <TextField
            id="category"
            label="Category"
            variant="outlined"
            placeholder="Enter Your Vlog Category"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};
const ContactForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField
            id="email"
            label="E-mail"
            variant="outlined"
            placeholder="Enter Your E-mail Address"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="author"
        render={({ field }) => (
          <TextField
            id="author-name"
            label="Author"
            variant="outlined"
            placeholder="Author"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="city"
        render={({ field }) => (
          <TextField
            id="city"
            label="City"
            variant="outlined"
            placeholder="Enter Your City"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};
const PersonalForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            placeholder="Enter Title"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="shortSummary"
        render={({ field }) => (
          <TextField
            id="shortSummary"
            label="Summary"
            variant="outlined"
            placeholder="Summary"
            multiline={20}
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};
const PaymentForm = () => {
  const [img, setImg] = useState("");
  const [file, setFiles] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const { control } = useFormContext();

  const onInputChange = (e) => {
    setFiles(e.target.files[0]);
    setFiles(e.target.files[0]);
  };
  const onSubmit = (e) => {
    const payload = {
      img: img,
    };
    console.log(payload)
    axios.post("http://localhost:8000/vlog", payload).then((res) => {
      console.log(res.data);
      if (res.data) {
        // alert("Story added successfully")
        toast.success("Share Succesfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        alert("Something went wrong");
      }
    });
  };
  const onUpload = () => {
    toast.success("Upload Succesfully", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    handleSubmit();
  };
  const handleSubmit = () => {
    const data = new FormData();
    data.append("img", file);
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    // console.log(data, files)
    console.log(data);
    try {
      axios.post("http://localhost:8000/file", data, config).then((res) => {
        // console.log(res.data.data.img)
        setImg(res.data.data.img);
        console.log(res.data.data)
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {/* <Controller
        control={control}
        name="image"
        render={({ field }) => (
          <TextField
          type='image'
            id="image"
            label="image"
            variant="outlined"
            placeholder="Drag or upload your image here."
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      /> */}

      <div>
        <input
          type="file"
          // className={styles.customFileInput}
          onChange={onInputChange}
          multiple=""
        />

        <Button
          variant="contained"
          color="secondary"
          loading={loading}
          loadingPosition="start"
          onClick={onUpload}
        >
          Upload
        </Button>
        <Button
          variant="contained"
          color="primary"
          loading={loading}
          loadingPosition="start"
          //  className={styles.shareButton}
          onClick={onSubmit}
        >
          Share
        </Button>

        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;

    case 1:
      return <ContactForm />;
    case 2:
      return <PersonalForm />;
    case 3:
      return <PaymentForm />;
    default:
      return "unknown step";
  }
}

const LinaerStepper = ({userid}) => {
    const [id,setId] = useState("")
    useEffect(() => {
      setId(userid._id)
    }, [])
    
    const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      fullname: "",
      category: "",
      email: "",
      author: "",
      city: "",
      title: "",
      shortSummary: "",
      image: "xyz",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 0 ||step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = async (data) => {
      data.userId = userid._id
    if (activeStep == steps.length - 1) {
      try {
        let res = await axios.post('http://localhost:8000/vlog',data)
        .then((res) => {
          console.log(res);
          toast(res.message)
          setActiveStep(activeStep + 1);
        }); 
      } catch (error) {
        console.log(error);
        toast(error.message)
      }
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block" , color:'red'}}
              >
                Required
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Box>

        <Typography variant="h3" align="center">
          Thank You
        </Typography>
        <Box mt={{ml:60}}>
        <Button variant="contained" color='primary'>
          See Blogs
        </Button>
        </Box>
        </Box>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}

              <Button
                className={classes.button}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                >
                  skip
                </Button>
              )}
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                // onClick={}
                type="submit"
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default LinaerStepper;
